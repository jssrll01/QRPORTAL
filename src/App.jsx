import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

const GROUPS = [
  { id: 'xmarket', title: 'Xmarket' },
  { id: 'apps', title: 'Apps & Projects' },
  { id: 'social', title: 'Social' },
  { id: 'contact', title: 'Contact' },
];

const LINKS = [
  { id: 'landing', group: 'xmarket', label: 'Xmarket Landing Page', sub: 'xmarket-landing.onrender.com', url: 'xmarket-landing.onrender.com', icon: 'globe' },
  { id: 'shop', group: 'xmarket', label: 'Xmarket', sub: 'xmarket-app.shop', url: 'xmarket-app.shop', icon: 'cart' },
  { id: 'signup', group: 'xmarket', label: 'Create Account', sub: 'Join Xmarket', url: 'xmarket-app.onrender.com/signup', icon: 'user' },
  { id: 'xmail', group: 'xmarket', label: 'Xmarket Email', sub: 'xmarket.official.marketplace@gmail.com', url: 'xmarket.official.marketplace@gmail.com', icon: 'mail' },
  { id: 'xfb', group: 'xmarket', label: 'Xmarket Facebook Page', sub: 'facebook.com', url: 'https://www.facebook.com/share/18iMp1CDtN/', icon: 'f' },
  { id: 'course', group: 'apps', label: 'Xentrepreneur Online Course', sub: 'xentrepreneur-app.vercel.app', url: 'xentrepreneur-app.vercel.app', icon: 'cap' },
  { id: 'receiptx', group: 'apps', label: 'ReceiptX App', sub: 'receiptx-app.vercel.app', url: 'receiptx-app.vercel.app', icon: 'receipt' },
  { id: 'pricee', group: 'apps', label: 'Pricee App', sub: 'pricee-app.vercel.app', url: 'pricee-app.vercel.app', icon: 'tag' },
  { id: 'astra', group: 'apps', label: 'Project Astra', sub: 'project-astraaa.onrender.com', url: 'project-astraaa.onrender.com', icon: 'star' },
  { id: 'fb', group: 'social', label: 'Facebook', sub: 'facebook.com', url: 'https://www.facebook.com/share/1V38WfYUVW/', icon: 'f' },
  { id: 'ig', group: 'social', label: 'Instagram', sub: '@jssrll.07', url: 'https://www.instagram.com/jssrll.07?mdxt=MTB3NmsxNzlkaHhmaw==', icon: 'IG' },
  { id: 'tt', group: 'social', label: 'TikTok', sub: '@shaomi3_07', url: 'tiktok.com/@shaomi3_07', icon: 'TT' },
  { id: 'sp', group: 'social', label: 'Spotify', sub: 'open.spotify.com', url: 'https://open.spotify.com/user/31fjj7m6vyvicxsurqgrb3whpze4?si=LzyxMxudRJCq_dpCQi3NiA&utm_source=copy-link', icon: 'note' },
  { id: 'x', group: 'social', label: 'Twitter (X)', sub: '@astrater07', url: 'https://x.com/astrater07', icon: 'X' },
  { id: 'dc', group: 'social', label: 'Discord', sub: 'discord.gg', url: 'https://discord.gg/nZbUyKQv', icon: 'DC' },
  { id: 'sc', group: 'social', label: 'Snapchat', sub: '@astrater07', url: 'https://www.snapchat.com/add/astrater07?share_id=ghUe2s-mLIw&locale=en-GB', icon: 'SC' },
  { id: 'mail', group: 'contact', label: 'Email', sub: 'custodiojessrell07@gmail.com', url: 'custodiojessrell07@gmail.com', icon: 'mail' },
  { id: 'tg', group: 'contact', label: 'Telegram', sub: 't.me/zyntx01', url: 't.me/zyntx01', icon: 'send' },
];

const toHref = (u) => {
  if (/^(https?:|mailto:)/i.test(u)) return u;
  if (u.includes('@') && !u.includes('/') && !u.startsWith('tiktok')) return 'mailto:' + u;
  return 'https://' + u;
};

