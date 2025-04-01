import React from 'react';
import { Play } from 'lucide-react';

export default function MediaCard({ item, onClick }) {
  return (
    <div 
      className="group relative rounded-lg overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={item.thumbnail || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'}
        alt={item.title}
        className="w-full aspect-video object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
        <Play className="text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all" />
      </div>
      <div className="p-3 bg-white">
        <h3 className="font-semibold truncate">{item.title}</h3>
        <p className="text-sm text-gray-600 capitalize">{item.type}</p>
      </div>
    </div>
  );
}
