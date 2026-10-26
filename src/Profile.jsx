import React, { useEffect, useState } from 'react';
import { HERO, QUOTES, STATS, ABOUT, PROJECTS, SKILLS, CERTS, ACHIEVEMENTS, PHOTOS, CONTACT } from './profileData.js';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const thumb = (u) => u.replace('/upload/', '/upload/w_400,q_auto,f_auto/');
const full = (u) => u.replace('/upload/', '/upload/q_auto/');

function Section({ id, title, children }) {
  return (
    <section className="svc-sec" aria-labelledby={'pf-' + id}>
      <h2 id={'pf-' + id}>{title}</h2>
      {children}
    </section>
  );
}

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced()) return;
    const t = setInterval(() => setI((n) => (n + 1) % QUOTES.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="pf-hero" aria-labelledby="pf-name">
      <div className="pf-avatar" aria-hidden="true">JC</div>
      <h1 id="pf-name">{HERO.name}</h1>
      <p className="pf-role">{HERO.role}</p>
      <p className="pf-quote">{QUOTES[i]}</p>
      <p className="pf-intro">{HERO.intro}</p>
      <div className="pf-stats">
        {STATS.map(([v, l]) => <div className="pf-stat" key={l}><b>{v}</b><span>{l}</span></div>)}
      </div>
    </section>
  );
}

export function Gallery({ items }) {
  const [sel, setSel] = useState(null);
  useEffect(() => {
    if (!sel) return;
    const k = (e) => { if (e.key === 'Escape') setSel(null); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [sel]);
  return (
    <>
      <div className="pf-grid">
        {items.map((p) => (
          <button type="button" key={p.src} className="pf-tile" onClick={() => setSel(p)} aria-label={'View ' + p.caption}>
            <img src={thumb(p.src)} alt={p.caption} loading="lazy" decoding="async" draggable="false" />
          </button>
        ))}
      </div>
      {sel && (
        <div className="pf-lb" role="dialog" aria-modal="true" aria-label={sel.caption} onClick={() => setSel(null)}>
          <img src={full(sel.src)} alt={sel.caption} draggable="false" />
          <button type="button" className="pf-lb-x" onClick={() => setSel(null)} aria-label="Close">×</button>
        </div>
      )}
    </>
  );
}

export default function Profile() {
  useEffect(() => {
    const old = document.title;
    document.title = 'Profile · Xmarket';
    window.scrollTo(0, 0);
    return () => { document.title = old; };
  }, []);
  const E = ABOUT.education;
  return (
    <div className="svc-page">
      <header className="svc-bar">
        <div className="svc-bar-in">
          <button type="button" className="back-btn" onClick={() => { window.location.hash = '#/'; }} aria-label="Back to Xmarket links">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
            Back
          </button>
        </div>
      </header>

      <main className="shell svc">
        <Hero />

        <Section id="about" title="About">
          {ABOUT.blocks.map((b) => (
            <div className="svc-panel pf-panel" key={b.title}>
              <h3>{b.title}</h3>
              {b.quote && <blockquote className="pf-qb">{b.quote}</blockquote>}
              {b.paras.map((p) => <p key={p}>{p}</p>)}
            </div>
          ))}
          <div className="svc-panel pf-panel">
            <h3>What I Do</h3>
            <div className="pf-cards c3">
              {ABOUT.roles.map(([t, d]) => <div className="pf-card" key={t}><h4>{t}</h4><p>{d}</p></div>)}
            </div>
          </div>
          <div className="svc-panel pf-panel">
            <h3>Hobbies</h3>
            <div className="pf-chips">{ABOUT.hobbies.map((h) => <span className="pf-chip" key={h}>{h}</span>)}</div>
          </div>
          <div className="svc-panel pf-panel">
            <h3>Education</h3>
            <p><b>{E.degree}</b><br />{E.school}</p>
            <span className="pf-chip">{E.status}</span>
          </div>
          <div className="svc-panel pf-panel">
            <h3>Fun Facts</h3>
            <ul>{ABOUT.funFacts.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>
        </Section>


        <Section id="projects" title="Projects">
          <div className="pf-cards c2">
            {PROJECTS.map((p) => (
              <article className="svc-panel pf-panel" key={p.name}>
                <h3>{p.name} <span className="pf-badge">{p.status}</span></h3>
                <p>{p.category}</p>
                <dl className="pf-meta">
                  <dt>Type</dt><dd>{p.type}</dd>
                  <dt>Started</dt><dd>{p.started}</dd>
                  <dt>Deployed</dt><dd>{p.deployed}</dd>
                  <dt>Updated</dt><dd>{p.updated}</dd>
                  <dt>Host</dt><dd>{p.host}</dd>
                </dl>
              </article>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="svc-panel pf-panel">
            <h3>Assisted Programming</h3>
            <div className="pf-chips">
              {SKILLS.programming.map(([n, u]) => <a className="pf-chip" key={n} href={u} target="_blank" rel="noopener noreferrer">{n}</a>)}
            </div>
          </div>
          <div className="svc-panel pf-panel">
            <h3>Tools</h3>
            <div className="pf-chips">
              {SKILLS.tools.map(([n, u]) => <a className="pf-chip" key={n} href={u} target="_blank" rel="noopener noreferrer">{n}</a>)}
            </div>
          </div>
          <div className="svc-panel pf-panel">
            <h3>My Strengths</h3>
            <div className="pf-cards c3">
              {SKILLS.strengths.map(([t, d]) => <div className="pf-card" key={t}><h4>{t}</h4><p>{d}</p></div>)}
            </div>
          </div>
          <div className="svc-panel pf-panel">
            <h3>How I Learn</h3>
            {SKILLS.learn.map((p) => <p key={p}>{p}</p>)}
            <ul>{SKILLS.learnList.map((l) => <li key={l}>{l}</li>)}</ul>
          </div>
        </Section>

<Section id="certs" title="Certifications"><a className="pf-open" href="#/certifications"><span><b>View my Certifications</b><small>{CERTS.length} certificates</small></span><span aria-hidden="true">→</span></a></Section>
<Section id="ach" title="Achievements"><a className="pf-open" href="#/achievements"><span><b>View my Achievements</b><small>{ACHIEVEMENTS.length} achievements</small></span><span aria-hidden="true">→</span></a></Section>
<Section id="col" title="Collection"><a className="pf-open" href="#/collection"><span><b>View my Collection</b><small>{PHOTOS.length} photos</small></span><span aria-hidden="true">→</span></a></Section>

        <Section id="contact" title="Contact">
          <div className="svc-panel pf-panel">
            <h3>Get in Touch</h3>
            {CONTACT.intro.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className="grid pf-gap">
            {CONTACT.socials.map(([label, value, href, icon]) => {
              const ext = href.startsWith('http');
              return (
                <a key={label} className="card-wrap" href={href} aria-label={label + ': ' + value}
                  target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined}>
                  <div className="card">
                    <span className="badge"><img src={icon} alt="" loading="lazy" style={{ opacity: 1 }} /></span>
                    <span className="txt"><b>{label}</b><em className="tag">{value}</em></span>
                    <span className="arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg></span>
                  </div>
                </a>
              );
            })}
          </div>
        </Section>
      </main>
    </div>
  );
}
