import type { User, Funnel, Lead, Campaign, Notification, Payment, Affiliate, AnalyticsData } from '@/types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Alex Johnson',
    email: 'alex@business.com',
    role: 'business_owner',
    plan: 'pro',
    joinedAt: '2024-01-15',
    company: 'TechLaunch Inc.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 'u2',
    name: 'Sarah Mitchell',
    email: 'sarah@agency.com',
    role: 'agency',
    plan: 'enterprise',
    joinedAt: '2023-11-20',
    company: 'DigitalPro Agency',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Mitchell&background=4F46E5&color=fff&size=80',
  },
  {
    id: 'u3',
    name: 'Marcus Williams',
    email: 'marcus@sales.com',
    role: 'sales',
    plan: 'starter',
    joinedAt: '2024-03-01',
    company: 'SalesForce Pro',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 'admin',
    name: 'Admin User',
    email: 'admin@funneling.io',
    role: 'admin',
    plan: 'enterprise',
    joinedAt: '2023-01-01',
    company: 'Funneling HQ',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face',
  },
];

export const MOCK_FUNNELS: Funnel[] = [
  {
    id: 'f1',
    name: 'Product Launch Funnel',
    userId: 'u1',
    status: 'active',
    visits: 12450,
    conversions: 1867,
    revenue: 87340,
    createdAt: '2024-02-10',
    updatedAt: '2024-04-28',
    template: 'Product Launch',
    steps: [
      { id: 's1', name: 'Landing Page', type: 'landing', visits: 12450, conversions: 7890, conversionRate: 63.4 },
      { id: 's2', name: 'Opt-in Page', type: 'optin', visits: 7890, conversions: 4230, conversionRate: 53.6 },
      { id: 's3', name: 'Sales Page', type: 'sales', visits: 4230, conversions: 1867, conversionRate: 44.1 },
      { id: 's4', name: 'Order Bump', type: 'upsell', visits: 1867, conversions: 934, conversionRate: 50.0 },
      { id: 's5', name: 'Thank You', type: 'thankyou', visits: 1867, conversions: 1867, conversionRate: 100 },
    ],
  },
  {
    id: 'f2',
    name: 'Lead Generation Funnel',
    userId: 'u1',
    status: 'active',
    visits: 8920,
    conversions: 2140,
    revenue: 32100,
    createdAt: '2024-01-22',
    updatedAt: '2024-04-30',
    template: 'Lead Gen',
    steps: [
      { id: 's1', name: 'Squeeze Page', type: 'landing', visits: 8920, conversions: 5350, conversionRate: 59.9 },
      { id: 's2', name: 'Lead Capture', type: 'optin', visits: 5350, conversions: 2140, conversionRate: 40.0 },
      { id: 's3', name: 'Thank You', type: 'thankyou', visits: 2140, conversions: 2140, conversionRate: 100 },
    ],
  },
  {
    id: 'f3',
    name: 'Webinar Registration Funnel',
    userId: 'u2',
    status: 'active',
    visits: 5600,
    conversions: 1120,
    revenue: 56000,
    createdAt: '2024-03-05',
    updatedAt: '2024-04-25',
    template: 'Webinar',
    steps: [
      { id: 's1', name: 'Registration Page', type: 'landing', visits: 5600, conversions: 2800, conversionRate: 50.0 },
      { id: 's2', name: 'Confirmation', type: 'optin', visits: 2800, conversions: 1120, conversionRate: 40.0 },
    ],
  },
  {
    id: 'f4',
    name: 'Course Sales Funnel',
    userId: 'u1',
    status: 'draft',
    visits: 0,
    conversions: 0,
    revenue: 0,
    createdAt: '2024-04-20',
    updatedAt: '2024-04-20',
    template: 'Course Sales',
    steps: [],
  },
  {
    id: 'f5',
    name: 'E-commerce Funnel',
    userId: 'u2',
    status: 'paused',
    visits: 3200,
    conversions: 640,
    revenue: 19200,
    createdAt: '2024-02-28',
    updatedAt: '2024-04-10',
    template: 'E-commerce',
    steps: [
      { id: 's1', name: 'Product Page', type: 'landing', visits: 3200, conversions: 1920, conversionRate: 60.0 },
      { id: 's2', name: 'Cart', type: 'sales', visits: 1920, conversions: 960, conversionRate: 50.0 },
      { id: 's3', name: 'Checkout', type: 'sales', visits: 960, conversions: 640, conversionRate: 66.7 },
    ],
  },
];

