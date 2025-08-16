"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "./ui/button"
import Link from "next/link"

export function Hero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Image Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
        <img
          src="/images/hero-sofa.jpg"
          alt="Luxury Furniture Showcase"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </motion.div>
      
      {/* Content */}
      <div className="container relative z-10 px-6">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="text-sm tracking-widest text-gold-500 font-medium mb-4 inline-block">NEW COLLECTION</span>
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-light leading-[0.9] mb-6"
            >
              Timeless <span className="text-gold">Elegance</span> for Modern Living
            </motion.h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-xl"
          >
            <p className="text-lg md:text-xl mb-8 text-gray-300 font-light leading-relaxed">
              Experience the perfect blend of artistry and craftsmanship with our exclusive collection of designer furniture. 
              Each piece tells a story of meticulous attention to detail and timeless design.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-gold text-black hover:bg-gold/90 transition-all duration-300 hover:scale-105"
              >
                <Link href="/collection">
                  Explore Collection
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="text-white border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                <Link href="/lookbook">
                  View Lookbook
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10 text-center"
        style={{ opacity }}
      >
        <p className="text-sm text-white/70 mb-2 tracking-widest">SCROLL TO DISCOVER</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="inline-block"
        >
          <svg 
            className="w-6 h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
