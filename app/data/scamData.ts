/**
 * Comprehensive Scam Alert Data Module
 * Single source of truth parsed from scam.md
 * 
 * This module provides structured data for:
 * - Scam types with severity, examples, tips, and locations
 * - Geographic locations with risk levels and coordinates
 * - Activities with related scam mappings
 * - Reporting information and emergency contacts
 */

import type { ScamType, Location, Activity, ReportingInfo } from '~/types/scamData'

/**
 * SCAM TYPES
 * Comprehensive list of all scam types from scam.md
 */
export const scamTypes: ScamType[] = [
  {
    id: 'tuktuk-overcharge',
    title: 'Tuk-Tuk Overcharging & Detours',
    severity: 'high',
    category: 'transport',
    description: 'Scammers approach tourists with offers of "free" city tours or claim the meter is broken. They take you through commission-earning stops (gem shops, spice gardens) and demand exorbitant fares.',
    realExamples: [
      'Driver claims meter is broken after journey starts',
      'Unmetered ride from airport quoted at 3000 LKR instead of fair 500 LKR',
      'Driver takes detours through gem shops earning commission',
      'Accomplices gang up to pressure payment after refusing inflated fare'
    ],
    preventionTips: [
      'Always insist on using a metered tuk-tuk or agree on a fixed fare before riding',
      'Refuse unsolicited offers of "special tours"',
      'Use taxi apps (PickMe/Uber) for transparent pricing',
      'Carry small bills in local currency (LKR)',
      'Say firmly "no" if asked to stop at any shop or detour'
    ],
    commonLocations: ['colombo-fort', 'colombo-airport', 'kandy-downtown', 'galle-fort'],
    tags: ['tuk-tuk', 'transport', 'overcharge', 'detour', 'meter', 'taxi'],
    travelerWarnings: {
      'solo-female': [
        '⚠️ Solo female travelers: Be extra cautious at night. Drivers may take unnecessary detours or make inappropriate comments',
        'Share your ride details with someone you trust. Use PickMe/Uber which have GPS tracking',
        'Sit in the back seat and keep your phone visible. Avoid rides after 10 PM when possible'
      ],
      'couple': [
        'Couples: Driver may try to separate you during "photo stops" at commission-earning shops',
        'Agree on the destination and price together before getting in'
      ],
      'family': [
        'Families: Ensure all children stay together. Drivers may distract parents during detours',
        'Pre-arrange transport through your hotel for added safety with children'
      ],
      'backpacker': [
        'Backpackers: Budget travelers are prime targets. Negotiate firmly and walk away if price seems inflated',
        'Stay in hostels with reliable transport partnerships'
      ]
    }
  },
  {
    id: 'gemstone-scams',
    title: 'Gemstone Scams',
    severity: 'critical',
    category: 'shopping',
    description: 'Tourists are lured into gem shops by tuk-tuk drivers or locals claiming shops are government-approved. High-pressure tactics sell fake or low-quality gems (dyed quartz, synthetic sapphires) at inflated prices.',
    realExamples: [
      'Driver insists on visiting his "brother\'s" gem shop',
      'Shop claims government certification with fake paperwork',
      'Tourist pays $5000 for fake sapphires worth $50',
      'Pressure tactics: "special price today only, for tourists"',
      'Promises of profitable export business schemes'
    ],
    preventionTips: [
      'Never buy gemstones from street vendors or unsolicited shop visits',
      'Only purchase from reputable dealers with real certification',
      'Research gem prices ahead of time',
      'Insist on independent appraisals and export certificates',
      'Avoid any shop a tuk-tuk driver or stranger insists you visit',
      'Check National Gem and Jewellery Authority certification'
    ],
    commonLocations: ['colombo-pettah', 'kandy-downtown', 'galle-fort', 'ratnapura'],
    tags: ['gem', 'jewelry', 'shopping', 'commission', 'fake-goods', 'high-pressure', 'fraud']
  },
  {
    id: 'fake-tour-guides',
    title: 'Fake Tour Guides & Touts',
    severity: 'high',
    category: 'guides',
    description: 'Self-appointed "guides" accost tourists at temples or historic sites offering unsolicited help. They share false facts and demand large tips or fees. May work in teams to block your exit.',
    realExamples: [
      'Well-dressed stranger guides you without asking and demands hefty fee',
      'Teams of touts intimidate tourists into paying inflated amounts',
      'Fake guides share incorrect historical information',
      'Guide demands payment after "free" temple tour'
    ],
    preventionTips: [
      'Always book guides through official channels (hotel concierge or licensed tour companies)',
      'Check for official badges and licenses',
      'Politely decline all unsolicited offers',
      'Say "No, thank you, I already have a guide" and walk away',
      'Stick with known guides and group tours'
    ],
    commonLocations: ['kandy-temple', 'sigiriya', 'galle-fort', 'dambulla'],
    tags: ['guide', 'tour', 'tout', 'temple', 'historic-sites', 'unsolicited']
  },
  {
    id: 'fake-monk-blessing',
    title: 'Fake Monk/Temple Blessing Scams',
    severity: 'medium',
    category: 'temple',
    description: 'Fake monks or locals hang around temple entrances offering flowers or wristbands as a "blessing" and demand immediate donation, often a surprisingly large amount.',
    realExamples: [
      'Someone offers a flower at temple entrance, then demands 5000 LKR',
      'Fake monk ties wristband and aggressively demands money',
      'Scammer claims to be collecting for temple repairs',
      'Aggressive begging near sacred sites'
    ],
    preventionTips: [
      'Real Buddhist monks do not handle money (against precepts)',
      'Real monks never beg aggressively or ask for money directly',
      'Real monks stand quietly with begging bowls, waiting to be noticed',
      'Politely decline unsolicited offerings at temple entrances',
      'If uncertain, ask temple staff or your guide'
    ],
    commonLocations: ['kandy-temple', 'colombo-temples', 'galle-fort'],
    tags: ['monk', 'temple', 'donation', 'blessing', 'religious', 'fake']
  },
  {
    id: 'currency-exchange',
    title: 'Currency Exchange & Card Fraud',
    severity: 'high',
    category: 'money',
    description: 'Unscrupulous money changers quote attractive rates but short-change with fake or missing notes. Tricks include counting errors, hidden fees, or "broken" ATMs. Card details may be copied.',
    realExamples: [
      'Tourist hands over $50 USD, gets 70,000 LKR instead of proper 90,000 LKR',
      'Shop charges card in USD without consent using poor conversion rate',
      'Money changer uses sleight of hand to remove bills while counting',
      'Fake currency mixed with real notes',
      'Card skimming at unofficial exchange points'
    ],
    preventionTips: [
      'Always use licensed exchange counters or banks',
      'Never trade money on the street',
      'Count money carefully in front of clerk',
      'Insist on official receipt',
      'Request pricing in LKR when using cards',
      'Carry cash in small denominations',
      'Never let your card out of sight'
    ],
    commonLocations: ['colombo-fort', 'colombo-airport', 'kandy-downtown', 'galle-fort'],
    tags: ['money', 'exchange', 'currency', 'card', 'fraud', 'skimming', 'fake-currency']
  },
  {
    id: 'spice-garden-scams',
    title: 'Spice Garden Scams',
    severity: 'medium',
    category: 'shopping',
    description: 'Tuk-tuk drivers bring tourists to spice gardens for commission. A "doctor/professor" sells low-quality or useless spices and herbal remedies. May get angry if you don\'t buy.',
    realExamples: [
      'Driver insists on "educational" spice garden visit',
      'Fake doctor diagnoses ailments and sells expensive herbs',
      'High-pressure sales after "free" tour and tea',
      'Staff becomes aggressive when tourists refuse to buy'
    ],
    preventionTips: [
      'Decline unsolicited spice garden visits',
      'Research reputable spice gardens before visiting',
      'Don\'t be intimidated into buying',
      'Walk away if pressured',
      'Only visit spice gardens you researched yourself'
    ],
    commonLocations: ['kandy-matale', 'kandy-downtown'],
    tags: ['spice', 'garden', 'shopping', 'commission', 'detour', 'herbal', 'pressure-sales']
  },
  {
    id: 'stilt-fishermen-photos',
    title: 'Stilt Fishermen Photo Scams',
    severity: 'medium',
    category: 'beach',
    description: 'In coastal areas, "fishermen" are often paid actors sitting on stilts waiting for tourists to snap photos, then demand tips. Agents inland may demand payment even for pointing a camera.',
    realExamples: [
      'Tourist takes photo from distance, agent demands payment',
      'Fisherman poses then demands 2000 LKR per photo',
      'Group of agents surrounds tourists demanding money',
      'Staged fishermen have no actual fishing equipment'
    ],
    preventionTips: [
      'Know that many stilt fishermen are staged for tourists',
      'Ask prices before taking photos',
      'Be prepared to decline and walk away',
      'Consider it a tourist attraction, not authentic fishing',
      'Photograph from public areas without entering private zones'
    ],
    commonLocations: ['weligama', 'galle-coast', 'koggala'],
    tags: ['photo', 'beach', 'fishermen', 'tourist-trap', 'staged', 'coastal']
  },
  {
    id: 'surfboard-rental-damage',
    title: 'Surfboard Rental Damage Scams',
    severity: 'medium',
    category: 'beach',
    description: 'Surf shops claim customers damaged boards and demand high repair fees. Some rent half-broken boards first, then blame renters when they break completely.',
    realExamples: [
      'Fins fall off during use, shop demands 30,000 rupees (£165) for replacement',
      'Actual repair cost is 8,000 rupees but charged triple',
      'Board returned intact but claimed to have cracked rails',
      'Shop rents damaged board then blames tourist for existing damage'
    ],
    preventionTips: [
      'Take detailed photos of surfboard BEFORE using it',
      'Check board condition thoroughly before leaving shop',
      'Refuse boards in bad condition',
      'Get written condition report if possible',
      'Know repair costs beforehand',
      'Use reputable rental shops with good reviews'
    ],
    commonLocations: ['arugam-bay', 'hikkaduwa', 'weligama'],
    tags: ['surfboard', 'rental', 'damage', 'beach', 'sports', 'false-claim']
  },
  {
    id: 'friendly-local-bar',
    title: 'Friendly Local Bar/Restaurant Scams',
    severity: 'high',
    category: 'nightlife',
    description: 'Someone pretends to be friendly, has drinks at a local bar, then escapes leaving you with hefty bills. Often work with bartenders. May claim to be off-duty official.',
    realExamples: [
      'Stranger invites you to their "office" for tea, takes you to expensive hotel',
      'Companion orders expensive drinks, disappears when bill arrives',
      'Bill includes items never ordered, inflated 3-4x normal prices',
      'Bartender in on scam, threatens tourists who refuse to pay'
    ],
    preventionTips: [
      'Be wary of overly friendly strangers inviting you for drinks',
      'Don\'t accept invitations to bars/restaurants from strangers',
      'Check prices before ordering',
      'Watch what\'s being ordered',
      'Trust your instincts - if it feels wrong, leave',
      'Stay alert in tourist beach areas'
    ],
    commonLocations: ['unawatuna', 'hikkaduwa', 'bentota', 'negombo'],
    tags: ['bar', 'drinks', 'social', 'overcharging', 'nightlife', 'con-artist', 'bill-scam'],
    travelerWarnings: {
      'solo-female': [
        '🚨 CRITICAL: Solo female travelers face the highest risk of drink spiking and assault in nightlife areas',
        'NEVER accept drinks from strangers, even if they seem friendly or claim to be hotel staff',
        'Avoid going to bars/clubs alone. If you do, stay in well-lit, busy tourist areas like Fort or Galle Face',
        'Tell your hotel where you\'re going and when you\'ll return. Keep emergency contacts ready',
        'Watch your drink at all times. If you leave it unattended, order a new one',
        'Several solo female travelers have reported being drugged and robbed in Colombo nightlife areas'
      ],
      'couple': [
        'Couples: Scammers may try to separate you by engaging one partner in conversation',
        'Stay together and agree beforehand on leaving if either feels uncomfortable',
        'One partner should always watch drinks when the other is away'
      ],
      'family': [
        'Families: This scam rarely targets families with children, but remain cautious in beach resort areas',
        'Stick to family-friendly hotel restaurants rather than local bars'
      ],
      'backpacker': [
        'Backpackers: Young solo travelers are prime targets in hostel areas and beach towns',
        'Travel in groups when going out at night. Many hostels organize group outings'
      ]
    }
  },
  {
    id: 'hotel-staff-impersonation',
    title: 'Hotel Staff Impersonation Scams',
    severity: 'high',
    category: 'guides',
    description: 'Scammers hang around hotels pretending to be staff to gain trust. They engage in friendly small talk and suddenly suggest gem exhibitions or party places.',
    realExamples: [
      'Fake staff member offers transport to "exclusive" party place',
      'Solo traveler drugged and robbed after accepting ride from fake hotel driver',
      'Impersonator gains room access claiming to be maintenance',
      'Fake concierge books tourist into commission-earning shops'
    ],
    preventionTips: [
      'Verify staff identity with hotel reception',
      'Don\'t trust anyone without official hotel ID',
      'Be extra cautious as solo travelers, especially women',
      'Listen to real hotel warnings about scams',
      'Don\'t accept transportation from non-verified staff',
      'Report suspicious individuals to hotel management'
    ],
    commonLocations: ['colombo-hotels', 'kandy-hotels', 'galle-hotels'],
    tags: ['hotel', 'impersonation', 'theft', 'fake-staff', 'safety', 'drugging'],
    travelerWarnings: {
      'solo-female': [
        '🚨 EXTREME RISK for solo female travelers: US Embassy specifically warns about drugging and robbery',
        'NEVER accept drinks or food from anyone claiming to be hotel staff outside hotel premises',
        'Do not accept unsolicited rides, even if they show fake hotel IDs',
        'Keep your hotel room number private. Real staff will have it on file',
        'If someone knocks claiming to be maintenance, call reception to verify first',
        'Report any suspicious behavior immediately to hotel management and tourist police (1912)'
      ],
      'couple': [
        'Couples: Fake staff may try to separate you by asking one partner for help',
        'Always verify staff identity together before accepting any services'
      ],
      'family': [
        'Families: Keep children close and teach them not to talk to fake staff members',
        'Real hotel staff will never ask to take children anywhere alone'
      ],
      'backpacker': [
        'Backpackers: Budget hotels and hostels are prime targets for impersonators',
        'Verify staff at the front desk before accepting any offers or services'
      ]
    }
  },
  {
    id: 'pickpocketing-schemes',
    title: 'Pickpocketing & Distraction Schemes',
    severity: 'high',
    category: 'general',
    description: 'Someone throws white paste on your shoulder mimicking bird poop. A friendly local offers to help clean up while pickpocketing you. Common in crowded areas.',
    realExamples: [
      'White paste thrown on shoulder, accomplice "helps" while stealing wallet',
      'Distraction in crowded market while pickpocket strikes',
      'Someone drops something, asks for help, partner steals belongings',
      'Staged argument draws attention while theft occurs'
    ],
    preventionTips: [
      'Keep valuables in inside pockets or money belts',
      'Be extra alert in crowded areas (Pettah market, Kandy, Colombo)',
      'Don\'t accept help from strangers for "cleaning"',
      'If something lands on you, secure valuables first',
      'Stay alert on public transportation',
      'Use anti-theft bags in tourist areas'
    ],
    commonLocations: ['colombo-pettah', 'kandy-downtown', 'colombo-fort'],
    tags: ['pickpocket', 'theft', 'distraction', 'bird-poop', 'crowded-areas', 'market']
  },
  {
    id: 'public-bus-overcharge',
    title: 'Public Bus Overcharging',
    severity: 'low',
    category: 'transport',
    description: 'Bus conductors overcharge tourists. If not issued a ticket, you\'re likely being overcharged. When you don\'t have exact change, they say they\'ll give balance when you get down but often don\'t.',
    realExamples: [
      'Conductor charges 200 LKR instead of actual 50 LKR fare',
      'No ticket issued, conductor claims meter is broken',
      'Promises to return change at destination, never does',
      'Different prices quoted to locals vs tourists'
    ],
    preventionTips: [
      'Always ask for a ticket',
      'Carry exact change in small denominations',
      'Ask locals about correct fares beforehand',
      'Consider using apps or private transport instead',
      'US embassy warns of harassment/theft risk on public buses'
    ],
    commonLocations: ['colombo-routes', 'kandy-routes', 'galle-routes'],
    tags: ['bus', 'public-transport', 'overcharge', 'conductor', 'ticket']
  },
  {
    id: 'animal-charmer-scams',
    title: 'Animal Charmer Scams',
    severity: 'low',
    category: 'general',
    description: 'Animal charmers with monkeys, snakes entertain crowds and ask viewers to join the show. After participating in "adventurous activities", they force participants to pay money.',
    realExamples: [
      'Snake charmer invites you to hold snake, then demands 1000 LKR',
      'Monkey handler places animal on your shoulder for photo, charges fee',
      'Street performance turns into aggressive payment demand',
      'Child participants pressured into payment by adults'
    ],
    preventionTips: [
      'Don\'t participate in animal shows without agreeing on price first',
      'Be wary of "free" animal interactions',
      'Consider animal welfare - these practices may be unethical',
      'Walk away if pressured for payment',
      'Politely decline participation'
    ],
    commonLocations: ['colombo-galle-face', 'kandy-lake', 'beach-areas'],
    tags: ['animal', 'entertainment', 'snake', 'monkey', 'street-performance', 'tourist-trap']
  },
  {
    id: 'fake-safari-guides',
    title: 'Fake Safari & Wildlife Guides',
    severity: 'high',
    category: 'safari',
    description: 'Unlicensed guides in Yala National Park take tourists on roads outside the park, never entering actual park. They keep entrance fees and provide mediocre experience with no wildlife.',
    realExamples: [
      'Group paid for Yala tour but were driven around rural roads',
      'Guides kept entrance fees, never entered the actual park',
      'No leopard or wildlife sightings despite promises',
      'Fake park entry with makeshift gates'
    ],
    preventionTips: [
      'Book safari tours only through licensed operators',
      'Verify park entrance at official gates',
      'Check reviews online before booking',
      'Ensure tour includes actual park entrance fees',
      'Ask to see guide\'s official license',
      'Book through reputable hotels or verified tour companies'
    ],
    commonLocations: ['yala', 'udawalawe', 'wilpattu'],
    tags: ['safari', 'wildlife', 'tour', 'yala', 'national-park', 'fake-guide', 'nature']
  },
  {
    id: 'visa-arrival-scams',
    title: 'Visa On Arrival Scams',
    severity: 'medium',
    category: 'money',
    description: 'At Colombo Airport, unlicensed "visa agents" offer on-arrival visa help for extra fees. Sri Lankan visas are electronic and can be obtained online or at official immigration counters.',
    realExamples: [
      'Scammer at airport offers to help with visa for 3000 LKR extra',
      'Tourist directed away from official counters to fake booth',
      'Fake visa agent charges double the official rate',
      'Agent keeps passport for "processing" and demands payment'
    ],
    preventionTips: [
      'Apply for Sri Lankan visa online before travel (Electronic Travel Authorization)',
      'Use official immigration counters at airport',
      'Don\'t use unofficial visa agents',
      'Visa on arrival is available but do it yourself at official counters',
      'Ignore anyone offering visa "help" for a fee'
    ],
    commonLocations: ['colombo-airport'],
    tags: ['visa', 'airport', 'immigration', 'fraud', 'eta', 'arrival']
  }
]

