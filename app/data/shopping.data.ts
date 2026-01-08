export interface CuratedFind {
  id: string
  title: string
  shortTagline: string
  priceRangeUSD: string
  priceRangeLKR: string
  authenticityChecklist: string[]
  buyWhere: string[]
  avoid?: string[]
  bargainingTip?: string
  iconKey: 'tea' | 'gem' | 'textile' | 'spice' | 'mask' | 'wellness' | 'handicraft'
  image: string
  description: string
  tags: string[]
}

export interface ShoppingDistrict {
  id: string
  name: string
  areaLabel: string
  description: string
  bestFor: string[]
  bargaining: 'expected' | 'fixed'
  safetyTips?: string[]
  approxLatLng: { lat: number; lng: number }
  suggestedDurationMin: number
  image: string
  priceLevel: 'budget' | 'moderate' | 'premium'
  tags: string[]
}

export interface ShoppingGuides {
  authenticExperience: string[]
  touristTraps: string[]
  bargainingTips: string[]
  dutyFreeInfo: string[]
}

export interface VATRefund {
  eligible: string[]
  threshold: number
  percent: number
  processSteps: string[]
  excludedItems: string[]
}

export interface WarningDetail {
  icon?: string
  text: string
}

export interface ShoppingWarning {
  id: string
  title: string
  description: string
  icon: string
  severity: 'high' | 'medium' | 'low'
  details?: WarningDetail[]
  contexts: ('gems' | 'pettah' | 'tourist-traps' | 'spices')[]
}

// Shopping Scam Warnings
export const shoppingWarnings: ShoppingWarning[] = [
  {
    id: 'tuktuk-gem-scam',
    title: 'Tuk-Tuk Commission Gem Shop Scam',
    description: 'Driver takes you to gem shops where they earn 40-60% commission on anything you buy.',
    icon: 'local_taxi',
    severity: 'high',
    contexts: ['gems', 'tourist-traps'],
    details: [
      { icon: 'warning', text: 'Driver insists "my friend has best gem shop" or "government certified store"' },
      { icon: 'warning', text: 'Prices are inflated 5-10x to cover driver commissions' },
      { icon: 'warning', text: 'High-pressure sales tactics and fake "closing soon" urgency' },
      { icon: 'check_circle', text: 'Solution: Visit gems.gov.lk certified dealers independently' },
      { icon: 'check_circle', text: 'Refuse tuk-tuk "recommendations" - research shops beforehand' }
    ]
  },
  {
    id: 'fake-certificates',
    title: 'Fake Certificates & Stone Swapping',
    description: 'Fraudulent gem certificates and switching real stones with glass/synthetic after payment.',
    icon: 'content_copy',
    severity: 'high',
    contexts: ['gems', 'tourist-traps'],
    details: [
      { icon: 'warning', text: 'Certificate looks official but is printed on home printer' },
      { icon: 'warning', text: 'Stone is swapped during "final polishing" or "gift wrapping"' },
      { icon: 'warning', text: 'Lab address on certificate doesn\'t exist or is fake' },
      { icon: 'check_circle', text: 'Only accept certificates from National Gem & Jewellery Authority' },
      { icon: 'check_circle', text: 'Never let stone out of your sight after selection' },
      { icon: 'check_circle', text: 'Get independent appraisal before leaving Sri Lanka' }
    ]
  },
  {
    id: 'spice-garden-pricing',
    title: 'Spice Garden Inflated Pricing',
    description: 'Tourist-focused spice gardens charge 3-5x normal prices for the same products.',
    icon: 'yard',
    severity: 'medium',
    contexts: ['spices', 'tourist-traps'],
    details: [
      { icon: 'warning', text: 'Free tour leads to high-pressure sales pitch in gift shop' },
      { icon: 'warning', text: 'Small packets of spices cost $20-50 vs $5-10 in local markets' },
      { icon: 'warning', text: 'Products claim medicinal benefits with no scientific backing' },
      { icon: 'check_circle', text: 'Buy spices at local markets (Pettah) or supermarkets (Odel, Laksala)' },
      { icon: 'check_circle', text: 'Politely decline purchases if you visited for educational tour' }
    ]
  },
  {
    id: 'pickpocket-crowded-markets',
    title: 'Pickpocket Risk in Crowded Markets',
    description: 'Thieves target distracted tourists in busy market areas like Pettah.',
    icon: 'do_not_touch',
    severity: 'medium',
    contexts: ['pettah', 'tourist-traps'],
    details: [
      { icon: 'warning', text: 'Crowded narrow alleys create perfect pickpocket conditions' },
      { icon: 'warning', text: 'Distraction techniques: someone bumps you while another steals' },
      { icon: 'warning', text: 'Open bags and back pockets are easy targets' },
      { icon: 'check_circle', text: 'Use front-facing crossbody bag with zipper' },
      { icon: 'check_circle', text: 'Keep valuables in front pockets or money belt' },
      { icon: 'check_circle', text: 'Stay alert - avoid using phone while walking through crowds' }
    ]
  }
]

