'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Product } from '@/lib/products';
import { useToast } from '@/components/ui/use-toast';

type CartItem = {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
  isInCart: (productId: string) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = useCallback((product: Product, quantity: number = 1, color?: string, size?: string) => {
    setItems((prevItems) => {
      // Check if the product is already in the cart
      const existingItemIndex = prevItems.findIndex(
        (item) => 
          item.product.id === product.id && 
          item.selectedColor === color && 
          item.selectedSize === size
      );

      if (existingItemIndex > -1) {
        // Update quantity if product already exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      }

      // Add new item to cart
      return [
        ...prevItems,
        {
          product,
          quantity,
          selectedColor: color,
          selectedSize: size,
        },
      ];
    });

    // Show success toast
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  }, [toast]);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
    
    // Show success toast
    const removedItem = items.find(item => item.product.id === productId);
    if (removedItem) {
      toast({
        title: 'Removed from cart',
        description: `${removedItem.product.name} has been removed from your cart.`,
      });
    }
  }, [items, toast]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = useCallback((productId: string) => {
    return items.some((item) => item.product.id === productId);
  }, [items]);

  // Calculate total number of items in cart
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price of all items in cart
  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        totalPrice,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
