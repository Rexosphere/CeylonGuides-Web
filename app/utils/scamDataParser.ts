import type { ScamAlert, RiskLocation, ScamCategory, SafetyTip } from '~/types/scam'

// Parse structured scam data from scam.md content
export function parseScamAlerts(): ScamAlert[] {
  return [
    {
      id: 'tuktuk-overcharge',
      title: 'Tuk-Tuk Overcharging & Detours',
      severity: 'high',
      description: 'Scammers approach tourists with offers of "free" city tours or claim the meter is broken. They take you through commission-earning stops (gem shops, spice gardens) and demand exorbitant fares.',
      example: 'A traveler agreed to a tuk-tuk ride after a tout pointed out a nearby festival. The driver refused to use the meter and later insisted on a huge cash payment. Accomplices gang up to pressure payment.',
      tips: [
        'Always insist on using a metered tuk-tuk or agree on a fixed fare before riding',
        'Refuse unsolicited offers of "special tours"',
        'Use taxi apps (PickMe/Uber) for transparent pricing',
        'Carry small bills in local currency (LKR)',
        'Say firmly "no" if asked to stop at any shop or detour',
        'Be aware of tuk-tuk "mafia" harassing app-based drivers'
      ],
      categories: ['transport', 'overcharging', 'detour']
    },
    {
      id: 'gemstone-scams',
      title: 'Gemstone Scams',
      severity: 'high',
      description: 'Tourists are lured into gem shops by tuk-tuk drivers or locals claiming shops are government-approved. High-pressure tactics sell fake or low-quality gems (dyed quartz, synthetic sapphires) at inflated prices.',
      example: 'Visitors report being steered to Colombo or Galle gem stores and told they can\'t buy authentic gems elsewhere. Stones are passed off as certified with phony paperwork but are worthless.',
      tips: [
        'Never buy gemstones from street vendors or unsolicited shop visits',
        'Only purchase from reputable dealers with real certification',
        'Research gem prices ahead of time',
        'Insist on independent appraisals and export certificates',
        'Avoid any shop a tuk-tuk driver or stranger insists you visit',
        'Tourists have lost thousands of dollars to fake stones'
      ],
      categories: ['shopping', 'fraud', 'high-pressure']
    },
    {
      id: 'fake-tour-guides',
      title: 'Fake Tour Guides & Touts',
      severity: 'high',
      description: 'Self-appointed "guides" accost tourists at temples or historic sites offering unsolicited help. They share false facts and demand large tips or fees. May work in teams to block your exit.',
      example: 'At Sigiriya or Kandy, a well-dressed stranger guides you or calls a tuk-tuk and demands an inflated fare or hefty "donation". Teams may intimidate you into paying.',
      tips: [
        'Always book guides through official channels (hotel concierge or licensed tour companies)',
        'Check for official badges',
        'Politely decline all unsolicited offers',
        'Say "No, thank you, I already have a guide" and walk away',
        'Stick with known guides and group tours',
        'Be extra cautious at Temple of the Tooth, Sigiriya, Galle Fort'
      ],
      categories: ['guides', 'temples', 'historic-sites']
    },
    {
      id: 'fake-monk-blessing',
      title: 'Fake Monk/Temple Blessing Scams',
      severity: 'medium',
      description: 'Fake monks or locals hang around temple entrances offering flowers or wristbands as a "blessing" and demand immediate donation, often a surprisingly large amount.',
      example: 'Someone offers a flower or wristband at a temple entrance, then aggressively demands a specific large payment immediately after.',
      tips: [
        'Real Buddhist monks do not handle money (it\'s against their precepts)',
        'Real monks never beg aggressively or ask for money directly',
        'Real monks stand quietly with begging bowls, waiting to be noticed',
        'Politely decline unsolicited offerings at temple entrances',
        'If uncertain, ask temple staff or your guide'
      ],
      categories: ['temples', 'religious', 'donation-scam']
    },
    {
      id: 'currency-exchange',
      title: 'Currency Exchange & Card Fraud',
      severity: 'medium',
      description: 'Unscrupulous money changers quote attractive rates but short-change with fake or missing notes. Tricks include counting errors, hidden fees, or "broken" ATMs. Card details may be copied.',
      example: 'A tourist handed over 50 USD at an unmarked booth and got only 70,000 LKR instead of proper ~90,000 LKR. A shop rang up purchase in USD without consent using bad conversion.',
      tips: [
        'Always use licensed exchange counters or banks',
        'Never trade money on the street',
        'Count money carefully in front of clerk',
        'Insist on official receipt',
        'Request pricing in LKR when using cards',
        'Carry cash in small denominations',
        'Double-check every transaction',
        'Never let your card out of sight'
      ],
      categories: ['money', 'fraud', 'card-scam']
    },
    {
      id: 'spice-garden-scams',
      title: 'Spice Garden Scams',
      severity: 'medium',
      description: 'Tuk-tuk drivers bring tourists to spice gardens for commission. A "doctor/professor" sells low-quality or useless spices and herbal remedies. May get angry if you don\'t buy.',
      example: 'Someone claiming to be a professional offers "free" tours with freebies, claims you\'re suffering from ailments, and demands expensive medicinal herbs. Common around Kandy, Kegalle, Matale.',
      tips: [
        'Decline unsolicited spice garden visits',
        'Research reputable spice gardens before visiting',
        'Don\'t be intimidated into buying',
        'Walk away if pressured',
        'Only visit spice gardens you researched yourself'
      ],
      categories: ['shopping', 'detour', 'high-pressure']
    },
    {
      id: 'stilt-fishermen-photos',
      title: 'Stilt Fishermen Photo Scams',
      severity: 'medium',
      description: 'In coastal areas, "fishermen" are often paid actors sitting on stilts waiting for tourists to snap photos, then demand tips. Agents inland may demand payment even for pointing a camera.',
      example: 'Near Weligama or Galle, non-fishermen pretending to fish have agents who demand payment once you\'ve taken a photo, even from a distance.',
      tips: [
        'Know that many stilt fishermen are staged for tourists',
        'Ask prices before taking photos',
        'Be prepared to decline and walk away',
        'Consider it a tourist attraction, not authentic fishing',
        'Common around Koggala, Ahangama, Weligama'
      ],
      categories: ['photos', 'beach', 'tourist-trap']
    },
    {
      id: 'surfboard-rental-damage',
      title: 'Surfboard Rental Damage Scams',
      severity: 'medium',
      description: 'Surf shops claim customers damaged boards and demand high repair fees. Some rent half-broken boards first, then blame renters when they break completely.',
      example: 'Fins fall off during use, shops demand 30,000 rupees (£165) for replacement when actual cost is 8,000 rupees. Boards returned are claimed to have cracked rails.',
      tips: [
        'Take detailed photos of surfboard BEFORE using it',
        'Check board condition thoroughly before leaving shop',
        'Refuse boards in bad condition',
        'Ask gently to change damaged boards',
        'Know repair costs beforehand',
        'Get written condition report if possible'
      ],
      categories: ['beach', 'sports', 'rental-scam']
    },
    {
      id: 'friendly-local-bar',
      title: 'Friendly Local Bar/Restaurant Scams',
      severity: 'medium',
      description: 'Someone pretends to be friendly, has drinks at a local bar, then escapes leaving you with hefty bills. Often work with bartenders. May claim to be off-duty official.',
      example: 'Someone claiming to be an official invites you to their office for tea, takes you to expensive hotel, orders drinks, and when you pay the bill is extraordinarily expensive with added items.',
      tips: [
        'Be wary of overly friendly strangers inviting you for drinks',
        'Don\'t accept invitations to bars/restaurants from strangers',
        'Check prices before ordering',
        'Watch what\'s being ordered',
        'Stay alert on South Coast beaches (Unawatuna, Hikkaduwa, Bentota)',
        'Trust your instincts - if it feels wrong, leave'
      ],
      categories: ['drinks', 'social', 'overcharging']
    },
    {
      id: 'hotel-staff-impersonation',
      title: 'Hotel Staff Impersonation Scams',
      severity: 'high',
      description: 'Scammers hang around hotels pretending to be staff to gain trust. They engage in friendly small talk and suddenly suggest gem exhibitions or party places.',
      example: 'A hotel manager shared a story about a solo female traveler who went to a "party place" a driver kept pushing, got drunk, and lost everything including her belongings.',
      tips: [
        'Verify staff identity with hotel reception',
        'Don\'t trust anyone without official hotel ID',
        'Be extra cautious as solo travelers, especially women',
        'Listen to real hotel warnings about scams',
        'Don\'t accept transportation recommendations from non-verified staff',
        'Report suspicious individuals to hotel management'
      ],
      categories: ['hotel', 'impersonation', 'theft']
    },
    {
      id: 'pickpocketing-schemes',
      title: 'Pickpocketing Schemes',
      severity: 'medium',
      description: 'Someone throws white paste on your shoulder mimicking bird poop. A friendly local offers to help clean up while pickpocketing you. Common in crowded areas.',
      example: 'While walking in streets, white paste is thrown on shoulder. You look up thinking it was bird poop. A "helpful" local cleans you up while stealing from your pockets.',
      tips: [
        'Keep valuables in inside pockets or money belts',
        'Be extra alert in crowded areas (Pettah market, Kandy, Colombo)',
        'Don\'t accept help from strangers for "cleaning"',
        'If something lands on you, secure valuables first',
        'Stay alert on public transportation',
        'Keep important documents and money secure'
      ],
      categories: ['pickpocketing', 'theft', 'distraction']
    },
    {
      id: 'public-bus-overcharge',
      title: 'Public Bus Scams',
      severity: 'low',
      description: 'Bus conductors overcharge tourists. If not issued a ticket, you\'re likely being overcharged. When you don\'t have exact change, they say they\'ll give balance when you get down but often don\'t.',
      example: 'Conductor doesn\'t issue ticket and overcharges. Says no change available, promises to give balance at destination, but passengers forget to collect or conductor disappears.',
      tips: [
        'Always ask for a ticket',
        'Carry exact change in small denominations',
        'Ask locals about correct fares beforehand',
        'US embassy recommends avoiding public buses due to harassment/theft risk',
        'Consider using apps or private transport instead'
      ],
      categories: ['transport', 'overcharging', 'public-transport']
    },
    {
      id: 'animal-charmer-scams',
      title: 'Animal Charmer Scams',
      severity: 'low',
      description: 'Animal charmers with monkeys, snakes entertain crowds and ask viewers to join the show. After participating in "adventurous activities", they force participants to pay money.',
      example: 'A snake charmer invites you to hold the snake or take a photo with the monkey. After you participate, they demand payment for the experience.',
      tips: [
        'Don\'t participate in animal shows without agreeing on price first',
        'Be wary of "free" animal interactions',
        'Consider animal welfare - these practices may be unethical',
        'Walk away if pressured for payment',
        'Politely decline participation'
      ],
      categories: ['entertainment', 'animals', 'tourist-trap']
    },
    {
      id: 'fake-safari-guides',
      title: 'Fake Safari Guides',
      severity: 'high',
      description: 'Unlicensed guides in Yala National Park take tourists on roads outside the park, never entering actual park. They keep entrance fees and provide mediocre experience with no wildlife.',
      example: 'Group paid for Yala tours but were driven around rural roads. "Guides" kept entrance fees, never entered the park, no leopard or wildlife sightings.',
      tips: [
        'Book safari tours only through licensed operators',
        'Verify park entrance at official gates',
        'Check reviews online before booking',
        'Ensure tour includes actual park entrance fees',
        'Ask to see guide\'s official license',
        'Book through reputable hotels or verified tour companies'
      ],
      categories: ['tours', 'wildlife', 'nature', 'fraud']
    },
    {
      id: 'visa-arrival-scams',
      title: 'Visa On Arrival Scams',
      severity: 'medium',
      description: 'At Colombo Airport, unlicensed "visa agents" offer on-arrival visa help for extra fees. Sri Lankan visas are electronic and can be obtained online or at official immigration counters.',
      example: 'Scammers at airport approach tourists offering to help with visa, charging extra fees when you can do it yourself at official counters.',
      tips: [
        'Apply for Sri Lankan visa online before travel (Electronic Travel Authorization)',
        'Use official immigration counters at airport',
        'Don\'t use unofficial visa agents',
        'Visa on arrival is available but do it yourself at official counters',
        'Ignore anyone offering visa "help" for a fee'
      ],
      categories: ['airport', 'visa', 'fraud']
    }
  ]
}

