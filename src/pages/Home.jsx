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
      {/* Hero Section con contrasto migliorato */}
      <div className="bg-slate-900/40 backdrop-blur-md text-white p-12 rounded-3xl text-center mb-16 border border-white/20 shadow-2xl">
        <h1 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-xl">Pet Shelter 2026</h1>
        <p className="text-xl md:text-2xl mb-10 font-bold text-teal-50 drop-shadow-md">
          Connettiamo cuori solitari con famiglie amorevoli.
        </p>
        <Link to="/animals" className="bg-teal-500 hover:bg-teal-400 text-white px-10 py-4 rounded-full font-black text-xl transition-all shadow-[0_10px_20px_rgba(20,184,166,0.4)] inline-block">
          Adotta Ora
        </Link>
      </div>

      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl border border-white/20 shadow-inner">
        <h2 className="text-3xl font-black text-white mb-10 border-b-4 border-teal-500 inline-block pb-2">
          Partner Internazionali (Cats & Dogs)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((animal) => (
            <div key={animal.id} className="bg-white rounded-3xl overflow-hidden shadow-xl group">
              <div className="h-64 overflow-hidden relative">
                <img src={animal.image} alt={animal.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-slate-900/80 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                  {animal.origin}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-slate-800 mb-2">{animal.name}</h3>
                <p className="text-teal-600 font-black text-xs mb-3 uppercase">{animal.species}</p>
                <p className="text-slate-600 text-sm font-medium leading-relaxed line-clamp-3">
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