
import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Calendar, 
  BarChart3, 
  CheckCircle2, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  LayoutDashboard, 
  Clock, 
  Users, 
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Zap,
  X,
  Activity,
  Star,
  ChevronLeft
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

// --- Constants ---
const TIER_1_LINK = "https://buy.stripe.com/9B69AT5WR9cJb6B6lp7ok00";
const TIER_2_LINK = "https://buy.stripe.com/eVq00j2KFbkRdeJbFJ7ok01";
const TIER_3_LINK = "https://buy.stripe.com/7sY00jfxr0GdfmR2597ok03";

// --- Types ---
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick: (href: string) => void;
}

interface FeatureItemProps {
  children: React.ReactNode;
  active?: boolean;
}

interface AccordionProps {
  question: string;
  answer: string;
}

interface PricingTier {
  name: string;
  setupFee: string;
  monthlyPrice: string;
  minutes: string;
  overage: string;
  calls: string;
  link: string;
  highlight?: boolean;
  features: string[];
  perfectFor: string;
}

type Page = 'home' | 'policy' | 'service';

// --- Components ---

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => (
  <button 
    onClick={() => onClick(href)}
    className="text-sm font-medium text-slate-600 hover:text-black transition-colors"
  >
    {children}
  </button>
);

const Navbar: React.FC<{ navigateTo: (p: Page, anchor?: string) => void }> = ({ navigateTo }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
        <div className="bg-black text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold">B</div>
        <span className="text-xl font-bold tracking-tight">BookedAI</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8">
        <NavLink href="#how-it-works" onClick={() => navigateTo('home', 'how-it-works')}>How it works</NavLink>
        <NavLink href="#dashboard" onClick={() => navigateTo('home', 'dashboard')}>The Dashboard</NavLink>
        <NavLink href="#pricing" onClick={() => navigateTo('home', 'pricing')}>Pricing</NavLink>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => navigateTo('home', 'onboarding')} className="hidden sm:flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full text-sm font-semibold hover:bg-slate-50 transition-colors">
          <Phone className="w-4 h-4" />
          Book a call
        </button>
        <button onClick={() => navigateTo('home', 'pricing')} className="px-5 py-2 bg-black text-white rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors">
          Buy Now
        </button>
      </div>
    </div>
  </nav>
);

const Integrations: React.FC = () => (
  <section className="py-12 border-b border-slate-100/50">
    <div className="max-w-7xl mx-auto px-4">
      <p className="text-center text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-8">
        Seamlessly integrates with your stack
      </p>
      <div className="flex flex-wrap justify-center items-center gap-12">
        <img src="https://www.gstatic.com/images/branding/product/2x/calendar_2020q4_48dp.png" className="h-8 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300" alt="Google Calendar" />
        <img src="https://www.gstatic.com/images/branding/product/2x/sheets_2020q4_48dp.png" className="h-8 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300" alt="Google Sheets" />
        <img src="https://www.gstatic.com/images/branding/product/2x/gmail_2020q4_48dp.png" className="h-6 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300" alt="Gmail" />
        <div className="flex items-center gap-2 text-slate-400 font-medium transition-all hover:text-slate-600">
          <Phone className="w-6 h-6" />
          <span className="font-semibold">Your Phone Number</span>
        </div>
      </div>
    </div>
  </section>
);

