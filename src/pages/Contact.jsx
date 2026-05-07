export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Messaggio inviato con successo! Ti risponderemo al più presto sulla tua email.');
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Form di Contatto */}
      <div className="bg-white/95 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20">
        <h2 className="text-3xl font-black text-teal-800 mb-8">Scrivici un Messaggio</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Nome e Cognome</label>
            <input type="text" required className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-teal-500 outline-none transition-colors" placeholder="Mario Rossi" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Indirizzo Email</label>
            <input type="email" required className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-teal-500 outline-none transition-colors" placeholder="mario@email.com" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Come possiamo aiutarti?</label>
            <textarea required rows="5" className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-teal-500 outline-none transition-colors resize-none" placeholder="Scrivi qui il tuo messaggio..."></textarea>
          </div>
          <button type="submit" className="w-full bg-teal-600 text-white font-black text-lg py-4 rounded-xl hover:bg-teal-700 transition-colors shadow-lg mt-4">
            Invia Richiesta
          </button>
        </form>
      </div>

      {/* Info Azienda */}
      <div className="bg-gradient-to-br from-teal-800 to-teal-900 text-white p-10 rounded-3xl shadow-2xl flex flex-col justify-center space-y-10 border border-teal-700">
        <div>
          <h3 className="text-3xl font-black mb-3 text-teal-100">I nostri Recapiti</h3>
          <p className="text-teal-50 font-medium text-lg leading-relaxed">Siamo qui per rispondere a tutte le tue domande sull'adozione, il volontariato e il supporto alla nostra struttura.</p>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl shadow-inner">📞</div>
          <div>
            <p className="text-sm text-teal-200 font-bold uppercase tracking-wider">Linea Diretta</p>
            <p className="text-2xl font-black">+39 02 1234 5678</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl shadow-inner">✉️</div>
          <div>
            <p className="text-sm text-teal-200 font-bold uppercase tracking-wider">Email Supporto</p>
            <p className="text-2xl font-black">info@petshelter2026.it</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl shadow-inner">📍</div>
          <div>
            <p className="text-sm text-teal-200 font-bold uppercase tracking-wider">Sede Centrale</p>
            <p className="text-xl font-black">Via degli Animali Felici 42<br/>20100 Milano, Italia</p>
          </div>
        </div>
      </div>
    </div>
  );
}