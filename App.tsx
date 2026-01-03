
import React, { useState } from 'react';
import { Home, LayoutGrid, DollarSign, User, PlusCircle } from 'lucide-react';
import VideoPlayer from './components/VideoPlayer';
import CreatorDashboard from './components/CreatorDashboard';
import AdManager from './components/AdManager';
import { AppView } from './types';
import { MOCK_POSTS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.FEED);

  const renderContent = () => {
    switch (currentView) {
      case AppView.FEED:
        return (
          <div className="video-container hide-scrollbar">
            {MOCK_POSTS.map((post) => (
              <VideoPlayer key={post.id} post={post} />
            ))}
          </div>
        );
      case AppView.DASHBOARD:
        return <CreatorDashboard />;
      case AppView.ADS_MANAGER:
        return <AdManager />;
      case AppView.PROFILE:
        return (
          <div className="flex items-center justify-center h-screen bg-gray-950 text-white">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-rose-500">
                <img src="https://picsum.photos/seed/me/200/200" alt="Me" />
              </div>
              <h1 className="text-2xl font-bold">@alex_vibes</h1>
              <p className="text-gray-400 mb-6">Lifestyle Creator | Digital Nomad</p>
              <div className="flex justify-center space-x-8">
                <div><p className="font-bold">125k</p><p className="text-xs text-gray-500">Followers</p></div>
                <div><p className="font-bold">452k</p><p className="text-xs text-gray-500">Likes</p></div>
                <div><p className="font-bold">12</p><p className="text-xs text-gray-500">Following</p></div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative h-screen w-screen bg-black select-none">
      {/* Content Area */}
      <main className="h-full w-full">
        {renderContent()}
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-lg border-t border-gray-800 flex justify-around items-center h-16 px-4 z-50">
        <button 
          onClick={() => setCurrentView(AppView.FEED)}
          className={`flex flex-col items-center space-y-1 ${currentView === AppView.FEED ? 'text-white' : 'text-gray-500'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold">Home</span>
        </button>
        
        <button 
          onClick={() => setCurrentView(AppView.ADS_MANAGER)}
          className={`flex flex-col items-center space-y-1 ${currentView === AppView.ADS_MANAGER ? 'text-white' : 'text-gray-500'}`}
        >
          <LayoutGrid className="w-6 h-6" />
          <span className="text-[10px] font-bold">Ads</span>
        </button>

        <button className="text-white hover:scale-110 transition-transform">
          <PlusCircle className="w-10 h-10 fill-white text-black" />
        </button>

        <button 
          onClick={() => setCurrentView(AppView.DASHBOARD)}
          className={`flex flex-col items-center space-y-1 ${currentView === AppView.DASHBOARD ? 'text-white' : 'text-gray-500'}`}
        >
          <DollarSign className="w-6 h-6" />
          <span className="text-[10px] font-bold">Earnings</span>
        </button>

        <button 
          onClick={() => setCurrentView(AppView.PROFILE)}
          className={`flex flex-col items-center space-y-1 ${currentView === AppView.PROFILE ? 'text-white' : 'text-gray-500'}`}
        >
          <User className="w-6 h-6" />
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </nav>

      {/* Top Tabs (Only on Feed) */}
      {currentView === AppView.FEED && (
        <div className="fixed top-0 left-0 w-full flex justify-center space-x-6 py-4 bg-gradient-to-b from-black/50 to-transparent z-40 pointer-events-none">
          <button className="text-gray-400 font-bold hover:text-white transition-colors pointer-events-auto">Following</button>
          <button className="text-white font-bold border-b-2 border-white pb-1 pointer-events-auto">For You</button>
        </div>
      )}
    </div>
  );
};

export default App;
