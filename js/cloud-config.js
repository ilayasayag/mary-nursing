/* Cloud save (Firebase). Leave as null to keep progress on this device only.
   To switch it on, paste the "firebaseConfig" object from
   Firebase console → Project settings → Your apps → Web app, e.g.:

   window.NX_CLOUD = {
     apiKey: "AIza...",
     authDomain: "mary-nursing.firebaseapp.com",
     projectId: "mary-nursing",
     appId: "1:123:web:abc"
   };

   These values are public by design; the Firestore rules in firestore.rules keep each person's data private. */
window.NX_CLOUD = {
  apiKey: 'AIzaSyC83PmUUU2U-LPHZ3pECrpsQh25nmrcV30',
  authDomain: 'mary-nursin.firebaseapp.com',
  projectId: 'mary-nursin',
  storageBucket: 'mary-nursin.firebasestorage.app',
  messagingSenderId: '696760761846',
  appId: '1:696760761846:web:3de8d357a98fcd4b031bd7'
};
