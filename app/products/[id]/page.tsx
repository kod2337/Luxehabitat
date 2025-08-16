import { getProductById, getRelatedProducts, products } from "@/lib/products";
import { ProductPageClient } from "./product-page-client";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);
  const relatedProducts = getRelatedProducts(params.id);

  return (
    <ProductPageClient 
      product={product} 
      relatedProducts={relatedProducts} 
    />
  );
}

export async function generateStaticParams() {
  // Generate static paths for all products at build time
  return products.map((product) => ({
    id: product.id,
  }));
}