export const curatedFinds: CuratedFind[] = [
  {
    id: 'ceylon-tea',
    title: 'Ceylon Tea',
    shortTagline: 'World-renowned aroma with Lion Logo certification',
    priceRangeUSD: '$5-20',
    priceRangeLKR: 'Rs. 1,650-6,600',
    authenticityChecklist: [
      'Look for the Lion Logo - Sri Lanka Tea Board certification',
      'Check for "100% Pure Ceylon Tea" label',
      'Vacuum-packed for freshness',
      'Buy from tea estates or branded shops'
    ],
    buyWhere: [
      'Tea estates in Nuwara Eliya',
      'Laksala outlets (fixed prices)',
      'Odel stores',
      'Supermarkets (best prices)',
      'Dilmah or Mlesna branded shops'
    ],
    avoid: [
      'Airport shops charge premium prices',
      'Avoid unlabeled or loose tea without Lion Logo'
    ],
    iconKey: 'tea',
    image: '/images/downloaded_be46d60c414a.avif',
    description: 'Sri Lanka\'s tea is world-famous, dating back to British rule in the early 1800s. Top varieties include Nuwara Eliya Pekoe, Uva and Ruhuna blends. Mid-range tea packs usually cost $5-10, while premium gift tins run $12-20.',
    tags: ['tea', 'beverage', 'souvenir', 'authentic', 'certified', 'vat-refund']
  },
  {
    id: 'blue-sapphires',
    title: 'Blue Sapphires',
    shortTagline: 'Certified gemstones from the Pearl of the Indian Ocean',
    priceRangeUSD: '$200-5000+',
    priceRangeLKR: 'Rs. 66,000-1.6M+',
    authenticityChecklist: [
      'Demand gem certificate from NGJA, GIA, or IGI',
      'Verify certificate online before leaving Sri Lanka',
      'Real certificates have watermarked paper and unique numbering',
      'Buy from licensed dealers recognized by National Gem and Jewelry Authority'
    ],
    buyWhere: [
      'Licensed dealers in Colombo',
      'Ratnapura (City of Gems) - Colombo Road area',
      'Colombo Jewellery Stores',
      'Gem Museum showrooms'
    ],
    avoid: [
      'Avoid ANY shop recommended by tuk-tuk drivers (commission scams)',
      '90% of street gem offers are complete scams',
      'Heat-treated stones look real but are worth 10x less',
      'Colored glass sold as sapphires',
      'Fake certificates with no online verification'
    ],
    iconKey: 'gem',
    image: '/images/downloaded_7c1d65c6eea9.avif',
    description: 'Ceylon sapphires are world-famous. Sri Lanka offers blue sapphires, cat\'s-eye, moonstones, topaz, and garnets. Semi-precious stones cost $30-150; high-grade sapphires start at $200 and can reach thousands. Always get international certification for stones over $2000.',
    tags: ['gems', 'jewelry', 'luxury', 'precious', 'certified', 'scam-alert', 'vat-refund']
  },
  {
    id: 'handloom-batik',
    title: 'Handloom & Batik',
    shortTagline: 'Traditional artistry in vibrant fabrics',
    priceRangeUSD: '$25-150',
    priceRangeLKR: 'Rs. 8,300-49,800',
    authenticityChecklist: [
      'Buy from recognized brands like Barefoot and Selyn',
      'Check for quality stitching and fabric weight',
      'Ask about fabric origin and weaving process',
      'Traditional handloom has irregular texture (authentic sign)'
    ],
    buyWhere: [
      'Barefoot (Colombo & Galle Fort)',
      'Odel stores',
      'Selyn boutiques',
      'Good Market (sustainable products)',
      'Central Market of Kandy'
    ],
    avoid: [
      'Mass-produced "batik" from factories',
      'Synthetic fabrics sold as cotton'
    ],
    bargainingTip: 'At Pettah Market, start at 50% of the asking price. In boutiques like Barefoot or Odel, prices are usually fixed.',
    iconKey: 'textile',
    image: '/images/downloaded_7bb9f5cc5d8e.avif',
    description: 'Colorful batik sarongs, handloom scarves, linen shirts, and modern Sri Lankan designer clothing. Batik blends Indonesian wax-resist techniques with local motifs. Cotton tops/skirts $25-40, linen dresses $50-80, designer pieces $100-150.',
    tags: ['textiles', 'clothing', 'batik', 'handloom', 'fashion', 'souvenir', 'vat-refund']
  },
  {
    id: 'ceylon-spices',
    title: 'Ceylon Spices',
    shortTagline: 'Authentic cinnamon and aromatic blends',
    priceRangeUSD: '$4-20',
    priceRangeLKR: 'Rs. 1,300-6,600',
    authenticityChecklist: [
      'True Ceylon cinnamon has thin, multi-layered quills',
      'Check for organic or ethically-sourced labels',
      'Vacuum-packed for maximum freshness',
      'Look for proper labeling with ingredients'
    ],
    buyWhere: [
      'Matale spice gardens (guided tours available)',
      'Kandy local markets',
      'Supermarkets (best value)',
      'Laksala outlets',
      'Pettah Market (bargain prices)'
    ],
    avoid: [
      'Spice gardens charge 3-5x markup for tourists',
      'Tuk-tuk commission scams to specific gardens',
      'Cassia bark sold as Ceylon cinnamon (thicker, inferior)'
    ],
    bargainingTip: 'In Pettah spice markets, negotiate firmly - aim for 30-40% off the first price. Bulk purchases get better rates.',
    iconKey: 'spice',
    image: '/images/downloaded_5eb95fca2bc2.avif',
    description: 'True Ceylon cinnamon (thin-quilled "true cinnamon") is mild and aromatic - about $4-6 for 100g. Other essentials include cardamom, black pepper, curry powder blends. Forest honey 250g costs $6-10. Kithul jaggery is a natural sweetener healthier than white sugar.',
    tags: ['spices', 'food', 'cinnamon', 'organic', 'souvenir', 'authentic', 'vat-refund']
  },
  {
    id: 'raksha-masks',
    title: 'Raksha Masks',
    shortTagline: 'Hand-carved traditional demon masks',
    priceRangeUSD: '$10-100',
    priceRangeLKR: 'Rs. 3,300-33,000',
    authenticityChecklist: [
      'Hand-carved from lightweight Kaduru wood',
      'Painted with natural pigments',
      'Each piece is unique (no two identical)',
      'Check for smooth carving and quality paint'
    ],
    buyWhere: [
      'Ambalangoda workshops (mask-making capital)',
      'Ariyapala Mask Museum',
      'Laksala outlets',
      'Galle Fort boutiques',
      'Kandy craft shops'
    ],
    avoid: [
      'Mass-produced painted plastic masks'
    ],
    bargainingTip: 'Genuine masks from Ambalangoda workshops cost more but are authentic. Market vendors may negotiate 10-20% off.',
    iconKey: 'mask',
    image: '/images/downloaded_de2043fb1421.avif',
    description: 'Traditional wooden masks from Ambalangoda, especially "Raksha" demon masks (bright red/orange) are iconic home decor. Small wall masks $10-15, medium elaborate masks $25-40, large hand-carved pieces $60-100.',
    tags: ['handicrafts', 'masks', 'art', 'traditional', 'souvenir', 'decor', 'vat-refund']
  },
  {
    id: 'ayurvedic-wellness',
    title: 'Ayurvedic Products',
    shortTagline: 'Traditional wellness and Spa Ceylon',
    priceRangeUSD: '$5-60',
    priceRangeLKR: 'Rs. 1,650-20,000',
    authenticityChecklist: [
      'Buy from recognized brands like Spa Ceylon',
      'Check expiry dates and seals',
      'Look for ingredient lists in English',
      'Ensure proper packaging (no leaks or damage)'
    ],
    buyWhere: [
      'Spa Ceylon stores',
      'Laksala outlets',
      'Pharmacies',
      'Galle Fort craft shops',
      'Odel department stores'
    ],
    avoid: [
      'Unmarked herbal preparations',
      'Products without expiry dates'
    ],
    iconKey: 'wellness',
    image: '/images/downloaded_5eb95fca2bc2.avif',
    description: 'Spa Ceylon body washes, creams, and essential oils ($15-25), larger spa sets and luxury gift boxes ($30-60). Sri Lankan Ayurvedic preparations include herbal oils, balms, and powdered remedies ($5-20).',
    tags: ['wellness', 'ayurveda', 'spa', 'health', 'souvenir', 'gifts', 'vat-refund']
  },
  {
    id: 'wooden-elephants',
    title: 'Wooden Elephants',
    shortTagline: 'Hand-carved figurines and Buddha statues',
    priceRangeUSD: '$5-80',
    priceRangeLKR: 'Rs. 1,650-26,600',
    authenticityChecklist: [
      'Check for hand-carved details (not mass-produced)',
      'Quality wood: teak, ebony, or rosewood',
      'Smooth finish with natural wood grain visible',
      'Weight should feel substantial for size'
    ],
    buyWhere: [
      'Laksala',
      'Ambalangoda workshops',
      'Kandy craft shops',
      'Galle Fort boutiques'
    ],
    avoid: [
      'Beach vendors sell painted softwood as "ebony"',
      'Plastic or resin pieces disguised as wood'
    ],
    bargainingTip: 'Street vendors expect bargaining - start at 40% of asking price and meet in the middle. Government stores have fixed prices.',
    iconKey: 'handicraft',
    image: '/images/downloaded_de2043fb1421.avif',
    description: 'Hand-carved elephants and Buddha figurines are iconic souvenirs. Small wood or brass pieces cost $5-10, medium statuettes $15-25, large or intricately carved statues $40-80.',
    tags: ['handicrafts', 'wood', 'elephants', 'buddha', 'souvenir', 'decor', 'scam-alert', 'vat-refund']
  },
  {
    id: 'lacquerware',
    title: 'Lacquerware',
    shortTagline: 'Glossy hand-painted wooden objects',
    priceRangeUSD: '$12-100',
    priceRangeLKR: 'Rs. 4,000-33,000',
    authenticityChecklist: [
      'Multiple glossy lacquer layers',
      'Hand-painted designs (look for brush strokes)',
      'Smooth, flawless finish',
      'Vibrant coastal color palette'
    ],
    buyWhere: [
      'Ambalangoda',
      'Matara',
      'Laksala outlets'
    ],
    avoid: [
      'Cheap spray-painted imitations'
    ],
    iconKey: 'handicraft',
    image: '/images/downloaded_de2043fb1421.avif',
    description: 'Ambalangoda lacquerware features wooden objects finished with glossy lacquer layers and hand-painted motifs. Small items $12-30, medium decorative pieces $35-60, large artistic pieces $70-100.',
    tags: ['handicrafts', 'lacquer', 'art', 'traditional', 'souvenir', 'decor', 'vat-refund']
  }
]

