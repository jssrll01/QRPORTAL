import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

/* Ad banner. Change AD_RATIO if the video is not 16:9 (e.g. '21 / 9'). */
const AD = 'https://player.cloudinary.com/embed/?cloud_name=bvw3okdf&public_id=New_Project_29_47DDC02&fluid=true&autoplay=true&muted=true&loop=true';
const AD_RATIO = '16 / 9';

const GROUPS = [
  { id: 'xmarket', title: 'Xmarket' },
  { id: 'apps', title: 'Apps' },
  { id: 'social', title: 'Social' },
  { id: 'contact', title: 'Contact' },
];

const LINKS = [
  { id: 'landing', group: 'xmarket', label: 'Xmarket Landing Page', tag: 'Website', url: 'xmarket-landing.onrender.com', own: true, domain: 'xmarket-landing.onrender.com' },
  { id: 'shop', group: 'xmarket', label: 'Xmarket', tag: 'Shop', cta: 'Shop now', feature: true, url: 'xmarket-app.shop', own: true, domain: 'xmarket-app.shop' },
  { id: 'signup', group: 'xmarket', label: 'Create Account', tag: 'Sign up', cta: 'Join', url: 'xmarket-app.onrender.com/signup', own: true, domain: 'xmarket-app.shop' },
  { id: 'xmail', group: 'xmarket', label: 'Xmarket Email', tag: 'Email', url: 'xmarket.official.marketplace@gmail.com', slug: 'gmail', color: 'EA4335' },
  { id: 'xfb', group: 'xmarket', label: 'Xmarket Facebook Page', tag: 'Page', url: 'https://www.facebook.com/share/18iMp1CDtN/', slug: 'facebook', color: '1877F2' },
  { id: 'course', group: 'apps', label: 'Xentrepreneur Online Course', tag: 'Course', url: 'xentrepreneur-app.vercel.app', own: true, domain: 'xentrepreneur-app.vercel.app' },
  { id: 'receiptx', group: 'apps', label: 'ReceiptX App', tag: 'App', url: 'receiptx-app.vercel.app', own: true, domain: 'receiptx-app.vercel.app' },
  { id: 'pricee', group: 'apps', label: 'Pricee App', tag: 'App', url: 'pricee-app.vercel.app', own: true, domain: 'pricee-app.vercel.app' },
  { id: 'astra', group: 'apps', label: 'Project Astra', tag: 'Project', url: 'project-astraaa.onrender.com', own: true, domain: 'project-astraaa.onrender.com' },
  { id: 'fb', group: 'social', label: 'Facebook', tag: 'Follow', url: 'https://www.facebook.com/share/1V38WfYUVW/', slug: 'facebook', color: '1877F2' },
  { id: 'ig', group: 'social', label: 'Instagram', tag: 'Follow', url: 'https://www.instagram.com/jssrll.07?mdxt=MTB3NmsxNzlkaHhmaw==', slug: 'instagram', color: 'E4405F' },
  { id: 'tt', group: 'social', label: 'TikTok', tag: 'Follow', url: 'tiktok.com/@shaomi3_07', slug: 'tiktok', color: '000000' },
  { id: 'sp', group: 'social', label: 'Spotify', tag: 'Music', url: 'https://open.spotify.com/user/31fjj7m6vyvicxsurqgrb3whpze4?si=LzyxMxudRJCq_dpCQi3NiA&utm_source=copy-link', slug: 'spotify', color: '1DB954' },
  { id: 'x', group: 'social', label: 'Twitter (X)', tag: 'Follow', url: 'https://x.com/astrater07', slug: 'x', color: '000000' },
  { id: 'dc', group: 'social', label: 'Discord', tag: 'Join', url: 'https://discord.gg/nZbUyKQv', slug: 'discord', color: '5865F2' },
  { id: 'sc', group: 'social', label: 'Snapchat', tag: 'Add', url: 'https://www.snapchat.com/add/astrater07?share_id=ghUe2s-mLIw&locale=en-GB', slug: 'snapchat', color: 'F7C600' },
  { id: 'mail', group: 'contact', label: 'Email', tag: 'Message', url: 'custodiojessrell07@gmail.com', slug: 'gmail', color: 'EA4335' },
  { id: 'tg', group: 'contact', label: 'Telegram', tag: 'Chat', url: 't.me/zyntx01', slug: 'telegram', color: '26A5E4' },
];

const toHref = (u) => {
  if (/^(https?:|mailto:)/i.test(u)) return u;
  if (u.includes('@') && !u.includes('/') && !u.startsWith('tiktok')) return 'mailto:' + u;
  return 'https://' + u;
};

const sources = (it) => {
  const out = [];
  if (it.own) out.push('/logos/' + it.id + '.png');
  if (it.slug) out.push('https://cdn.simpleicons.org/' + it.slug + '/' + it.color);
  if (it.domain) out.push('https://www.google.com/s2/favicons?domain=' + it.domain + '&sz=128');
  return out;
};

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const Sk = ({ className = '' }) => <i className={'sk ' + className} />;

function Logo({ item, big }) {
  const list = sources(item);
  const [i, setI] = useState(0);
  const [ok, setOk] = useState(false);
  const src = list[i];
  return (
    <span className={'badge' + (big ? ' big' : '') + (ok ? ' ok' : '')}>
      {src
        ? <img key={src} src={src} alt="" decoding="async" onLoad={() => setOk(true)} onError={() => setI((n) => n + 1)} />
        : <span className="mono">{item.label[0]}</span>}
      {src && !ok && <Sk className="fill" />}
    </span>
  );
}