/**
 * LOCATIONS
 * Geographic locations with risk levels and associated scams
 */
export const locations: Location[] = [
  {
    id: 'colombo-pettah',
    name: 'Pettah Market',
    area: 'Colombo District',
    riskLevel: 'high',
    coordinates: { lat: 6.9387, lng: 79.8543 },
    summary: 'Notorious for pickpocketing, tuk-tuk diversions and gem-shop hustles. Crowds attract scammers posing as helpful locals.',
    commonScams: ['pickpocketing-schemes', 'tuktuk-overcharge', 'gemstone-scams', 'currency-exchange'],
    precautions: [
      'Keep valuables in inside pockets or anti-theft bags',
      'Avoid displaying expensive jewelry, cameras, or phones',
      'Stay in well-lit areas during shopping',
      'Be extra vigilant in crowded market areas',
      'Decline unsolicited help with cleaning or directions',
      'Use licensed money changers only, never street vendors'
    ],
    saferAlternatives: [
      {
        icon: '🚕',
        title: 'Use PickMe or Uber',
        description: 'App-based rides have GPS tracking and fixed pricing - safer than street tuk-tuks'
      },
      {
        icon: '🏪',
        title: 'Shop at Odel or Laksala',
        description: 'Fixed-price department stores and government shops have transparent pricing'
      },
      {
        icon: '💱',
        title: 'Exchange at Banks',
        description: 'Use Commercial Bank, Sampath Bank, or licensed exchange counters for currency'
      }
    ]
  },
  {
    id: 'colombo-fort',
    name: 'Fort District',
    area: 'Colombo Central',
    riskLevel: 'high',
    coordinates: { lat: 6.9355, lng: 79.8500 },
    summary: 'High concentration of gem shops and tuk-tuk scams. Currency exchange frauds common near tourist areas.',
    commonScams: ['tuktuk-overcharge', 'gemstone-scams', 'currency-exchange'],
    precautions: [
      'Never buy gemstones from tuk-tuk recommended shops',
      'Always negotiate tuk-tuk fares before getting in',
      'Use licensed currency exchange counters only',
      'Refuse any "special tour" or "commission-free shop" offers',
      'Keep your hotel address private from strangers',
      'Verify gem certifications with National Gem Authority if purchasing'
    ],
    saferAlternatives: [
      {
        icon: '🚖',
        title: 'Book Hotel Transport',
        description: 'Pre-arranged hotel pickups eliminate haggling and ensure safety'
      },
      {
        icon: '💎',
        title: 'Certified Gem Dealers Only',
        description: 'Use NGC/NGJA certified dealers if buying gems - verify certificates online'
      },
      {
        icon: '🏦',
        title: 'ATMs for Cash',
        description: 'Withdraw from bank ATMs inside branches for best rates and security'
      }
    ]
  },
  {
    id: 'colombo-airport',
    name: 'Bandaranaike Airport',
    area: 'Katunayake',
    riskLevel: 'high',
    coordinates: { lat: 7.1808, lng: 79.8841 },
    summary: 'Airport arrival area with visa scams, tuk-tuk overcharging, and fake transport services.',
    commonScams: ['visa-arrival-scams', 'tuktuk-overcharge', 'currency-exchange'],
    precautions: [
      'Apply for ETA visa online BEFORE arrival (www.eta.gov.lk)',
      'Ignore taxi touts inside terminal - use official airport taxi service',
      'Agree on fixed taxi fare before departure (approx 3,000-4,000 LKR to Colombo)',
      'Exchange minimal currency at airport - rates are poor',
      'Be wary of anyone offering "visa assistance" - it\'s a scam',
      'Use official airport information counters for guidance'
    ],
    saferAlternatives: [
      {
        icon: '🎫',
        title: 'Pre-book Airport Transfer',
        description: 'Arrange hotel pickup or use 1990 Airport Taxi Service (official counter in arrivals)'
      },
      {
        icon: '💳',
        title: 'Use Credit Cards Initially',
        description: 'Pay with cards until you reach better exchange rates in the city'
      },
      {
        icon: '📱',
        title: 'Get SIM Card First',
        description: 'Buy Dialog/Mobitel SIM at airport to use PickMe/Uber for transport'
      }
    ]
  },
  {
    id: 'colombo-galle-face',
    name: 'Galle Face Green',
    area: 'Colombo Seafront',
    riskLevel: 'medium',
    coordinates: { lat: 6.9271, lng: 79.8479 },
    summary: 'Popular oceanfront area with animal charmers and street vendor scams.',
    commonScams: ['animal-charmer-scams', 'pickpocketing-schemes']
  },
  {
    id: 'colombo-temples',
    name: 'Colombo Temples',
    area: 'Colombo Religious Sites',
    riskLevel: 'medium',
    coordinates: { lat: 6.9319, lng: 79.8478 },
    summary: 'Temple areas with fake monk blessing scams and aggressive donation requests.',
    commonScams: ['fake-monk-blessing', 'fake-tour-guides']
  },
  {
    id: 'kandy-temple',
    name: 'Temple of the Tooth',
    area: 'Kandy Central',
    riskLevel: 'high',
    coordinates: { lat: 7.2936, lng: 80.6407 },
    summary: 'Sri Lanka\'s most sacred Buddhist site attracts many fake guides and blessing scammers.',
    commonScams: ['fake-tour-guides', 'fake-monk-blessing', 'tuktuk-overcharge'],
    precautions: [
      'Real monks never handle money or ask for donations directly',
      'Decline all unsolicited flower/blessing offers at entrances',
      'Book official guides through temple office only (show badges)',
      'Dress modestly - shoulders and knees covered (guards enforce this)',
      'Remove shoes and hats before entering - use lockers provided',
      'Photography rules are strict - ask before taking photos inside'
    ],
    saferAlternatives: [
      {
        icon: '🎫',
        title: 'Official Temple Tours',
        description: 'Book through Temple Office or SLTDA-licensed agencies with uniformed guides'
      },
      {
        icon: '🙏',
        title: 'Donate at Official Points',
        description: 'Use donation boxes inside temple premises, not at entrances'
      },
      {
        icon: '📖',
        title: 'Use Audio Guides',
        description: 'Rent official audio guide at entrance for accurate information'
      }
    ]
  },
  {
    id: 'kandy-downtown',
    name: 'Kandy City Center',
    area: 'Kandy District',
    riskLevel: 'high',
    coordinates: { lat: 7.2906, lng: 80.6337 },
    summary: 'Hub for tuk-tuk scams, spice garden detours, and gem shop commissions.',
    commonScams: ['tuktuk-overcharge', 'spice-garden-scams', 'gemstone-scams', 'pickpocketing-schemes'],
    precautions: [
      'Refuse ALL spice garden and gem shop detours - drivers earn commissions',
      'Say "No spice gardens, no gem shops" clearly before starting journey',
      'Negotiate tuk-tuk fares beforehand (Kandy is small, most rides 200-400 LKR)',
      'Be alert in Kandy Market - pickpockets target distracted tourists',
      'Don\'t carry large amounts of cash when shopping',
      'Walk away from persistent touts without engaging'
    ],
    saferAlternatives: [
      {
        icon: '🚶',
        title: 'Walk When Possible',
        description: 'Kandy city center is compact - many attractions are within walking distance'
      },
      {
        icon: '🚌',
        title: 'Use Kandy City Bus',
        description: 'Local buses are cheap (20-50 LKR) and avoid scam drivers - ask locals for routes'
      },
      {
        icon: '🌿',
        title: 'Visit Royal Botanic Gardens',
        description: 'Go directly to Peradeniya Gardens instead of commercial spice gardens'
      }
    ]
  },
  {
    id: 'kandy-matale',
    name: 'Matale Spice Gardens',
    area: 'Between Kandy-Dambulla',
    riskLevel: 'medium',
    coordinates: { lat: 7.4694, lng: 80.6229 },
    summary: 'Area between Kandy and Dambulla notorious for spice garden commission scams.',
    commonScams: ['spice-garden-scams', 'tuktuk-overcharge']
  },
  {
    id: 'kandy-lake',
    name: 'Kandy Lake',
    area: 'Kandy Scenic Area',
    riskLevel: 'medium',
    coordinates: { lat: 7.2938, lng: 80.6403 },
    summary: 'Scenic area with animal charmers and unsolicited guide services.',
    commonScams: ['animal-charmer-scams', 'fake-tour-guides']
  },
  {
    id: 'galle-fort',
    name: 'Galle Fort',
    area: 'Galle District',
    riskLevel: 'high',
    coordinates: { lat: 6.0259, lng: 80.2168 },
    summary: 'UNESCO World Heritage site with aggressive touts, fake guides, and gem scams.',
    commonScams: ['fake-tour-guides', 'gemstone-scams', 'pickpocketing-schemes', 'tuktuk-overcharge']
  },
  {
    id: 'galle-coast',
    name: 'Galle Coastal Road',
    area: 'Southern Coast',
    riskLevel: 'medium',
    coordinates: { lat: 6.0328, lng: 80.2170 },
    summary: 'Coastal area with stilt fishermen photo scams and beach vendor hustles.',
    commonScams: ['stilt-fishermen-photos']
  },
  {
    id: 'weligama',
    name: 'Weligama Bay',
    area: 'Southern Coast',
    riskLevel: 'medium',
    coordinates: { lat: 5.9730, lng: 80.4290 },
    summary: 'Popular surf town with surfboard rental damage scams and stilt fishermen photos.',
    commonScams: ['surfboard-rental-damage', 'stilt-fishermen-photos']
  },
  {
    id: 'hikkaduwa',
    name: 'Hikkaduwa Beach',
    area: 'Southern Coast',
    riskLevel: 'medium',
    coordinates: { lat: 6.1409, lng: 80.1024 },
    summary: 'Tourist beach town with bar scams, surfboard rental issues, and nightlife fraud.',
    commonScams: ['friendly-local-bar', 'surfboard-rental-damage']
  },
  {
    id: 'unawatuna',
    name: 'Unawatuna Beach',
    area: 'Southern Coast',
    riskLevel: 'medium',
    coordinates: { lat: 6.0108, lng: 80.2500 },
    summary: 'Popular beach destination with bar/restaurant bill scams and beach vendor hustles.',
    commonScams: ['friendly-local-bar', 'pickpocketing-schemes']
  },
  {
    id: 'arugam-bay',
    name: 'Arugam Bay',
    area: 'Eastern Coast',
    riskLevel: 'low',
    coordinates: { lat: 6.8410, lng: 81.8365 },
    summary: 'Laid-back surf town with occasional surfboard rental damage claims.',
    commonScams: ['surfboard-rental-damage']
  },
  {
    id: 'bentota',
    name: 'Bentota Beach',
    area: 'Western Coast',
    riskLevel: 'medium',
    coordinates: { lat: 6.4258, lng: 79.9952 },
    summary: 'Resort area with bar scams and water sports rental issues.',
    commonScams: ['friendly-local-bar']
  },
  {
    id: 'negombo',
    name: 'Negombo Beach',
    area: 'Western Coast',
    riskLevel: 'medium',
    coordinates: { lat: 7.2098, lng: 79.8358 },
    summary: 'Beach town near airport with tourist-targeted bar and transport scams.',
    commonScams: ['friendly-local-bar', 'tuktuk-overcharge']
  },
  {
    id: 'sigiriya',
    name: 'Sigiriya Rock',
    riskLevel: 'high',
    coordinates: { lat: 7.9570, lng: 80.7603 },
    summary: 'Ancient rock fortress with aggressive fake guides and commission-seeking touts.',
    commonScams: ['fake-tour-guides']
  },
  {
    id: 'dambulla',
    name: 'Dambulla Cave Temple',
    riskLevel: 'medium',
    coordinates: { lat: 7.8567, lng: 80.6482 },
    summary: 'Cave temple complex with unsolicited guide services and blessing scams.',
    commonScams: ['fake-tour-guides', 'fake-monk-blessing']
  },
  {
    id: 'yala',
    name: 'Yala National Park',
    riskLevel: 'high',
    coordinates: { lat: 6.3724, lng: 81.5205 },
    summary: 'Premier wildlife park with fake safari guides and unlicensed operators.',
    commonScams: ['fake-safari-guides']
  },
  {
    id: 'udawalawe',
    name: 'Udawalawe National Park',
    riskLevel: 'medium',
    coordinates: { lat: 6.4733, lng: 80.8986 },
    summary: 'Elephant habitat with some unlicensed safari operators.',
    commonScams: ['fake-safari-guides']
  },
  {
    id: 'wilpattu',
    name: 'Wilpattu National Park',
    riskLevel: 'medium',
    coordinates: { lat: 8.4375, lng: 80.0290 },
    summary: 'Leopard territory with occasional fake guide issues.',
    commonScams: ['fake-safari-guides']
  },
  {
    id: 'ratnapura',
    name: 'Ratnapura Gem City',
    riskLevel: 'high',
    coordinates: { lat: 6.6825, lng: 80.4008 },
    summary: 'Sri Lanka\'s gem capital - high concentration of gem scams and fake dealers.',
    commonScams: ['gemstone-scams']
  },
  {
    id: 'koggala',
    name: 'Koggala Beach',
    riskLevel: 'low',
    coordinates: { lat: 5.9912, lng: 80.3284 },
    summary: 'Quieter coastal area with occasional stilt fishermen photo scams.',
    commonScams: ['stilt-fishermen-photos']
  },
  {
    id: 'colombo-routes',
    name: 'Colombo Bus Routes',
    riskLevel: 'low',
    coordinates: { lat: 6.9271, lng: 79.8612 },
    summary: 'Public bus network with minor overcharging of tourists.',
    commonScams: ['public-bus-overcharge']
  },
  {
    id: 'kandy-routes',
    name: 'Kandy Bus Routes',
    riskLevel: 'low',
    coordinates: { lat: 7.2906, lng: 80.6337 },
    summary: 'Regional bus routes with occasional tourist overcharging.',
    commonScams: ['public-bus-overcharge']
  },
  {
    id: 'galle-routes',
    name: 'Galle Bus Routes',
    riskLevel: 'low',
    coordinates: { lat: 6.0535, lng: 80.2210 },
    summary: 'Southern bus network with minor fare inflation for tourists.',
    commonScams: ['public-bus-overcharge']
  },
  {
    id: 'colombo-hotels',
    name: 'Colombo Hotel Areas',
    riskLevel: 'medium',
    coordinates: { lat: 6.9271, lng: 79.8612 },
    summary: 'Hotel districts with fake staff impersonation risks.',
    commonScams: ['hotel-staff-impersonation']
  },
  {
    id: 'kandy-hotels',
    name: 'Kandy Hotel Areas',
    riskLevel: 'medium',
    coordinates: { lat: 7.2906, lng: 80.6337 },
    summary: 'Tourist accommodation areas with impersonation scams.',
    commonScams: ['hotel-staff-impersonation']
  },
  {
    id: 'galle-hotels',
    name: 'Galle Hotel Areas',
    riskLevel: 'medium',
    coordinates: { lat: 6.0328, lng: 80.2210 },
    summary: 'Resort areas with occasional fake staff issues.',
    commonScams: ['hotel-staff-impersonation']
  },
  {
    id: 'beach-areas',
    name: 'General Beach Areas',
    riskLevel: 'low',
    coordinates: { lat: 6.4258, lng: 79.9952 },
    summary: 'Various beach locations with minor tourist-targeted hustles.',
    commonScams: ['animal-charmer-scams']
  }
]