export const districts: ShoppingDistrict[] = [
  {
    id: 'pettah-market',
    name: 'Pettah Market',
    areaLabel: 'Colombo 11',
    description: 'A bustling open-air bazaar in downtown Colombo where locals shop for everything. Famously chaotic but cheap. Stroll its grid of streets by product category.',
    bestFor: ['Fabrics & textiles', 'Electronics', 'Leather goods', 'Street food', 'Bulk buying', 'Spices'],
    bargaining: 'expected',
    safetyTips: [
      'Be aware of pickpockets in crowds',
      'Keep small bills handy (most vendors prefer cash)',
      'Agree on price before buying',
      'Start at 40-50% of asking price'
    ],
    approxLatLng: { lat: 6.9388, lng: 79.8542 },
    suggestedDurationMin: 120,
    image: '/images/downloaded_a7e696eac85e.avif',
    priceLevel: 'budget',
    tags: ['market', 'budget', 'local', 'bargaining', 'wholesale', 'scam-alert']
  },
  {
    id: 'galle-fort',
    name: 'Galle Fort',
    areaLabel: 'Galle',
    description: 'Historic walled city with cobblestone streets lined with boutique shops and art galleries. Upscale boutiques set in colonial Dutch architecture.',
    bestFor: ['Antiques', 'Designer boutiques', 'Art galleries', 'Handcrafted jewelry', 'Premium textiles', 'Vintage prints'],
    bargaining: 'fixed',
    safetyTips: [
      'Prices are higher but quality is verified',
      'Check Pedlar\'s Street for antiques',
      'Visit Barefoot for premium textiles',
      'Stick No Bills for vintage poster prints'
    ],
    approxLatLng: { lat: 6.0267, lng: 80.2170 },
    suggestedDurationMin: 180,
    image: '/images/downloaded_07a0359bf1ff.avif',
    priceLevel: 'premium',
    tags: ['boutique', 'premium', 'art', 'antiques', 'colonial', 'fixed-price']
  },
  {
    id: 'laksala',
    name: 'Laksala',
    areaLabel: 'Islandwide',
    description: 'State-owned handicraft shops offering a broad range of authentic Sri Lankan crafts, teas, spices and gems, all at set prices. Convenient one-stop store where you can trust the quality.',
    bestFor: ['Authentic crafts', 'Ceylon tea', 'Certified gems', 'Traditional masks', 'Spices', 'Fixed prices'],
    bargaining: 'fixed',
    safetyTips: [
      'Government-run, so quality is guaranteed',
      'Prices are standard (no bargaining)',
      'Ideal for first-time shoppers'
    ],
    approxLatLng: { lat: 6.9271, lng: 79.8612 },
    suggestedDurationMin: 60,
    image: '/images/downloaded_e9255d4ed8f7.avif',
    priceLevel: 'moderate',
    tags: ['government', 'authentic', 'fixed-price', 'reliable', 'crafts', 'vat-refund']
  },
  {
    id: 'odel',
    name: 'Odel',
    areaLabel: 'Colombo 07',
    description: 'Sri Lanka\'s premier lifestyle department store chain with multiple branches. Air-conditioned shopping havens with branded clothing, accessories, perfumes and home goods.',
    bestFor: ['Designer fashion', 'International brands', 'Packaged tea gifts', 'Perfumes', 'Accessories', 'Souvenir gift packs'],
    bargaining: 'fixed',
    safetyTips: [
      'Major branches at One Galle Face Mall and Alexandra Place',
      'Credit cards accepted',
      'Fixed prices, no haggling'
    ],
    approxLatLng: { lat: 6.9271, lng: 79.8472 },
    suggestedDurationMin: 90,
    image: '/images/downloaded_fdf4536c17e0.avif',
    priceLevel: 'premium',
    tags: ['mall', 'premium', 'fashion', 'modern', 'air-conditioned', 'fixed-price', 'vat-refund']
  },
  {
    id: 'barefoot',
    name: 'Barefoot',
    areaLabel: 'Colombo & Galle',
    description: 'Founded in 1964 by Barbara Sansoni, featuring handwoven cloth and products designed and made in Sri Lanka. Flagship store on Galle Road includes bookshop, café, and art gallery.',
    bestFor: ['Handwoven textiles', 'Batik products', 'Art gallery', 'Bookshop', 'Café', 'Home décor'],
    bargaining: 'fixed',
    safetyTips: [
      'Visit on Sundays for live jazz at the café',
      'Allow 1-2 hours to browse fully',
      'Products are painstakingly handmade'
    ],
    approxLatLng: { lat: 6.8887, lng: 79.8571 },
    suggestedDurationMin: 90,
    image: '/images/downloaded_7bb9f5cc5d8e.avif',
    priceLevel: 'premium',
    tags: ['boutique', 'premium', 'handmade', 'textiles', 'art', 'café', 'fixed-price']
  },
  {
    id: 'good-market',
    name: 'Good Market',
    areaLabel: 'Colombo',
    description: 'Weekly sustainable market featuring organic products, fair-trade items, and handmade crafts. A haven of sustainable goods and locally sourced foods.',
    bestFor: ['Organic foods', 'Eco-friendly products', 'Fair-trade goods', 'Local crafts', 'Fresh produce'],
    bargaining: 'fixed',
    safetyTips: [
      'Held weekly (check schedule)',
      'Bring reusable bags',
      'Cash preferred'
    ],
    approxLatLng: { lat: 6.9147, lng: 79.8731 },
    suggestedDurationMin: 60,
    image: '/images/downloaded_a7e696eac85e.avif',
    priceLevel: 'moderate',
    tags: ['market', 'sustainable', 'organic', 'fair-trade', 'eco-friendly', 'fixed-price']
  }
]