export function getRiskLocations(): RiskLocation[] {
  return [
    {
      id: 'colombo-pettah',
      name: 'Pettah Market',
      area: 'Colombo - Pettah & Fort Areas',
      risk: 'high',
      lat: 6.9387,
      lng: 79.8543,
      scamTypes: ['pickpocketing', 'tuktuk-overcharge', 'gemstone-scams', 'bird-poop-cleanup'],
      description: 'Pettah Market and Fort district are notorious for pickpocketing, tuk-tuk diversions and gem-shop hustles. Crowds attract scammers posing as helpful locals who rob or overcharge tourists.',
      color: '#ef4444'
    },
    {
      id: 'colombo-fort',
      name: 'Fort District',
      area: 'Colombo - Fort',
      risk: 'high',
      lat: 6.9355,
      lng: 79.8500,
      scamTypes: ['tuktuk-overcharge', 'gemstone-scams', 'currency-exchange'],
      description: 'High concentration of gem shops and tuk-tuk scams. Currency exchange frauds common near tourist areas.',
      color: '#ef4444'
    },
    {
      id: 'kandy-temple',
      name: 'Temple of the Tooth',
      area: 'Kandy',
      risk: 'high',
      lat: 7.2936,
      lng: 80.6407,
      scamTypes: ['fake-tour-guides', 'fake-monk-blessing', 'tuktuk-overcharge'],
      description: 'Temple of the Tooth and downtown Kandy see many bogus guide schemes. Unofficial guides ambush visitors at temple entrance and insist on paid "blessings" or tours.',
      color: '#ef4444'
    },
    {
      id: 'kandy-downtown',
      name: 'Kandy Downtown',
      area: 'Kandy',
      risk: 'high',
      lat: 7.2906,
      lng: 80.6337,
      scamTypes: ['tuktuk-overcharge', 'spice-garden-scams', 'gemstone-scams'],
      description: 'Tuk-tuk drivers frequently inflate fares and take tourists to commission-earning spice gardens and gem shops.',
      color: '#ef4444'
    },
    {
      id: 'galle-fort',
      name: 'Galle Fort',
      area: 'Galle',
      risk: 'medium-high',
      lat: 6.0259,
      lng: 80.2168,
      scamTypes: ['fake-tour-guides', 'gemstone-scams', 'pickpocketing', 'shopping-scams'],
      description: 'Historic fort attracts vendors and touts. Fake guides and aggressive shopkeepers use high-pressure sales. Pickpocketing can happen in crowded streets.',
      color: '#f97316'
    },
    {
      id: 'unawatuna',
      name: 'Unawatuna Beach',
      area: 'South Coast',
      risk: 'medium',
      lat: 6.0097,
      lng: 80.2506,
      scamTypes: ['friendly-local-bar', 'surfboard-rental-damage', 'pickpocketing'],
      description: 'Popular beach known for bar scams and petty theft. Friendly strangers invite tourists for drinks then skip on bill or spike drinks.',
      color: '#f59e0b'
    },
    {
      id: 'hikkaduwa',
      name: 'Hikkaduwa Beach',
      area: 'South Coast',
      risk: 'medium',
      lat: 6.1397,
      lng: 80.0985,
      scamTypes: ['friendly-local-bar', 'surfboard-rental-damage', 'currency-exchange'],
      description: 'Tourist-targeted bar scams and surfboard rental frauds common. Currency tricks at beachside gift shops.',
      color: '#f59e0b'
    },
    {
      id: 'bentota',
      name: 'Bentota Beach',
      area: 'South Coast',
      risk: 'medium',
      lat: 6.4260,
      lng: 79.9957,
      scamTypes: ['friendly-local-bar', 'water-sports-scams'],
      description: 'Beach area with bar scams and petty theft. Be cautious of overly friendly strangers.',
      color: '#f59e0b'
    },
    {
      id: 'weligama',
      name: 'Weligama',
      area: 'South Coast',
      risk: 'medium',
      lat: 5.9738,
      lng: 80.4295,
      scamTypes: ['stilt-fishermen-photos', 'surfboard-rental-damage'],
      description: 'Iconic stilt fishermen are often staged for tourists. Photo scams and surfboard rental frauds common.',
      color: '#f59e0b'
    },
    {
      id: 'ratnapura',
      name: 'Ratnapura',
      area: 'Gem Mining District',
      risk: 'medium',
      lat: 6.6828,
      lng: 80.3992,
      scamTypes: ['gemstone-scams'],
      description: 'Gem-mining district where tourists are routinely brought to gem stores for inflated prices. Shops work with drivers to sell "certified" gems.',
      color: '#f59e0b'
    },
    {
      id: 'negombo',
      name: 'Negombo',
      area: 'Airport Zone',
      risk: 'medium',
      lat: 7.2088,
      lng: 79.8358,
      scamTypes: ['visa-arrival-scams', 'currency-exchange', 'tuktuk-overcharge'],
      description: 'Near airport, unlicensed "visa agents" offer help for extra fees. Unofficial money changers shortchange travelers. Use official counters and bank ATMs.',
      color: '#f59e0b'
    },
    {
      id: 'sigiriya',
      name: 'Sigiriya Rock Fortress',
      area: 'Cultural Triangle',
      risk: 'medium',
      lat: 7.9571,
      lng: 80.7603,
      scamTypes: ['fake-tour-guides', 'tuktuk-overcharge'],
      description: 'Well-dressed strangers offer guide services or tuk-tuk rides then demand inflated fees. Book guides through official channels.',
      color: '#f59e0b'
    },
    {
      id: 'yala',
      name: 'Yala National Park',
      area: 'Wildlife',
      risk: 'medium',
      lat: 6.3724,
      lng: 81.5198,
      scamTypes: ['fake-safari-guides'],
      description: 'Unlicensed guides take tourists on roads outside the park, never entering. Book only through licensed operators.',
      color: '#f59e0b'
    },
    {
      id: 'matale',
      name: 'Matale',
      area: 'Spice Garden Area',
      risk: 'medium',
      lat: 7.4696,
      lng: 80.6234,
      scamTypes: ['spice-garden-scams'],
      description: 'Tuk-tuk drivers bring tourists to spice gardens for commission. High-pressure sales of low-quality spices and "medicinal" herbs.',
      color: '#f59e0b'
    }
  ]
}

