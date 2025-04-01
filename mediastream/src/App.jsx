import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LiveStream from './pages/LiveStream';
import SideNav from './components/Layout';
import PlaylistDetails from './pages/PlaylistDetails';
import Playlists from './pages/Playlists';
import Video from './pages/Video';
import Audio from './pages/Audio';

function App() {
  return (
    <BrowserRouter>
     <div className="flex min-h-screen bg-gray-50">
     <SideNav />
     <main className="flex-1 "> 
        <Routes>
      
          <Route path="/" element={<Home />} />
          <Route path="live" element={<LiveStream />} />
          <Route path="/playlist/:id" element={<PlaylistDetails />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/videos" element={<Video />} />
          <Route path="/music" element={<Audio />} />
          {/* Add other routes as needed */}
       
      </Routes>
      </main>
      </div>
    </BrowserRouter>
  );
}

export default App;