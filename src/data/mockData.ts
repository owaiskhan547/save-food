import { FoodBatch, TransitLogistics, NotificationItem } from '../types';

export const INITIAL_BATCHES: FoodBatch[] = [
  // Hero Urgent Card item
  {
    id: 'batch-hero-1',
    donorName: 'Grand Banquet Palace',
    donorType: 'Luxury Banquet & Wedding Hall',
    locationArea: 'Mumbai Central',
    distanceKm: 1.8,
    distanceLabel: '1.8 km away',
    title: '40 Hot Prepared Dinner Plates',
    description: '40 Hot Prepared Dinner Plates • Veg, Rice & Rotis',
    quantityLabel: '40 Plates (Serves ~45 people)',
    urgencyScore: 98,
    isCritical: true,
    expirySecondsRemaining: 1 * 3600 + 42 * 60 + 14, // 01h 42m 14s
    category: 'cooked',
    tags: ['Halal + Veg', 'Pure Vegetarian', 'Heated Insulated Box'],
    status: 'available',
    verified: true,
    iconName: 'timer',
    iconBgColor: 'bg-[#ffdad6]',
    iconTextColor: 'text-[#ba1a1a]',
    pickupWindow: '01h 42m 14s',
    donorPhone: '+91 98201 44521',
    donorAddress: 'Gate 4, Grand Banquet Palace, Bellasis Rd, Mumbai Central',
    temperatureHolding: '72°C (Insulated thermal vat)'
  },
  // Card 1 from HTML
  {
    id: 'batch-spice-1',
    donorName: 'The Spice Pavilion',
    donorType: 'Banquet Caterer',
    locationArea: 'Lower Parel',
    distanceKm: 1.2,
    distanceLabel: 'Banquet Caterer • Lower Parel (1.2 km)',
    title: '45 Hot Thali Meals',
    description: 'Rice, Daal Tadka, Paneer Butter Masala, 90 Rotis. Vacuum packed in thermal catering containers.',
    quantityLabel: '45 Thali Meals',
    urgencyScore: 94,
    expirySecondsRemaining: 1 * 3600 + 25 * 60 + 40, // 01:25:40
    category: 'cooked',
    tags: ['FSSAI Certified', 'Pure Vegetarian'],
    status: 'available',
    verified: true,
    iconName: 'soup_kitchen',
    iconBgColor: 'bg-[#dce9ff]',
    iconTextColor: 'text-[#006b2c]',
    pickupWindow: '⏳ 01:25:40 left',
    donorPhone: '+91 98210 99881',
    donorAddress: 'Senapati Bapat Marg, Lower Parel West, Mumbai',
    temperatureHolding: '68°C'
  },
  // Card 2 from HTML (Locked)
  {
    id: 'batch-sunrise-1',
    donorName: 'Sunrise Artisan Bakery',
    donorType: 'Bakery',
    locationArea: 'Bandra West',
    distanceKm: 2.6,
    distanceLabel: 'Bakery • Bandra West (2.6 km)',
    title: '25 Boxes Fresh Sourdough & Baguettes',
    description: 'Baked this morning, packaged in brown bakery kraft boxes. Ready for immediate pickup.',
    quantityLabel: '25 Kraft Boxes (50+ Loaves)',
    urgencyScore: 82,
    expirySecondsRemaining: 3 * 3600 + 10 * 60, // 03:10:00
    category: 'bakery',
    tags: ['FSSAI Certified', 'Freshly Baked', 'Shelter Priority'],
    status: 'locked',
    claimedBy: 'St. Jude Children Shelter',
    transitStatus: 'Driver En Route',
    verified: true,
    iconName: 'bakery_dining',
    iconBgColor: 'bg-[#ffdbca]',
    iconTextColor: 'text-[#9d4300]',
    pickupWindow: '03:10:00 remaining',
    donorPhone: '+91 98190 22334',
    donorAddress: 'Hill Road, Near Mehboob Studio, Bandra West, Mumbai',
    temperatureHolding: 'Ambient / Dry (22°C)'
  },
  // Card 3 from HTML
  {
    id: 'batch-greenvalley-1',
    donorName: 'Green Valley Depot',
    donorType: 'Organic Farm',
    locationArea: 'Dadar Market',
    distanceKm: 3.4,
    distanceLabel: 'Organic Farm • Dadar Market (3.4 km)',
    title: '120 kg Fresh Spinach & Mixed Greens',
    description: 'Surplus post-harvest farm stock. Suited for community kitchen batch cooking.',
    quantityLabel: '120 kg (Crates of 15kg each)',
    urgencyScore: 76,
    expirySecondsRemaining: 5 * 3600 + 45 * 60,
    category: 'produce',
    tags: ['Organic Harvest', 'Zero Pesticides', 'Cold Stored'],
    status: 'available',
    verified: true,
    iconName: 'eco',
    iconBgColor: 'bg-[#89f5e7]',
    iconTextColor: 'text-[#00685f]',
    pickupWindow: 'Pickup by 8:00 PM',
    donorPhone: '+91 98205 77123',
    donorAddress: 'Wholesale Veg Market Bay 12, Dadar West, Mumbai',
    temperatureHolding: 'Chilled Produce (8°C)'
  },
  // Additional realistic batch 4
  {
    id: 'batch-marina-1',
    donorName: 'Marina Blue Patisserie',
    donorType: 'High-end Confectionery',
    locationArea: 'Churchgate',
    distanceKm: 4.1,
    distanceLabel: 'Confectionery • Churchgate (4.1 km)',
    title: '35 Pks Croissants & Wholewheat Loaves',
    description: 'Day-end surplus artisan viennoiserie, sealed in hygienic food-grade paper packs.',
    quantityLabel: '35 Multi-packs',
    urgencyScore: 89,
    expirySecondsRemaining: 2 * 3600 + 15 * 60,
    category: 'bakery',
    tags: ['Vegetarian', 'Oven Sealed'],
    status: 'available',
    verified: true,
    iconName: 'cookie',
    iconBgColor: 'bg-[#ffdad6]',
    iconTextColor: 'text-[#ba1a1a]',
    pickupWindow: '⏳ 02:15:00 left',
    donorPhone: '+91 98222 11984',
    donorAddress: 'Veer Nariman Rd, Churchgate, Mumbai',
    temperatureHolding: 'Ambient (21°C)'
  },
  // Additional realistic batch 5
  {
    id: 'batch-sagar-1',
    donorName: 'Sagar Caterers & Events',
    donorType: 'Corporate Caterer',
    locationArea: 'Worli',
    distanceKm: 2.1,
    distanceLabel: 'Corporate Caterer • Worli (2.1 km)',
    title: '60 Boxes Veg Biryani & Cucumber Raita',
    description: 'Post-seminar buffet excess, packed in portion-controlled microwave safe containers.',
    quantityLabel: '60 Portions',
    urgencyScore: 92,
    expirySecondsRemaining: 1 * 3600 + 10 * 60,
    category: 'cooked',
    tags: ['FSSAI Certified', 'Hot Insulated', 'Halal + Veg'],
    status: 'available',
    verified: true,
    iconName: 'dinner_dining',
    iconBgColor: 'bg-[#dce9ff]',
    iconTextColor: 'text-[#006b2c]',
    pickupWindow: '⏳ 01:10:00 left',
    donorPhone: '+91 98330 45450',
    donorAddress: 'Worli Naka, Dr Annie Besant Rd, Mumbai',
    temperatureHolding: '65°C'
  }
];