export const guides: ShoppingGuides = {
  authenticExperience: [
    'Gems with a government certificate from the NGJA (National Gem and Jewelry Authority)',
    'Tea packs bearing the "Lion Logo" of authenticity from Sri Lanka Tea Board',
    'Fixed prices in government shops like Laksala',
    'Spices with organic/ethically-sourced labels',
    'Hand-carved masks from Kaduru wood with natural pigments',
    'Certificates with online verification for high-value gems'
  ],
  touristTraps: [
    'Tuk-tuk drivers taking you to "special gem museums" for commission',
    'Spice gardens with extremely inflated prices (3-5x markup)',
    'Beach vendors selling painted wood as "ebony"',
    'Street gem vendors with fake stones and certificates',
    '90% of street gem offers are complete scams',
    '"Government sales" or "special one-day" gemstone offers'
  ],
  bargainingTips: [
    'In street markets like Pettah, bargaining is expected and polite',
    'In malls, supermarkets, and Laksala, prices are fixed',
    'Start by offering 30-50% of the initial price',
    'Be polite and friendly throughout - smile gets better prices',
    'If price is too high, politely walk away - vendors often call you back',
    'Always ask the price before buying',
    'Agree on taxi/tuk-tuk fares upfront or use metered rides'
  ],
  dutyFreeInfo: [
    'Tea: Up to 3kg can be exported duty-free',
    'Gems: Ensure you have an official receipt for customs',
    'Currency: Retain exchange receipts to convert leftover Rupees at airport',
    'VAT Refund: Available for tourists spending over LKR 50,000',
    'Save all receipts for large purchases',
    'Major shops can assist with VAT refund forms'
  ]
}

