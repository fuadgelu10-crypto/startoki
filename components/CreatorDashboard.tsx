
import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { DollarSign, Eye, Users, Star, TrendingUp, Sparkles } from 'lucide-react';
import { EARNING_SOURCES } from '../constants';
import { getMonetizationInsights } from '../services/geminiService';

const MOCK_REVENUE_DATA = [
  { date: 'Mon', revenue: 450, views: 120000 },
  { date: 'Tue', revenue: 620, views: 150000 },
  { date: 'Wed', revenue: 380, views: 98000 },
  { date: 'Thu', revenue: 810, views: 210000 },
  { date: 'Fri', revenue: 950, views: 240000 },
  { date: 'Sat', revenue: 1120, views: 280000 },
  { date: 'Sun', revenue: 1050, views: 260000 },
];

const CreatorDashboard: React.FC = () => {
  const [insight, setInsight] = useState<string>("Loading AI insights...");

  useEffect(() => {
    const fetchInsight = async () => {
      const result = await getMonetizationInsights(5380, 1358000);
      setInsight(result);
    };
    fetchInsight();
  }, []);

  return (
    <div className="p-6 pb-24 overflow-y-auto h-screen bg-gray-950 text-white">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Creator Dashboard</h1>
        <p className="text-gray-400">Manage your earnings and content performance.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Revenue', value: '$5,380.25', icon: DollarSign, color: 'text-green-400' },
          { label: 'Monthly Views', value: '1.36M', icon: Eye, color: 'text-blue-400' },
          { label: 'New Followers', value: '+12.4k', icon: Users, color: 'text-purple-400' },
          { label: 'Engagement Rate', value: '8.4%', icon: Star, color: 'text-yellow-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-gray-900 p-4 rounded-2xl border border-gray-800">
            <div className={`p-2 rounded-lg bg-gray-800 inline-block mb-3 ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">{stat.label}</p>
            <h2 className="text-xl font-bold">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* AI Insight Card */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-6 rounded-2xl mb-8 border border-white/10 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="text-yellow-400" />
          <h3 className="font-bold text-lg">AI Monetization Insight</h3>
        </div>
        <p className="text-indigo-100 leading-relaxed italic">"{insight}"</p>
      </div>

      {/* Revenue Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-green-400" />
            Revenue Trend (Last 7 Days)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#4b5563" />
                <YAxis stroke="#4b5563" />
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h3 className="text-lg font-bold mb-6">Monetization Breakdown</h3>
          <div className="space-y-6">
            {EARNING_SOURCES.map((source, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">{source.name}</span>
                  <span className="text-gray-400">{30 - i * 5}% contribution</span>
                </div>
                <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${30 - i * 5}%`, backgroundColor: source.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Payouts */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h3 className="font-bold">Recent Payouts</h3>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm border-b border-gray-800">
              <th className="p-6 font-medium">Date</th>
              <th className="p-6 font-medium">Method</th>
              <th className="p-6 font-medium text-right">Amount</th>
              <th className="p-6 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { date: 'Oct 24, 2023', method: 'Bank Transfer (•••• 4521)', amount: '$2,140.00', status: 'Processing' },
              { date: 'Oct 01, 2023', method: 'PayPal (a***@gmail.com)', amount: '$1,850.50', status: 'Completed' },
              { date: 'Sep 15, 2023', method: 'Bank Transfer (•••• 4521)', amount: '$1,390.10', status: 'Completed' },
            ].map((payout, i) => (
              <tr key={i} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                <td className="p-6">{payout.date}</td>
                <td className="p-6">{payout.method}</td>
                <td className="p-6 text-right font-bold">{payout.amount}</td>
                <td className="p-6 text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    payout.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {payout.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreatorDashboard;