const P = {
  globe: 'M12 3a9 9 0 100 18 9 9 0 000-18zm0 0c2.5 2.4 3.8 5.4 3.8 9S14.5 18.6 12 21m0-18C9.5 5.4 8.2 8.4 8.2 12S9.5 18.6 12 21M3.5 9h17M3.5 15h17',
  cart: 'M3 4h2l2.2 10.2a1 1 0 001 .8h8.6a1 1 0 001-.8L19 8H6.2M9.5 19.5h.01M16.5 19.5h.01',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0M19 8v6M16 11h6',
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  cap: 'M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5',
  receipt: 'M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6',
  tag: 'M3 12V4h8l10 10-8 8zM7.5 8h.01',
  star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
  note: 'M9 18V6l10-2v12M9 18a3 3 0 11-6 0 3 3 0 016 0zm10-2a3 3 0 11-6 0 3 3 0 016 0z',
  send: 'M21 3L3 10.5l6 2.2L11.5 20l3-5 5 3.5zM9 12.7L21 3',
};

function Icon({ name }) {
  if (P[name]) {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={P[name]} />
      </svg>
    );
  }
  return <span className="mono">{name}</span>;
}

function Card({ item, index }) {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', (-y * 14).toFixed(2) + 'deg');
    el.style.setProperty('--ry', (x * 14).toFixed(2) + 'deg');
    el.style.setProperty('--gx', (x * 100 + 50).toFixed(1) + '%');
    el.style.setProperty('--gy', (y * 100 + 50).toFixed(1) + '%');
  };
  const reset = () => {
    const el = ref.current; if (!el) return;
    el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg');
  };
  const href = toHref(item.url);
  const external = href.startsWith('http');
  return (
    <a
      className="card-wrap"
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{ viewTransitionName: 'c-' + item.id, '--i': index }}
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerUp={reset}
    >
      <div className="card" ref={ref}>
        <span className="badge"><Icon name={item.icon} /></span>
        <span className="txt">
          <b>{item.label}</b>
          <small>{item.sub}</small>
        </span>
        <span className="arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
        </span>
      </div>
    </a>
  );
}

export default function App() {
  const [tab, setTab] = useState('all');
  const root = useRef(null);

  const morph = (next) => {
    if (next === tab) return;
    if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(() => { flushSync(() => setTab(next)); });
    } else setTab(next);
  };

  useEffect(() => {
    const el = root.current; if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;
    const loop = () => {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      el.style.setProperty('--mx', cx.toFixed(3));
      el.style.setProperty('--my', cy.toFixed(3));
      raf = requestAnimationFrame(loop);
    };
    const onPtr = (e) => { tx = (e.clientX / window.innerWidth - 0.5) * 2; ty = (e.clientY / window.innerHeight - 0.5) * 2; };
    const onTilt = (e) => {
      if (e.gamma == null) return;
      tx = Math.max(-1, Math.min(1, e.gamma / 30));
      ty = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
    };
    const onScroll = () => el.style.setProperty('--sy', String(window.scrollY));
    window.addEventListener('pointermove', onPtr, { passive: true });
    window.addEventListener('deviceorientation', onTilt, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPtr);
      window.removeEventListener('deviceorientation', onTilt);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const tabs = [{ id: 'all', title: 'All' }, ...GROUPS];
  const shown = GROUPS.filter((g) => tab === 'all' || tab === g.id);
  let n = 0;

  return (
    <div className="app" ref={root}>
      <div className="bg" aria-hidden="true">
        <i className="orb o1" /><i className="orb o2" /><i className="orb o3" /><i className="orb o4" />
      </div>

      <main className="shell">
        <header className="hero">
          <div className="logo" style={{ viewTransitionName: 'logo' }}><span>X</span></div>
          <h1>Let&rsquo;s connect</h1>
          <p>Scan. Tap. Connect. Everything in one place.</p>
        </header>

        <nav className="tabs" aria-label="Link groups">
          {tabs.map((t) => (
            <button key={t.id} className={tab === t.id ? 'on' : ''} onClick={() => morph(t.id)} aria-pressed={tab === t.id}>
              {tab === t.id && <span className="pill" style={{ viewTransitionName: 'pill' }} />}
              <span className="lbl">{t.title}</span>
            </button>
          ))}
        </nav>

        {shown.map((g) => (
          <section key={g.id} className="sec">
            <h2>{g.title}</h2>
            <div className="grid">
              {LINKS.filter((l) => l.group === g.id).map((l) => <Card key={l.id} item={l} index={n++} />)}
            </div>
          </section>
        ))}

        <footer>&copy; {new Date().getFullYear()} Xmarket</footer>
      </main>
    </div>
  );
}
