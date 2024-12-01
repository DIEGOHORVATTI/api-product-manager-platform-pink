"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _elysia = require("elysia");
const _jwt = require("../middlewares/jwt");
const _products = require("../services/products");
const router = new _elysia.Elysia().group('/products', (server)=>server.use(_jwt.jwt).get('/', async ()=>{
        const products = await (0, _products.getAllProductsService)();
        return {
            message: 'Products found successfully',
            products
        };
    }).get('/:id', async ({ params: { id } })=>{
        const product = await (0, _products.getOneProductService)(id);
        return {
            message: 'Product found successfully',
            product
        };
    })/* .post(
      '/',
      async ({ body, user }) => {
        const product = await createProductService(body, user)
        return { message: 'Product created successfully', product }
      },
      ProductSchema
    )
    .put(
      '/:id',
      async ({ params: { id }, body, user }) => {
        const product = await updateProductService(id, body, user)
        return { message: 'Product updated successfully', product }
      },
      ProductSchema
    ) */ .delete('/:id', async ({ params: { id } })=>{
        await (0, _products.deleteProductService)(id);
        return {
            message: 'Product deleted successfully'
        };
    }));
const _default = router;

//# sourceMappingURL=product.routes.js.map