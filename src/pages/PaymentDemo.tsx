import { useState } from 'react';
import { Check, CreditCard, Lock, ArrowRight, X, RefreshCw, Download } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { MOCK_PAYMENTS } from '@/data/mockData';
import { toast } from 'sonner';

const PLANS = [
  { id: 'starter', name: 'Starter', price: 97, period: 'month', features: ['3 Funnels', '1K Contacts', 'Email Support'] },
  { id: 'pro', name: 'Pro', price: 197, period: 'month', features: ['Unlimited Funnels', '25K Contacts', 'Priority Support', 'AI Tools', 'A/B Testing'], popular: true },
  { id: 'enterprise', name: 'Enterprise', price: 497, period: 'month', features: ['Everything in Pro', 'Unlimited Contacts', 'White-label', 'Dedicated Manager'] },
];

const COUPONS: Record<string, number> = { SAVE20: 20, LAUNCH50: 50, DEMO30: 30 };

type PaymentStep = 'checkout' | 'processing' | 'success' | 'failed' | 'upsell';

export default function PaymentDemo() {
  const [step, setStep] = useState<PaymentStep>('checkout');
  const [selectedPlan, setSelectedPlan] = useState(PLANS[1]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [orderBump, setOrderBump] = useState(false);
  const [card, setCard] = useState({ number: '4242 4242 4242 4242', expiry: '12/26', cvv: '123', name: 'Demo User' });
  const [simulateFail, setSimulateFail] = useState(false);

  const total = Math.round(selectedPlan.price * (1 - discount / 100)) + (orderBump ? 47 : 0);

  const applyCoupon = () => {
    const disc = COUPONS[coupon.toUpperCase()];
    if (disc) { setDiscount(disc); toast.success(`Coupon applied! ${disc}% off`); }
    else toast.error('Invalid coupon code');
  };

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      if (simulateFail) { setStep('failed'); }
      else { setStep('upsell'); }
    }, 2000);
  };

  const handleAcceptUpsell = () => {
    toast.success('Upsell accepted! Thank you!');
    setStep('success');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-900">Payment Demo</h1>
            <p className="text-gray-500 text-sm mt-1">Full demo checkout flow with upsells and coupons</p>
          </div>
          <button onClick={() => setStep('checkout')} className="btn-outline text-sm py-2 px-4">
            <RefreshCw className="w-4 h-4" /> Reset Demo
          </button>
        </div>

        {/* Invoices History */}
        <div className="dashboard-card">
          <h2 className="font-display font-bold text-gray-900 mb-4">Payment History</h2>
          <div className="space-y-2">
            {MOCK_PAYMENTS.map(p => (
              <div key={p.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${p.status === 'success' ? 'bg-green-100' : p.status === 'failed' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                  {p.status === 'success' ? <Check className="w-4 h-4 text-green-600" /> : p.status === 'failed' ? <X className="w-4 h-4 text-red-600" /> : <RefreshCw className="w-4 h-4 text-yellow-600" />}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900">{p.plan}</p>
                  <p className="text-xs text-gray-500">{p.createdAt}</p>
                </div>
                <span className="font-bold text-gray-900">${p.amount}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${p.status === 'success' ? 'bg-green-100 text-green-700' : p.status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {p.status}
                </span>
                <button onClick={() => toast.success('Invoice downloaded!')} className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout Demo */}
        <div className="dashboard-card">
          <h2 className="font-display font-bold text-gray-900 mb-2">Live Checkout Demo</h2>
          <p className="text-sm text-gray-500 mb-6">Experience the full checkout flow — use coupon code <strong>SAVE20</strong></p>

          {/* Plan Selector */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {PLANS.map(plan => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedPlan.id === plan.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}
              >
                {plan.popular && <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-accent-500 text-white text-xs font-bold px-3 py-0.5 rounded-full">Popular</div>}
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-2xl font-black text-gray-900">${plan.price}</span>
                  <span className="text-gray-500 text-sm pb-1">/{plan.period}</span>
                </div>
                <p className="font-semibold text-gray-900 mb-2">{plan.name}</p>
                {plan.features.map(f => <p key={f} className="text-xs text-gray-500 flex items-center gap-1"><Check className="w-3 h-3 text-green-500" />{f}</p>)}
              </div>
            ))}
          </div>

          {step === 'checkout' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Payment Details</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Card Number</label>
                  <div className="relative">
                    <input value={card.number} onChange={e => setCard({ ...card, number: e.target.value })} className="input-field pr-10" />
                    <CreditCard className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry</label>
                    <input value={card.expiry} onChange={e => setCard({ ...card, expiry: e.target.value })} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">CVV</label>
                    <input value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })} className="input-field" type="password" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Cardholder Name</label>
                  <input value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} className="input-field" />
                </div>
                <div className="flex gap-2">
                  <input value={coupon} onChange={e => setCoupon(e.target.value)} className="input-field flex-1" placeholder="Coupon code (try SAVE20)" />
                  <button onClick={applyCoupon} className="btn-outline px-4 text-sm">Apply</button>
                </div>

                {/* Order Bump */}
                <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${orderBump ? 'border-accent-500 bg-accent-50' : 'border-gray-200 bg-gray-50'}`} onClick={() => setOrderBump(!orderBump)}>
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${orderBump ? 'bg-accent-500 border-accent-500' : 'border-gray-300'}`}>
                      {orderBump && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">⚡ Order Bump: Marketing Templates Pack — <span className="text-accent-600">+$47</span></p>
                      <p className="text-xs text-gray-500">50+ high-converting templates (regularly $197)</p>
                    </div>
                  </div>
                </div>

                {/* Fail simulation */}
                <label className="flex items-center gap-2 text-sm cursor-pointer text-gray-500">
                  <input type="checkbox" checked={simulateFail} onChange={e => setSimulateFail(e.target.checked)} className="rounded" />
                  Simulate payment failure (demo)
                </label>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{selectedPlan.name} Plan ({selectedPlan.period})</span>
                    <span className="font-semibold">${selectedPlan.price}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Coupon Discount ({discount}%)</span>
                      <span>-${Math.round(selectedPlan.price * discount / 100)}</span>
                    </div>
                  )}
                  {orderBump && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Marketing Templates Pack</span>
                      <span className="font-semibold">$47</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
                    <span>Total Today</span>
                    <span className="text-primary-600">${total}</span>
                  </div>
                  <button onClick={handlePay} className="btn-primary w-full justify-center py-4 text-base">
                    <Lock className="w-4 h-4" /> Pay ${total} Securely
                  </button>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                    <Lock className="w-3 h-3" /> 256-bit SSL encryption · Cancel anytime
                  </div>
                  <div className="flex gap-2 justify-center">
                    {['visa', 'mc', 'amex', 'paypal'].map(m => (
                      <div key={m} className="bg-white border border-gray-200 rounded px-2 py-1 text-xs font-bold text-gray-600 uppercase">{m}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="text-center py-16">
              <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold text-gray-900 mb-2">Processing Payment...</h3>
              <p className="text-gray-500">Please wait, do not refresh this page</p>
            </div>
          )}

          {step === 'upsell' && (
            <div className="text-center max-w-lg mx-auto py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">Payment Successful! 🎉</h3>
              <p className="text-gray-500 mb-8">Before you access your dashboard, we have a special one-time offer for you:</p>
              <div className="bg-gradient-to-br from-primary-900 to-secondary-900 text-white rounded-3xl p-6 mb-6">
                <div className="bg-accent-500 text-white text-sm font-bold px-4 py-1.5 rounded-full inline-block mb-4">⏰ ONE-TIME OFFER</div>
                <h4 className="text-2xl font-display font-bold mb-3">VIP Funnel Mastery Course</h4>
                <p className="text-white/80 mb-4">Complete video training on building $100K/month funnels. 12 modules, 40+ lessons. Normally $997 — yours for just $297 today.</p>
                <div className="flex gap-3 justify-center">
                  <button onClick={handleAcceptUpsell} className="btn-accent">
                    Yes! Add for $297 <ArrowRight className="w-4 h-4" />
                  </button>
                  <button onClick={() => setStep('success')} className="text-white/60 text-sm hover:text-white transition-colors">
                    No thanks, skip this offer
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center max-w-lg mx-auto py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-3xl font-display font-bold text-gray-900 mb-3">Welcome to Funneling! 🎉</h3>
              <p className="text-gray-500 mb-2">Your {selectedPlan.name} subscription is now active.</p>
              <p className="text-gray-400 text-sm mb-8">A receipt has been sent to your email address.</p>
              <div className="bg-gray-50 rounded-2xl p-4 text-left mb-6 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Order ID</span><span className="font-mono font-semibold">FUN-{Date.now().toString().slice(-8)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Plan</span><span className="font-semibold">{selectedPlan.name}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Amount Paid</span><span className="font-semibold text-green-600">${total}</span></div>
              </div>
              <div className="flex gap-3 justify-center">
                <button onClick={() => toast.success('Invoice downloaded!')} className="btn-outline text-sm">
                  <Download className="w-4 h-4" /> Download Invoice
                </button>
                <button onClick={() => setStep('checkout')} className="btn-primary text-sm">
                  <ArrowRight className="w-4 h-4" /> Go to Dashboard
                </button>
              </div>
            </div>
          )}

          {step === 'failed' && (
            <div className="text-center max-w-lg mx-auto py-12">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">Payment Failed</h3>
              <p className="text-gray-500 mb-8">Your card was declined. Please check your card details and try again.</p>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-left mb-6">
                <p className="text-sm text-red-700 font-semibold mb-1">Error: Card Declined</p>
                <p className="text-xs text-red-500">Your card issuer has declined this transaction. Please contact your bank or try a different card.</p>
              </div>
              <button onClick={() => { setSimulateFail(false); setStep('checkout'); }} className="btn-primary">
                <RefreshCw className="w-4 h-4" /> Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