export const vatRefund: VATRefund = {
  eligible: [
    'Non-citizens and non-residents of Sri Lanka',
    'Aged 18 or over',
    'Staying less than 90 days',
    'Purchases from authorized retailers',
    'Up to three invoices per day from the same retailer'
  ],
  threshold: 50000, // LKR (excluding VAT)
  percent: 18,
  processSteps: [
    'Spend over LKR 50,000 (excluding VAT) in one day at a single authorized shop',
    'Obtain Tourist VAT Refund Invoice (TVRI) using receipts and passport',
    'Keep goods in baggage or hand luggage (not consumed in Sri Lanka)',
    'Fill out TVRS application form at airport',
    'Present goods for physical verification at Customs point',
    'Submit refund claim at TVRS Counter in departure lounge at BIA',
    'Tourist VAT Refund Counter relaunched July 4th, 2025 at Bandaranaike International Airport'
  ],
  excludedItems: [
    'Services',
    'Food and drinks',
    'VAT-free items',
    'Online purchases',
    'Restricted or prohibited goods',
    'Items consumed in Sri Lanka'
  ]
}

// Tag taxonomy for filtering
export const tagTaxonomy = {
  itemCategories: ['tea', 'gems', 'textiles', 'spices', 'handicrafts', 'wellness'],
  priceRanges: ['budget', 'moderate', 'premium', 'luxury'],
  authenticity: ['certified', 'authentic', 'handmade', 'organic'],
  districtTypes: ['market', 'boutique', 'mall', 'government', 'sustainable']
}

