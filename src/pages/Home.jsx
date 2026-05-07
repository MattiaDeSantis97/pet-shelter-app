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

      <div className="relative text-white p-12 md:p-20 rounded-3xl text-center mb-16 shadow-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20">
        <div className="relative z-10 flex flex-col items-center justify-center">
          <span className="inline-block bg-teal-500/80 text-white text-sm font-bold px-5 py-2 rounded-full uppercase tracking-widest mb-6 shadow-lg">
            🐾 Adozione Responsabile
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-2xl text-white">
            Pet Shelter 2026
          </h1>
          <p className="text-xl md:text-2xl mb-10 font-medium max-w-2xl mx-auto drop-shadow-lg text-gray-100">
            Ogni animale merita una famiglia. Scopri i nostri amici in cerca di casa.
          </p>
          <Link to="/animals" className="bg-teal-500 text-white px-10 py-5 rounded-full font-black text-lg hover:bg-teal-400 transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(20,184,166,0.6)] inline-block">
            Visualizza Animali Locali
          </Link>
        </div>
      </div>

      <div className="mb-12 bg-white/85 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-white/40">
        <div className="flex items-center justify-between mb-10 border-b-2 border-teal-100 pb-4">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800">Partner Esterni</h2>
          <span className="bg-teal-100 text-teal-800 text-xs font-black px-4 py-2 rounded-full uppercase shadow-sm">Live Feed</span>
        </div>

        {status === 'loading' && <div className="text-center p-20 font-bold text-teal-600">Caricamento partner...</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items && items.map((animal) => (
            <div key={animal.id} className="rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-white border border-gray-100">
              <div className="h-60 bg-gray-100 overflow-hidden relative">
                <img src={animal.image} alt={animal.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => { e.target.src = 'https://placehold.co/600x400/d1fae5/065f46?text=Foto'; }} />
              </div>
              <div className="p-6 grow">
                <h3 className="text-2xl font-black text-teal-900 mb-3 group-hover:text-teal-600 transition-colors">{animal.name}</h3>
                <p className="text-slate-600 font-medium leading-relaxed line-clamp-3">
                  {animal.description || 'Contatta il nostro partner per la scheda completa.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}