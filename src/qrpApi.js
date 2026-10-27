import { LINKS, GROUPS } from './App.jsx';
import { HERO, QUOTES, STATS, ABOUT, SKILLS, JOURNEY, PROJECTS, CERTS, ACHIEVEMENTS, CONTACT } from './profileData.js';
import { CATS, INCLUDED, TERMS } from './servicesData.js';

const URL_ = import.meta.env.VITE_SUPABASE_URL || 'https://dmdjytkuwfudkqepkxkl.supabase.co';
const KEY = import.meta.env.VITE_SUPABASE_KEY || 'sb_publishable_1NOK3tZHHDzr8YBlBVmCuw_VvsKOFI7';
const T = ['qrp_links', 'qrp_projects', 'qrp_media', 'qrp_service_categories', 'qrp_service_packages', 'qrp_content'];

async function get(table, signal) {
  const r = await fetch(URL_ + '/rest/v1/' + table + '?select=*&published=eq.true&order=sort_order.asc', { headers: { apikey: KEY }, signal });
  if (!r.ok) throw new Error(table + ' ' + r.status);
  return r.json();
}
const swap = (arr, next) => { if (next.length) arr.splice(0, arr.length, ...next); };
const nn = (v) => (v === null ? undefined : v);

export async function loadQrp() {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 2500);
  try {
    const [links, projects, media, cats, pkgs, content] = await Promise.all(T.map((t) => get(t, ctl.signal)));
    swap(LINKS, links.map((l) => ({ id: l.id, group: l.grp, label: l.label, tag: l.tag, cta: nn(l.cta), url: l.url, feature: l.feature, own: l.own, logo: nn(l.logo), slug: nn(l.slug), color: nn(l.color), domain: nn(l.domain), emoji: nn(l.emoji) })));
    swap(PROJECTS, projects.map((p) => ({ name: p.name, category: p.category, type: p.type, status: p.status, version: p.version, started: p.started, deployed: p.deployed, updated: p.last_update })));
    swap(CERTS, media.filter((m) => m.kind === 'certificate').map((m) => ({ src: m.src, caption: m.caption })));
    swap(ACHIEVEMENTS, media.filter((m) => m.kind === 'achievement').map((m) => ({ src: m.src, caption: m.caption })));
    swap(CATS, cats.map((c) => ({ id: c.id, title: c.title, notice: nn(c.notice), rows: pkgs.filter((p) => p.category_id === c.id).map((p) => [p.name, p.included || '', p.price]) })));
    const c = {};
    content.forEach((x) => { c[x.id] = x.value; });
    if (c.hero) Object.assign(HERO, c.hero);
    if (c.about) Object.assign(ABOUT, c.about);
    if (c.skills) Object.assign(SKILLS, c.skills);
    if (c.contact) Object.assign(CONTACT, c.contact);
    if (c.quotes) swap(QUOTES, c.quotes);
    if (c.stats) swap(STATS, c.stats);
    if (c.journey) swap(JOURNEY, c.journey);
    if (c.link_groups) swap(GROUPS, c.link_groups);
    if (c.svc_included) swap(INCLUDED, c.svc_included);
    if (c.svc_terms) swap(TERMS, c.svc_terms);
  } catch (e) {
    console.warn('QR Portal: using built-in data', e);
  } finally {
    clearTimeout(timer);
  }
}