const DashboardSection: React.FC = () => {
  const barData = [
    { name: 'Mon', value: 12 },
    { name: 'Tue', value: 18 },
    { name: 'Wed', value: 14 },
    { name: 'Thu', value: 22 },
    { name: 'Fri', value: 30 },
    { name: 'Sat', value: 8 },
    { name: 'Sun', value: 5 },
  ];

  const pieData = [
    { name: 'Confirmed', value: 5, color: '#3b82f6' },
    { name: 'Pending', value: 4, color: '#fbbf24' },
    { name: 'Cancelled', value: 4, color: '#ef4444' },
  ];

  return (
    <section id="dashboard" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">A clean interface for a busy trade.</h2>
          <p className="text-slate-500 text-lg">Everything you need to know about your jobs, organized and automated.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'TOTAL JOBS', value: '13', sub: '+2 today', icon: <LayoutDashboard className="w-5 h-5 text-blue-600" /> },
            { label: 'PENDING', value: '4', sub: 'Waiting on customer', icon: <Clock className="w-5 h-5 text-amber-500" /> },
            { label: 'CONFIRMED', value: '5', sub: 'Ready for site', icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> },
            { label: 'REVENUE SAVED WITH AI', value: '$1,250', sub: '+15% vs last week', icon: <DollarSign className="w-5 h-5 text-blue-600" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-slate-50 rounded-xl">{stat.icon}</div>
                <span className="text-xs font-bold text-slate-400 tracking-wider">{stat.label}</span>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-slate-400">{stat.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-slate-100 h-96">
            <h3 className="text-sm font-bold text-slate-400 mb-8 flex items-center gap-2 uppercase tracking-widest">
              <BarChart3 className="w-4 h-4" /> Daily Bookings Trend
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
             <h3 className="text-sm font-bold text-slate-400 mb-8 self-start uppercase tracking-widest">Job Status Distribution</h3>
             <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
             </div>
             <div className="w-full mt-6 flex justify-between text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                {pieData.map((d) => (
                  <div key={d.name} className="flex flex-col items-center">
                    <span style={{ color: d.color }}>{d.name}</span>
                    <span className="text-slate-900 text-base mt-1">{d.value}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AutomationSection: React.FC = () => (
  <section className="py-24 grid-bg relative">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <span className="text-[10px] font-bold tracking-[0.3em] text-blue-600 uppercase">Automation</span>
        <h2 className="text-4xl font-bold mt-4">Smart notifications for everyone</h2>
        <p className="mt-4 text-slate-500 max-w-xl mx-auto text-lg">
          BookedAI sends beautiful, clear confirmations to your customers and instant booking requests to you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            <Users className="w-3 h-3" /> Customer View
          </div>
          <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden ring-1 ring-white/10">
            <div className="flex items-center gap-4 mb-8">
               <div className="bg-green-500 p-3 rounded-2xl">
                 <CheckCircle2 className="w-6 h-6" />
               </div>
               <h4 className="text-xl font-bold leading-tight">Confirmed: Leaky faucet on Wed, Feb 4 at 9:00 AM</h4>
            </div>
            <div className="space-y-6 text-slate-300">
               <p className="text-lg font-medium text-white">Hi Bill Jones,</p>
               <p className="text-slate-400">You're all set — your appointment is confirmed.</p>
               <div className="space-y-3 bg-white/5 p-6 rounded-2xl border border-white/5">
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Appointment Details</p>
                 <ul className="space-y-2 text-sm">
                   <li className="flex gap-2"><span>•</span> <span className="text-slate-100">Service:</span> Leaky faucet</li>
                   <li className="flex gap-2"><span>•</span> <span className="text-slate-100">Date/Time:</span> Wed, Feb 4, 2026 at 9:00 AM</li>
                   <li className="flex gap-2"><span>•</span> <span className="text-slate-100">Address:</span> 1234 Harper Landing, Fairview, TX</li>
                 </ul>
               </div>
               <div className="pt-4 flex gap-6 text-sm">
                    <a href="#" className="text-blue-400 font-bold hover:text-blue-300 flex items-center gap-1">Reschedule <ArrowRight className="w-3 h-3" /></a>
                    <a href="#" className="text-slate-500 font-bold hover:text-slate-300 flex items-center gap-1">Cancel <ArrowRight className="w-3 h-3" /></a>
               </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            <ShieldCheck className="w-3 h-3" /> Business View (You)
          </div>
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-0 shadow-2xl overflow-hidden ring-1 ring-blue-600/5">
            <div className="bg-blue-600 p-10 text-white">
               <h4 className="text-2xl font-bold">New job request</h4>
               <p className="text-blue-100 mt-2">Bill Jones — Leaky faucet</p>
            </div>
            <div className="p-10 space-y-8">
               <div className="inline-block px-4 py-1.5 bg-amber-50 text-amber-600 text-xs font-black rounded-full uppercase tracking-widest">
                 Pending Confirmation
               </div>
               <div className="grid grid-cols-2 gap-y-6">
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] mb-1 uppercase tracking-widest">Customer</p>
                    <p className="font-bold">Bill Jones</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] mb-1 uppercase tracking-widest">Phone</p>
                    <p className="font-bold">432-123-1234</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-slate-400 font-bold text-[10px] mb-1 uppercase tracking-widest">Location</p>
                    <p className="font-bold">1234 Harper Landing, Fairview, TX</p>
                  </div>
               </div>
               <div className="pt-8 border-t border-slate-100">
                  <button className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-black/10">
                    Confirm Appointment
                  </button>
                  <p className="text-center text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-widest">Updates synced with Google Calendar</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TallyFormEmbed: React.FC = () => {
  useEffect(() => {
    const scriptId = 'tally-js';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://tally.so/widgets/embed.js";
      script.onload = () => {
        // @ts-ignore
        if (typeof Tally !== 'undefined') Tally.loadEmbeds();
      };
      document.body.appendChild(script);
    } else {
      // @ts-ignore
      if (typeof Tally !== 'undefined') Tally.loadEmbeds();
    }
  }, []);

  return (
    <iframe 
      data-tally-src="https://tally.so/embed/ZjaXJ5?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
      loading="lazy" 
      width="100%" 
      height="350" 
      style={{ border: 'none', margin: 0 }}
      title="BookedAI Contact Form"
    ></iframe>
  );
};