function Card({ item, index }) {
  const ref = useRef(null);
  const raf = useRef(0);
  const fine = useRef(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  const move = (e) => {
    if (!fine.current || raf.current) return;
    const { clientX, clientY } = e;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (clientX - r.left) / r.width - 0.5;
      const y = (clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--rx', (-y * 8).toFixed(1) + 'deg');
      el.style.setProperty('--ry', (x * 8).toFixed(1) + 'deg');
    });
  };
  const reset = () => {
    const el = ref.current; if (!el) return;
    el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg');
  };
  const href = toHref(item.url);
  const ext = href.startsWith('http');
  return (
    <a
      className={'card-wrap' + (item.feature ? ' feature' : '')}
      href={href}
      target={ext ? '_blank' : undefined}
      rel={ext ? 'noopener noreferrer' : undefined}
      aria-label={item.label}
      style={{ viewTransitionName: 'c-' + item.id, '--i': Math.min(index, 8) }}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      <div className="card" ref={ref}>
        <Logo item={item} />
        <span className="txt">
          <b>{item.label}</b>
          <em className="tag">{item.tag}</em>
        </span>
        {item.cta
          ? <span className="cta">{item.cta}</span>
          : <span className="arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg></span>}
      </div>
    </a>
  );
}

function Ad() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="ad" style={{ aspectRatio: AD_RATIO }}>
      {!loaded && <Sk className="fill" />}
      <iframe
        src={AD}
        title="Xmarket"
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => setLoaded(true)}
        className={loaded ? 'on' : ''}
      />
    </div>
  );
}

function PageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading">
      <div className="hero">
        <Sk className="s-logo" /><Sk className="s-title" /><Sk className="s-chip" />
      </div>
      <div className="tabs">{[0, 1, 2, 3, 4].map((k) => <Sk key={k} className="s-tab" />)}</div>
      <div className="grid">
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <div key={k} className="card-wrap"><div className="card">
            <Sk className="s-badge" />
            <span className="txt"><Sk className="s-line" /><Sk className="s-line short" /></span>
          </div></div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState('all');
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const root = useRef(null);

  useEffect(() => { const t = setTimeout(() => setReady(true), 650); return () => clearTimeout(t); }, []);

  const morph = (next, e) => {
    if (next === tab) return;
    if (e && e.currentTarget && e.currentTarget.scrollIntoView) e.currentTarget.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    if (document.startViewTransition && !reduced()) document.startViewTransition(() => { flushSync(() => setTab(next)); });
    else setTab(next);
  };

  /* parallax: runs only while something is moving */
  useEffect(() => {
    const el = root.current; if (!el || reduced()) return;
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0, sy = 0, ssy = -1;
    const frame = () => {
      cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
      el.style.setProperty('--mx', cx.toFixed(3));
      el.style.setProperty('--my', cy.toFixed(3));
      if (sy !== ssy) { el.style.setProperty('--sy', String(sy)); ssy = sy; }
      raf = (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) ? requestAnimationFrame(frame) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const onPtr = (e) => { tx = (e.clientX / window.innerWidth - 0.5) * 2; ty = (e.clientY / window.innerHeight - 0.5) * 2; kick(); };
    const onTilt = (e) => {
      if (e.gamma == null) return;
      tx = Math.max(-1, Math.min(1, e.gamma / 30)); ty = Math.max(-1, Math.min(1, (e.beta - 45) / 30)); kick();
    };
    const onScroll = () => { sy = window.scrollY; kick(); };
    window.addEventListener('pointermove', onPtr, { passive: true });
    window.addEventListener('deviceorientation', onTilt, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPtr);
      window.removeEventListener('deviceorientation', onTilt);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const share = async () => {
    const data = { title: 'Xmarket', url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(data.url); setCopied(true); setTimeout(() => setCopied(false), 1600); }
    } catch (e) { /* cancelled */ }
  };

  const tabs = [{ id: 'all', title: 'All', count: LINKS.length }, ...GROUPS.map((g) => ({ ...g, count: LINKS.filter((l) => l.group === g.id).length }))];
  const shown = GROUPS.filter((g) => tab === 'all' || tab === g.id);
  let n = 0;

  return (
    <div className="app" ref={root}>
      <div className="bg" aria-hidden="true"><i className="orb o1" /><i className="orb o2" /><i className="orb o3" /></div>

      <main className="shell">
        <Ad />

        {!ready ? <PageSkeleton /> : (
          <>
            <header className="hero">
              <div style={{ viewTransitionName: 'logo' }} className="logo"><Logo item={LINKS[1]} big /></div>
              <h1>Xmarket</h1>
              <div className="meta">
                <span className="chip"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>Official links</span>
                <button className="chip btn" onClick={share}>{copied ? 'Link copied' : 'Share'}</button>
              </div>
            </header>

            <nav className="tabs" aria-label="Link groups">
              {tabs.map((t) => (
                <button key={t.id} className={tab === t.id ? 'on' : ''} onClick={(e) => morph(t.id, e)} aria-pressed={tab === t.id}>
                  {tab === t.id && <span className="pill" style={{ viewTransitionName: 'pill' }} />}
                  <span className="lbl">{t.title}<em>{t.count}</em></span>
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
          </>
        )}
      </main>
    </div>
  );
}
