import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocalAnimals } from '../features/animalsSlice';
import { Link } from 'react-router-dom';

export default function AnimalList() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.animals);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchLocalAnimals());
  }, [status, dispatch]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-4xl font-black text-white mb-10 text-center drop-shadow-md">
        I Nostri Ospiti Locali
      </h2>

      {status === 'loading' && <p className="text-white text-center font-bold">Caricamento...</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((animal) => (
          <div key={animal.id} className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl flex flex-col hover:scale-105 transition-transform duration-300">
            {/* Foto dell'animale caricata dal volontario */}
            <div className="h-64 bg-slate-200">
              <img 
                src={animal.image || 'https://placehold.co/600x400?text=🐾'} 
                alt={animal.name} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Contenuto pulito */}
            <div className="p-6 flex flex-col grow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-black text-slate-800">{animal.name}</h3>
                <span className="bg-teal-100 text-teal-700 text-xs font-black px-2 py-1 rounded">
                  {animal.age} ANNI
                </span>
              </div>
              <p className="text-teal-600 font-bold text-sm mb-4 uppercase tracking-widest">
                {animal.species}
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                {animal.description}
              </p>
              
              <Link 
                to={`/animal/${animal.id}`} 
                className="mt-auto bg-slate-800 text-white text-center py-3 rounded-xl font-bold hover:bg-teal-600 transition-colors"
              >
                Scopri di più
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}