/**
 * ACTIVITIES
 * Activity types with related scam mappings
 */
export const activities: Activity[] = [
  {
    id: 'transport',
    label: 'Transportation & Taxis',
    relatedScams: ['tuktuk-overcharge', 'public-bus-overcharge']
  },
  {
    id: 'shopping',
    label: 'Shopping & Markets',
    relatedScams: ['gemstone-scams', 'spice-garden-scams', 'pickpocketing-schemes']
  },
  {
    id: 'sightseeing',
    label: 'Temples & Sightseeing',
    relatedScams: ['fake-tour-guides', 'fake-monk-blessing']
  },
  {
    id: 'nightlife',
    label: 'Bars & Nightlife',
    relatedScams: ['friendly-local-bar', 'hotel-staff-impersonation']
  },
  {
    id: 'beach',
    label: 'Beach & Water Sports',
    relatedScams: ['stilt-fishermen-photos', 'surfboard-rental-damage']
  },
  {
    id: 'temple',
    label: 'Religious Sites',
    relatedScams: ['fake-monk-blessing', 'fake-tour-guides']
  },
  {
    id: 'safari',
    label: 'Wildlife & Safaris',
    relatedScams: ['fake-safari-guides', 'animal-charmer-scams']
  },
  {
    id: 'money',
    label: 'Money & Banking',
    relatedScams: ['currency-exchange', 'visa-arrival-scams']
  },
  {
    id: 'accommodation',
    label: 'Hotels & Accommodation',
    relatedScams: ['hotel-staff-impersonation']
  },
  {
    id: 'general',
    label: 'General Tourist Areas',
    relatedScams: ['pickpocketing-schemes', 'animal-charmer-scams']
  }
]

