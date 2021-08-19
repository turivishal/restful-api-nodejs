const page = require('./page.controller');
module.exports = (router) => {
    router.get('*', page.urlNotFound);
    router.post('*', page.urlNotFound);
    router.put('*', page.urlNotFound);
    router.delete('*', page.urlNotFound);
}