const Feature: React.FC<FeatureItemProps> = ({ children }) => (
  <li className="flex items-start gap-3 group">
    <div className={`mt-1 flex-shrink-0 text-green-500`}>
      <CheckCircle2 className="w-5 h-5" />
    </div>
    <span className="text-slate-300 text-sm group-hover:text-white transition-colors">{children}</span>
  </li>
);

const PricingSection: React.FC = () => {
  const commonFeatures = [
    "24/7 AI virtual assistant",
    "Natural language understanding",
    "Email & Calendar integration",
    "Instant call transfer support"
  ];

  const tiers: PricingTier[] = [
    {
      name: "Starter",
      setupFee: "199",
      monthlyPrice: "129",
      minutes: "(100 AI talk minutes included)",
      calls: "Handles ~25–30 calls/month",
      overage: "$0.35/min",
      link: TIER_1_LINK,
      features: commonFeatures,
      perfectFor: "Small businesses missing a few calls per day."
    },
    {
      name: "Growth (Most Popular)",
      setupFee: "199",
      monthlyPrice: "199",
      minutes: "(300 AI talk minutes included)",
      calls: "Handles ~75–100 calls/month",
      overage: "$0.25/min",
      link: TIER_2_LINK,
      highlight: true,
      features: commonFeatures,
      perfectFor: "Busy businesses getting steady daily calls."
    },
    {
      name: "Pro",
      setupFee: "199",
      monthlyPrice: "349",
      minutes: "(700 AI talk minutes included)",
      calls: "Handles ~175–230 calls/month",
      overage: "$0.20/min",
      link: TIER_3_LINK,
      features: commonFeatures,
      perfectFor: "High-volume or multi-location businesses."
    }
  ];

  return (
    <section id="pricing" className="py-32 bg-slate-900/95 backdrop-blur-md border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <span className="text-[10px] font-bold tracking-[0.4em] text-blue-400 uppercase">Pricing Plans</span>
          <h2 className="text-5xl font-black tracking-tight mt-6 mb-8 text-white">Simple, Transparent Pricing</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
            Choose the volume that fits your business. Scale up or down as you grow with no long-term contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {tiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`relative bg-white/5 backdrop-blur-xl rounded-[3rem] p-12 border transition-all hover:translate-y-[-8px] duration-500 flex flex-col text-white ${
                tier.highlight ? 'border-blue-500/50 ring-4 ring-blue-500/10 shadow-2xl scale-105 z-10' : 'border-white/10'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                {tier.highlight && <Star className="w-6 h-6 text-amber-400 fill-amber-400" />}
                <h3 className={`text-2xl font-bold ${tier.highlight ? 'text-white' : 'text-slate-200'}`}>{tier.name}</h3>
              </div>
              
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black">${tier.monthlyPrice}</span>
                <span className="text-slate-400 font-bold ml-2">/ month</span>
              </div>
              <p className="text-slate-500 text-sm font-bold mt-4 mb-8">
                +${tier.setupFee} one-time setup
              </p>

              <div className="mb-10 space-y-2 p-6 bg-white/5 rounded-3xl border border-white/5">
                <p className="text-base font-bold text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-400" /> {tier.calls}
                </p>
                <p className="text-xs text-slate-400 pl-6">{tier.minutes}</p>
                <div className="pt-4 mt-4 border-t border-white/5">
                   <p className="text-sm font-medium text-slate-400">Overage: <span className="text-white">{tier.overage}</span></p>
                </div>
              </div>

              <ul className="space-y-4 mb-12 flex-grow">
                {tier.features.map((feature, fidx) => (
                  <Feature key={fidx} active={tier.highlight}>{feature}</Feature>
                ))}
              </ul>

              <div className="mb-10 p-6 bg-blue-600/5 rounded-3xl border border-blue-600/10">
                 <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Perfect for:</p>
                 <p className="text-sm text-slate-300 leading-relaxed font-medium">{tier.perfectFor}</p>
              </div>

              <a 
                href={tier.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-full py-5 rounded-2xl font-bold text-center transition-all text-lg ${
                  tier.highlight 
                  ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-600/20' 
                  : 'bg-white text-black hover:bg-slate-100 shadow-xl'
                }`}
              >
                Buy Now
              </a>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center space-y-3">
           <p className="text-sm text-slate-500 font-medium">Overage minutes billed monthly.</p>
           <p className="text-sm text-slate-500 font-medium">No contracts. Cancel anytime.</p>
        </div>
      </div>
    </section>
  );
};

