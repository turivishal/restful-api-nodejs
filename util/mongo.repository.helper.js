const _ = require("lodash");

class MongoRepository {

    ModelSchema;
    sortBy;
    sortOrder;
    sortOrdersKey;
    sortOrders;
    page;
    perPage;
    aggregateObj = [];

    constructor() {

        // DEFAULTS
        this.sortBy = "_id";
        this.sortOrder = -1; // -1 = DESC | 1 = ASC

        this.sortOrdersKey = [
            'desc',
            'asc'
        ];

        this.sortOrders = {
            'desc': -1,
            'asc': 1
        }

        // PAGINATION
        this.page = 1;
        this.perPage = 10;

    }

    // INIT SCHEMA
    initModel(schema) {
        this.ModelSchema = schema;
        // AGG
        this.aggregateObj = [];
    }

    // FIND SINGLE RECORD
    async findOne(Schema, filter) {
        return Schema
            .findOne(filter.query, filter.projection || {})
            .populate(filter.populate || []);
    }

    // CHECK WHETHER RECORD IS UNIQ OR NOT
    // IF UNIQUE THEN RETURN TRUE ELSE FALSE
    async isUnique(Schema, query = {}, projection = {}, returnObject = false) {
        let isUnique = await this.findOne(Schema, { query, projection });
        if (isUnique) {
            if (returnObject) return isUnique;
            return false;
        } else {
            return true;
        }
    }

    // CHECK WHETHER RECORD IS EXISTS OR NOT
    // IF EXISTS THEN RETURN TRUE ELSE FALSE
    async isExists(Schema, query = {}, projection = {}, returnObject = false) {
        let isExists = await this.findOne(Schema, { query, projection });
        if (isExists) {
            if (returnObject) return isExists;
            return true;
        } else {
            return false;
        }
    }

    // SAVE / CREATE
    async save(Schema, document, writeConcern = {}) {
        let doc = Schema(document, writeConcern);
        return await doc.save();
    }

    // DOCUMENT COUNT
    async countDocuments(Schema, query, projection) {
        return await Schema.countDocuments(query);
    }

    // DOCUMENT COUNT
    async count(Schema, query, projection) {
        return await Schema.find(query, projection).count();
    }

    // FIND ALL
    async find(Schema, query, projection) {
        return await Schema.find(query, projection);
    }

    // FIND FILTER DATA
    async findFilter(Schema, filter) {
        return await Schema.find(filter.query || {}, filter.projection || {})
            .populate(filter.populate || [])
            .sort(filter.sort || {})
            .skip(filter.skip)
            .limit(filter.limit);
    }

    // FIND AND UPDATE
    async findByIdAndUpdate(Schema, filter, update, projection = {}) {
        return Schema.findByIdAndUpdate(filter, update, projection);
    }

    // FIND ONE AND UPDATE
    async findOneAndUpdate(Schema, filter, update, options = {}) {
        return Schema.findOneAndUpdate(filter, update, options);
    }

    // UPDATE ONE
    async updateOne(Schema, filter, update, projection = {}) {
        return Schema.updateOne(filter, update, projection);
    }

    // DEFAULT SORTING
    sortDefault() {
        return { [this.sortBy]: this.sortOrder };
    }

    // GET ORDER VALUE FROM KEY
    getOrderKeyConvert(orderKey) {
        return this.sortOrders[orderKey];
    }

    // GET PAGE
    getRealPage(page) {
        return this.validatePage(page != undefined && !Number.isNaN(page) && page > 0 ? page : this.page) - 1;
    }

    // SET VALIDE PAGE
    validatePage(page) {
        if (page < 1) return 1;
        return page;
    }

    // GET PER PAGE
    getPerPage(perPage) {
        return perPage || this.perPage;
    }

    // PAGE SKIPPER
    pageSkipper(page, limit) {
        return (page * limit || 0);
    }

    // GET SORTING FILTER
    async sortingFilter(sortBy) {

        let sort = {};
        if (sortBy) {
            _.forEach(sortBy, (value, index) => {
                sort[index] = this.getOrderKeyConvert(value);
            });
        } else {
            sort = this.sortDefault();
        }

        return sort;

    }

    // SEARCH KEYWORD SETTER
    async searchKeywordCondition(searchKeyword, searchProperties) {

        let query = {};
        if (searchKeyword) {
            searchKeyword = searchKeyword.trim();
            query['$or'] = [];
            _.forEach(searchProperties, (value) => {
                query['$or'].push(
                    {
                        [value]: {
                            $regex: '.*' + searchKeyword + '.*',
                            $options: 'i'
                        }
                    },
                )
            });
        }
        return JSON.stringify(query) !== '{}' ? query : null;

    }

    // AGGRIGATION PUSH
    aggregatePush(event, data) {
        this.aggregateObj.push({ ['$' + event]: data });
    }

    // AGGREGATE
    async aggregate(Schema, data) {
        if (data) return await Schema.aggregate(data);
    }

    // REMOVE DOCUMENT
    async deleteOne(Schema, filter) {
        return await Schema.deleteOne(filter)
    }

    // FACET FOR PAGINATION
    async paginateFacet(pageNo, perPage) {

        // PAGE
        let page = await this.getRealPage(pageNo);
        // PER PAGE / LIMIT
        let limit = await this.getPerPage(perPage);
        // SKIP
        let skip = await this.pageSkipper(page, limit);

        return {
            "result": [{ "$skip": skip }, { "$limit": limit }],
            "count": [{ "$count": 'count' }]
        }
    }

}

module.exports = new MongoRepository();