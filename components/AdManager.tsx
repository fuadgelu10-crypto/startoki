
import React, { useState } from 'react';
import { Target, MessageSquare, Zap, BarChart2, Plus, ArrowRight, Loader2 } from 'lucide-react';
import { generateAdCopy } from '../services/geminiService';

const AdManager: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [audience, setAudience] = useState('');
  const [generating, setGenerating] = useState(false);
  const [adPreview, setAdPreview] = useState<{ caption: string, hashtags: string[] } | null>(null);

  const handleGenerate = async () => {
    if (!productName || !audience) return;
    setGenerating(true);
    const result = await generateAdCopy(productName, audience);
    setAdPreview(result);
    setGenerating(false);
  };

  return (
    <div className="p-6 pb-24 overflow-y-auto h-screen bg-black text-white">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Ad Manager</h1>
        <p className="text-gray-400">Launch viral campaigns with AI-driven content.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ad Creator Form */}
        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="text-yellow-400 fill-current" />
            <h2 className="text-xl font-bold">Smart Ad Campaign</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Product/Brand Name</label>
              <input 
                type="text" 
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. UltraFit Sneakers"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Target Audience</label>
              <input 
                type="text" 
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g. Gen-Z fitness enthusiasts"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>

            <button 
              onClick={handleGenerate}
              disabled={generating || !productName || !audience}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
            >
              {generating ? <Loader2 className="animate-spin" /> : <Plus size={20} />}
              Generate AI Ad Content
            </button>
          </div>
        </div>

        {/* Ad Preview Section */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-800 bg-gray-800/50 flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2">
              <MessageSquare size={18} className="text-blue-400" />
              Creative Preview
            </h3>
            <span className="text-xs text-gray-500 font-mono uppercase tracking-tighter">Mockup v1.0</span>
          </div>
          
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            {adPreview ? (
              <div className="max-w-xs w-full bg-white text-black rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative aspect-[9/16] bg-gray-200">
                  <img src="https://picsum.photos/seed/adpreview/1080/1920" className="absolute inset-0 w-full h-full object-cover" alt="Ad visual" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4 text-left text-white">
                    <p className="text-sm font-bold mb-1">@{productName.toLowerCase().replace(/\s/g, '_')}</p>
                    <p className="text-xs line-clamp-3 mb-2">{adPreview.caption}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {adPreview.hashtags.map((tag, i) => (
                        <span key={i} className="text-[10px] opacity-80">#{tag}</span>
                      ))}
                    </div>
                    <button className="w-full bg-white text-black py-2 rounded-lg text-xs font-bold">Shop Now</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-600 space-y-4">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                  <Target size={32} />
                </div>
                <p className="max-w-[200px]">Fill in the details to generate your optimized viral ad.</p>
              </div>
            )}
          </div>

          {adPreview && (
            <div className="p-4 bg-gray-800/30 border-t border-gray-800 flex justify-end">
              <button className="flex items-center gap-2 text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
                Proceed to Checkout <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Active Campaigns Table */}
      <div className="mt-8 bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h3 className="font-bold flex items-center gap-2">
            <BarChart2 size={18} />
            Live Campaigns
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm border-b border-gray-800">
                <th className="p-6 font-medium">Campaign</th>
                <th className="p-6 font-medium">Reach</th>
                <th className="p-6 font-medium">Conversions</th>
                <th className="p-6 font-medium">Spend</th>
                <th className="p-6 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Eco-Bottle Launch', reach: '245,210', conv: '4.2%', spend: '$1,200', status: 'Active' },
                { name: 'Back to School Sale', reach: '12,450', conv: '1.8%', spend: '$450', status: 'Paused' },
              ].map((campaign, i) => (
                <tr key={i} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <td className="p-6 font-bold">{campaign.name}</td>
                  <td className="p-6 text-gray-400">{campaign.reach}</td>
                  <td className="p-6 text-gray-400">{campaign.conv}</td>
                  <td className="p-6 text-gray-400">{campaign.spend}</td>
                  <td className="p-6 text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      campaign.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdManager;
