import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocalAnimals } from '../features/animalsSlice';
import { Link, useLocation } from 'react-router-dom';

export default function AnimalList() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.animals);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const filterType = query.get('type');

  useEffect(() => {
    if (status === 'idle') dispatch(fetchLocalAnimals());
  }, [status, dispatch]);

  // Filtriamo gli animali se presente un parametro nell'URL
  const filteredItems = filterType 
    ? items.filter(a => a.species.toLowerCase().includes(filterType.toLowerCase()))
    : items;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl mb-10 border border-white/20">
        <h2 className="text-4xl font-black text-white text-center">
          {filterType ? `Risultati per: ${filterType}` : "I Nostri Ospiti Locali"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredItems.map((animal) => (
          <div key={animal.id} className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col hover:translate-y-[-10px] transition-all duration-300">
            <div className="h-64 bg-slate-200">
              <img src={animal.image || 'https://placehold.co/600x400?text=🐾'} alt={animal.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex flex-col grow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-black text-slate-800 uppercase">{animal.name}</h3>
                <span className="bg-teal-500 text-white text-[10px] font-black px-3 py-1 rounded-full">{animal.age} ANNI</span>
              </div>
              <p className="text-teal-600 font-black text-xs mb-4 uppercase tracking-tighter">{animal.species}</p>
              <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6 line-clamp-3 italic">
                "{animal.description}"
              </p>
              <Link to={`/animal/${animal.id}`} className="mt-auto bg-slate-900 text-white text-center py-4 rounded-2xl font-black hover:bg-teal-600 transition-all uppercase tracking-widest text-xs">
                Visualizza Scheda
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}