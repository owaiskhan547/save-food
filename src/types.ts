export type CategoryType = 'all' | 'urgent' | 'cooked' | 'bakery' | 'produce';

export interface FoodBatch {
  id: string;
  donorName: string;
  donorType: string;
  locationArea: string;
  distanceKm: number;
  distanceLabel: string;
  title: string;
  description: string;
  quantityLabel: string;
  urgencyScore: number;
  isCritical?: boolean;
  expirySecondsRemaining: number;
  category: 'cooked' | 'bakery' | 'produce' | 'dairy';
  tags: string[];
  status: 'available' | 'locked' | 'claimed' | 'in_transit' | 'delivered';
  claimedBy?: string;
  transitStatus?: string;
  verified: boolean;
  iconName: string; // Material symbol icon
  iconBgColor: string;
  iconTextColor: string;
  pickupWindow: string;
  donorPhone: string;
  donorAddress: string;
  temperatureHolding?: string;
}

export interface TransitLogistics {
  id: string;
  code: string;
  donorName: string;
  donorAddress: string;
  shelterName: string;
  shelterAddress: string;
  volunteerName: string;
  volunteerPhone: string;
  etaMinutes: number;
  currentStep: number; // 1 to 5
  steps: {
    title: string;
    description: string;
    timestamp: string;
    completed: boolean;
    active: boolean;
  }[];
  temperatureReading: string;
  otpCode: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  type: 'urgent' | 'transit' | 'verification' | 'safety';
  read: boolean;
}