export const MOCK_LEADS: Lead[] = [
  { id: 'l1', name: 'Jennifer Smith', email: 'jen@example.com', phone: '+1-555-0101', company: 'Acme Corp', source: 'Facebook Ads', status: 'qualified', score: 85, tags: ['hot', 'enterprise'], createdAt: '2024-04-28', value: 2500, notes: 'Interested in enterprise plan' },
  { id: 'l2', name: 'Robert Chen', email: 'rchen@tech.io', phone: '+1-555-0102', company: 'TechHub', source: 'Google Ads', status: 'proposal', score: 92, tags: ['hot', 'decision-maker'], createdAt: '2024-04-27', value: 5000, notes: 'Ready to upgrade from starter' },
  { id: 'l3', name: 'Emily Rodriguez', email: 'emily@startup.co', source: 'Organic', status: 'new', score: 45, tags: ['new', 'startup'], createdAt: '2024-04-30', value: 800 },
  { id: 'l4', name: 'David Park', email: 'd.park@agency.net', phone: '+1-555-0104', company: 'Digital Agency', source: 'Referral', status: 'contacted', score: 70, tags: ['agency', 'warm'], createdAt: '2024-04-29', value: 3200 },
  { id: 'l5', name: 'Lisa Thompson', email: 'lisa.t@corp.com', company: 'BigCorp', source: 'LinkedIn', status: 'closed_won', score: 98, tags: ['enterprise', 'closed'], createdAt: '2024-04-15', value: 12000, notes: 'Enterprise annual deal signed' },
  { id: 'l6', name: 'Kevin Martinez', email: 'kevin@shop.io', source: 'Email Campaign', status: 'new', score: 30, tags: ['cold', 'ecommerce'], createdAt: '2024-04-30', value: 600 },
  { id: 'l7', name: 'Priya Patel', email: 'priya@consulting.in', company: 'Patel Consulting', source: 'Facebook Ads', status: 'qualified', score: 78, tags: ['warm', 'consultant'], createdAt: '2024-04-26', value: 1800 },
  { id: 'l8', name: 'Tom Wilson', email: 'tom.w@freelance.dev', source: 'Webinar', status: 'contacted', score: 55, tags: ['freelancer'], createdAt: '2024-04-25', value: 400 },
  { id: 'l9', name: 'Amanda Foster', email: 'amanda@marketing.co', company: 'Foster Marketing', source: 'Google Ads', status: 'closed_lost', score: 40, tags: ['lost', 'budget'], createdAt: '2024-04-10', value: 1200, notes: 'Budget constraints' },
  { id: 'l10', name: 'Chris Anderson', email: 'chris@saas.io', company: 'SaasGrid', source: 'Referral', status: 'proposal', score: 88, tags: ['saas', 'hot'], createdAt: '2024-04-24', value: 7500 },
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  { id: 'c1', name: 'Spring Product Launch Email', type: 'email', status: 'active', sent: 12500, opened: 4375, clicked: 1625, converted: 312, revenue: 15600, createdAt: '2024-04-01', scheduledAt: '2024-04-15' },
  { id: 'c2', name: 'Facebook Retargeting', type: 'ads', status: 'active', sent: 50000, opened: 15000, clicked: 4500, converted: 900, revenue: 45000, createdAt: '2024-03-20' },
  { id: 'c3', name: 'WhatsApp Welcome Sequence', type: 'whatsapp', status: 'active', sent: 2340, opened: 1950, clicked: 780, converted: 195, revenue: 9750, createdAt: '2024-04-05' },
  { id: 'c4', name: 'Google Search Campaign', type: 'ads', status: 'active', sent: 30000, opened: 9000, clicked: 3600, converted: 720, revenue: 36000, createdAt: '2024-03-15' },
  { id: 'c5', name: 'SMS Flash Sale', type: 'sms', status: 'completed', sent: 5600, opened: 4480, clicked: 1120, converted: 224, revenue: 11200, createdAt: '2024-04-18' },
  { id: 'c6', name: 'Drip Email Nurture', type: 'email', status: 'active', sent: 8900, opened: 3114, clicked: 890, converted: 178, revenue: 8900, createdAt: '2024-04-10' },
  { id: 'c7', name: 'Instagram Stories Ads', type: 'ads', status: 'draft', sent: 0, opened: 0, clicked: 0, converted: 0, revenue: 0, createdAt: '2024-04-29' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'lead', title: 'New High-Value Lead', message: 'Jennifer Smith (score: 85) just opted in via Facebook Ads', read: false, createdAt: '2024-04-30T09:15:00', userId: 'u1' },
  { id: 'n2', type: 'sale', title: 'Payment Received', message: 'Robert Chen upgraded to Enterprise plan — $5,000/yr', read: false, createdAt: '2024-04-30T08:30:00', userId: 'u1' },
  { id: 'n3', type: 'campaign', title: 'Campaign Milestone', message: 'Spring Product Launch Email hit 35% open rate!', read: false, createdAt: '2024-04-29T14:00:00', userId: 'u1' },
  { id: 'n4', type: 'lead', title: 'Lead Stage Changed', message: 'Chris Anderson moved to Proposal stage — $7,500 deal', read: true, createdAt: '2024-04-29T11:00:00', userId: 'u1' },
  { id: 'n5', type: 'affiliate', title: 'Affiliate Commission', message: 'You earned $240 commission from 3 referral conversions', read: true, createdAt: '2024-04-28T16:45:00', userId: 'u1' },
  { id: 'n6', type: 'system', title: 'Funnel Published', message: 'Product Launch Funnel is now live and receiving traffic', read: true, createdAt: '2024-04-28T10:00:00', userId: 'u1' },
  { id: 'n7', type: 'sale', title: 'Enterprise Deal Closed', message: 'Lisa Thompson signed annual enterprise contract — $12,000', read: true, createdAt: '2024-04-27T15:30:00', userId: 'u1' },
  { id: 'n8', type: 'campaign', title: 'SMS Campaign Complete', message: 'Flash Sale SMS sent to 5,600 subscribers — 4% conversion', read: true, createdAt: '2024-04-26T12:00:00', userId: 'u1' },
];

