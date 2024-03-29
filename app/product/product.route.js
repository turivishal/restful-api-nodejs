const controller = require('./product.controller');
const { Product } = require('./product.model');
const Validate = require('../../middleware/validation.middleware');

module.exports = (router) => {

    const Model = Product;
    const route = Product.ModelName;

    router.post(`/${route}`, Validate.request(Model, 'create'), controller.create);
    router.get(`/${route}/:id`, Validate.validateObjectId(['id']), controller.read);
    router.post(`/${route}/search`, Validate.request(Model, 'search'), controller.search);
    router.put(`/${route}/:id`, [Validate.validateObjectId(['id']), Validate.request(Model, 'update')], controller.update);
    router.put(`/${route}/status/:id`, [Validate.validateObjectId(['id']), Validate.request(Model, 'delete')], controller.delete);
    
}