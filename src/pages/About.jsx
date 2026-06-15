export default function About() {
  return (
    <div className="max-w-4xl mx-auto mt-12 p-10 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20">
      <h1 className="text-4xl md:text-5xl font-black text-teal-800 mb-8 border-b-4 border-teal-100 pb-6">Chi Siamo</h1>
      <div className="space-y-6 text-slate-700 text-lg leading-relaxed font-medium">
        <p>Benvenuti in <strong className="text-teal-700">PetShelter 2026</strong>, la piattaforma nata per connettere animali in cerca di una casa amorevole con famiglie pronte ad accoglierli.</p>
        <p>La nostra missione è semplice ma fondamentale: 
          ridurre il randagismo e garantire a ogni cane, gatto o altro animale da compagnia una vita dignitosa e felice. 
          Lavoriamo in stretta collaborazione con rifugi locali e partner esterni, unendo le forze per trovargli il compagno perfetto.</p>
        <p>Tramite il nostro portale puoi visualizzare in tempo reale gli animali disponibili e inviare richieste di adozione. 
          Dietro le quinte, i nostri <strong>Volontari</strong> aggiornano costantemente le schede e le foto, 
          mentre il team <strong>Admin</strong> si assicura che ogni adozione vada a buon fine con serietà e sicurezza.</p>
        <p className="font-black text-xl text-teal-600 pt-6 text-center">Unisciti a noi e fai la differenza: Adotta, non comprare!</p>
      </div>
    </div>
  );
}