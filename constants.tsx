
import { VideoPost, Creator, AppView } from './types';

export const MOCK_CREATORS: Creator[] = [
  { id: '1', username: 'alex_vibes', avatar: 'https://picsum.photos/seed/alex/100/100', followers: 125000 },
  { id: '2', username: 'tech_guru', avatar: 'https://picsum.photos/seed/tech/100/100', followers: 890000 },
  { id: '3', username: 'fashion_forward', avatar: 'https://picsum.photos/seed/fashion/100/100', followers: 45000 },
];

export const MOCK_POSTS: VideoPost[] = [
  {
    id: 'v1',
    creator: MOCK_CREATORS[0],
    description: 'Check out this amazing sunset! 🌅 #nature #aesthetic',
    tags: ['nature', 'aesthetic'],
    likes: 45200,
    comments: 320,
    shares: 1200,
    videoUrl: 'https://picsum.photos/seed/sunset/1080/1920',
    isAd: false
  },
  {
    id: 'v2',
    creator: MOCK_CREATORS[1],
    description: 'The new VibeTok Pro Camera is here. Upgrade your content now!',
    tags: ['tech', 'camera', 'pro'],
    likes: 12000,
    comments: 50,
    shares: 400,
    videoUrl: 'https://picsum.photos/seed/camera/1080/1920',
    isAd: true,
    adBrand: 'VibeTok Hardware',
    cta: 'Shop Now'
  },
  {
    id: 'v3',
    creator: MOCK_CREATORS[2],
    description: 'Morning routine in NYC. ☕️🏙️ #lifestyle #citylife',
    tags: ['lifestyle', 'citylife'],
    likes: 88000,
    comments: 1100,
    shares: 5600,
    videoUrl: 'https://picsum.photos/seed/nyc/1080/1920',
    isAd: false
  }
];

export const EARNING_SOURCES = [
  { name: 'Ads', color: '#10b981' },
  { name: 'Tips', color: '#3b82f6' },
  { name: 'Brand Deals', color: '#8b5cf6' },
  { name: 'Creator Fund', color: '#f59e0b' }
];