export const MOCK_PAYMENTS: Payment[] = [
  { id: 'p1', userId: 'u1', amount: 997, currency: 'USD', status: 'success', plan: 'Pro Annual', createdAt: '2024-04-01' },
  { id: 'p2', userId: 'u2', amount: 2997, currency: 'USD', status: 'success', plan: 'Enterprise Annual', createdAt: '2024-03-15' },
  { id: 'p3', userId: 'u3', amount: 97, currency: 'USD', status: 'success', plan: 'Starter Monthly', createdAt: '2024-04-20' },
  { id: 'p4', userId: 'u1', amount: 97, currency: 'USD', status: 'failed', plan: 'Add-on: Extra Funnels', createdAt: '2024-04-25' },
  { id: 'p5', userId: 'u2', amount: 2997, currency: 'USD', status: 'success', plan: 'Enterprise Annual', createdAt: '2023-03-15' },
];

export const MOCK_AFFILIATE: Affiliate = {
  id: 'a1',
  userId: 'u1',
  referralCode: 'ALEX2024',
  referrals: 23,
  earnings: 3450,
  pendingPayout: 860,
  clicks: 847,
  conversions: 23,
};

export const MOCK_ANALYTICS: AnalyticsData = {
  revenue: [
    { name: 'Jan', value: 24500, value2: 18200 },
    { name: 'Feb', value: 31200, value2: 22100 },
    { name: 'Mar', value: 28900, value2: 24300 },
    { name: 'Apr', value: 42100, value2: 31200 },
    { name: 'May', value: 38700, value2: 28900 },
    { name: 'Jun', value: 51300, value2: 39100 },
    { name: 'Jul', value: 47800, value2: 35600 },
    { name: 'Aug', value: 63200, value2: 48700 },
    { name: 'Sep', value: 58900, value2: 44200 },
    { name: 'Oct', value: 71400, value2: 56800 },
    { name: 'Nov', value: 68100, value2: 52300 },
    { name: 'Dec', value: 84600, value2: 67200 },
  ],
  conversions: [
    { name: 'Mon', value: 124, value2: 89 },
    { name: 'Tue', value: 187, value2: 134 },
    { name: 'Wed', value: 165, value2: 121 },
    { name: 'Thu', value: 214, value2: 156 },
    { name: 'Fri', value: 243, value2: 178 },
    { name: 'Sat', value: 132, value2: 98 },
    { name: 'Sun', value: 98, value2: 72 },
  ],
  traffic: [
    { name: 'Organic', value: 35, value2: 35 },
    { name: 'Facebook', value: 28, value2: 28 },
    { name: 'Google', value: 22, value2: 22 },
    { name: 'Email', value: 10, value2: 10 },
    { name: 'Referral', value: 5, value2: 5 },
  ],
  funnel: [
    { name: 'Landing Page', value: 12450 },
    { name: 'Opt-in', value: 7890 },
    { name: 'Sales Page', value: 4230 },
    { name: 'Checkout', value: 2140 },
    { name: 'Purchase', value: 1867 },
  ],
};

