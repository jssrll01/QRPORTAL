import React, { useEffect } from 'react';
import { PHOTOS } from './profileData.js';
import { Gallery } from './Profile.jsx';

export default function Collection() {
  useEffect(() => {
    const old = document.title;
    document.title = 'Collection · Xmarket';
    window.scrollTo(0, 0);
    return () => { document.title = old; };
  }, []);
  return (
    <div className="svc-page">
      <header className="svc-bar">
        <div className="svc-bar-in">
          <button type="button" className="back-btn" onClick={() => { window.location.hash = '#/profile'; }} aria-label="Back to profile">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
            Back
          </button>
        </div>
      </header>
      <main className="shell svc">
        <h1>Collection</h1>
        <p className="svc-intro">{PHOTOS.length} photos. Tap a photo to view it larger.</p>
        <Gallery items={PHOTOS} />
      </main>
    </div>
  );
}
