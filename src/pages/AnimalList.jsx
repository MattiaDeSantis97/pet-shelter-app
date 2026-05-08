import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocalAnimals } from '../features/animalsSlice';
import { Link, useLocation } from 'react-router-dom';

export default function AnimalList() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.animals);
  const query = new URLSearchParams(useLocation().search);
  const filterType = query.get('type');

  useEffect(() => {
    if (status === 'idle') dispatch(fetchLocalAnimals());
  }, [status, dispatch]);

  const filteredItems = filterType 
    ? items.filter(a => a.species.toLowerCase().includes(filterType.toLowerCase()))
    : items;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl mb-10 border border-teal-200 shadow-lg">
        <h2 className="text-4xl font-black text-slate-800 text-center uppercase tracking-tighter">
          {filterType ? `Categoria: ${filterType}` : "Animali in Rifugio"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {filteredItems.map((animal) => (
          <div key={animal.id} className={`bg-white rounded-4xl overflow-hidden shadow-2xl flex flex-col relative transition-all duration-300 ${animal.isAdopted ? 'opacity-75 grayscale-[0.5]' : 'hover:-translate-y-2'}`}>
            
            {/* Badge Adozione Confermata */}
            {animal.isAdopted && (
              <div className="absolute top-0 left-0 w-full h-full z-20 flex items-center justify-center pointer-events-none">
                <div className="bg-green-600/90 text-white font-black text-xl px-8 py-3 rounded-full shadow-2xl rotate-[-10deg] border-4 border-white uppercase tracking-widest">
                  Adottato! 🎉
                </div>
              </div>
            )}

            <div className="h-64 bg-slate-100">
              <img src={animal.image || 'https://placehold.co/600x400?text=🐾'} alt={animal.name} className="w-full h-full object-cover" />
            </div>

            <div className="p-8 flex flex-col grow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-black text-slate-800 uppercase">{animal.name}</h3>
                <span className="bg-teal-100 text-teal-700 text-[10px] font-black px-3 py-1 rounded-full">{animal.age} ANNI</span>
              </div>
              <p className="text-teal-600 font-black text-xs mb-4 uppercase tracking-widest">{animal.species}</p>
              <p className="text-slate-600 text-sm font-medium leading-relaxed mb-8 line-clamp-3 italic">"{animal.description}"</p>
              
              {!animal.isAdopted && (
                <Link to={`/animal/${animal.id}`} className="mt-auto bg-slate-800 text-white text-center py-4 rounded-2xl font-black hover:bg-teal-600 transition-all uppercase text-xs tracking-widest">
                  Dettagli Adozione
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}