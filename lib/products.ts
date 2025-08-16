export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  isNew?: boolean;
  category: string;
  description: string;
  image: string;
  images: string[];
  colors: string[];
  sizes?: string[];
  features?: string[];
  rating: number;
  reviewCount: number;
  materials?: string[];
  dimensions?: {
    width: string;
    height: string;
    depth: string;
    weight: string;
  };
  sku: string;
  stock: number;
  quantity?: number; // For cart operations
};

export const products: Product[] = [
  {
    id: "1",
    name: "Elysian Armchair",
    brand: "LUXE HABITAT",
    price: 1299.99,
    originalPrice: 1599.99,
    discount: 19,
    isNew: true,
    category: "Living Room",
    description: "The Elysian Armchair redefines luxury seating with its handcrafted Italian leather and solid walnut frame. Each piece is individually numbered and signed by our master craftsmen, featuring a unique patina that develops beautifully over time.",
    image: "/images/armchair.jpg",
    images: [
      "/images/armchair.jpg",
      "/images/armchair-2.jpg",
      "/images/armchair-3.jpg"
    ],
    colors: ["#f59e0b", "#1f2937", "#6b7280"],
    sizes: ["Small", "Medium", "Large"],
    features: [
      "High-quality fabric upholstery",
      "Solid wood frame",
      "Removable cushion covers",
      "Easy to assemble"
    ],
    rating: 4.8,
    reviewCount: 124,
    sku: "LH-AC-001",
    stock: 15,
    materials: ["Italian leather", "Solid walnut"],
    dimensions: {
      width: '32"',
      height: '32"',
      depth: '36"',
      weight: '55 lbs'
    }
  },
  {
    id: "2",
    name: "Marble & Brass Coffee Table",
    brand: "LUXE HABITAT",
    price: 2499.99,
    originalPrice: 2899.99,
    discount: 14,
    category: "Living Room",
    description: "A statement piece that combines Italian Carrara marble with hand-brushed brass legs, this coffee table is a true centerpiece for any sophisticated living space. Each marble top is unique with its natural veining patterns.",
    image: "/images/coffee-table.jpg",
    images: [
      "/images/coffee-table.jpg",
      "/images/coffee-table-2.jpg",
      "/images/coffee-table-3.jpg"
    ],
    colors: ["#78350f", "#1e40af", "#1e293b"],
    sizes: ["Small", "Large"],
    features: [
      "Solid oak construction",
      "Water-resistant finish",
      "Smooth, rounded edges", 
      "Easy to clean"
    ],
    rating: 4.6,
    reviewCount: 89,
    sku: "LH-CT-001",
    stock: 8,
    materials: ["Carrara marble", "Brass"],
    dimensions: {
      width: '48"',
      height: '18"',
      depth: '30"',
      weight: '120 lbs'
    }
  },
  {
    id: "3",
    name: "Horizon Bookshelf",
    brand: "LUXE HABITAT",
    price: 3299.99,
    isNew: true,
    category: "Office",
    description: "The Horizon Bookshelf is a stunning blend of form and function, featuring hand-welded steel frames and sustainably sourced American walnut shelves. Its modular design allows for customizable configurations to fit any space.",
    image: "/images/bookshelf.jpg",
    images: [
      "/images/bookshelf.jpg",
      "/images/bookshelf-2.jpg",
      "/images/bookshelf-3.jpg"
    ],
    colors: ["#1e40af", "#1e293b", "#6b7280"],
    sizes: ["4-Shelf", "5-Shelf"],
    features: [
      "Modular design",
      "Adjustable shelves",
      "Sturdy metal frame",
      "Easy to assemble"
    ],
    rating: 4.7,
    reviewCount: 156,
    sku: "LH-BS-001",
    stock: 5,
    materials: ["American walnut", "Steel"],
    dimensions: {
      width: '72"',
      height: '84"',
      depth: '16"',
      weight: '95 lbs'
    }
  },
  {
    id: "4",
    name: "Velvet Dining Chair",
    brand: "LUXE HABITAT",
    price: 899.99,
    category: "Dining Room",
    description: "Upholstered in sumptuous velvet with a solid brass frame, these dining chairs add a touch of modern glamour to any dining space. The ergonomic design ensures comfort during extended gatherings.",
    image: "/images/dining-chair.jpg",
    images: [
      "/images/dining-chair.jpg",
      "/images/dining-chair-2.jpg",
      "/images/dining-chair-3.jpg"
    ],
    colors: ["#f59e0b", "#1f2937", "#6b7280"],
    features: [
      "Upholstered seat",
      "Solid wood legs",
      "Weight capacity: 300 lbs",
      "Easy to clean"
    ],
    rating: 4.5,
    reviewCount: 78,
    sku: "LH-DC-001",
    stock: 12,
    materials: ["Velvet upholstery", "Brass"],
    dimensions: {
      width: '22"',
      height: '34"',
      depth: '22"',
      weight: '28 lbs'
    }
  },
  {
    id: "5",
    name: "Arco Floor Lamp",
    brand: "LUXE HABITAT",
    price: 2499.99,
    originalPrice: 2899.99,
    discount: 14,
    category: "Lighting",
    description: "Inspired by the iconic designs of the 1960s, the Arco Floor Lamp features a Carrara marble base and a gracefully arching stainless steel stem. The adjustable head allows for precise lighting direction, making it perfect for reading or creating ambiance.",
    image: "/images/lamp.jpg",
    images: [
      "/images/lamp.jpg",
      "/images/lamp-2.jpg",
      "/images/lamp-3.jpg"
    ],
    colors: ["#1e40af", "#1e293b", "#6b7280"],
    features: [
      "Dimmable LED lighting",
      "Adjustable height",
      "Touch control",
      "Energy efficient"
    ],
    rating: 4.4,
    reviewCount: 92,
    sku: "LH-FL-001",
    stock: 6,
    materials: ["Carrara marble", "Stainless steel"],
    dimensions: {
      width: '12"',
      height: '95"',
      depth: '12"',
      weight: '65 lbs'
    }
  },
  {
    id: "6",
    name: "Carrara Marble Side Table",
    brand: "LUXE HABITAT",
    price: 1299.99,
    category: "Living Room",
    description: "Crafted from a single slab of Carrara marble with a polished finish, this side table features a minimalist brass base. Each piece showcases the natural veining of the marble, making it a unique work of functional art.",
    image: "/images/side-table.jpg",
    images: [
      "/images/side-table.jpg",
      "/images/side-table-2.jpg",
      "/images/side-table-3.jpg"
    ],
    colors: ["#78350f", "#1f2937", "#6b7280"],
    sizes: ["Small", "Medium"],
    features: [
      "Solid wood construction",
      "Lower shelf for extra storage",
      "Smooth finish",
      "Easy to assemble"
    ],
    rating: 4.6,
    reviewCount: 67,
    sku: "LH-ST-001",
    stock: 10,
    materials: ["Carrara marble", "Brass"],
    dimensions: {
      width: '22"',
      height: '22"',
      depth: '22"',
      weight: '45 lbs'
    }
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getRelatedProducts(currentProductId: string, limit = 3): Product[] {
  return products
    .filter(product => product.id !== currentProductId)
    .slice(0, limit);
}
