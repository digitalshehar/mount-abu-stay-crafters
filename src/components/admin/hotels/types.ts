
// Types for the hotel management components
export interface Hotel {
  id: number;
  name: string;
  slug: string;
  location: string;
  stars: number;
  pricePerNight: number;
  image: string;
  status: 'active' | 'inactive';
  description: string;
  amenities: string[];
  rooms: Room[];
  featured: boolean;
  reviewCount: number;
  rating: number;
  gallery?: string[];
  categories: string[];
  seasonalPricing?: SeasonalPrice[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  latitude?: number;
  longitude?: number;
  versionHistory?: HotelVersion[];
  lastModifiedBy?: string;
  lastModifiedAt?: string;
}

export interface Room {
  type: string;
  capacity: number;
  price: number;
  count: number;
  images?: string[];
}

export interface NewHotel {
  name: string;
  location: string;
  stars: number;
  pricePerNight: number;
  image: string;
  description: string;
  amenities: string[];
  rooms: Room[];
  featured: boolean;
  gallery: string[];
  categories: string[];
  seasonalPricing: SeasonalPrice[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  latitude?: number;
  longitude?: number;
}

export interface FilterOptions {
  priceRange: [number, number];
  starRating: number[];
  amenities: string[];
  maxPrice: number;
}

export interface SeasonalPrice {
  id?: number;
  hotelId?: number;
  name: string;
  startDate: string;
  endDate: string;
  priceMultiplier: number;
}

export interface BulkActionOptions {
  delete: boolean;
  toggleStatus: boolean;
  toggleFeatured: boolean;
}

export interface HotelVersion {
  id: number;
  hotelId: number;
  versionData: Hotel;
  createdAt: string;
  createdBy: string;
}

export interface AuditLog {
  id: number;
  entityType: 'hotel' | 'room' | 'seasonalPrice';
  entityId: number;
  action: 'create' | 'update' | 'delete';
  details: string;
  userId: string;
  userName: string;
  timestamp: string;
}

export interface UserRole {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface Permission {
  resource: 'hotels' | 'rooms' | 'seasonalPricing';
  actions: Array<'create' | 'read' | 'update' | 'delete'>;
}

export const defaultUserRoles: UserRole[] = [
  {
    id: 'admin',
    name: 'Administrator',
    permissions: [
      { resource: 'hotels', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'rooms', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'seasonalPricing', actions: ['create', 'read', 'update', 'delete'] }
    ]
  },
  {
    id: 'editor',
    name: 'Editor',
    permissions: [
      { resource: 'hotels', actions: ['read', 'update'] },
      { resource: 'rooms', actions: ['read', 'update'] },
      { resource: 'seasonalPricing', actions: ['read', 'update'] }
    ]
  },
  {
    id: 'viewer',
    name: 'Viewer',
    permissions: [
      { resource: 'hotels', actions: ['read'] },
      { resource: 'rooms', actions: ['read'] },
      { resource: 'seasonalPricing', actions: ['read'] }
    ]
  }
];
