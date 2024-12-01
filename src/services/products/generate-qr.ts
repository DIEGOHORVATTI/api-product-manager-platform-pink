import { Product } from '@/models/Product'
import { error } from 'elysia'

export const generateQRCodeService = async (productId: string) => {
  const product = await Product.findById(productId)

  if (!product) {
    throw error('Not Found', { error: 'Product not found' })
  }

  // Generate QR code URL (implement your QR code generation logic here)
  const qrCodeUrl = `https://your-domain.com/products/${productId}`

  product.qrCodeUrl = qrCodeUrl
  await product.save()

  return qrCodeUrl
}
