export interface SocialAnalyticsState {
  loading: boolean;
  error: string | null;
  socialLogin: string | null;
  socialAnalytics: any;
  main: any[];
  facebook: any[];
  instagram: any[];
  youtube: any[];
  x: any[];
  tiktok: any[];
  behance: any[];
  pinterest: any[];
  snapchat: any[];
  thread: any[];
  linkedin: any[];
  connectedPlatforms: { [key: string]: boolean }
}
