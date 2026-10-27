// Firebase konfiguracija web aplikacije (projekt „primjersmarthome“).
// Ovi ključevi su javni identifikatori aplikacije, a ne tajne — pristup podacima štite Firebase Security Rules.
// Datoteka se ne uvozi ni na jednoj stranici dok ne zatreba (npr. Firestore za obrasce),
// pa SDK ne ulazi u bundle i ne usporava učitavanje sitea.
import { initializeApp, getApps } from 'firebase/app';

export const firebaseConfig = {
  apiKey: 'AIzaSyDaNMLiQCE3mb1qCav7fIzvbpwR08pxCZA',
  authDomain: 'primjersmarthome.firebaseapp.com',
  projectId: 'primjersmarthome',
  storageBucket: 'primjersmarthome.firebasestorage.app',
  messagingSenderId: '177957362501',
  appId: '1:177957362501:web:988be7555ec37ff0c77c2c',
};

export const app = getApps()[0] ?? initializeApp(firebaseConfig);
