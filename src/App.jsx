import React, { memo, useEffect, useRef, useState } from 'react';
import { PromoBanner } from "./Services.jsx";
import { flushSync } from 'react-dom';

const VIDEO = 'https://res.cloudinary.com/bvw3okdf/video/upload/q_auto/New_Project_29_47DDC02.mp4';
const AD_RATIO = '16 / 9';

export const GROUPS = [];

export const LINKS = [];

const toHref = (u) => {
if (u.startsWith('#')) return u;
  if (/^(https?:|mailto:)/i.test(u)) return u;
  if (u.includes('@') && !u.includes('/') && !u.startsWith('tiktok')) return 'mailto:' + u;
  return 'https://' + u;
};

const EXT = ['png', 'svg', 'webp', 'jpg', 'ico'];
const sources = (it) => {
  const o = [];
  if (it.own) EXT.forEach((e) => o.push('/logos/' + (it.logo || it.id) + '.' + e));
  if (it.slug) o.push('https://cdn.simpleicons.org/' + it.slug + '/' + it.color);
  if (it.domain) o.push('https://www.google.com/s2/favicons?domain=' + it.domain + '&sz=128');
  return o;
};

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const CROWN = (() => {
  let d = '';
  for (let i = 0; i < 40; i++) {
    const a = (i / 40) * 6.2832, b = a + 0.16;
    d += 'M' + (100 + Math.cos(a) * 78).toFixed(1) + ' ' + (100 + Math.sin(a) * 78).toFixed(1) +
      'L' + (100 + Math.cos(b) * 94).toFixed(1) + ' ' + (100 + Math.sin(b) * 94).toFixed(1);
  }
  return d;
})();

const Logo = memo(function Logo({ item, big }) {
  const list = sources(item);
  const [i, setI] = useState(0);
  const [ok, setOk] = useState(false);
  const src = list[i];
  return (
    <span className={'badge' + (big ? ' big' : '') + (ok ? ' ok' : '')}>
      {src
        ? <img key={src} src={src} alt="" decoding="async" onLoad={() => setOk(true)} onError={() => setI((n) => n + 1)} />
        : <span className="mono">{item.emoji || item.label[0]}</span>}
      {src && !ok && <i className="sk fill" />}
    </span>
  );
});

const Card = memo(function Card({ item }) {
  const href = toHref(item.url);
  const ext = href.startsWith('http');
  return (
    <a className={'card-wrap' + (item.feature ? ' feature' : '')} href={href}
      target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined}
      aria-label={item.label} style={{ viewTransitionName: 'c-' + item.id }}>
      <div className="card">
        <Logo item={item} />
        <span className="txt"><b>{item.label}</b><em className="tag">{item.tag}</em></span>
        {item.cta
          ? <span className="cta">{item.cta}</span>
          : <span className="arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg></span>}
      </div>
    </a>
  );
});

/* Autoplay, no controls, can't be paused. Starts with sound if allowed,
   otherwise muted until the visitor's first touch. */
function Ad() {
  const v = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const el = v.current; if (!el) return;
    const evs = ['pointerdown', 'touchend', 'click', 'keydown'];
    const unlock = () => {
      el.muted = false; el.volume = 1;
      el.play().then(() => evs.forEach((e) => window.removeEventListener(e, unlock))).catch(() => {});
    };
    el.muted = false;
    el.play().catch(() => {
      el.muted = true;
      el.play().catch(() => {});
      evs.forEach((e) => window.addEventListener(e, unlock));
    });
    return () => evs.forEach((e) => window.removeEventListener(e, unlock));
  }, []);
  return (
    <div className="ad" style={{ aspectRatio: AD_RATIO }}>
      {!ready && <i className="sk fill" />}
      <video ref={v} src={VIDEO} autoPlay loop playsInline preload="auto" disablePictureInPicture disableRemotePlayback
        controlsList="nodownload noplaybackrate noremoteplayback" tabIndex={-1}
        onCanPlay={() => setReady(true)}
        onPause={(e) => { if (!document.hidden) e.currentTarget.play().catch(() => {}); }}
        onContextMenu={(e) => e.preventDefault()} />
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState('all');
  const [copied, setCopied] = useState(false);
  const root = useRef(null);
  const nav = useRef(null);

  useEffect(() => {
    const el = root.current; if (!el || reduced()) return;
    let raf = 0;
    const on = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = 0; el.style.setProperty('--sy', String(window.scrollY)); });
    };
    window.addEventListener('scroll', on, { passive: true });
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);

  const morph = (next, e) => {
    if (next === tab) return;
    e.currentTarget.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    if (document.startViewTransition && !reduced()) document.startViewTransition(() => flushSync(() => setTab(next)));
    else setTab(next);
    const n = nav.current;
    if (n && window.scrollY > n.offsetTop) window.scrollTo({ top: n.offsetTop - 12, behavior: 'smooth' });
  };

  const share = async () => {
    const data = { title: 'Xmarket', url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(data.url); setCopied(true); setTimeout(() => setCopied(false), 1600); }
    } catch (e) { /* cancelled */ }
  };

  const tabs = [{ id: 'all', title: 'All', count: LINKS.length }, ...GROUPS.map((g) => ({ ...g, count: LINKS.filter((l) => l.group === g.id).length }))];
  const shown = GROUPS.filter((g) => tab === 'all' || tab === g.id);

  return (
    <div className="app" ref={root}>
      <div className="bg" aria-hidden="true">
        <div className="cross">
          <i />
          <svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="78" /><ellipse cx="100" cy="100" rx="80" ry="75" transform="rotate(25 100 100)" /><path d={CROWN} /></svg>
        </div>
        <i className="orb o1" /><i className="orb o2" />
      </div>

      <main className="shell">
        <header className="hero">
          <div style={{ viewTransitionName: 'logo' }} className="logo"><Logo item={LINKS.find((l) => l.id === 'shop') || { id: 'shop', label: 'X', own: true }} big /></div>
          <h1>Xmarket</h1>
          <div className="meta">
            <span className="chip"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>Official links</span>
            <button className="chip btn" onClick={share}>{copied ? 'Link copied' : 'Share'}</button>
          </div>
        </header>

<PromoBanner />


        {shown.map((g) => (
          <section key={g.id} className="sec">
            <h2>{g.title}</h2>
            <div className="grid">
              {LINKS.filter((l) => l.group === g.id).map((l) => <Card key={l.id} item={l} />)}
            </div>
          </section>
        ))}

        <footer>&#10013; &copy; {new Date().getFullYear()} Xmarket</footer>
      </main>
    </div>
  );
}