const Accordion: React.FC<AccordionProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-4 transition-all hover:bg-white/90">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-10 py-8 flex items-center justify-between text-left transition-colors"
      >
        <span className="text-lg font-bold text-slate-700">{question}</span>
        {isOpen ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
      </button>
      {isOpen && (
        <div className="px-10 pb-10 text-slate-500 text-base leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQSection: React.FC = () => (
  <section className="py-32">
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-4xl font-black text-center mb-16">Frequently Asked Questions</h2>
      <div className="space-y-4">
        <Accordion 
          question="How does the AI know my specific pricing and policies?" 
          answer="During onboarding, you provide us with your pricing list, common services, and policies. The AI is trained specifically on your data, so it can answer questions like 'How much for a drain snake?' or 'Do you offer emergency services on Sundays?' just like a seasoned pro." 
        />
        <Accordion 
          question="Do I need to change my business phone number?" 
          answer="No. You keep your existing business number. We set up conditional call forwarding so that when you're busy or don't answer, the call is automatically routed to your BookedAI assistant." 
        />
        <Accordion 
          question="How does it integrate with my calendar?" 
          answer="The AI looks at your real-time availability in Google Calendar. When a customer wants to book, it only offers slots that are actually free. Once booked, the appointment appears instantly in your calendar with all the customer details." 
        />
      </div>
    </div>
  </section>
);

const Footer: React.FC<{ navigateTo: (p: Page, anchor?: string) => void }> = ({ navigateTo }) => {
  return (
    <footer className="bg-black text-white py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center md:text-left relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-8">
              <div className="bg-white text-black w-8 h-8 rounded-lg flex items-center justify-center font-bold">B</div>
              <span className="text-2xl font-bold tracking-tight">BookedAI</span>
            </div>
            <h3 className="text-3xl font-bold leading-tight mb-8 max-w-sm mx-auto md:mx-0">The AI virtual receptionist for <span className="text-blue-500 italic">modern trades.</span></h3>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] text-slate-500 uppercase mb-8">Product</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><button onClick={() => navigateTo('home', 'how-it-works')} className="hover:text-white">How it works</button></li>
              <li><button onClick={() => navigateTo('home', 'dashboard')} className="hover:text-white">Dashboard</button></li>
              <li><button onClick={() => navigateTo('home', 'pricing')} className="hover:text-white">Pricing</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] text-slate-500 uppercase mb-8">Support</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><button onClick={() => navigateTo('home', 'onboarding')} className="hover:text-white">Contact Form</button></li>
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-[10px] font-bold tracking-[0.2em] text-slate-600 uppercase">
           <div>© 2024 BookedAI. All rights reserved.</div>
           <div className="flex gap-8">
             <button onClick={() => navigateTo('service')} className="hover:text-white transition-colors">Terms of Service</button>
             <button 
                onClick={() => navigateTo('policy')} 
                className="hover:text-white transition-colors"
             >
                Privacy Policy
             </button>
           </div>
        </div>
      </div>
    </footer>
  );
};