// Helper functions
export const filterByTag = (items: CuratedFind[], tag: string): CuratedFind[] => {
  return items.filter(item => item.tags.includes(tag))
}

export const filterDistrictsByTag = (districts: ShoppingDistrict[], tag: string): ShoppingDistrict[] => {
  return districts.filter(district => district.tags.includes(tag))
}

export const searchItems = (items: CuratedFind[], query: string): CuratedFind[] => {
  const lowerQuery = query.toLowerCase()
  return items.filter(item =>
    item.title.toLowerCase().includes(lowerQuery) ||
    item.description.toLowerCase().includes(lowerQuery) ||
    item.shortTagline.toLowerCase().includes(lowerQuery) ||
    item.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    item.buyWhere.some(place => place.toLowerCase().includes(lowerQuery)) ||
    (item.avoid && item.avoid.some(warning => warning.toLowerCase().includes(lowerQuery)))
  )
}

export const searchDistricts = (districts: ShoppingDistrict[], query: string): ShoppingDistrict[] => {
  const lowerQuery = query.toLowerCase()
  return districts.filter(district =>
    district.name.toLowerCase().includes(lowerQuery) ||
    district.description.toLowerCase().includes(lowerQuery) ||
    district.bestFor.some(item => item.toLowerCase().includes(lowerQuery)) ||
    district.areaLabel.toLowerCase().includes(lowerQuery) ||
    district.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

export const getBestMatches = (items: CuratedFind[], tags: string[]): CuratedFind[] => {
  return items
    .map(item => ({
      item,
      matchCount: tags.filter(tag => item.tags.includes(tag)).length
    }))
    .filter(({ matchCount }) => matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .map(({ item }) => item)
}

export const getDistrictBestMatches = (districts: ShoppingDistrict[], tags: string[]): ShoppingDistrict[] => {
  return districts
    .map(district => ({
      district,
      matchCount: tags.filter(tag => district.tags.includes(tag)).length
    }))
    .filter(({ matchCount }) => matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .map(({ district }) => district)
}

export const getItemsByPriceRange = (items: CuratedFind[], maxUSD: number): CuratedFind[] => {
  return items.filter(item => {
    const priceMatch = item.priceRangeUSD.match(/\$(\d+)-/)
    if (priceMatch && priceMatch[1]) {
      const minPrice = parseInt(priceMatch[1])
      return minPrice <= maxUSD
    }
    return false
  })
}

export const getDistrictsByBargaining = (districts: ShoppingDistrict[], allowBargaining: boolean): ShoppingDistrict[] => {
  const bargainingType = allowBargaining ? 'expected' : 'fixed'
  return districts.filter(district => district.bargaining === bargainingType)
}

// Helper: Get warnings for specific context
export function getWarningsByContext(context: 'gems' | 'pettah' | 'tourist-traps' | 'spices'): ShoppingWarning[] {
  return shoppingWarnings.filter(w => w.contexts.includes(context))
}

// Helper: Get warning by ID
export function getWarningById(id: string): ShoppingWarning | undefined {
  return shoppingWarnings.find(w => w.id === id)
}
