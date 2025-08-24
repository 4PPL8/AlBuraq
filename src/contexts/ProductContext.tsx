// src/contexts/ProductContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// --- Generic placeholder for when NO image is provided (e.g., if admin adds a product without an image) ---
const DefaultProductPlaceholder = 'https://placehold.co/400x400/CCCCCC/000000?text=No+Image';


export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  packaging?: string;
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
    packaging: '24PCS PER BOX • 18BOXES PER CTN',
    description: 'Hair coloring can offer numerous benefits, including a renewed sense of confidence, enhanced appearance, and the ability to express oneself. It can also add shine and volume to hair, while also helping to cover grays and make hair appear thicker.',
    image: '/balo-color-1.jpg',
    images: [
      '/balo-color-1.jpg',
      '/balo-color-3.png',
      '/balo-color-2.png'
    ],
    features: ['Long-lasting color', 'Natural ingredients', 'Easy application']
  },
   {
    id: '2',
    name: 'Belo Color (Brown)',
    category: 'Cosmetics & Personal Care',
     packaging: '24PCS PER BOX • 18BOXES PER CTN',
    description: 'Hair coloring can offer numerous benefits, including a renewed sense of confidence, enhanced appearance, and the ability to express oneself. It can also add shine and volume to hair, while also helping to cover grays and make hair appear thicker.',
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
    id: '3',
    name: 'Grace Color',
    category: 'Cosmetics & Personal Care',
    packaging: '12PCS PER BOX • 24BOXES PER CTN',
    description: 'Hair cream color offers several benefits, including precise application for targeted coloring, long-lasting results, and the ability to nourish and hydrate the hair.',
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
    id: '4',
    name: 'Grace Color – Brown',
    category: 'Cosmetics & Personal Care',
    packaging: '12PCS PER BOX • 24BOXES PER CTN',
    description: 'Hair cream color offers several benefits, including precise application for targeted coloring, long-lasting results, and the ability to nourish and hydrate the hair.',
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
    id: '5',
    name: 'Veloria Facial',
    category: 'Cosmetics & Personal Care',
    packaging: '24PCS PER BOX • 16BOXES PER CTN',
    description: 'A "rice whitening urgent facial" refers to a quick skin care treatment that uses rice as a primary ingredient to brighten and even out skin tone.',
    image: '/veloria-facial-2.png',
    images: [
      '/veloria-facial-2.png',
      '/veloria-facial-1.jpg',
      '/veloria-facial-3.png'
    ],
    features: ['Gentle formula', 'Radiant skin', 'Moisturizing effect']
  },
  {
    id: '6',
    name: 'Grace Bleach',
    category: 'Cosmetics & Personal Care',
    packaging: '24PCS PER BOX • 16BOXES PER CTN',
    description: 'Often used for skin brightening and hair lightening, offers benefits like removing dark spots, brightening skin, and reducing the appearance of facial hair.',
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
    id: '7',
    name: 'Veloria Skin Polish',
    category: 'Cosmetics & Personal Care',
    packaging: '24PCS PER BOX • 16BOXES PER CTN',
    description: 'Rice whitening skin polish typically comes in a set, often including a bleach powder and a developer. The bleach powder is typically a dust-free formulation and the developer is a solution, sometimes a 20 Vol 6% developer. For all skin types.',
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
    id: '8',
    name: 'Veloria Remover',
    category: 'Cosmetics & Personal Care',
    packaging: '36PCS PER BOX • 16BOXES PER CTN',
    description: 'Hair removal creams offer a quick, painless, and easy way to remove hair, potentially leaving skin smoother and stubble-free for longer than shaving.',
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
    id: '9',
    name: 'Veloria Bleach',
    category: 'Cosmetics & Personal Care',
    packaging: '24PCS PER BOX • 16BOXES PER CTN',
    description: 'It can also help to even out skin texture and minimize the appearance of acne scars. Additionally, bleach cream can be a more affordable and non-invasive option compared to other skin-lightening treatments.',
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
    id: '10',
    name: 'Hit Lotion',
    category: 'Cosmetics & Personal Care',
    packaging: '30PCS PER BOX • 50BOXES PER CTN',
    description: 'They often contain moisturizing ingredients and may also include essential oils or plant extracts for fragrance and added repellent effects. Specifications can vary, but generally, effective mosquito lotions provide long-lasting protection (up to 8 hours or more).',
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
    id: '11',
    name: 'Neat Remover',
    category: 'Cosmetics & Personal Care',
    packaging: '36PCS PER BOX • 18BOXES PER CTN',
    description: 'They often contain moisturizers, fragrances, and anti-irritants to enhance the user experience. Ingredients are carefully balanced to ensure both effective hair removal and skin safety.',
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
    id: '12',
    name: 'Neat Bleach',
    category: 'Cosmetics & Personal Care',
    packaging: '24PCS PER BOX • 24BOXES PER CTN',
    description: 'They often contain ingredients like hydroquinone, arbutin, or vitamins, and are available in different sizes and for various skin types, including sensitive skin.',
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
    id: '13',
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
    id: '14',
    name: 'Ujala Razor',
    category: 'Razors',
    packaging: '48PCS PER BOX • 12BOXES PER CTN',
    description: 'A disposable razor is a single-use lightweight shaving tool. It’s convenient for travel and offers a quick shave without maintenance.',
    image: '/ujala-razor-1.jpg',
    images: [
      '/ujala-razor-1.jpg',
      '/ujala-razor-2.jpg',
      '/ujala-razor-3.png'
    ],
    features: ['Reliable quality', 'Everyday use', 'Affordable price']
  },
  {
    id: '15',
    name: 'Turk Razor',
    category: 'Razors',
    packaging: '48PCS PER BOX • 12BOXES PER CTN',
    description: 'A disposable razor is a single-use lightweight shaving tool. It’s convenient for travel and offers a quick shave without maintenance.',
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
    id: '16',
    name: 'Sharp Hygiene Razor',
    category: 'Razors',
    packaging: '48PCS PER BOX • 12BOXES PER CTN',
    description: 'A disposable razor is a single-use lightweight shaving tool. It’s convenient for travel and offers a quick shave without maintenance.',
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
    id: '17',
    name: 'Sharp Paki Razor',
    category: 'Razors',
    packaging: '24PCS PER BOX • 24BOXES PER CTN',
    description: 'A disposable razor is a single-use lightweight shaving tool. It’s convenient for travel and offers a quick shave without maintenance.',
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
    id: '18',
    name: 'Mr Clean Toothbrush',
    category: 'Toothbrush',
    packaging: '12PCS PER BOX • 30BOXES PER CTN',
    description: 'Mr Clean toothbrushes are designed for particular oral health needs, such as sensitive teeth, braces, or post-surgical recovery. They differ from standard toothbrushes in their bristle softness, brush head shape, or handle design to cater to specific requirements.',
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
    id: '19',
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
    id: '20',
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
    id: '21',
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
    id: '22',
    name: 'Natural ISP',
    category: 'Natural / Herbal Products',
    packaging: '24PCS PER PACKET • 36PACKETS PER CTN',
    description: 'Also known as Psyllium Husk, it is a natural fiber supplement made from the husk of the Plantago ovata plant. It\'s often used to address digestive issues like constipation and is available in powder or husk form.',
    image: '/natural-isp-1.jpg',
    images: [
      '/natural-isp-1.jpg'
    ],
    features: ['Natural ingredients', 'Health benefits', 'Traditional formula']
  },
  {
    id: '23',
    name: 'Natural Joshanda',
    category: 'Natural / Herbal Products',
    packaging: '40 SACHETS PER BOX • 60BOXES PER CTN',
    description: 'Traditional herbal remedy for colds, cough, and fever. Prepared by boiling herbs or dissolving sachet in hot water or tea.',
    image: '/jor-joshanda-1.jpg',
    images: [
      '/jor-joshanda-1.jpg',
      '/jor-joshanda-2.jpg',
      '/jor-joshanda-3.png'
    ],
    features: ['Traditional remedy', 'Natural herbs', 'Respiratory support']
  },
    {
    id: '24',
    name: 'Punjabi Ispagol',
    category: 'Natural / Herbal Products',
    packaging: '24PCS PER PACKET • 50PACKETS PER CTN',
    description: 'Helps soften stool and promote regularity, making it useful for treating constipation. It supports the growth of beneficial gut bacteria due to its prebiotic fiber content. It can help with weight loss by promoting fullness and reducing calorie intake.',
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
    id: '25',
    name: 'Lemon Adhesive Tape',
    category: 'Adhesive Tape',
    description: 'High-quality adhesive tape for various applications.',
    image: '/lemn-adhesive-tape-1.jpg',
    images: [
      '/lemn-adhesive-tape-1.jpg'
    ],
    features: ['Strong adhesion', 'Versatile use', 'Durable material']
  },
  {
    id: '26',
    name: 'Dark Red Adhesive Tape',
    category: 'Adhesive Tape',
    description: 'Strong adhesive tape in a dark red color.',
    image: '/dark-red-tape-1.jpg',
    images: [
      '/dark-red-tape-1.jpg'
    ],
    features: ['High strength', 'Vibrant color', 'Reliable bond']
  },
  {
    id: '27',
    name: 'Brown Adhesive Tape',
    category: 'Adhesive Tape',
    packaging: 'Available in all sizes',
    description: 'Versatile adhesive tape for office, home or school use.',
    image: '/brown-tape-1.jpg',
    images: [
      '/brown-tape-1.jpg'
    ],
    features: ['Strong hold', 'Packaging use', 'Durable']
  },
  {
    id: '28',
    name: 'Super Yellowish Adhesive Tape',
    category: 'Adhesive Tape',
    packaging: 'Available in all sizes',
    description: 'Versatile adhesive tape for office, home or school use.',
    image: '/super-yellowish-tape-1.jpg',
    images: [
      '/super-yellowish-tape-1.jpg'
    ],
    features: ['High visibility', 'Strong adhesion', 'Multi-purpose']
  },
  {
    id: '29',
    name: 'Masking Tape',
    category: 'Adhesive Tape',
    packaging: 'Available in all sizes',
    description: 'Versatile adhesive tape for office, home or school use. Multi-purpose masking adhesive.',
    image: '/masking-tape-1.png',
    images: [
      '/masking-tape-1.png'
    ],
    features: ['Clean removal', 'Paint masking', 'Easy tear']
  },
  {
    id: '30',
    name: 'Transparent Tape',
    category: 'Adhesive Tape',
    description: 'Clear adhesive tape for invisible mending and sealing.',
    image: '/transparent-tape-1.jpg',
    images: [
      '/transparent-tape-1.jpg'
    ],
    features: ['Invisible finish', 'Strong bond', 'Versatile']
  },

  // PVC Tape
  {
    id: '31',
    name: 'Hit Tape',
    category: 'PVC Tape',
    packaging: '10PCS PER ROLL • 45ROLL/CTN',
    description: 'Versatile and strong, the go-to choice for all electrical needs, ensuring safe and reliable connection.',
    image: '/hit-tape-2.png',
    images: [
      '/hit-tape-2.png',
      '/hit-tape-1.jpg',
      '/hit-tape-3.png'
    ],
    features: ['Electrical insulation', 'Strong adhesion', 'Weather resistant']
  },
  {
    id: '32',
    name: 'Snake Tape',
    category: 'PVC Tape',
    packaging: '10PCS PER ROLL • 45ROLL/CTN',
    description: 'Versatile and strong, the go-to choice for all electrical needs, ensuring safe and reliable connection.',
    image: '/snake-tape-1.jpg',
    images: [
      '/snake-tape-1.jpg',
      '/snake-tape-2.png',
      '/snake-tape-3.png'
    ],
    features: ['High adhesion', 'Flexible', 'Durable']
  },
  {
    id: '33',
    name: 'Gold Tape',
    category: 'PVC Tape',
    packaging: '10PCS PER ROLL • 45ROLL/CTN',
    description: 'Versatile and strong, the go-to choice for all electrical needs, ensuring safe and reliable connection.',
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
    id: '34',
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
    id: '35',
    name: 'Sonex Color Pencil',
    category: 'Stationery',
    packaging: '12 DOZ PER BOX • 40BOXES PER CTN',
    description: 'High-quality colored pencils with rich pigments, vibrant colors, and good blending capability.',
    image: '/color-pencil-1.png',
    images: [
      '/color-pencil-1.png',
      '/sonex-2.png',
      '/sonex-3.png'
    ],
    features: ['Bright colors', 'Smooth blending', 'Non-toxic']
  },
  {
    id: '36',
    name: 'Good Colored Pencil',
    category: 'Stationery',
    packaging: '12 DOZ PER BOX • 40BOXES PER CTN',
    description: 'High-quality colored pencils with rich pigments, vibrant colors, and good blending capability.',
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
    id: '37',
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
    id: '38',
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
    id: '39',
    name: '777 Tape',
    category: 'Stationery Tapes',
    packaging: '12PCS PER ROLL • 100ROLL/CTN ',
    description: ' Available sizes: 11mm, 12mm • Lengths: 4, 6, 10, 12, 14, 16, 18, 20, 25, 30 Yards.It adheres firmly to various surfaces for secure long-lasting bonds.',
    image: '/777.png',
    images: [
      '/777.png'
    ],
    features: ['Extra strong', 'Long-lasting', 'Heavy-duty']
  },
  {
    id: '40',
    name: '888 Tape',
    category: 'Stationery Tapes',
    description: 'Economical stationery tape for everyday needs.',
    image: '/888.png',
    images: [
      '/888.png'
    ],
    features: ['Cost-effective', 'Good adhesion', 'General use']
  },
  {
    id: '41',
    name: '999 Tape',
    category: 'Stationery Tapes',
    description: 'Premium clear tape for professional applications.',
    image: '/9999.png',
    images: [
      '/9999.png'
    ],
    features: ['Crystal clear', 'Strong hold', 'Invisible finish']
  },
  {
    id: '42',
    name: '1000 Tape',
    category: 'Stationery Tapes',
    description: 'Bulk stationery tape for high-volume usage.',
    image: '/1000.png',
    images: [
      '/1000.png'
    ],
    features: ['Large roll', 'Economical', 'Reliable']
  },
  {
    id: '43',
    name: '2000 Tape',
    category: 'Stationery Tapes',
    description: 'Extra strong stationery tape for heavy-duty applications.',
    image: '/2000.png',
    images: [
      '/2000.png'
    ],
    features: ['Super strong', 'Industrial grade', 'Long-lasting']
  },
  {
    id: '44',
    name: '3000 Tape',
    category: 'Stationery Tapes',
    description: 'Specialty tape for unique stationery and craft needs.',
    image: '/3000.png',
    images: [
      '/3000.png'
    ],
    features: ['Special adhesive', 'Unique application', 'High quality']
  },

  // Baby Products (Soothers)
  {
    id: '45',
    name: 'Silicon Nipple',
    category: 'Baby Products (Soothers)',
    packaging: '24PCS PER BOX • 24BOXES PER CTN',
    description: 'Designed to adjust to baby’s pressure for the right amount of liquid, with micro air vents to prevent collapse. Compatible with Evenflo Classic Bottles.',
    image: '/silicon-nipple-1.jpg',
    images: [
      '/silicon-nipple-1.jpg',
      '/silicon-nipple-3.png',
      '/silicon-nipple-4.png'
    ],
    features: ['Food-grade silicon', 'Comfortable design', 'Easy to clean']
  },
  {
    id: '46',
    name: 'Camera Soother',
    category: 'Baby Products (Soothers)',
    packaging: '12PCS PER BOX • 24BOXES PER CTN',
    description: 'A groundbreaking soother using lights and sounds to comfort babies. Features customizable comfort and “Sync with Sound.”',
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
    id: '47',
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
    id: '48',
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
    id: '49',
    name: 'Shine X Scourer',
    category: 'Cleaning Products',
    packaging: '36PCS PER BOX • 8BOXES PER CTN',
    description: 'A "sparking scourer" refers to a metal scourer, often made of stainless steel, designed for effective cleaning and scrubbing, especially for tough stains and grease. They are known for their ability to remove baked-on food and other stubborn messes.',
    image: '/shine-x-scourer-1.jpg',
    images: [
      '/shine-x-scourer-1.jpg',
      '/shine-x-scourer-4.png',
      '/shine-x-scourer-5.png'

      
    ],
    features: ['Removes tough stains', 'Durable', 'Easy to grip']
  },
  {
   id: '50',
    name: 'Shine X Scourer',
    category: 'Cleaning Products',
    packaging: '36PCS PER BOX • 8BOXES PER CTN',
    description: 'A "sparking scourer" refers to a metal scourer, often made of stainless steel, designed for effective cleaning and scrubbing, especially for tough stains and grease. They are known for their ability to remove baked-on food and other stubborn messes.',
    image: '/shine-x-scourer-2.png',
    images: [
      '/shine-x-scourer-2.png',
      '/shine-x-scourer-6.png',
      '/shine-x-scourer-7.png'
    ],
    features: ['Removes tough stains', 'Durable', 'Easy to grip']
  },
  {
   id: '51',
    name: 'Shine X Scourer',
    category: 'Cleaning Products',
    packaging: '36PCS PER BOX • 8BOXES PER CTN',
    description: 'A "sparking scourer" refers to a metal scourer, often made of stainless steel, designed for effective cleaning and scrubbing, especially for tough stains and grease. They are known for their ability to remove baked-on food and other stubborn messes.',
    image: '/shine-x-scourer-3.png',
    images: [
      '/shine-x-scourer-3.png',
      '/shine-x-scourer-8.png'
    ],
    features: ['Removes tough stains', 'Durable', 'Easy to grip']
  },
  {
    id: '52',
    name: 'Tissue',
    category: 'Cleaning Products',
    packaging: '24PCS PER BOX • 20BOXES PER CTN',
    description: 'Compact mini tissue with high absorption, soft feel, and mild fragrance.',
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
    id: '53',
    name: 'Rat Book (Mouse/Rat Catcher)',
    category: 'Pest Control',
    packaging: '100PCS PER CTN',
    description: 'Strong adhesive, ready to use, safe and sanitary. Non-toxic, reusable, and environmentally friendly.',
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
    id: '54',
    name: 'Turk Glue',
    category: 'Craft Supplies',
    packaging: '1.5 GM – Card: 12PCS PER CARD • 100CARDS/CTN',
    description: 'Turk Super Glue is a high-quality adhesive designed for a wide range of bonding applications. With its fast and reliable bonding capabilities, this super glue provides a strong and durable hold on various materials, including plastics, ceramics, metals, and more. ',
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
    id: '55',
    name: 'Turk Glue 20 Gram',
    category: 'Craft Supplies',
    packaging: '20 GM – Box: 25PCS PER BOX • 12BOXES/CTN',
    description: 'Turk Super Glue is a high-quality adhesive designed for a wide range of bonding applications. With its fast and reliable bonding capabilities, this super glue provides a strong and durable hold on various materials, including plastics, ceramics, metals, and more.',
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
    id: '56',
    name: 'Turk Glue 50 Gram',
    category: 'Craft Supplies',
    packaging: '50 GM – Box: 10PCS PER BOX • 12BOXES/CTN',
    description: 'Turk Super Glue is a high-quality adhesive designed for a wide range of bonding applications. With its fast and reliable bonding capabilities, this super glue provides a strong and durable hold on various materials, including plastics, ceramics, metals, and more. ',
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