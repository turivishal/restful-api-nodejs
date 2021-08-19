const ProductService = require("./product.service");

/**
 * @swagger
 * /product:
 *   post:
 *     security:
 *       - Authorization: []
 *     description: Create a product
 *     summary: Create a product 
 *     operationId: productCreate
 *     tags:
 *       - Product
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - $ref: '#/components/parameters/acceptLanguage'
 *     requestBody:
 *       description: Product object that need to be add details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreate'
 *     responses:
 *       200:
 *          $ref: '#/components/responses/200'
 */

// CREATE
module.exports.create = async (req, res, next) => {
    try {
        Response.send(res, await ProductService.create(req.body));
    } catch (error) {
        Response.error(res, {
            'statusCode': 400,
            'messageKey': 'general.something_wrong',
            'description': error.message
        });
    }
}

/**
 * @swagger
 * /product/{productId}:
 *   get:
 *     security:
 *       - Authorization: [] 
 *     description: Get a product
 *     summary: Get a product 
 *     operationId: productRead
 *     tags:
 *       - Product
 *     parameters:
 *       - $ref: '#/components/parameters/acceptLanguage'
 *       - name: productId
 *         description: Product unique ID
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *          $ref: '#/components/schemas/Product'
 */

// READ ONE
module.exports.read = async (req, res, next) => {
    try {
        Response.send(res, await ProductService.read(req.params.id));
    } catch (error) {
        Response.error(res, {
            'statusCode': 400,
            'messageKey': 'general.something_wrong',
            'description': error.message
        });
    }
}
  
/**
 * @swagger
 * /product/search:
 *   post:
 *     security:
 *       - Authorization: []
 *     description: Get all product
 *     summary: Get all product 
 *     operationId: productSearch
 *     tags:
 *       - Product
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/components/parameters/acceptLanguage'
 *     requestBody:
 *       description: Product search object that need to be add details
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductSearch'
 *     responses:
 *       200:
 *          $ref: '#/components/responses/200'
 */

// LIST
module.exports.search = async (req, res, next) => {
    try {
        Response.send(res, await ProductService.search(req.body));
    } catch (error) {
        Response.error(res, {
            'statusCode': 400,
            'messageKey': 'general.something_wrong',
            'description': error.message
        });
    }
}

/**
 * @swagger
 * /product/{productId}:
 *   put:
 *     security:
 *       - Authorization: []
 *     description: Edit a product
 *     summary: Edit a product 
 *     operationId: productEdit
 *     tags:
 *       - Product
 *     parameters:
 *       - $ref: '#/components/parameters/acceptLanguage'
 *       - name: productId
 *         description: Product unique ID
 *         in: path
 *         required: true
 *     requestBody:
 *       description: Product object that need to be edit details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductUpdate'
 *     responses:
 *       200:
 *          $ref: '#/components/responses/200'
 */

// UPDATE
module.exports.update = async (req, res, next) => {
    try {
        Response.send(res, await ProductService.update(req.params.id, req.body));
    } catch (error) {
        Response.error(res, {
            'statusCode': 400,
            'messageKey': 'general.something_wrong',
            'description': error.message
        });
    }
}

/**
 * @swagger
 * /product/status/{productId}:
 *   put:
 *     security:
 *       - Authorization: [] 
 *     description: Delete a product
 *     summary: Actrive, Inactive or Soft Delete a product 
 *     operationId: productDelete
 *     tags:
 *       - Product
 *     parameters:
 *       - $ref: '#/components/parameters/acceptLanguage'
 *       - name: productId
 *         description: Product unique ID
 *         in: path
 *         required: true
 *     requestBody:
 *       description: Status Update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductDelete'
 *     responses:
 *       200:
 *          $ref: '#/components/schemas/Product'
 */

// DELETE
module.exports.delete = async (req, res, next) => {
    try {
        Response.send(res, await ProductService.delete(req.params.id, req.body));
    } catch (error) {
        Response.error(res, {
            'statusCode': 400,
            'messageKey': 'general.something_wrong',
            'description': error.message
        });
    }
}