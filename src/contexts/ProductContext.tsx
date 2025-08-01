// src/contexts/ProductContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// --- Generic placeholder for when NO image is provided (e.g., if admin adds a product without an image) ---
const DefaultProductPlaceholder = 'https://placehold.co/400x400/CCCCCC/000000?text=No+Image';


export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  features: string[];
  images?: string[]; // Optional array of image URLs
}

interface ProductContextType {
  products: Product[];
  isLoading: boolean;
  categories: string[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  clearProductsData: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const initialProducts: Product[] = [
  // Cosmetics & Personal Care
  {
    id: '1',
    name: 'Belo Color',
    category: 'Cosmetics & Personal Care',
    description: 'High-quality hair color for vibrant and long-lasting results.',
    image: '/balo-color-1.jpg',
    images: [
      '/balo-color-1.jpg',
      '/balo-color-3.png',
      '/balo-color-2.png'
    ],
    features: ['Long-lasting color', 'Natural ingredients', 'Easy application']
  },
   {
    id: '50',
    name: 'Belo Color (Brown)',
    category: 'Cosmetics & Personal Care',
    description: 'High-quality brown hair color for vibrant, rich, and long-lasting results.',
    image: '/belo-color-brown-0.png',
    images: [
      '/belo-color-brown-0.png',
      '/balo-color-brown-1.png',
      '/balo-color-brown-2.png',
      '/balo-color-brown-3.png'
    ],
    features: [
      'Rich brown tone',
      'Long-lasting color',
      'Natural ingredients'
    ]
  },
  {
    id: '2',
    name: 'Grace Color',
    category: 'Cosmetics & Personal Care',
    description: 'Premium hair coloring solution with excellent coverage.',
    image: '/grace-color-0.png',
    images: [
      '/grace-color-0.png',
      '/grace-color-2.png',
      '/grace-color-1.jpg',
      '/grace-color-3.png'
    ],
    features: ['Premium quality', 'Excellent coverage', 'Hair-friendly formula']
  },
   {
    id: '51',
    name: 'Grace Color – Brown',
    category: 'Cosmetics & Personal Care',
    description: 'Premium brown hair coloring solution with excellent coverage and a natural finish.',
    image: '/grace-color-brown-1.png',
    images: [
      '/grace-color-brown-1.png',
      '/grace-color-brown-2.png',
      '/grace-color-brown-3.png'
    ],
    features: [
      'Rich brown shade',
      'Excellent coverage',
      'Hair-friendly formula'
    ]
  },
  {
    id: '3',
    name: 'Veloria Facial',
    category: 'Cosmetics & Personal Care',
    description: 'Gentle facial cream for smooth and radiant skin.',
    image: '/veloria-facial-2.png',
    images: [
      '/veloria-facial-2.png',
      '/veloria-facial-1.jpg',
      '/veloria-facial-3.png'
    ],
    features: ['Gentle formula', 'Radiant skin', 'Moisturizing effect']
  },
  {
    id: '41',
    name: 'Grace Bleach',
    category: 'Cosmetics & Personal Care',
    description: 'Gentle skin bleach that lightens facial hair and evens skin tone.',
    image: '/grace-bleach-1.png',
    images: [
      '/grace-bleach-1.png',
      '/grace-bleach-2.png',
      '/grace-bleach-3.png'
    ],
    features: [
      'Mild formula for sensitive skin',
      'Instant glow',
      'Easy to use'
    ]
  },
  {
    id: '42',
    name: 'Veloria Skin Polish',
    category: 'Cosmetics & Personal Care',
    description: 'Exfoliating polish for removing dead skin and giving a smooth, radiant look.',
    image: '/veloria-skin-polish-1.png',
    images: [
      '/veloria-skin-polish-1.png',
      '/veloria-skin-polish-2.png',
      '/veloria-skin-polish-3.png'
    ],
    features: [
      'Deep exfoliation',
      'Brightens skin',
      'Suitable for all skin types'
    ]
  },
  {
    id: '43',
    name: 'Veloria Remover',
    category: 'Cosmetics & Personal Care',
    description: 'Effective cream-based hair remover for smooth and soft skin.',
    image: '/veloria-remover-1.png',
    images: [
      '/veloria-remover-1.png',
      '/veloria-remover-2.png',
      '/veloria-remover-3.png'
    ],
    features: [
      'Quick and painless',
      'Removes fine hair',
      'Leaves skin moisturized'
    ]
  },
  {
    id: '44',
    name: 'Veloria Bleach',
    category: 'Cosmetics & Personal Care',
    description: 'Herbal bleach that lightens dark facial hair and gives fairer skin.',
    image: '/veloria-bleach-1.png',
    images: [
      '/veloria-bleach-1.png',
      '/veloria-bleach-2.png',
      '/veloria-bleach-3.png'
    ],
    features: [
      'Herbal ingredients',
      'Fast results',
      'No skin irritation'
    ]
  },
  {
    id: '45',
    name: 'Hit Lotion',
    category: 'Cosmetics & Personal Care',
    description: 'Anti-mosquito lotion with long-lasting protection and a fragrant, silky formula.',
    image: '/hit-lotion-0.png',
    images: [
      '/hit-lotion-0.png',
      '/hit-anti-mosquito-lotion-1.jpg',
      '/hit-anti-mosquito-lotion-2.png'
    ],
    features: [
      'Soft and fragrant',
      'Contains Vitamin E & Lavender',
      'Long-lasting protection'
    ]
  },
  {
    id: '46',
    name: 'Neat Remover',
    category: 'Cosmetics & Personal Care',
    description: 'Cream remover for unwanted body hair with a smooth, quick-action formula.',
    image: '/neat-remover-1.png',
    images: [
      '/neat-remover-1.png',
      '/neat-remover-2.png',
      '/neat-remover-3.png'
    ],
    features: [
      'Easy to apply',
      'Works in minutes',
      'Smooth skin after use'
    ]
  },
 
  {
    id: '53',
    name: 'Neat Bleach',
    category: 'Cosmetics & Personal Care',
    description: 'Gentle bleach for lightening facial hair and brightening skin tone.',
    image: '/neat-bleach-1.png',
    images: [
      '/neat-bleach-1.png',
      '/neat-bleach-2.png',
      '/neat-bleach-3.png',
      '/neat-bleach-4.png'
    ],
    features: [
      'Gentle on skin',
      'Brightens complexion',
      'Easy application'
    ]
  },

 
 

  // Razors
  {
    id: '4',
    name: 'Sharp Ultra Razor',
    category: 'Razors',
    description: 'Professional-grade razor for precise and comfortable shaving.',
    image: '/sharp-razor-1.jpg',
    images: [
      '/sharp-razor-1.jpg',
      '/sharp-razor-2.png',
      '/sharp-razor-3.png'
    ],
    features: ['Sharp blade', 'Comfortable grip', 'Precise cutting']
  },
  {
    id: '5',
    name: 'Ujala Razor',
    category: 'Razors',
    description: 'Reliable razor for everyday grooming needs.',
    image: '/ujala-razor-1.jpg',
    images: [
      '/ujala-razor-1.jpg',
      '/ujala-razor-2.jpg',
      '/ujala-razor-3.png'
    ],
    features: ['Reliable quality', 'Everyday use', 'Affordable price']
  },
  {
    id: '52',
    name: 'Turk Razor',
    category: 'Razors',
    description: 'High-quality razor for smooth and precise shaving experience.',
    image: '/turk-razor-1.png',
    images: [
      '/turk-razor-1.png',
      '/turk-razor-2.png',
      '/turk-razor-3.png'
    ],
    features: [
      'Sharp and durable blade',
      'Comfortable grip',
      'Suitable for all skin types'
    ]
  },
    {
    id: '54',
    name: 'Sharp Hygiene Razor',
    category: 'Razors',
    description: 'Hygienic razor designed for safe and comfortable shaving.',
    image: '/sharp-hygiene-razor-1.png',
    images: [
      '/sharp-hygiene-razor-1.png',
      '/sharp-hygiene-razor-2.png',
      '/sharp-hygiene-razor-3.png',
      '/sharp-hygiene-razor-4.png'
       
    ],
    features: [
      'Hygienic design',
      'Safe for sensitive skin',
      'Comfortable grip'
    ]
  },
  {
    id: '55',
    name: 'Sharp Paki Razor',
    category: 'Razors',
    description: 'Traditional Paki razor for precise and smooth shaving.',
    image: '/sharp-paki-razor-1.png',
    images: [
      '/sharp-paki-razor-1.png',
      '/sharp-paki-razor-2.png',
      '/sharp-paki-razor-3.png'
    ],
    features: [
      'Traditional style',
      'Precise shaving',
      'Durable blade'
    ]
  },

  // Toothbrush
  {
    id: '6',
    name: 'Mr Clean Toothbrush',
    category: 'Toothbrush',
    description: 'High-quality toothbrush for optimal oral hygiene.',
    image: '/mister-clean-toothbrush-1.jpg',
    images: [
      '/mister-clean-toothbrush-1.jpg',
      '/mister-clean-toothbrush-2.jpg',
      '/mister-clean-toothbrush-3.png'
    ],
    features: ['Soft bristles', 'Ergonomic handle', 'Effective cleaning']
  },

  // Agarbatti (Incense Sticks)
  {
    id: '7',
    name: 'Mahfil Milan',
    category: 'Agarbatti (Incense Sticks)',
    description: 'Premium incense sticks with enchanting fragrance.',
    image: '/mahfil-milan-1.jpg',
    images: [
      '/mahfil-milan-1.jpg',
      '/mahfil-milan-1.jpg',
      '/mahfil-milan-2.png'
    ],
    features: ['Premium quality', 'Long-lasting fragrance', 'Natural ingredients']
  },
  {
    id: '14',
    name: 'Mahfil Milan (Extra)',
    category: 'Agarbatti (Incense Sticks)',
    description: 'Another batch of premium incense sticks with enchanting fragrance.',
    image: '/mehfil-millan-extra-1.png',
    images: [
      '/mehfil-millan-extra-1.png',
      '/mehfil-millan-extra-2.jpg',
      '/mehfil-millan-extra-3.png'
    ],
    features: ['Same premium quality', 'Great for bulk purchase']
  },
  {
    id: '8',
    name: 'Golden Milan',
    category: 'Agarbatti (Incense Sticks)',
    description: 'Luxurious incense sticks for a calming atmosphere.',
    image: '/golden-milan-2.png',
    images: [
      '/golden-milan-2.png',
      '/golden-milan-1.jpg',
      '/golden-milan-3.png'
    ],
    features: ['Luxurious fragrance', 'Calming effect', 'High-quality materials']
  },

  // Natural / Herbal Products
  {
    id: '9',
    name: 'Natural ISP',
    category: 'Natural / Herbal Products',
    description: 'Natural herbal supplement for health and wellness.',
    image: '/natural-isp-1.jpg',
    images: [
      '/natural-isp-1.jpg'
    ],
    features: ['Natural ingredients', 'Health benefits', 'Traditional formula']
  },
  {
    id: '10',
    name: 'Natural Joshanda',
    category: 'Natural / Herbal Products',
    description: 'Traditional herbal remedy for respiratory wellness.',
    image: '/jor-joshanda-1.jpg',
    images: [
      '/jor-joshanda-1.jpg',
      '/jor-joshanda-2.jpg',
      '/jor-joshanda-3.png'
    ],
    features: ['Traditional remedy', 'Natural herbs', 'Respiratory support']
  },
    {
    id: '57',
    name: 'Punjabi Ispagol',
    category: 'Natural / Herbal Products',
    description: 'High-quality ispagol (psyllium husk) for digestive health.',
    image: '/natural-isp-2.jpg',
    images: [
      '/natural-isp-2.jpg'
    ],
    features: [
      'Supports digestion',
      'Natural fiber',
      'Easy to use'
    ]
  },

  // Adhesive Tape
  {
    id: '11',
    name: 'Lemon Adhesive Tape',
    category: 'Adhesive Tape',
    description: 'High-quality adhesive tape for various applications.',
    image: '/lemn-adhesive-tape-1.jpg',
    images: [
      '/lemn-adhesive-tape-1.jpg',
      '/lemon-adhesive-tape-2.jpg',
      DefaultProductPlaceholder
    ],
    features: ['Strong adhesion', 'Versatile use', 'Durable material']
  },
  {
    id: '15',
    name: 'Dark Red Adhesive Tape',
    category: 'Adhesive Tape',
    description: 'Strong adhesive tape in a dark red color.',
    image: '/dark-red-tape-1.jpg',
    images: [
      '/dark-red-tape-1.jpg',
      DefaultProductPlaceholder,
      DefaultProductPlaceholder
    ],
    features: ['High strength', 'Vibrant color', 'Reliable bond']
  },
  {
    id: '16',
    name: 'Brown Adhesive Tape',
    category: 'Adhesive Tape',
    description: 'Standard brown packaging tape for secure sealing.',
    image: '/brown-tape-1.jpg',
    images: [
      '/brown-tape-1.jpg',
      DefaultProductPlaceholder,
      DefaultProductPlaceholder
    ],
    features: ['Strong hold', 'Packaging use', 'Durable']
  },
  {
    id: '17',
    name: 'Super Yellowish Adhesive Tape',
    category: 'Adhesive Tape',
    description: 'Highly visible yellowish tape for marking and sealing.',
    image: '/super-yellowish-tape-1.jpg',
    images: [
      '/super-yellowish-tape-1.jpg',
      DefaultProductPlaceholder,
      DefaultProductPlaceholder
    ],
    features: ['High visibility', 'Strong adhesion', 'Multi-purpose']
  },
  {
    id: '18',
    name: 'Masking Tape',
    category: 'Adhesive Tape',
    description: 'Crepe paper masking tape for painting and general purpose use.',
    image: '/masking-tape-1.jpg',
    images: [
      '/masking-tape-1.jpg',
      DefaultProductPlaceholder,
      DefaultProductPlaceholder
    ],
    features: ['Clean removal', 'Paint masking', 'Easy tear']
  },
  {
    id: '19',
    name: 'Transparent Tape',
    category: 'Adhesive Tape',
    description: 'Clear adhesive tape for invisible mending and sealing.',
    image: '/transparent-tape-1.jpg',
    images: [
      '/transparent-tape-1.jpg',
      DefaultProductPlaceholder,
      DefaultProductPlaceholder
    ],
    features: ['Invisible finish', 'Strong bond', 'Versatile']
  },

  // PVC Tape
  {
    id: '20',
    name: 'Hit Tape',
    category: 'PVC Tape',
    description: 'Durable PVC electrical insulation tape.',
    image: '/hit-tape-2.png',
    images: [
      '/hit-tape-2.png',
      '/hit-tape-1.jpg',
      '/hit-tape-3.png'
    ],
    features: ['Electrical insulation', 'Strong adhesion', 'Weather resistant']
  },
  {
    id: '21',
    name: 'Snake Tape',
    category: 'PVC Tape',
    description: 'High-quality PVC tape with strong adhesive properties.',
    image: '/snake-tape-1.jpg',
    images: [
      '/snake-tape-1.jpg',
      '/snake-tape-2.png',
      '/snake-tape-3.png'
    ],
    features: ['High adhesion', 'Flexible', 'Durable']
  },
  {
    id: '22',
    name: 'Gold Tape',
    category: 'PVC Tape',
    description: 'Premium gold-colored PVC tape for various applications.',
    image: '/gold-tape-1.jpg',
    images: [
      '/gold-tape-1.jpg',
      '/gold-tape-2.png',
      '/gold-tape-3.png'
    ],
    features: ['Premium look', 'Strong bond', 'Versatile']
  },

  // Stationery
  {
    id: '23',
    name: 'Lead Pencil',
    category: 'Stationery',
    description: 'High-quality graphite pencil for writing and drawing.',
    image: '/lead-pencil-1.jpg',
    images: [
      '/lead-pencil-1.jpg',
      '/lead-pencil-2.png'
    ],
    features: ['Smooth writing', 'Durable lead', 'Comfortable grip']
  },
  {
    id: '24',
    name: 'Sonex Color Pencil',
    category: 'Stationery',
    description: 'Vibrant color pencils for creative artwork.',
    image: '/color-pencil-1.png',
    images: [
      '/color-pencil-1.png',
      '/sonex-2.png',
      '/sonex-3.png'
    ],
    features: ['Bright colors', 'Smooth blending', 'Non-toxic']
  },
  {
    id: '56',
    name: 'Good Colored Pencil',
    category: 'Stationery',
    description: 'Color pencils for creative artwork, perfect for artists and students.',
    image: '/color-pencil-2.png',
    images: [
      '/color-pencil-2.png',
      '/color-pencil-3.png',
      '/good-3.png'
    ],
    features: ['Good Pigmentation', 'Smooth blending', 'Non-toxic']
  },

  // Stationery Tapes
  {
    id: '26',
    name: '333 Tape',
    category: 'Stationery Tapes',
    description: 'General purpose stationery tape with good adhesion.',
    image: 'https://placehold.co/400x400/6A5ACD/FFFFFF?text=333+Tape',
    images: [
      'https://placehold.co/400x400/6A5ACD/FFFFFF?text=333+Tape',
      DefaultProductPlaceholder,
      DefaultProductPlaceholder
    ],
    features: ['Clear finish', 'Strong bond', 'Easy to use']
  },
  {
    id: '27',
    name: '555 Tape',
    category: 'Stationery Tapes',
    description: 'Strong adhesive tape for office and school use.',
    image: 'https://placehold.co/400x400/DA70D6/FFFFFF?text=555+Tape',
    images: [
      'https://placehold.co/400x400/DA70D6/FFFFFF?text=555+Tape',
      DefaultProductPlaceholder,
      DefaultProductPlaceholder
    ],
    features: ['Reliable adhesion', 'Versatile', 'Durable']
  },
  {
    id: '28',
    name: '777 Tape',
    category: 'Stationery Tapes',
    description: 'High-performance stationery tape for demanding tasks.',
    image: 'https://placehold.co/400x400/FF69B4/FFFFFF?text=777+Tape',
    images: [
      'https://placehold.co/400x400/FF69B4/FFFFFF?text=777+Tape',
      DefaultProductPlaceholder,
      DefaultProductPlaceholder
    ],
    features: ['Extra strong', 'Long-lasting', 'Heavy-duty']
  },
  {
    id: '29',
    name: '888 Tape',
    category: 'Stationery Tapes',
    description: 'Economical stationery tape for everyday needs.',
    image: 'https://placehold.co/400x400/BA55D3/FFFFFF?text=888+Tape',
    images: [
      'https://placehold.co/400x400/BA55D3/FFFFFF?text=888+Tape',
      DefaultProductPlaceholder,
      DefaultProductPlaceholder
    ],
    features: ['Cost-effective', 'Good adhesion', 'General use']
  },
  {
    id: '30',
    name: '999 Tape',
    category: 'Stationery Tapes',
    description: 'Premium clear tape for professional applications.',
    image: 'https://placehold.co/400x400/9370DB/FFFFFF?text=999+Tape',
    images: [
      'https://placehold.co/400x400/9370DB/FFFFFF?text=999+Tape',
      DefaultProductPlaceholder,
      DefaultProductPlaceholder
    ],
    features: ['Crystal clear', 'Strong hold', 'Invisible finish']
  },
  {
    id: '31',
    name: '1000 Tape',
    category: 'Stationery Tapes',
    description: 'Bulk stationery tape for high-volume usage.',
    image: 'https://placehold.co/400x400/8A2BE2/FFFFFF?text=1000+Tape',
    images: [
      'https://placehold.co/400x400/8A2BE2/FFFFFF?text=1000+Tape',
      DefaultProductPlaceholder,
      DefaultProductPlaceholder
    ],
    features: ['Large roll', 'Economical', 'Reliable']
  },
  {
    id: '32',
    name: '2000 Tape',
    category: 'Stationery Tapes',
    description: 'Extra strong stationery tape for heavy-duty applications.',
    image: 'https://placehold.co/400x400/4B0082/FFFFFF?text=2000+Tape',
    images: [
      'https://placehold.co/400x400/4B0082/FFFFFF?text=2000+Tape',
      DefaultProductPlaceholder,
      DefaultProductPlaceholder
    ],
    features: ['Super strong', 'Industrial grade', 'Long-lasting']
  },
  {
    id: '33',
    name: '3000 Tape',
    category: 'Stationery Tapes',
    description: 'Specialty tape for unique stationery and craft needs.',
    image: 'https://placehold.co/400x400/800080/FFFFFF?text=3000+Tape',
    images: [
      'https://placehold.co/400x400/800080/FFFFFF?text=3000+Tape',
      DefaultProductPlaceholder,
      DefaultProductPlaceholder
    ],
    features: ['Special adhesive', 'Unique application', 'High quality']
  },

  // Baby Products (Soothers)
  {
    id: '12',
    name: 'Silicon Nipple',
    category: 'Baby Products (Soothers)',
    description: 'Safe and comfortable silicon soother for babies.',
    image: '/silicon-nipple-1.jpg',
    images: [
      '/silicon-nipple-1.jpg',
      '/silicon-nipple-3.png',
      '/silicon-nipple-4.png'
    ],
    features: ['Food-grade silicon', 'Comfortable design', 'Easy to clean']
  },
  {
    id: '34',
    name: 'Camera Nipple',
    category: 'Baby Products (Soothers)',
    description: 'Innovative soother designed for easy monitoring and comfort.',
    image: '/camera-nipple-1.jpg',
    images: [
      '/camera-nipple-1.jpg',
      '/camera-nipple-2.png',
      '/camera-nipple-3.png'
    ],
    features: ['Unique design', 'Comfortable', 'Safe material']
  },

  // Cleaning Products
  {
    id: '35',
    name: 'Grace Bright (Green)',
    category: 'Cleaning Products',
    description: 'Powerful cleaning solution for sparkling surfaces.',
    image: '/grace-bright-1.jpg',
    images: [
      '/grace-bright-1.jpg',
      '/grace-bright-2.png'
    ],
    features: ['Streak-free clean', 'Fast-acting', 'Fresh scent']
  },
   {
    id: '80',
    name: 'Grace Bright (Black)',
    category: 'Cleaning Products',
    description: 'Powerful cleaning solution for sparkling surfaces.',
    image: '/grace-bright-3.png',
    images: [
      '/grace-bright-3.png',
      '/grace-bright-4.png'
      
      
    ],
    features: ['Streak-free clean', 'Fast-acting', 'Fresh scent']
  },
  {
    id: '36',
    name: 'Shine X Scourer',
    category: 'Cleaning Products',
    description: 'Heavy-duty scourer for tough grime and stains.',
    image: '/shine-x-scourer-1.jpg',
    images: [
      '/shine-x-scourer-1.jpg',
      '/shine-x-scourer-4.png',
      '/shine-x-scourer-5.png'

      
    ],
    features: ['Removes tough stains', 'Durable', 'Easy to grip']
  },
  {
   id: '58',
    name: 'Shine X Scourer',
    category: 'Cleaning Products',
    description: 'Heavy-duty scourer for tough grime and stains.',
    image: '/shine-x-scourer-2.png',
    images: [
      '/shine-x-scourer-2.png',
      '/shine-x-scourer-6.png',
      '/shine-x-scourer-7.png'
    ],
    features: ['Removes tough stains', 'Durable', 'Easy to grip']
  },
  {
   id: '59',
    name: 'Shine X Scourer',
    category: 'Cleaning Products',
    description: 'Heavy-duty scourer for tough grime and stains.',
    image: '/shine-x-scourer-3.png',
    images: [
      '/shine-x-scourer-3.png',
      '/shine-x-scourer-8.png'
    ],
    features: ['Removes tough stains', 'Durable', 'Easy to grip']
  },
  {
    id: '37',
    name: 'Tissue',
    category: 'Cleaning Products',
    description: 'Soft and absorbent tissues for everyday cleaning needs.',
    image: '/tissue-1.jpg',
    images: [
      '/tissue-1.jpg',
      '/tissue-2.png',
      '/tissue-3.png'
    ],
    features: ['Soft', 'Absorbent', 'Convenient']
  },

  // Pest Control
  {
    id: '38',
    name: 'Rat Book (Mouse/Rat Catcher)',
    category: 'Pest Control',
    description: 'Effective and humane trap for catching mice and rats.',
    image: '/rat-book-1.jpg',
    images: [
      '/rat-book-1.jpg',
      '/rat-book-2.png',
      '/rat-book-3.png'
    ],
    features: ['Non-toxic', 'Reusable', 'Easy to set']
  },

  // Craft Supplies
  {
    id: '47',
    name: 'Turk Elfi',
    category: 'Craft Supplies',
    description: 'Premium quality elfi adhesive used for crafts, nails, or multipurpose cosmetic use.',
    image: '/turk-elfi-1.png',
    images: [
      '/turk-elfi-1.png',
      '/turk-elfi-2.png'
    ],
    features: [
      'Strong hold',
      'Quick drying',
      'Multipurpose use'
    ]
  },
  {
    id: '48',
    name: 'Turk Glue 20 Gram',
    category: 'Craft Supplies',
    description: 'Compact 20g Turk glue suitable for precise application in arts, crafts, or beauty.',
    image: '/turk-glue-20g-1.jpg',
    images: [
      '/turk-glue-20g-1.jpg',
      '/turk-glue-20g-2.png'
    ],
    features: [
      '20g tube',
      'Easy to apply',
      'Strong and fast bonding'
    ]
  },
  {
    id: '49',
    name: 'Turk Glue 50 Gram',
    category: 'Craft Supplies',
    description: 'Larger 50g Turk glue ideal for extended use in crafting and professional projects.',
    image: '/turk-glue-50g-1.png',
    images: [
      '/turk-glue-50g-1.png',
      '/turk-glue-50g-2.png'
    ],
    features: [
      '50g capacity',
      'Ideal for large projects',
      'Durable, strong hold'
    ]
  }
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Always clear localStorage and reload initialProducts on every reload (for development)
    localStorage.removeItem('products_data');
    setProducts(initialProducts);
    setIsLoading(false);
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('products_data', JSON.stringify({ products: newProducts }));
  };

  const categories = [
    'Cosmetics & Personal Care',
    'Razors',
    'Toothbrush',
    'Agarbatti (Incense Sticks)',
    'Natural / Herbal Products',
    'Adhesive Tape',
    'PVC Tape',
    'Stationery',
    'Stationery Tapes',
    'Baby Products (Soothers)',
    'Cleaning Products',
    'Pest Control',
    'Craft Supplies'
  ];

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      images: product.images && product.images.length > 0 ? product.images : [product.image]
    };
    const newProducts = [...products, newProduct];
    saveProducts(newProducts);
  };

  const clearProductsData = () => {
  localStorage.removeItem('products_data');
  setProducts(initialProducts);
};

  const updateProduct = (id: string, updatedProduct: Omit<Product, 'id'>) => {
    const newProducts = products.map(product =>
      product.id === id ? { ...updatedProduct, id, images: updatedProduct.images || [updatedProduct.image] } : product
    );
    saveProducts(newProducts);
  };

  const deleteProduct = (id: string) => {
    const newProducts = products.filter(product => product.id !== id);
    saveProducts(newProducts);
  };

  const getProduct = (id: string) => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  return (
    <ProductContext.Provider value={{
      products,
      isLoading,
      categories,
      addProduct,
      updateProduct,
      deleteProduct,
      getProduct,
      getProductsByCategory,
      clearProductsData
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};