const PolicyPage: React.FC = () => (
  <div className="pt-32 pb-24 px-4 min-h-screen relative">
    <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        [data-custom-class='body'], [data-custom-class='body'] * { background: transparent !important; }
        [data-custom-class='title'], [data-custom-class='title'] * { font-family: Arial !important; font-size: 26px !important; color: #000000 !important; font-weight: bold !important; }
        [data-custom-class='subtitle'], [data-custom-class='subtitle'] * { font-family: Arial !important; color: #595959 !important; font-size: 14px !important; }
        [data-custom-class='heading_1'], [data-custom-class='heading_1'] * { font-family: Arial !important; font-size: 19px !important; color: #000000 !important; font-weight: bold !important; margin-top: 2rem !important; }
        [data-custom-class='heading_2'], [data-custom-class='heading_2'] * { font-family: Arial !important; font-size: 17px !important; color: #000000 !important; font-weight: bold !important; margin-top: 1.5rem !important; }
        [data-custom-class='body_text'], [data-custom-class='body_text'] * { color: #595959 !important; font-size: 14px !important; font-family: Arial !important; line-height: 1.6 !important; }
        [data-custom-class='link'], [data-custom-class='link'] * { color: #3030F1 !important; font-size: 14px !important; font-family: Arial !important; word-break: break-word !important; text-decoration: underline !important; }
        .policy-container ul { list-style-type: disc !important; padding-left: 2rem !important; margin: 1rem 0 !important; }
        .policy-container li { margin-bottom: 0.5rem !important; font-family: Arial !important; font-size: 14px !important; color: #595959 !important; }
        .policy-container table { width: 100% !important; border-collapse: collapse !important; margin: 1.5rem 0 !important; border: 1px solid #ddd !important; }
        .policy-container th, .policy-container td { border: 1px solid #ddd !important; padding: 12px !important; text-align: left !important; font-size: 13px !important; }
        .policy-container h1, .policy-container h2, .policy-container h3 { display: block !important; margin-block-start: 1em !important; margin-block-end: 1em !important; }
      `}} />
      <div className="policy-container">
        <div data-custom-class="body">
          <div><strong><span style={{fontSize: '26px'}}><span data-custom-class="title"><h1>PRIVACY POLICY</h1></span></span></strong></div>
          <div><span style={{color: 'rgb(127, 127, 127)'}}><strong><span style={{fontSize: '15px'}}><span data-custom-class="subtitle">Last updated February 09, 2026</span></span></strong></span></div>
          <br /><br /><br />
          <div style={{lineHeight: '1.5'}}><span style={{color: 'rgb(127, 127, 127)'}}><span style={{color: 'rgb(89, 89, 89)', fontSize: '15px'}}><span data-custom-class="body_text">This Privacy Notice for BookedAIWork describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including when you:</span></span></span></div>
          <ul>
            <li data-custom-class="body_text" style={{lineHeight: '1.5'}}><span style={{fontSize: '15px', color: 'rgb(89, 89, 89)'}}><span data-custom-class="body_text">Visit our website at <span style={{color: 'rgb(0, 58, 250)'}}><a target="_blank" data-custom-class="link" href="http://bookedaiwork.com">http://bookedaiwork.com</a></span> or any website of ours that links to this Privacy Notice</span></span></li>
            <li data-custom-class="body_text" style={{lineHeight: '1.5'}}><span style={{fontSize: '15px'}}>Use BookedAIWork AI Receptionist. An easy to setup AI receptionist to streamline scheduling in your business.</span></li>
            <li data-custom-class="body_text" style={{lineHeight: '1.5'}}><span style={{fontSize: '15px', color: 'rgb(89, 89, 89)'}}><span data-custom-class="body_text">Engage with us in other related ways, including any marketing or events</span></span></li>
          </ul>
          <div style={{lineHeight: '1.5'}}><span style={{fontSize: '15px'}}><span style={{color: 'rgb(127, 127, 127)'}}><span data-custom-class="body_text"><strong>Questions or concerns? </strong>Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a target="_blank" data-custom-class="link" href="mailto:lhmorrow@bookedaiwork.com">lhmorrow@bookedaiwork.com</a>.</span></span></span></div>
          <br /><br />
          <div id="infocollect" style={{lineHeight: '1.5'}}><span id="control" style={{color: 'rgb(0, 0, 0)'}}><strong><span data-custom-class="heading_1"><h2>1. WHAT INFORMATION DO WE COLLECT?</h2></span></strong></span></div>
          <div style={{lineHeight: '1.5'}}><span data-custom-class="heading_2"><h3>Personal information you disclose to us</h3></span></div>
          <p data-custom-class="body_text">We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services. The personal information we collect may include: names, phone numbers, email addresses, job titles, and contact or authentication data.</p>
          <p data-custom-class="body_text"><strong>Payment Data.</strong> All payment data is handled and stored by Stripe. You may find their privacy notice here: <a target="_blank" data-custom-class="link" href="https://stripe.com/privacy">https://stripe.com/privacy</a>.</p>
          <div style={{lineHeight: '1.5'}}><strong><span data-custom-class="heading_2"><h3>Google API</h3></span></strong><span data-custom-class="body_text">Our use of information received from Google APIs will adhere to Google API Services User Data Policy, including the Limited Use requirements.</span></div>
          <br /><br />
          <div id="infouse" style={{lineHeight: '1.5'}}><span id="control" style={{color: 'rgb(0, 0, 0)'}}><strong><span data-custom-class="heading_1"><h2>2. HOW DO WE PROCESS YOUR INFORMATION?</h2></span></strong></span></div>
          <p data-custom-class="body_text">We process your personal information for a variety of reasons, including to deliver services, manage orders, request feedback, and post testimonials.</p>
          <br /><br />
          <div id="whoshare" style={{lineHeight: '1.5'}}><span id="control" style={{color: 'rgb(0, 0, 0)'}}><strong><span data-custom-class="heading_1"><h2>3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2></span></strong></span></div>
          <p data-custom-class="body_text">We may share information in specific situations like business transfers. We do not sell your personal information to third parties.</p>
          <br /><br />
          <div id="ai" style={{lineHeight: '1.5'}}><strong><span data-custom-class="heading_1"><h2>4. DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?</h2></span></strong></div>
          <p data-custom-class="body_text">We offer AI Products for automation. All data processed using AI is handled in line with our Privacy Notice and third-party agreements.</p>
          <br /><br />
          <div id="inforetain" style={{lineHeight: '1.5'}}><span id="control" style={{color: 'rgb(0, 0, 0)'}}><strong><span data-custom-class="heading_1"><h2>5. HOW LONG DO WE KEEP YOUR INFORMATION?</h2></span></strong></span></div>
          <p data-custom-class="body_text">We keep your information for as long as necessary to fulfill the purposes outlined in this notice unless otherwise required by law.</p>
          <br /><br />
          <div id="infosafe" style={{lineHeight: '1.5'}}><span id="control" style={{color: 'rgb(0, 0, 0)'}}><strong><span data-custom-class="heading_1"><h2>6. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2></span></strong></span></div>
          <p data-custom-class="body_text">We aim to protect your personal information through a system of organizational and technical security measures.</p>
          <br /><br />
          <div id="contact" style={{lineHeight: '1.5'}}><span id="control" style={{color: 'rgb(0, 0, 0)'}}><strong><span data-custom-class="heading_1"><h2>12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2></span></strong></span></div>
          <p data-custom-class="body_text">Email us at <a target="_blank" data-custom-class="link" href="mailto:lhmorrow@bookedaiwork.com">lhmorrow@bookedaiwork.com</a> or contact us by post at: BookedAIWork, TX, United States.</p>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-slate-100 flex items-center gap-2 text-slate-400">
        <button onClick={() => window.history.back()} className="flex items-center gap-2 hover:text-blue-600 transition-colors font-bold text-sm">
          <ChevronLeft className="w-4 h-4" /> Back to home
        </button>
      </div>
    </div>
  </div>
);

const TermsPage: React.FC = () => (
  <div className="pt-32 pb-24 px-4 min-h-screen relative">
    <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        [data-custom-class='body'], [data-custom-class='body'] * { background: transparent !important; }
        [data-custom-class='title'], [data-custom-class='title'] * { font-family: Arial !important; font-size: 26px !important; color: #000000 !important; font-weight: bold !important; }
        [data-custom-class='subtitle'], [data-custom-class='subtitle'] * { font-family: Arial !important; color: #595959 !important; font-size: 14px !important; }
        [data-custom-class='heading_1'], [data-custom-class='heading_1'] * { font-family: Arial !important; font-size: 19px !important; color: #000000 !important; font-weight: bold !important; margin-top: 2rem !important; }
        [data-custom-class='heading_2'], [data-custom-class='heading_2'] * { font-family: Arial !important; font-size: 17px !important; color: #000000 !important; font-weight: bold !important; margin-top: 1.5rem !important; }
        [data-custom-class='body_text'], [data-custom-class='body_text'] * { color: #595959 !important; font-size: 14px !important; font-family: Arial !important; line-height: 1.6 !important; }
        [data-custom-class='link'], [data-custom-class='link'] * { color: #3030F1 !important; font-size: 14px !important; font-family: Arial !important; word-break: break-word !important; text-decoration: underline !important; }
        .terms-container ul { list-style-type: square !important; padding-left: 2rem !important; margin: 1rem 0 !important; }
        .terms-container li { margin-bottom: 0.5rem !important; font-family: Arial !important; font-size: 14px !important; color: #595959 !important; }
        .terms-container h1, .terms-container h2, .terms-container h3 { display: block !important; margin-block-start: 1em !important; margin-block-end: 1em !important; }
      `}} />
      <div className="terms-container">
        <div data-custom-class="body">
          <div align="center" style={{textAlign: 'left'}}>
            <div className="MsoNormal" data-custom-class="title" style={{lineHeight: '1.5'}}>
              <strong><span style={{fontSize: '19px'}}><h1>TERMS OF SERVICE</h1></span></strong>
            </div>
            <div className="MsoNormal" data-custom-class="subtitle" style={{lineHeight: '1.5'}}>
              <strong>Last updated February 11, 2026</strong>
            </div>
            <br /><br />
            <strong><span data-custom-class="heading_1"><h2>AGREEMENT TO OUR LEGAL TERMS</h2></span></strong>
          </div>
          <div align="center" style={{textAlign: 'left'}}>
            <div className="MsoNormal" data-custom-class="body_text" style={{lineHeight: '1.5'}}>
              <span style={{fontSize:'11pt', color:'#595959', fontFamily:'Arial'}}>
                We are BookedAIWork ("Company," "we," "us," "our"), a company registered in __________, United States at BookedAIWork, __________.
              </span>
            </div>
          </div>
          <br />
          <div align="center" style={{textAlign: 'left'}}>
            <div className="MsoNormal" data-custom-class="body_text" style={{lineHeight: '1.5'}}>
              <span style={{fontSize:'11pt', color:'#595959', fontFamily:'Arial'}}>
                We operate the website <a target="_blank" data-custom-class="link" href="http://bookedaiwork.com">http://bookedaiwork.com</a> (the "Site"), as well as any other related products and services that refer or link to these legal terms (the "Legal Terms") (collectively, the "Services").
              </span>
            </div>
            <br />
            <div className="MsoNormal" data-custom-class="body_text" style={{lineHeight: '1.5'}}>
              <span style={{fontSize:'11pt', color:'#595959', fontFamily:'Arial'}}>
                You can contact us by phone at 4327705299, email at <a target="_blank" data-custom-class="link" href="mailto:lhmorrow@bookedaiwork.com">lhmorrow@bookedaiwork.com</a>, or by mail to BookedAIWork, __________, United States.
              </span>
            </div>
            <br />
            <div className="MsoNormal" data-custom-class="body_text" style={{lineHeight: '1.5'}}>
              <span style={{fontSize:'11pt', color:'#595959', fontFamily:'Arial'}}>
                These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and BookedAIWork, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
              </span>
            </div>
            <br />
            <div className="MsoNormal" data-custom-class="body_text" style={{lineHeight: '1.5'}}>
              <span style={{fontSize:'11pt', color:'#595959', fontFamily:'Arial'}}>
                Supplemental terms and conditions or documents that may be posted on the Services from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Legal Terms at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of these Legal Terms, and you waive any right to receive specific notice of each such change.
              </span>
            </div>
            <br />
            <div className="MsoNormal" data-custom-class="body_text" style={{lineHeight: '1.5'}}>
              <span style={{fontSize:'11pt', color:'#595959', fontFamily:'Arial'}}>
                The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.
              </span>
            </div>
            <br />
            <div className="MsoNormal" data-custom-class="heading_1" style={{lineHeight: '1.5'}}><strong><h2>TABLE OF CONTENTS</h2></strong></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#services"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">1. OUR SERVICES</span></span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#ip"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">2. INTELLECTUAL PROPERTY RIGHTS</span></span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#userreps"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">3. USER REPRESENTATIONS</span></span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#purchases"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">4. PURCHASES AND PAYMENT</span></span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#subscriptions"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">5. SUBSCRIPTIONS</span></span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#returnno"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">6. POLICY</span></span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#prohibited"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">7. PROHIBITED ACTIVITIES</span></span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#ugc"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">8. USER GENERATED CONTRIBUTIONS</span></span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#license"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">9. CONTRIBUTION LICENSE</span></span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#sitemanage"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">10. SERVICES MANAGEMENT</span></span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#ppyes"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">11. PRIVACY POLICY</span></span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#terms"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">12. TERM AND TERMINATION</span></span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#modifications"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">13. MODIFICATIONS AND INTERRUPTIONS</span></span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#law"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">14. GOVERNING LAW</span></span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#disputes"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">15. DISPUTE RESOLUTION</span></span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#corrections"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">16. CORRECTIONS</span></span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#disclaimer"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">17. DISCLAIMER</span></span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#liability"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">18. LIMITATIONS OF LIABILITY</span></span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#indemnification"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">19. INDEMNIFICATION</span></span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#userdata"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">20. USER DATA</span></span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#electronic"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">21. ELECTRONIC COMMUNICATIONS</span></span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#sms"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">22. SMS TEXT MESSAGING</span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#california"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">23. CALIFORNIA USERS AND RESIDENTS</span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#misc"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">24. MISCELLANEOUS</span></a></div>
            <div className="MsoNormal" style={{lineHeight: '1.5'}}><a data-custom-class="link" href="#contact"><span style={{color: 'rgb(0, 58, 250)', fontSize: '15px'}}><span data-custom-class="body_text">25. CONTACT US</span></a></div>
            <br />
            <div id="services"><strong><h2>1. OUR SERVICES</h2></strong></div>
            <p data-custom-class="body_text">The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation.</p>
            <br />
            <div id="ip"><strong><h2>2. INTELLECTUAL PROPERTY RIGHTS</h2></strong></div>
            <p data-custom-class="body_text">We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, and website designs.</p>
            <br />
            <div id="userreps"><strong><h2>3. USER REPRESENTATIONS</h2></strong></div>
            <p data-custom-class="body_text">By using the Services, you represent and warrant that you have the legal capacity to agree to these terms.</p>
            <br />
            <div id="purchases"><strong><h2>4. PURCHASES AND PAYMENT</h2></strong></div>
            <p data-custom-class="body_text">We accept various forms of payment including Visa, Mastercard, American Express, Discover, and PayPal.</p>
            <br />
            <div id="subscriptions"><strong><h2>5. SUBSCRIPTIONS</h2></strong></div>
            <p data-custom-class="body_text">Your subscription will continue and automatically renew unless canceled.</p>
            <br />
            <div id="returnno"><strong><h2>6. POLICY</h2></strong></div>
            <p data-custom-class="body_text">All sales are final and no refund will be issued.</p>
            <br />
            <div id="prohibited"><strong><h2>7. PROHIBITED ACTIVITIES</h2></strong></div>
            <p data-custom-class="body_text">You may not access or use the Services for any purpose other than that for which we make the Services available.</p>
            <br />
            <div id="contact"><strong><h2>25. CONTACT US</h2></strong></div>
            <p data-custom-class="body_text">BookedAIWork<br />United States<br />Phone: 4327705299<br /><a target="_blank" data-custom-class="link" href="mailto:lhmorrow@bookedaiwork.com">lhmorrow@bookedaiwork.com</a></p>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-slate-100 flex items-center gap-2 text-slate-400">
        <button onClick={() => window.history.back()} className="flex items-center gap-2 hover:text-blue-600 transition-colors font-bold text-sm">
          <ChevronLeft className="w-4 h-4" /> Back to home
        </button>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/policy') {
        setPage('policy');
      } else if (path === '/service') {
        setPage('service');
      } else {
        setPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState();
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (p: Page, anchor?: string) => {
    const path = p === 'policy' ? '/policy' : p === 'service' ? '/service' : '/';
    
    if (p === 'home') {
      if (page !== 'home') {
        setPage('home');
        window.history.pushState({}, '', path);
        setTimeout(() => {
          if (anchor) {
            document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 100);
      } else {
        if (anchor) {
          document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    } else {
      setPage(p);
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="antialiased selection:bg-blue-100 selection:text-blue-900">
      <Navbar navigateTo={navigateTo} />
      <main>
        {page === 'home' && (
          <>
            <header className="pt-48 pb-32 px-4 overflow-hidden relative grid-bg">
              <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="inline-block mb-12">
                  <span className="bg-white/50 backdrop-blur-md text-blue-600 px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-sm border border-blue-100/30">
                    24/7 AI Receptionist for Small Business
                  </span>
                </div>
                
                <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-tight pb-4 text-slate-950">
                  Never miss a <br />
                  <span className="relative inline-block px-4">
                    customer lead
                    <span className="absolute bottom-4 left-0 w-full h-3 bg-blue-600/10 -z-10 rounded-full"></span>
                  </span><br />
                  again.
                </h1>
                
                <p className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mb-16 px-4">
                  Boost revenue with a virtual pro that handles your scheduling, answers questions, and confirms jobs—while you're on site or off the clock.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 px-4">
                  <button onClick={() => navigateTo('home', 'pricing')} className="w-full sm:w-auto px-12 py-6 bg-black text-white rounded-2xl font-bold text-xl hover:bg-slate-800 transform hover:scale-105 transition-all shadow-2xl shadow-black/20">
                    Buy Now
                  </button>
                  <button onClick={() => navigateTo('home', 'dashboard')} className="w-full sm:w-auto px-12 py-6 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold text-xl hover:bg-slate-50 transform transition-all shadow-sm">
                    See the Dashboard
                  </button>
                </div>

                <div className="flex items-center justify-center gap-3 text-sm font-bold text-slate-500 bg-white/60 backdrop-blur-xl w-fit mx-auto px-8 py-4 rounded-full border border-white/50 shadow-lg shadow-black/5">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.8)]"></div>
                  Simple onboarding. We handle the heavy lifting so you can focus on your business.
                </div>
              </div>
            </header>

            <Integrations />
            <DashboardSection />
            <AutomationSection />

            <section id="how-it-works" className="py-32 relative">
              <div className="max-w-7xl mx-auto px-4">
                <div className="mb-20 text-center">
                  <span className="text-[10px] font-bold tracking-[0.4em] text-blue-600 uppercase">Onboarding</span>
                  <h2 className="text-4xl font-black mt-6">Built for the trades</h2>
                  <p className="mt-6 text-xl font-medium text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    No coding, no complex manuals, just simple setup and better results.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { icon: <Plus className="text-white" />, color: 'bg-black', title: 'Sign up via form', desc: 'Fill out a quick questionnaire about your business hours, typical jobs, and pricing.' },
                    { icon: <Zap className="text-white" />, color: 'bg-blue-600', title: 'Connect tools', desc: 'Link your current phone number and Google Calendar. No hardware needed.' },
                    { icon: <LayoutDashboard className="text-white" />, color: 'bg-green-600', title: 'Train your AI', desc: 'Customize AI responses with your pricing and policies. It learns like a pro in minutes.' },
                    { icon: <ArrowRight className="text-white" />, color: 'bg-pink-600', title: 'Quick Deployment', desc: 'Start capturing missed leads and booking jobs while you sleep.' },
                  ].map((step, i) => (
                    <div key={i} className="bg-white/80 backdrop-blur-md p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group duration-500 hover:-translate-y-2">
                       <div className={`${step.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                         {step.icon}
                       </div>
                       <h4 className="font-bold text-xl mt-8 mb-4">{step.title}</h4>
                       <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>

                <div id="onboarding" className="mt-32 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 ring-1 ring-black/5">
                  <div className="p-16 text-center border-b border-slate-50 bg-slate-50/50">
                    <h3 className="text-3xl font-bold text-slate-800">Have questions? We’ve got you.</h3>
                    <p className="text-slate-500 mt-4">Fill out the details below for a free consultation.</p>
                  </div>
                  <div className="min-h-[400px] w-full bg-white p-8">
                    <TallyFormEmbed />
                  </div>
                </div>
              </div>
            </section>

            <PricingSection />
            <FAQSection />
          </>
        )}
        {page === 'policy' && <PolicyPage />}
        {page === 'service' && <TermsPage />}
      </main>
      <Footer navigateTo={navigateTo} />
    </div>
  );
};

export default App;
