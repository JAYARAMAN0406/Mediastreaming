import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidenav from './components/Sidenav';
import Upload from './pages/Upload';
import Playlists from './pages/Playlists';
import Media from './pages/Media';
import PlaylistDetails from './pages/PlaylistDetails';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidenav />
        <main className="flex-1">
          <Routes>
            <Route path="/upload" element={<Upload />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/media" element={<Media />} />
            <Route path="/" element={<Media />} />
            <Route path="/playlist/:id" element={<PlaylistDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;