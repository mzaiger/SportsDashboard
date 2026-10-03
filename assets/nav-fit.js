/*
 * Desktop header: keep the whole nav bar on one line. Below ~930px the bar
 * is allowed to wrap onto two lines (phone-style); above that it shrinks
 * (CSS zoom) just enough to fit, down to a floor so the text stays legible.
 */
(function () {
  const WRAP_BELOW = 930;      // px: narrower than this the nav may use 2 lines
  const MIN_ZOOM = 0.72;
  function fit() {
    const nav = document.querySelector('.site-nav');
    if (!nav) return;
    nav.style.zoom = '';
    nav.classList.remove('nav-one-line');
    if (window.innerWidth < WRAP_BELOW) return;
    nav.classList.add('nav-one-line');
    const needed = nav.scrollWidth;
    const avail = document.documentElement.clientWidth;
    if (needed > avail) {
      nav.style.zoom = String(Math.max(MIN_ZOOM, Math.floor((avail / needed) * 97) / 100));
    }
  }
  let t = null;
  const schedule = () => { clearTimeout(t); t = setTimeout(fit, 80); };
  window.addEventListener('resize', schedule);
  window.addEventListener('load', schedule);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
  document.addEventListener('DOMContentLoaded', schedule);
  schedule();
})();
