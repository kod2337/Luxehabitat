"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Product } from "@/lib/products"
import { Button } from "./ui/button"
import { ShoppingBag, Heart, Eye, Star, ArrowRight } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className = "" }: ProductCardProps) {
  const { addToCart } = useCart()
  
  return (
    <motion.div 
      className={`group relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Product Image with Hover Effect */}
        <div className="aspect-[3/4] bg-gray-50 overflow-hidden relative">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700 group-hover:opacity-0"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            priority
          />
          
          {product.images[1] ? (
            <Image
              src={product.images[1]}
              alt={product.name}
              fill
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          )}
          
          {/* Quick Actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white/90 hover:bg-white text-gray-900 rounded-none w-10 h-10"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  // TODO: Add to wishlist
                }}
              >
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white/90 hover:bg-white text-gray-900 rounded-none w-10 h-10"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  // TODO: Quick view
                }}
              >
                <Eye className="h-4 w-4" />
                <span className="sr-only">Quick view</span>
              </Button>
            </div>
          </div>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            {product.isNew && (
              <span className="bg-white text-xs font-medium px-3 py-1">NEW</span>
            )}
            {product.discount && (
              <span className="bg-gold text-white text-xs font-medium px-3 py-1">-{product.discount}%</span>
            )}
          </div>
          
          {/* Add to Cart Button */}
          <Button 
            variant="default" 
            size="lg" 
            className="absolute bottom-0 left-0 right-0 w-full rounded-none bg-black/90 hover:bg-black text-white py-4 opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center space-x-2"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              addToCart({
                ...product,
                quantity: 1,
              })
            }}
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Add to Cart</span>
          </Button>
        </div>
        
        {/* Product Info */}
        <div className="mt-4 text-center">
          <Link href={`/products/${product.id}`} className="block group">
            <h3 className="text-sm font-light text-gray-900 mb-1 group-hover:text-gold transition-colors">
              {product.brand}
            </h3>
            <h4 className="text-sm text-gray-500 mb-2">{product.name}</h4>
            
            <div className="flex items-center justify-center space-x-2">
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-sm font-medium text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            </div>
            
            {/* Rating */}
            <div className="flex items-center justify-center mt-2 space-x-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Star
                  key={rating}
                  className={`h-3 w-3 ${
                    rating <= (product.rating || 0)
                      ? 'text-gold fill-current'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">
                ({product.reviewCount})
              </span>
            </div>
            
            {/* View Details */}
            <div className="mt-3 flex items-center justify-center text-xs text-gray-500 group-hover:text-gold transition-colors">
              <span>View Details</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
