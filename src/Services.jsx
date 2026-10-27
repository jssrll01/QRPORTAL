import React, { useEffect } from 'react';
import { CATS, INCLUDED, TERMS, CONFIG } from './servicesData.js';

export const SERVICES_HASH = '#/services';


const real = (s) => s.replace(/₱([\d,]+)/g, (_, n) =>
  '₱' + Math.round(parseInt(n.replace(/,/g, ''), 10) * (1 + (Number(CONFIG.markup) || 0))).toLocaleString('en-US'));

const go = (hash) => { window.location.hash = hash; };

export function PromoBanner() {
  return (
    <section className="promo" aria-labelledby="promo-h">
      <div className="promo-txt">
        <span className="promo-label">Affordable website development</span>
        <h2 id="promo-h">Your Business Deserves a Website.</h2>
        <p>Get a professional, mobile-friendly website for your business, portfolio, menu, or product catalog without the high agency price.</p>
        <p className="promo-price">Packages starting at <b>₱248</b> <span>· Maintenance plans from ₱123/month</span></p>
        <div className="promo-actions">
          <a className="promo-btn" href={SERVICES_HASH}>Explore Website Packages</a>
        </div>
      </div>
      <div className="mock" aria-hidden="true">
        <div className="mock-bar"><i /><i /><i /></div>
        <div className="mock-hero" />
        <div className="mock-row"><b /><b /><b /></div>
      </div>
    </section>
  );
}

const HEADS = {
  addons: ['Add-on', 'Price'],
  deals: ['Offer', 'Price'],
  care: ['Plan', "What's Included", 'Monthly Price'],
};

function Price({ value }) {
  return (
    <div className="pr">
      <span className="off">{CONFIG.tag}</span>
      <del><span className="sr">Original price </span>{real(value)}</del>
      <strong><span className="sr">Now </span>{value}</strong>
    </div>
  );
}

function PriceTable({ cat }) {
  const head = HEADS[cat.id] || ['Package', "What's Included", 'Price'];
  const hasInc = head.length === 3;
  return (
    <section className="svc-sec" aria-labelledby={'h-' + cat.id}>
      <h2 id={'h-' + cat.id}>{cat.title}</h2>
      <div className="tbl-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th scope="col" className="no">No.</th>
              <th scope="col">{head[0]}</th>
              {hasInc && <th scope="col">{head[1]}</th>}
              <th scope="col" className="r">{head[head.length - 1]}</th>
            </tr>
          </thead>
          <tbody>
            {cat.rows.map(([name, inc, price], i) => (
              <tr key={name}>
                <td className="no">{i + 1}</td>
                <th scope="row">{name}</th>
                {hasInc && <td>{inc}</td>}
                <td className="r"><Price value={price} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {cat.notice && <p className="svc-note">{cat.notice}</p>}
    </section>
  );
}

function usePage(title) {
  useEffect(() => {
    const old = document.title;
    document.title = title;
    window.scrollTo(0, 0);
    return () => { document.title = old; };
  }, [title]);
}

function Bar({ onBack, label, right }) {
  return (
    <header className="svc-bar">
      <div className="svc-bar-in">
        <button type="button" className="back-btn" onClick={onBack} aria-label={label}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
          Back
        </button>
        {right}
      </div>
    </header>
  );
}

export default function Services() {
  usePage('Website Services · Xmarket');
  return (
    <div className="svc-page">
      <Bar onBack={() => go('#/')} label="Back to Xmarket links"
        right={<button type="button" className="plan-btn" onClick={() => go('#/plan')}>Get Your Plan Now</button>} />
      <main className="shell svc">
        <h1>Website Services</h1>
        <p className="svc-intro">Affordable websites for individuals, freelancers, students and small businesses. Packages start at ₱248.</p>

        {CATS.map((c) => <PriceTable key={c.id} cat={c} />)}

        <section className="svc-sec" aria-labelledby="h-inc">
          <h2 id="h-inc">What's included</h2>
          <div className="svc-panel">
            <ul>{INCLUDED.map((t) => <li key={t}>{t}</li>)}</ul>
            <p className="svc-note">Not every package includes every optional feature. Check each package's listed contents.</p>
          </div>
        </section>

        <section className="svc-sec" aria-labelledby="h-terms">
          <h2 id="h-terms">Important terms</h2>
          <div className="svc-panel">
            <ol>{TERMS.map((t) => <li key={t}>{t}</li>)}</ol>
          </div>
        </section>
      </main>
    </div>
  );
}

const STEPS = [
  'Pick your package on the Website Services page and note its number, name and price.',
  'Message the developer on Facebook or email. Include the package name, your name or business name, and a short description of the website you want.',
  'Wait for the developer to confirm the scope, final price and delivery time. Your message is a request, not a confirmed order.',
  'Send your content: accurate business information, plus photos and logos you have permission to use.',
  'Pay as agreed. For custom projects, a 50% deposit and 50% balance before final handover may be agreed upon.',
  'Review your website and approve it for deployment and handover.',
];

export function Plan() {
  usePage('Get Your Plan · Xmarket');
  return (
    <div className="svc-page">
      <Bar onBack={() => go('#/services')} label="Back to website services" />
      <main className="shell svc">
        <h1>Get Your Plan Now</h1>
        <p className="svc-intro">Contact the developer to order a website package.</p>

        <section className="svc-sec" aria-labelledby="h-contact">
          <h2 id="h-contact">Developer contacts</h2>
          <div className="grid">
            <a className="card-wrap" href={CONFIG.fb_url} target="_blank" rel="noopener noreferrer" aria-label="Message the developer on Facebook">
              <div className="card">
                <span className="badge"><img src="https://cdn.simpleicons.org/facebook/1877F2" alt="" loading="lazy" style={{ opacity: 1 }} /></span>
                <span className="txt"><b>Facebook</b><em className="tag">Message</em></span>
                <span className="arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg></span>
              </div>
            </a>
            <a className="card-wrap" href={'mailto:' + CONFIG.mail + '?subject=' + encodeURIComponent('Website package inquiry')} aria-label="Email the developer">
              <div className="card">
                <span className="badge"><img src="https://cdn.simpleicons.org/gmail/EA4335" alt="" loading="lazy" style={{ opacity: 1 }} /></span>
                <span className="txt"><b>Email</b><em className="tag">{CONFIG.mail}</em></span>
                <span className="arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg></span>
              </div>
            </a>
          </div>
        </section>

        <section className="svc-sec" aria-labelledby="h-how">
          <h2 id="h-how">How to get your package</h2>
          <div className="svc-panel">
            <ol>{STEPS.map((t) => <li key={t}>{t}</li>)}</ol>
          </div>
        </section>
      </main>
    </div>
  );
}
