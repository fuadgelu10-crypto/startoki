
export interface Creator {
  id: string;
  username: string;
  avatar: string;
  followers: number;
}

export interface VideoPost {
  id: string;
  creator: Creator;
  description: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  videoUrl: string;
  isAd: boolean;
  adBrand?: string;
  cta?: string;
}

export enum AppView {
  FEED = 'FEED',
  DASHBOARD = 'DASHBOARD',
  ADS_MANAGER = 'ADS_MANAGER',
  PROFILE = 'PROFILE'
}

export interface EarningStats {
  date: string;
  amount: number;
  source: 'Ads' | 'Tips' | 'Brand Deals' | 'Creator Fund';
}
