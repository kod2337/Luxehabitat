"use client"

import { Search, ShoppingBag, Menu, X, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'New Arrivals', href: '/new-arrivals' },
  { name: 'Furniture', href: '/furniture' },
  { name: 'Lighting', href: '/lighting' },
  { name: 'Decor', href: '/decor' },
  { name: 'Sale', href: '/sale' },
  { name: 'Lookbook', href: '/lookbook' },
  { name: 'About', href: '/about' },
];

interface NavbarProps {
  // Add any props if needed
}

export function Navbar({}: NavbarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-charcoal text-white text-sm text-center py-2 px-4">
        <p>Free shipping on all orders over $500 | Use code: <span className="font-medium text-beige-light">LUXE15</span> for 15% off your first order</p>
      </div>

      <header className="relative">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-gold focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-serif font-light tracking-wider mx-auto md:mx-0 md:mr-12 transition-colors hover:text-charcoal/80"
          >
            LUXE<span className="text-gold">HABITAT</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-xs uppercase tracking-widest transition-all duration-300 relative group",
                  pathname === item.href 
                    ? "text-charcoal font-medium" 
                    : "text-gray-600 hover:text-charcoal"
                )}
              >
                {item.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full",
                    pathname === item.href ? "w-full bg-gold" : ""
                  )}
                ></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:bg-charcoal/5 hover:text-charcoal transition-colors"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>

              {searchOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-md overflow-hidden z-50">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search our collection..."
                      className="w-full py-3 pl-4 pr-10 text-sm border-b focus:outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setSearchOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Account */}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:bg-transparent hover:text-gold transition-colors hidden md:inline-flex"
              asChild
            >
              <Link href="/account">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:bg-charcoal/5 hover:text-charcoal transition-colors relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              <span className="absolute -top-1 -right-1 bg-gold text-charcoal text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">0</span>
            </Button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-y-0 left-0 w-80 bg-white shadow-2xl z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif">Menu</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

            <nav className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-lg text-gray-700 hover:text-charcoal transition-colors hover:pl-1"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-4">Customer Service</h3>
              <div className="space-y-3">
                {[
                  "Contact Us",
                  "Shipping & Returns",
                  "FAQ",
                  "Store Locator",
                ].map((item) => (
                  <Link key={item} href="#" className="block text-gray-600 hover:text-charcoal transition-colors hover:pl-1">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="fixed inset-0 bg-black/50"
            onClick={() => setCartOpen(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Escape' && setCartOpen(false)}
            aria-label="Close cart"
          />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-charcoal">Your Cart</h2>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="text-gray-500 hover:text-charcoal transition-colors"
                  aria-label="Close cart"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {/* Cart items will be rendered here */}
                <p className="text-center text-gray-500 py-8">Your cart is empty</p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-medium mb-4 text-charcoal">
                  <span>Subtotal</span>
                  <span>$0.00</span>
                </div>
                <Button 
                  className="w-full py-6 text-lg bg-charcoal hover:bg-charcoal/90 text-white transition-colors" 
                  type="button"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
