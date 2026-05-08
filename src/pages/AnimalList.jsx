import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocalAnimals } from '../features/animalsSlice';
import { Link, useLocation } from 'react-router-dom';

export default function AnimalList() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.animals);
  const query = new URLSearchParams(useLocation().search);
  const filterType = query.get('type');

  // STATI PER LA PAGINAZIONE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    if (status === 'idle') dispatch(fetchLocalAnimals());
  }, [status, dispatch]);

  const filteredItems = filterType 
    ? items.filter(a => a.species.toLowerCase().includes(filterType.toLowerCase()))
    : items;

  // LOGICA PAGINAZIONE
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl mb-10 border border-teal-200 shadow-lg">
        <h2 className="text-4xl font-black text-slate-800 text-center uppercase tracking-tighter">
          {filterType ? `Categoria: ${filterType}` : "Animali in Rifugio"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        {currentItems.map((animal) => (
          <div key={animal.id} className={`bg-white rounded-4xl overflow-hidden shadow-2xl flex flex-col relative transition-all duration-300 ${animal.isAdopted ? 'opacity-75 grayscale-[0.5]' : 'hover:-translate-y-2'}`}>
            
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

      {/* CONTROLLI PAGINAZIONE */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-5 py-2 rounded-full font-black transition-colors ${currentPage === i + 1 ? 'bg-teal-600 text-white' : 'bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}