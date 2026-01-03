
import React, { useState } from 'react';
import { VideoPost } from '../types';
import { Heart, MessageCircle, Share2, Music, UserPlus } from 'lucide-react';

interface VideoPlayerProps {
  post: VideoPost;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);

  return (
    <div className="relative video-slide bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Simulate Video with Placeholder Image */}
      <img 
        src={post.videoUrl} 
        alt="Video content" 
        className="w-full h-full object-cover"
      />
      
      {/* Overlay: Bottom Info */}
      <div className="absolute bottom-20 left-4 right-12 z-10 pointer-events-none">
        <h3 className="font-bold text-lg mb-1 pointer-events-auto">@{post.creator.username}</h3>
        <p className="text-sm mb-3 pointer-events-auto">{post.description}</p>
        <div className="flex items-center space-x-2 text-sm pointer-events-auto">
          <Music className="w-4 h-4 animate-spin-slow" />
          <span>Original Audio - {post.creator.username}</span>
        </div>
      </div>

      {/* Overlay: Right Sidebar Actions */}
      <div className="absolute right-4 bottom-32 flex flex-col items-center space-y-6 z-10">
        <div className="relative mb-2">
          <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
            <img src={post.creator.avatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          {!following && (
            <button 
              onClick={() => setFollowing(true)}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-rose-500 text-white rounded-full p-0.5"
            >
              <UserPlus className="w-4 h-4" />
            </button>
          )}
        </div>

        <button 
          onClick={() => setLiked(!liked)}
          className="flex flex-col items-center group"
        >
          <div className={`p-2 rounded-full transition-colors ${liked ? 'text-rose-500' : 'text-white'}`}>
            <Heart className={`w-8 h-8 ${liked ? 'fill-current' : ''}`} />
          </div>
          <span className="text-xs font-semibold">{post.likes + (liked ? 1 : 0)}</span>
        </button>

        <button className="flex flex-col items-center">
          <div className="p-2 text-white">
            <MessageCircle className="w-8 h-8" />
          </div>
          <span className="text-xs font-semibold">{post.comments}</span>
        </button>

        <button className="flex flex-col items-center">
          <div className="p-2 text-white">
            <Share2 className="w-8 h-8" />
          </div>
          <span className="text-xs font-semibold">{post.shares}</span>
        </button>
      </div>

      {/* Ad CTA */}
      {post.isAd && (
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <button className="w-full bg-white text-black py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors flex items-center justify-between px-6">
            <span className="text-xs uppercase tracking-widest text-gray-500">Sponsored by {post.adBrand}</span>
            <span>{post.cta}</span>
          </button>
        </div>
      )}

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-gray-600 w-full z-10">
        <div className="h-full bg-white w-1/3 animate-progress"></div>
      </div>
    </div>
  );
};

export default VideoPlayer;
