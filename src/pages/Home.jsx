import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExternalAnimals } from '../features/externalAnimalsSlice';
import { Link } from 'react-router-dom';

export default function Home() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.externalAnimals);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchExternalAnimals());
  }, [status, dispatch]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Hero con sfondo cane nel parco */}
      <div
        className="relative text-white p-12 rounded-3xl text-center mb-16 shadow-2xl overflow-hidden"
        style={{ minHeight: '340px' }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80')",
          }}
        />
        {/* Gradient overlay per leggibilità */}
        <div className="absolute inset-0 bg-linear-to-br from-emerald-900/75 via-green-800/60 to-amber-900/50" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest mb-6 border border-white/30">
            🐾 Adozione Responsabile
          </span>
          <h1 className="text-5xl font-black mb-4 tracking-tight drop-shadow-lg">
            Pet Shelter 2026
          </h1>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto drop-shadow">
            Ogni animale merita una famiglia. Scopri i nostri amici in cerca di casa.
          </p>
          <Link
            to="/animals"
            className="bg-white text-emerald-800 px-10 py-4 rounded-full font-bold hover:bg-amber-50 transition-all transform hover:scale-105 shadow-xl inline-block"
          >
            Visualizza Animali Locali
          </Link>
        </div>
      </div>

      {/* Sezione Partner Esterni */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8 border-b-2 border-amber-100 pb-4">
          <h2 className="text-3xl font-bold text-slate-800">Partner Esterni</h2>
          <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
            Live Feed
          </span>
        </div>

        {status === 'loading' && (
          <div className="flex justify-center items-center p-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
            <span className="ml-4 text-gray-500 font-medium">Caricamento partner...</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items && items.map((animal) => (
            <div
              key={animal.id}
              className="rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              style={{
                background: 'linear-gradient(145deg, #fefce8, #f0fdf4)',
                border: '1.5px solid #d9f99d',
                boxShadow: '0 4px 20px rgba(134,179,50,0.10)',
              }}
            >
              {/* Immagine */}
              <div className="h-56 bg-amber-100 overflow-hidden relative">
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/600x400/d1fae5/065f46?text=🐾';
                  }}
                />
                {/* Warm overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-yellow-50/80 to-transparent" />
              </div>

              {/* Contenuto */}
              <div className="p-5 grow">
                <h3 className="text-xl font-bold text-emerald-900 mb-2 group-hover:text-amber-700 transition-colors">
                  {animal.name}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  {animal.description || 'Contatta il nostro partner per la scheda completa.'}
                </p>
              </div>

              {/* Footer */}
              <div
                className="px-5 py-3 flex justify-between items-center"
                style={{ background: 'rgba(236,253,245,0.8)', borderTop: '1px solid #bbf7d0' }}
              >
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                  API Partner
                </span>
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {status === 'succeeded' && items.length === 0 && (
          <p className="text-center text-gray-500 py-10">Nessun dato disponibile dai partner esterni.</p>
        )}
      </div>
    </div>
  );
}