export function getScamCategories(): ScamCategory[] {
  return [
    { id: 'transport', name: 'Transport', icon: '🚕' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️' },
    { id: 'guides', name: 'Tour Guides', icon: '👤' },
    { id: 'temples', name: 'Temples', icon: '🛕' },
    { id: 'money', name: 'Money/Cards', icon: '💳' },
    { id: 'beach', name: 'Beach Areas', icon: '🏖️' },
    { id: 'hotel', name: 'Hotels', icon: '🏨' },
    { id: 'theft', name: 'Theft', icon: '🚨' },
    { id: 'fraud', name: 'Fraud', icon: '⚠️' },
    { id: 'wildlife', name: 'Wildlife/Safari', icon: '🦁' }
  ]
}

export function getSafetyTips(): SafetyTip[] {
  return [
    {
      category: 'general',
      tips: [
        'Stay skeptical of overly friendly strangers or unexpected "help"',
        'Protect valuables in inside pockets or money belts',
        'Always ask prices upfront for tuk-tuks, bars, souvenirs',
        'Use official services - book through reputable companies or apps',
        'Trust your instincts - if it sounds too good, it probably is',
        'Don\'t be intimidated if a scammer gets pushy - firmly say no and leave',
        'Pre-book tours and activities instead of using services of touts'
      ]
    },
    {
      category: 'transport',
      tips: [
        'Use PickMe or Uber apps for transparent pricing',
        'Always insist on metered tuk-tuks or agree on fare before riding',
        'Refuse all unsolicited "special tour" offers',
        'Carry small bills in LKR to avoid change scams',
        'Never let driver take you to shops/gardens without your request'
      ]
    },
    {
      category: 'shopping',
      tips: [
        'Never buy gemstones from street vendors or unsolicited shops',
        'Research prices before shopping for expensive items',
        'Avoid any shop recommended by tuk-tuk drivers',
        'Take photos of rental items before using them',
        'Don\'t be pressured into buying - walk away if uncomfortable'
      ]
    },
    {
      category: 'temples',
      tips: [
        'Book guides through official channels only',
        'Real monks never handle money or beg aggressively',
        'Decline unsolicited offerings at temple entrances',
        'Check for official guide badges',
        'Say "I already have a guide" to unwanted touts'
      ]
    },
    {
      category: 'money',
      tips: [
        'Use licensed banks or exchange counters only',
        'Never trade money on the street',
        'Count money in front of clerk and get receipt',
        'Request pricing in LKR when using cards',
        'Never let your card out of sight',
        'Apply for visa online before travel'
      ]
    },
    {
      category: 'solo-female',
      tips: [
        'Wear a fake wedding ring if concerned about harassment',
        'Don\'t drink to excess which could compromise safety',
        'Don\'t walk or catch tuk-tuk alone at night',
        'Always book a taxi instead of hailing on street',
        'Avoid overnight train travel or sit with families',
        'Listen to hotel warnings about scams'
      ]
    }
  ]
}
