import { products } from '@/lib/products';

export async function generateStaticParams() {
  // Generate static paths for all products at build time
  return products.map((product) => ({
    id: product.id,
  }));
}
