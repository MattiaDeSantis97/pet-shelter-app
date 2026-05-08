*Progetto realizzato per scopi didattici - © 2026 Pet Shelter App*
"""

with open('README.md', 'w', encoding='utf-8') as f:
f.write(markdown_content)

```markdown
# 🐾 Pet Shelter 2026

![React](https://img.shields.io/badge/React-2025-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

Un'applicazione React moderna e performante per la gestione di un rifugio per animali, sviluppata come progetto finale per **EPICODE Institute of Technology**.

---

## 📖 Panoramica del Progetto
**Pet Shelter 2026** è una piattaforma dinamica che connette animali in cerca di casa con potenziali adottanti. L'app simula un ecosistema completo dove gli utenti possono esplorare annunci locali e internazionali, mentre i volontari e gli amministratori gestiscono il database e le richieste di adozione.

Il progetto dimostra la padronanza di concetti avanzati come la gestione dello stato globale, il routing dinamico, l'integrazione di API asincrone e la gestione dei ruoli utente.

---

## 🚀 Funzionalità Principali

### 🌐 Navigazione e Routing
- **8 Pagine Distinte:** Home, Lista Animali, Dettaglio Animale, Dashboard Volontario, Dashboard Admin, Login, Chi Siamo e Contattaci.
- **Routing Dinamico:** Utilizzo di `react-router-dom` per la navigazione e gestione dei parametri URL per le pagine di dettaglio (`/animal/:id`).
- **Paginazione e Filtri:** La lista animali supporta il filtraggio per specie e una paginazione fluida per gestire cataloghi ampi.

### 👤 Gestione Utenti e Ruoli
- **Autenticazione Simulata:** Sistema di login reattivo per l'accesso sicuro alle aree riservate.
- **Multi-Ruolo:**
  - **Adottante:** Può inviare richieste di adozione.
  - **Volontario:** Gestione completa degli annunci (Create, Update, Delete) con caricamento dinamico di immagini.
  - **Admin:** Accesso a una dashboard dedicata per l'approvazione o il rifiuto delle richieste, con aggiornamento automatico dello stato degli animali (es. Badge "Adottato").

### 🛠️ State Management & API
- **Redux Toolkit:** Gestione dello stato globale per animali, moduli di adozione e sessione utente.
- **Thunk:** Gestione fluida delle operazioni asincrone e del side-effect handling.
- **Integrazione API:** Consumo di API esterne per alimentare una sezione "Partner Globali" (dog.ceo) e utilizzo del `localStorage` del browser per simulare un backend persistente per il database locale senza server dipendenti.

### 📝 Form Controllati
- **Validazione:** 4 form completamente controllati (Login, Contatti, Inserimento/Modifica Annuncio, Richiesta Adozione) con gestione interna dello stato, validazione dei campi obbligatori e messaggi di errore dinamici.

---

## 💻 Tech Stack
- **Frontend:** React 19, Tailwind CSS.
- **State:** Redux Toolkit, Redux Thunk.
- **Routing:** React Router v6.
- **Deploy:** GitHub Pages, Vite.

---

## 🛠️ Istruzioni per l'Esecuzione Locale

1. **Clona la repository:**
   ```bash
   git clone [https://github.com/mattiadesantis97/pet-shelter-app.git](https://github.com/mattiadesantis97/pet-shelter-app.git)

```

2. **Entra nella cartella del progetto:**
```bash
cd pet-shelter-app

```


3. **Installa le dipendenze npm:**
```bash
npm install

```


4. **Avvia il server di sviluppo (Vite):**
```bash
npm run dev

```


5. **Visualizzazione online:**
L'app è già deployata all'indirizzo GitHub Pages fornito nelle impostazioni del repository.

---

## 🎨 Design & UI

L'interfaccia utilizza un approccio **Glassmorphism** moderno, con overlay semitrasparenti su background fotografici immersivi, garantendo alta leggibilità, contrasti testuali netti e interazioni utente intuitive (hover state, badge visivi, loader).

---

## 👨‍💻 Autore

**Mattia De Santis**


*Studente presso EPICODE - Progetto Esame Modulo Frontend Programming*.

```

```