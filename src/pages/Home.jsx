import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExternalAnimals } from '../features/externalAnimalsSlice';
import { Link } from 'react-router-dom';

// Pagina Home, con sezione hero e grid di animali partner internazionali, con dati gestiti tramite Redux e localStorage
export default function Home() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.externalAnimals);

  // Carichiamo gli animali esterni in Redux se non sono già stati caricati
  useEffect(() => {
    if (status === 'idle') dispatch(fetchExternalAnimals());
  }, [status, dispatch]);

  return (
    // Layout della pagina Home, con sezione hero e grid di animali partner internazionali, con dati gestiti tramite Redux e localStorage
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero scuro per contrasto */}
      <div className="bg-slate-950/70 backdrop-blur-lg text-white p-12 md:p-20 rounded-[40px] text-center mb-16 border border-white/10 shadow-2xl">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white">Pet Shelter 2026</h1>
        <p className="text-xl md:text-2xl mb-10 font-bold text-teal-100 max-w-2xl mx-auto">
          Scopri i partner internazionali e trova l'amico perfetto.
        </p>
        <Link to="/animals" className="bg-teal-500 hover:bg-teal-400 text-white px-12 py-5 rounded-full font-black text-xl transition-all shadow-[0_15px_30px_rgba(20,184,166,0.5)] inline-block">
          ADOTTA ORA
        </Link>
      </div>

      {/* Grid Partner */}
      <div className="bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-[40px] border border-white/10 shadow-2xl">
        <h2 className="text-3xl font-black text-white mb-10 text-center uppercase tracking-widest">Partner Globali</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((animal) => (
            <div key={animal.id} className="bg-white rounded-4xl overflow-hidden shadow-2xl group transition-all">
              <div className="h-72 overflow-hidden relative">
                <img src={animal.image} alt={animal.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-teal-500 text-white text-[10px] font-black px-4 py-2 rounded-full shadow-lg">
                  {animal.origin}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-slate-800 mb-2">{animal.name}</h3>
                <p className="text-teal-600 font-black text-xs mb-4 uppercase">{animal.species}</p>
                <p className="text-slate-600 text-sm font-medium leading-relaxed line-clamp-4">
                  {animal.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}