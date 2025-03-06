
import { RecommendationItem } from '@/types/recommendations';

export const recommendationsData: RecommendationItem[] = [
  {
    id: 1,
    type: 'hotel',
    name: 'Hilltop Luxury Resort',
    description: 'Premium resort with mountain views',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    rating: 4.8,
    price: '₹5,800',
    tags: ['luxury', 'spa', 'family-friendly']
  },
  {
    id: 2,
    type: 'attraction',
    name: 'Nakki Lake',
    description: 'Beautiful lake perfect for boating',
    image: 'https://images.unsplash.com/photo-1522067533025-89b802de9bbf?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    rating: 4.6,
    price: 'Free',
    tags: ['nature', 'family-friendly', 'photography']
  },
  {
    id: 3,
    type: 'activity',
    name: 'Trekking to Guru Shikhar',
    description: 'Exciting trek to the highest peak',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    rating: 4.7,
    price: '₹1,200',
    tags: ['adventure', 'nature', 'photography']
  },
  {
    id: 4,
    type: 'restaurant',
    name: 'Arbuda Restaurant',
    description: 'Traditional Rajasthani cuisine',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    rating: 4.5,
    price: '₹₹',
    tags: ['traditional', 'family-friendly', 'vegetarian']
  },
  {
    id: 5,
    type: 'attraction',
    name: 'Dilwara Temples',
    description: 'Exquisite Jain temples with marble carvings',
    image: 'https://images.unsplash.com/photo-1514434789019-00f42a4b7c47?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    rating: 4.9,
    price: '₹100',
    tags: ['cultural', 'historic', 'architecture']
  },
  {
    id: 6,
    type: 'hotel',
    name: 'Mountain View Cottages',
    description: 'Cozy cottages near Sunset Point',
    image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    rating: 4.3,
    price: '₹3,500',
    tags: ['budget', 'couples', 'views']
  },
];