/**
 * REPORTING INFORMATION
 * Emergency contacts and what to do if scammed
 */
export const reportingInfo: ReportingInfo = {
  touristPoliceContact: {
    number: '1912',
    description: 'Tourist Police hotline - 24/7 multilingual support for tourists in distress'
  },
  emergencyNumbers: {
    police: '119',
    touristPolice: '1912',
    emergency: '110',
    consumerAffairs: '+94 11 2 421 451'
  },
  whatToDoIfScammed: [
    '1. Stay calm and remove yourself from the situation if you feel unsafe',
    '2. Do not physically confront scammers - prioritize your safety',
    '3. Note down all details: names, locations, descriptions, amounts, time',
    '4. Take photos/videos if safe to do so (location, people, receipts)',
    '5. Call Tourist Police (1912) immediately - they have multilingual support',
    '6. File a police report at the nearest police station with all evidence',
    '7. Contact your embassy or consulate if large amounts or safety issues',
    '8. Report credit card fraud to your bank immediately if cards involved',
    '9. Keep all receipts, invoices, and communication records',
    '10. Share your experience on travel forums to warn other tourists',
    '11. Report to Sri Lanka Tourism at complaints@srilanka.travel',
    '12. Contact Consumer Affairs Authority (+94 11 2 421 451) for major commercial fraud'
  ]
}

