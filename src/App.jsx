import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AnimalList from './pages/AnimalList';
import AnimalDetail from './pages/AnimalDetail';
import VolunteerDashboard from './pages/VolunteerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      {/* Sfondo globale dell'applicazione */}
      <div 
        className="min-h-screen bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1600&q=80')" }}
      >
        {/* Overlay scuro per permettere la leggibilità delle card in sovraimpressione */}
        <div className="min-h-screen bg-black/50 backdrop-blur-sm flex flex-col">
          <Navbar />
          <main className="container mx-auto p-4 flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/animals" element={<AnimalList />} />
              <Route path="/animal/:id" element={<AnimalDetail />} />
              <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;