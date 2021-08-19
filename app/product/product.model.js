const mongoose = require("mongoose");
const _ = require("lodash");

const Model = 'Product';
const ModelName = 'product';

// LOAD VALIDATIONS
const Joi = require(`./${ModelName}.validate`);

// ACTIVE STATUS
const ActiveStatus = [
    0, // INACTIVE 
    1, //ACTIVE
    2 // DELETED
];

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - quantity
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           example: "T-Shirt"
 *           description: "Product Name"
 *         category:
 *           type: string
 *           example: "Cloths"
 *           description: "Product Category"
 *         quantity:
 *           type: number
 *           example: 10
 *           description: "Product Quantity"
 *         price:
 *           type: number
 *           example: 100
 *           description: "Product Price"
 *         moreInfo:
 *           type: object
 *           description: Other required dynamic fields
 *           example: {}
 *         activeStatus:
 *           $ref: '#/components/parameters/activeStatus' 
 */

// SCHEMA
const ProductSchema = {
    name: String,
    category: String,
    quantity: Number,
    price: Number,
    moreInfo: {
        type: Object,
        required: true
    },
    activeStatus: {
        type: Number,
        default: 1
    }
};

// SCHEMA
const SchemaObj = new mongoose.Schema(
    ProductSchema,
    {
        collection: `${ModelName}`,
        timestamps: true,
        versionKey: false
    }
);

// PRE MIDDLEWARE
SchemaObj.pre('save', function (next) {
    // do stuff before save
    next();
});

// CREATE INDEX
SchemaObj.index({ name: "text", category: "text" });

// CREATE MODEL
const Schema = mongoose.model(Model, SchemaObj);

// ============================================ SEARCHING SORTING 

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductSorting:
 *       type: object
 *       description: Sort Order Along with Fields
 *       properties:
 *         _id:
 *           $ref: '#/components/parameters/order'
 *         createdAt:
 *           $ref: '#/components/parameters/order'
 */

// SORTIN PROPERTIES
const SortingProperties = [
    "_id",
    "createdAt"
];

// SEARCHING PROPERTIES
const SearchProperties = [
    "name",
    "category"
];

// DEFAULT FILTERS
const SearchFilters = {
    activeStatus: { $in: [0, 1] } // ACTIVE / INACTIVE RECORDS
};

// LOAD JOI VALIDATIONs
const JoiValidations = Joi.validations(Model, {
    SortingProperties,
    ActiveStatus
});
let DtoValidations = {};

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductSearch:
 *       type: object
 *       properties:
 *         searchKeyword:
 *           $ref: '#/components/parameters/searchKeyword'
 *         perPage:
 *           $ref: '#/components/parameters/perPage'
 *         page:
 *           $ref: '#/components/parameters/page'
 */

// SEARCH DTO
const SearchDTO = [
    "searchKeyword",
    "perPage",
    "page"
];

// SEARCH VALIDATION
DtoValidations.search = _.pick(JoiValidations, SearchDTO);

// SEARCH VIEW FIELDS
const SearchViewFields = {
    name: 1,
    category: 1,
    quantity: 1,
    price: 1,
    moreInfo: 1,
    activeStatus: 1,
    createdAt: 1
};

// ============================================ CREATE 

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductCreate:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - quantity
 *         - price
 *       properties:
 *         name:
 *           $ref: '#/components/schemas/Product/properties/name'
 *         category:
 *           $ref: '#/components/schemas/Product/properties/category'
 *         price:
 *           $ref: '#/components/schemas/Product/properties/price'
 *         quantity:
 *           $ref: '#/components/schemas/Product/properties/quantity'
 *         moreInfo:
 *           $ref: '#/components/schemas/Product/properties/moreInfo'
 *         activeStatus:
 *           $ref: '#/components/schemas/Product/properties/activeStatus'
 */

const CreateDTO = [
    "name",
    "category",
    "quantity",
    "price",
    "moreInfo",
    "activeStatus"
];

// CREATE VALIDATIONS
DtoValidations.create = _.pick(JoiValidations, CreateDTO);

// ============================================ UPDATE 

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductUpdate:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - quantity
 *         - price
 *       properties:
 *         name:
 *           $ref: '#/components/schemas/Product/properties/name'
 *         category:
 *           $ref: '#/components/schemas/Product/properties/category'
 *         price:
 *           $ref: '#/components/schemas/Product/properties/price'
 *         quantity:
 *           $ref: '#/components/schemas/Product/properties/quantity'
 *         moreInfo:
 *           $ref: '#/components/schemas/Product/properties/moreInfo'
 *         activeStatus:
 *           $ref: '#/components/schemas/Product/properties/activeStatus'
 */

// UPDATE DTO
const UpdateDTO = [
    "name",
    "category",
    "quantity",
    "price",
    "moreInfo",
    "activeStatus"
];

// UPDATE VALIDATIONS
DtoValidations.update = _.pick(JoiValidations, UpdateDTO);

// ============================================ DELETE 

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductDelete:
 *       type: object
 *       required:
 *         - activeStatus
 *       properties:
 *         activeStatus:
 *           $ref: '#/components/schemas/Product/properties/activeStatus'
 */

// DELETE DTO
const DeleteDTO = [
    "activeStatus"
];

// DELETE VALIDATIONS
DtoValidations.delete = _.pick(JoiValidations, DeleteDTO);

// EXPORTS
exports[Model] = {
    Schema,
    DtoValidations,
    Model,
    ModelName,
    SearchDTO,
    SearchFilters,
    SearchProperties,
    SearchViewFields,
    CreateDTO,
    UpdateDTO,
    DeleteDTO,
    ObjectId: mongoose.Types.ObjectId
};