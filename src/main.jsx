import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Services, { Plan } from './Services.jsx';
import Profile from './Profile.jsx';
import Collection from './Collection.jsx';
import { Certifications, Achievements } from './GalleryPages.jsx';
import './styles.css';
import './guard.js';
import { loadQrp } from './qrpApi.js';

function Root() {
  const [h, setH] = useState(window.location.hash);
  useEffect(() => {
    const on = () => setH(window.location.hash);
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  if (h.startsWith('#/services')) return <Services />;
  if (h.startsWith('#/plan')) return <Plan />;
if (h.startsWith('#/profile')) return <Profile />;
if (h.startsWith('#/collection')) return <Collection />;
if (h.startsWith('#/certifications')) return <Certifications />;
if (h.startsWith('#/achievements')) return <Achievements />;
  return <App />;
}

loadQrp().finally(() => createRoot(document.getElementById('root')).render(<Root />));