export const FUNNEL_TEMPLATES = [
  { id: 't1', name: 'Product Launch', category: 'Sales', description: 'Perfect for launching digital products', steps: 5, conversion: '18.5%', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop' },
  { id: 't2', name: 'Lead Generation', category: 'Lead Gen', description: 'Capture and nurture high-quality leads', steps: 3, conversion: '24.2%', thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=240&fit=crop' },
  { id: 't3', name: 'Webinar Funnel', category: 'Events', description: 'Fill your webinar seats with qualified leads', steps: 4, conversion: '20.8%', thumbnail: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=240&fit=crop' },
  { id: 't4', name: 'SaaS Free Trial', category: 'SaaS', description: 'Convert visitors to trial users', steps: 4, conversion: '22.1%', thumbnail: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=240&fit=crop' },
  { id: 't5', name: 'E-commerce Store', category: 'E-commerce', description: 'Turn browsers into buyers', steps: 4, conversion: '15.7%', thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=240&fit=crop' },
  { id: 't6', name: 'Coaching Program', category: 'Coaching', description: 'High-ticket coaching enrollment funnel', steps: 6, conversion: '12.4%', thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=240&fit=crop' },
  { id: 't7', name: 'Course Sales', category: 'Education', description: 'Sell online courses at scale', steps: 5, conversion: '16.9%', thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=240&fit=crop' },
  { id: 't8', name: 'Agency Services', category: 'Services', description: 'Get more agency clients', steps: 4, conversion: '19.3%', thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=240&fit=crop' },
];

export const AI_RECOMMENDATIONS = [
  { id: 'ai1', type: 'cta', priority: 'high', title: 'Optimize Your Hero CTA', description: 'Change "Get Started" to "Start My Free Trial" to increase CTR by an estimated 23%', impact: '+23% CTR', category: 'Conversion' },
  { id: 'ai2', type: 'dropoff', priority: 'high', title: 'High Drop-off at Step 3', description: 'Sales page losing 40% visitors. Add social proof and reduce form fields.', impact: '+18% Conversion', category: 'Funnel' },
  { id: 'ai3', type: 'targeting', priority: 'medium', title: 'Audience Targeting Opportunity', description: 'SaaS founders aged 28-45 convert 3x better. Narrow your Facebook audience.', impact: '+67% ROAS', category: 'Targeting' },
  { id: 'ai4', type: 'timing', priority: 'medium', title: 'Send Emails at 10AM Tuesday', description: 'Your audience opens emails 41% more on Tuesday mornings.', impact: '+41% Open Rate', category: 'Email' },
  { id: 'ai5', type: 'upsell', priority: 'low', title: 'Add Order Bump to Checkout', description: 'A $47 order bump at checkout could generate $22K extra/month based on your volume.', impact: '+$22K/mo', category: 'Revenue' },
  { id: 'ai6', type: 'abtest', priority: 'medium', title: 'A/B Test Landing Page Headline', description: 'Test "10x Your Revenue" vs "Get More Leads in 30 Days" based on traffic analysis.', impact: '+15% Conversion', category: 'Testing' },
];

export const WEBSITE_TEMPLATES = [
  { id: 'wt1', name: 'SaaS Landing', category: 'SaaS', thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop', popular: true },
  { id: 'wt2', name: 'Agency Portfolio', category: 'Agency', thumbnail: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop', popular: true },
  { id: 'wt3', name: 'E-commerce Store', category: 'E-commerce', thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop', popular: false },
  { id: 'wt4', name: 'Personal Brand', category: 'Personal', thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop', popular: false },
  { id: 'wt5', name: 'Coaching', category: 'Coaching', thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop', popular: true },
  { id: 'wt6', name: 'Restaurant', category: 'Local Business', thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop', popular: false },
];
