'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-context';
import Link from 'next/link';
import Image from 'next/image';

export function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    itemCount, 
    totalPrice 
  } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.cart-drawer') && !target.closest('.cart-button')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isMounted) {
    return (
      <button 
        className="relative p-2 text-gray-700 hover:text-gray-900 focus:outline-none cart-button"
        aria-label="Cart"
      >
        <ShoppingCart className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="relative">
      <button 
        className="relative p-2 text-gray-700 hover:text-gray-900 focus:outline-none cart-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open cart"
      >
        <ShoppingCart className="h-6 w-6" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>

      {/* Cart Drawer */}
      <div 
        className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
        <div 
          className={`fixed inset-y-0 right-0 flex max-w-full pl-10 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="w-screen max-w-md">
            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl cart-drawer">
              <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  {items.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                      <p className="mt-1 text-sm text-gray-500">Start adding some items to your cart.</p>
                      <div className="mt-6">
                        <Button onClick={() => setIsOpen(false)}>Continue Shopping</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {items.map((item) => (
                          <li key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <Image
                                src={item.product.image}
                                alt={item.product.name}
                                width={96}
                                height={96}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <Link 
                                      href={`/products/${item.product.id}`}
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {item.product.name}
                                    </Link>
                                  </h3>
                                  <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                                {(item.selectedColor || item.selectedSize) && (
                                  <div className="mt-1 text-sm text-gray-500">
                                    {item.selectedColor && (
                                      <div className="flex items-center">
                                        <span className="mr-2">Color:</span>
                                        <span 
                                          className="inline-block h-4 w-4 rounded-full border border-gray-300"
                                          style={{ backgroundColor: item.selectedColor }}
                                          aria-hidden="true"
                                        />
                                      </div>
                                    )}
                                    {item.selectedSize && (
                                      <div>
                                        <span className="mr-2">Size:</span>
                                        <span>{item.selectedSize}</span>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex items-center border rounded-md">
                                  <button 
                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                    onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <button 
                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>

                                <div className="flex">
                                  <button
                                    type="button"
                                    className="font-medium text-primary hover:text-primary/80"
                                    onClick={() => removeFromCart(item.product.id)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {items.length > 0 && (
                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${totalPrice.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <Link
                      href="/checkout"
                      className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary/90"
                      onClick={() => setIsOpen(false)}
                    >
                      Checkout
                    </Link>
                  </div>
                  <div className="mt-4 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        className="font-medium text-primary hover:text-primary/80"
                        onClick={() => setIsOpen(false)}
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
