"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateQRCodeService", {
    enumerable: true,
    get: function() {
        return generateQRCodeService;
    }
});
const _Product = require("../../models/Product");
const _elysia = require("elysia");
const generateQRCodeService = async (productId)=>{
    const product = await _Product.Product.findById(productId);
    if (!product) {
        throw (0, _elysia.error)('Not Found', {
            error: 'Product not found'
        });
    }
    // Generate QR code URL (implement your QR code generation logic here)
    const qrCodeUrl = `https://your-domain.com/products/${productId}`;
    product.qrCodeUrl = qrCodeUrl;
    await product.save();
    return qrCodeUrl;
};

//# sourceMappingURL=generate-qr.js.map