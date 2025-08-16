'use client'

import { Hero } from '@/components/hero'
import { ProductGrid } from '@/components/product-grid'
import { Navbar } from '@/components/navbar'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProductGrid />
      </main>
      <footer className="border-t py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold">LUXEHABITAT</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Modern furniture for your home, designed for comfort and style.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Shop</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">All Products</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">New Arrivals</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Best Sellers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">About Us</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium">Support</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">FAQs</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Shipping</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Returns</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-muted-foreground text-center">
              &copy; {new Date().getFullYear()} LUXEHABITAT. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