/**
 * HELPER FUNCTIONS
 */

export function getScamTypeById(id: string): ScamType | undefined {
  return scamTypes.find(scam => scam.id === id)
}

export function getLocationById(id: string): Location | undefined {
  return locations.find(loc => loc.id === id)
}

export function getActivityById(id: string): Activity | undefined {
  return activities.find(act => act.id === id)
}

export function getScamsByCategory(category: string): ScamType[] {
  return scamTypes.filter(scam => scam.category === category)
}

export function getScamsBySeverity(severity: string): ScamType[] {
  return scamTypes.filter(scam => scam.severity === severity)
}

export function getScamsByLocation(locationId: string): ScamType[] {
  const location = getLocationById(locationId)
  if (!location) return []
  return scamTypes.filter(scam => location.commonScams.includes(scam.id))
}

export function getLocationsByRisk(riskLevel: string): Location[] {
  return locations.filter(loc => loc.riskLevel === riskLevel)
}

export function getHighRiskLocations(): Location[] {
  return locations.filter(loc => loc.riskLevel === 'high')
}

export function getCriticalScams(): ScamType[] {
  return scamTypes.filter(scam => scam.severity === 'critical')
}

export function searchScams(query: string): ScamType[] {
  const lowerQuery = query.toLowerCase()
  return scamTypes.filter(scam =>
    scam.title.toLowerCase().includes(lowerQuery) ||
    scam.description.toLowerCase().includes(lowerQuery) ||
    scam.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    scam.realExamples.some(ex => ex.toLowerCase().includes(lowerQuery))
  )
}
