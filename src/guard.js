// Deterrent only: blocks casual copying, selecting and saving.
const stop = (e) => {
  const t = e.target;
  if (t && t.closest && t.closest('input, textarea')) return;
  e.preventDefault();
};
['copy', 'cut', 'contextmenu', 'selectstart', 'dragstart'].forEach((ev) =>
  document.addEventListener(ev, stop));
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'a', 's', 'u', 'p'].includes(e.key.toLowerCase())) e.preventDefault();
});
