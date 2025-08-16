'use client';

import { useState } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { Star } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/lib/products";

type ProductPageClientProps = {
  product: Product | undefined;
  relatedProducts: Product[];
};

export function ProductPageClient({ product, relatedProducts }: ProductPageClientProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!product) return;
    
    // Validate selection if options are available
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive",
      });
      return;
    }
    
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }
    
    // Add to cart
    addToCart(
      product,
      quantity,
      selectedColor || undefined,
      selectedSize || undefined
    );
    
    // Show success message
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} has been added to your cart.`,
    });
  };
  
  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 99));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  if (!product) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Product not found</h2>
          <p className="text-muted-foreground">The product you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16 lg:py-20">
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.slice(0, 3).map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">{product.category}</span>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight mb-4">{product.name}</h1>
          
          <p className="text-2xl font-semibold mb-6">${product.price.toFixed(2)}</p>
          
          <p className="text-muted-foreground mb-8">{product.description}</p>
          
          {product.colors && product.colors.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-2">Color</h3>
              <div className="flex gap-2">
                {product.colors.map((color, index) => {
                  const isSelected = selectedColor === color;
                  return (
                    <button
                      key={index}
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                        isSelected 
                          ? 'border-primary ring-2 ring-offset-2 ring-primary/30' 
                          : 'border-gray-200'
                      } focus:outline-none`}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Color ${index + 1}`}
                      title={`Color ${index + 1}`}
                    >
                      <span 
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                        isSelected 
                          ? 'bg-primary text-primary-foreground border-primary' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-md">
              <button 
                type="button"
                className="px-3 py-2 text-lg font-medium hover:bg-gray-50 transition-colors"
                onClick={decrementQuantity}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button 
                type="button"
                className="px-3 py-2 text-lg font-medium hover:bg-gray-50 transition-colors"
                onClick={incrementQuantity}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <Button 
              size="lg" 
              className="flex-1"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
          
          {product.features && product.features.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-lg font-medium mb-4">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <h2 className="text-2xl font-bold mb-8">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
