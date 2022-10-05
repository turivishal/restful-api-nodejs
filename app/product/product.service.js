const MongoRepository = require('../../util/mongo.repository.helper');
const { Product } = require("./product.model");
const _ = require("lodash");
const helper = require('../../util/general.helper');

const msgpath = Product.ModelName;

// CREATE
module.exports.create = async (data) => {
    // SAVE RECORD
    let responseData = await MongoRepository.save(Product.Schema, data);
    return {
        'statusCode': 200,
        'messageKey': `${msgpath}.created`,
        'data': responseData
    };
}

// READ
module.exports.read = async (id) => {
    let responseData = await Product.Schema.findById(id, Product.SearchViewFields).lean();
    // FIND ONE
    if (!responseData) return {
        'status': false,
        'statusCode': 404,
        'messageKey': `${msgpath}.not_found`
    };
    // IF PRODUCT IS DELETED
    if (responseData.activeStatus === 2) return {
        'status': false,
        'statusCode': 404,
        'messageKey': `${msgpath}.already_deleted`
    };
    return {
        'statusCode': 200,
        'messageKey': `${msgpath}.read_a`,
        'data': responseData
    };
}

// SEARCH
module.exports.search = async (data) => {
    // GET SEARCH FILTER
    let responseData = await searchFilterAggregate(data);
    // NO DATA FOUND
    if (!responseData[0].count.length) return {
        'statusCode': 200,
        'messageKey': `${msgpath}.no_data_search`
    };
    return {
        'statusCode': 200,
        'messageKey': `${msgpath}.read_all`,
        'data': responseData[0].result,
        'dataCount': responseData[0].count[0].count
    };
}

// GET SEARCH FILTER
async function searchFilterAggregate(data) {

    let p = Product.Schema.aggregate();

    if (data.searchKeyword && data.searchKeyword.trim() != "")
        p.match({ $text: { $search: data.searchKeyword.trim() } });
    
    // DEFAULT SEARCH FILTERS
    p.match(Product.SearchFilters);

    // SORTING
    p.sort({ _id: -1 });

    // PROJECTION
    p.project(Product.SearchViewFields);

    // FACET COUNTS
    p.facet(await MongoRepository.paginateFacet(data.page, data.perPage));

    return p.exec();
    
}

// UPDATE
module.exports.update = async (id, data) => {
    let responseData = await MongoRepository.findOneAndUpdate(Product.Schema, { _id: id }, { $set: data }, { returnOriginal: false, new: true });
    if (!responseData) return {
        'statusCode': 404,
        'messageKey': `${msgpath}.not_found`,
    };
    return {
        'statusCode': 200,
        'messageKey': `${msgpath}.updated`,
        'data': responseData
    };
}

// DELETE
module.exports.delete = async (id, data) => {
    let responseData = await MongoRepository.updateOne(Product.Schema, { _id: id }, { $set: data });
    if (!responseData) return {
        'statusCode': 404,
        'messageKey': `${msgpath}.not_found`,
    };
    // DEACTIVATED
    else if (data.activeStatus === 0) return {
        'statusCode': 200,
        'messageKey': `${msgpath}.deactivated`
    }
    // ACTIVATED
    else if (data.activeStatus === 1) return {
        'statusCode': 200,
        'messageKey': `${msgpath}.activated`
    }
    // DELETED
    else if (data.activeStatus === 2) return {
        'statusCode': 200,
        'messageKey': `${msgpath}.deleted`
    }
}