export const INITIAL_TRANSIT: TransitLogistics = {
  id: 'transit-1',
  code: '#FR-892',
  donorName: 'Grand Banquet Palace',
  donorAddress: 'Bellasis Rd, Mumbai Central',
  shelterName: 'Robin Hood Shelter',
  shelterAddress: 'Byculla East, Community Kitchen',
  volunteerName: 'Volunteer Rahul K.',
  volunteerPhone: '+91 97690 12893',
  etaMinutes: 12,
  currentStep: 3,
  steps: [
    {
      title: 'Listed',
      description: 'Grand Banquet Palace logged 40 hot dinner plates with expiry window',
      timestamp: '21:15',
      completed: true,
      active: false
    },
    {
      title: 'Claimed',
      description: 'Robin Hood Shelter claimed reservation for 40 beneficiaries',
      timestamp: '21:28',
      completed: true,
      active: false
    },
    {
      title: 'Locked',
      description: 'Reservation locked, security OTP #9842 verified with donor',
      timestamp: '21:35',
      completed: true,
      active: true
    },
    {
      title: 'In Transit',
      description: 'Insulated van en route via Bellasis flyover, cold/hot chain seal intact',
      timestamp: 'Est. 21:45',
      completed: false,
      active: false
    },
    {
      title: 'Distributed',
      description: 'Handover sign-off and temperature re-verification at shelter',
      timestamp: 'Est. 21:55',
      completed: false,
      active: false
    }
  ],
  temperatureReading: '71.4°C (Safe Zone >60°C)',
  otpCode: 'RF-9842'
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Critical Expiry Alert',
    message: 'Grand Banquet Palace listed 40 dinner plates expiring in under 2 hours (1.8 km away).',
    timeAgo: '4m ago',
    type: 'urgent',
    read: false
  },
  {
    id: 'n-2',
    title: 'Transit Courier On Way',
    message: 'Rahul K. is 12 mins away from Robin Hood Shelter with batch #FR-892.',
    timeAgo: '14m ago',
    type: 'transit',
    read: false
  },
  {
    id: 'n-3',
    title: 'FSSAI Safety Verified',
    message: 'The Spice Pavilion inspection report has been cryptographically confirmed for PS-05 grid.',
    timeAgo: '32m ago',
    type: 'safety',
    read: true
  },
  {
    id: 'n-4',
    title: 'Batch Successfully Delivered',
    message: 'St. Jude Shelter received 25 bakery crates from Sunrise Artisan Bakery.',
    timeAgo: '1h ago',
    type: 'verification',
    read: true
  }
];

export const SHELTERS_LIST = [
  { id: 'sh-1', name: 'Robin Hood Shelter', area: 'Byculla East (1.4 km)', capacity: '60 people' },
  { id: 'sh-2', name: 'St. Jude Children Shelter', area: 'Bandra West (2.8 km)', capacity: '80 people' },
  { id: 'sh-3', name: 'Rotary Community Kitchen', area: 'Dadar Central (3.2 km)', capacity: '120 people' },
  { id: 'sh-4', name: 'Asha Kiran Night Shelter', area: 'Mumbai Central (0.8 km)', capacity: '45 people' }
];

export const LOCATIONS = [
  'Mumbai Central • 2.4 km',
  'Lower Parel • 1.2 km',
  'Bandra West • 2.6 km',
  'Dadar West • 3.4 km',
  'Worli Seaface • 2.1 km',
  'Andheri East • 6.5 km'
];
