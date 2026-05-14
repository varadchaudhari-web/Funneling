export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'business_owner' | 'agency' | 'sales';
  avatar?: string;
  plan: 'starter' | 'pro' | 'enterprise';
  joinedAt: string;
  company?: string;
}

export interface Funnel {
  id: string;
  name: string;
  userId: string;
  status: 'active' | 'draft' | 'paused';
  steps: FunnelStep[];
  visits: number;
  conversions: number;
  revenue: number;
  createdAt: string;
  updatedAt: string;
  template?: string;
}

export interface FunnelStep {
  id: string;
  name: string;
  type: 'landing' | 'optin' | 'sales' | 'upsell' | 'downsell' | 'thankyou';
  url?: string;
  visits: number;
  conversions: number;
  conversionRate: number;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed_won' | 'closed_lost';
  score: number;
  tags: string[];
  funnelId?: string;
  createdAt: string;
  value?: number;
  notes?: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'whatsapp' | 'ads';
  status: 'active' | 'draft' | 'paused' | 'completed';
  sent: number;
  opened: number;
  clicked: number;
  converted: number;
  revenue: number;
  createdAt: string;
  scheduledAt?: string;
}

export interface Notification {
  id: string;
  type: 'lead' | 'sale' | 'campaign' | 'system' | 'affiliate';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  userId: string;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'success' | 'failed' | 'pending' | 'refunded';
  plan: string;
  createdAt: string;
  invoiceUrl?: string;
}

export interface Affiliate {
  id: string;
  userId: string;
  referralCode: string;
  referrals: number;
  earnings: number;
  pendingPayout: number;
  clicks: number;
  conversions: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number;
  value3?: number;
}

export interface AnalyticsData {
  revenue: ChartDataPoint[];
  conversions: ChartDataPoint[];
  traffic: ChartDataPoint[];
  funnel: ChartDataPoint[];
}
