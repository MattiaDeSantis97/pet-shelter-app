# Pet Shelter App

## Panoramica del Progetto
Questa applicazione è stata sviluppata come progetto finale per l'esame di Frontend Programming. Si tratta di una piattaforma per l'adozione di animali (Pet Shelter) che implementa concetti moderni di React, inclusa la gestione dello stato globale, routing dinamico e interazione con API.

[span_1](start_span)Il sistema prevede la simulazione di tre ruoli utente (Adottante, Volontario, Admin) e gestisce il ciclo di vita delle richieste di adozione[span_1](end_span).

## Funzionalità
- **[span_2](start_span)Simulazione Autenticazione:** Sistema di login con gestione dei ruoli tramite Redux[span_2](end_span).
- **[span_3](start_span)Gestione Stato:** Utilizzo di Redux Toolkit e Thunk per lo stato globale e le operazioni asincrone[span_3](end_span).
- **[span_4](start_span)Routing:** Navigazione tra 6 pagine distinte con React Router, incluso routing dinamico per i dettagli dell'animale (`/animal/:id`)[span_4](end_span).
- **[span_5](start_span)Dashboard Basate sui Ruoli:** - **Volontari:** Form per aggiungere nuovi animali al database locale[span_5](end_span).
  - **[span_6](start_span)Admin:** Pannello per approvare o rifiutare le richieste di adozione con note[span_6](end_span).
  - **Adottanti:** Modulo per richiedere l'adozione dalla pagina di dettaglio.
- **[span_7](start_span)Form Controllati:** 4 form completi di validazione (Login, Inserimento Animale, Richiesta Adozione, Valutazione Richiesta)[span_7](end_span).
- **[span_8](start_span)API Esterne:** Integrazione in sola lettura con Petfinder API (tramite OAuth2) e operazioni CRUD complete tramite JSON Server locale[span_8](end_span).

## Tecnologie Utilizzate
- React.js (Vite)
- [span_9](start_span)Tailwind CSS (Bonus UI/UX)[span_9](end_span)
- React Router DOM
- Redux Toolkit (React-Redux, Redux Thunk)
- JSON Server (Database Mock)

## Istruzioni per l'Esecuzione

1. **Installazione dipendenze:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Configurazione Variabili d'Ambiente:**
   Creare un file `.env` nella root del progetto e inserire le proprie credenziali di Petfinder API:
   \`\`\`env
   VITE_PETFINDER_CLIENT_ID=il_tuo_client_id
   VITE_PETFINDER_CLIENT_SECRET=il_tuo_client_secret
   \`\`\`

3. **Avvio JSON Server (Database):**
   \`\`\`bash
   npm run server
   \`\`\`
   Il server risponderà su \`http://localhost:3001\`.

4. **Avvio dell'applicazione React:**
   In un nuovo terminale, eseguire:
   \`\`\`bash
   npm run dev
   \`\`\`
   L'applicazione sarà accessibile all'indirizzo indicato da Vite (es. \`http://localhost:5173\`).