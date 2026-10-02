/* site-key.js
 * Shared abbreviation key + cookie-policy note, injected on every page.
 * Self-contained (own CSS + markup) so it doesn't depend on any given
 * page's :root color variables or nav layout -- just include this file
 * with a <script src="site-key.js"></script> tag and it wires itself up.
 */
(function () {
  const STYLE = `
    #keyFabBtn{
      position:fixed; right:1rem; bottom:1rem; z-index:400;
      font-family:var(--font-body,system-ui,sans-serif); font-weight:600; font-size:0.78rem;
      color:var(--chalk,#eaeef8); background:var(--bg-panel,#141b2e); border:1px solid var(--line,#263150);
      border-radius:999px; padding:0.4rem 0.8rem; cursor:pointer;
      box-shadow:0 10px 24px -12px var(--nav-shadow,rgba(0,0,0,0.6));
      display:flex; align-items:center; gap:0.4rem;
    }
    #keyFabBtn:hover{border-color:var(--turf-bright,var(--gold,#f4b942)); color:var(--turf-bright,var(--gold,#f4b942));}
    #keyFabBtn svg{width:0.95rem; height:0.95rem; fill:none; stroke:currentColor; stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round;}
    #keyModalOverlay{
      display:none; position:fixed; inset:0; z-index:500;
      background:rgba(6,9,20,0.7);
      -webkit-backdrop-filter:blur(4px); backdrop-filter:blur(4px);
      align-items:center; justify-content:center; padding:1.25rem;
    }
    #keyModalOverlay.open{display:flex;}
    #keyModal{
      width:100%; max-width:34rem; max-height:85vh; overflow-y:auto;
      background:var(--bg-panel,#141b2e); border:1px solid var(--line,#263150); border-radius:16px;
      padding:1.5rem 1.5rem 1.25rem; font-family:var(--font-body,system-ui,sans-serif);
      color:var(--chalk,#eaeef8);
    }
    #keyModal h2{
      font-family:var(--font-display,'Arial Narrow',sans-serif); font-weight:800; font-size:1.4rem;
      margin:0 0 0.9rem; letter-spacing:0.01em;
      color:var(--chalk,#eaeef8); display:flex; align-items:center; justify-content:space-between;
      gap:1rem;
    }
    #keyModalClose{
      background:transparent; border:1px solid var(--line,#263150); color:var(--dim,#93a0bf);
      border-radius:8px; font-size:0.82rem; padding:0.25rem 0.7rem; cursor:pointer;
      font-family:var(--font-body,system-ui,sans-serif);
    }
    #keyModalClose:hover{color:var(--chalk,#eaeef8); border-color:var(--chalk,#eaeef8);}
    #keyModal dl{margin:0 0 1.1rem;}
    #keyModal dt{
      font-family:var(--font-body,system-ui,sans-serif); font-weight:700; font-size:0.85rem;
      color:var(--turf-bright,var(--gold,#f4b942)); display:inline-block; min-width:3.4rem;
    }
    #keyModal dd{margin:0 0 0.45rem; display:inline; color:var(--dim,#93a0bf); font-size:0.85rem; line-height:1.5;}
    #keyModal .key-row{margin-bottom:0.2rem;}
    #keyModal .key-note{
      font-size:0.8rem; color:var(--chalk,#eaeef8); line-height:1.55;
      border-top:1px solid var(--line,#263150); padding-top:0.9rem; margin-top:0.2rem;
      margin-bottom:0.9rem;
    }
  `;


  function injectStyle() {
    const s = document.createElement('style');
    s.textContent = STYLE;
    document.head.appendChild(s);
  }

  function buildModal() {
    const overlay = document.createElement('div');
    overlay.id = 'keyModalOverlay';
    overlay.innerHTML = `
      <div id="keyModal" role="dialog" aria-modal="true" aria-labelledby="keyModalTitle">
        <h2 id="keyModalTitle">Key
          <button type="button" id="keyModalClose" aria-label="Close">Close &times;</button>
        </h2>
        <dl>
          <div class="key-row"><dt>Theme</dt><dd>The moon switches to dark mode and the sun switches to light mode.</dd></div>
          <div class="key-row"><dt>ML</dt><dd>Money Line -- bet on which team wins outright, no spread involved.</dd></div>
          <div class="key-row"><dt>ATS</dt><dd>Against The Spread -- bet on a team to cover the posted point spread.</dd></div>
          <div class="key-row"><dt>O/U</dt><dd>Over/Under (Total) -- bet on whether the two teams' combined final score goes over or under a posted number, regardless of who wins.</dd></div>
          <div class="key-row"><dt>DK</dt><dd>DraftKings sportsbook.</dd></div>
          <div class="key-row"><dt>FD</dt><dd>FanDuel sportsbook.</dd></div>
          <div class="key-row"><dt>AP</dt><dd>The AP (Associated Press) Top 25 poll, used for college football and college basketball rankings.</dd></div>
          <div class="key-row"><dt>CFB / NCAAF</dt><dd>College football.</dd></div>
          <div class="key-row"><dt>NCAAMB</dt><dd>College basketball (men's).</dd></div>
          <div class="key-row"><dt>NFL</dt><dd>National Football League (pro football).</dd></div>
          <div class="key-row"><dt>NBA</dt><dd>National Basketball Association (pro basketball).</dd></div>
          <div class="key-row"><dt>MLB</dt><dd>Major League Baseball.</dd></div>
          <div class="key-row"><dt>NHL</dt><dd>National Hockey League (pro hockey).</dd></div>
        </dl>
        <div class="key-note">Matchup / Slot Pick badges rank games by a blend of team rank, record, and posted spread -- see each page's footer for the exact formula.</div>
        <div class="key-note"><b>O/U Line / O/U Odds:</b> the "O/U Line" column shows the posted total (e.g. "O 49.5" over "U 49.5" -- same number for both, since Over and Under are opposite sides of the identical line), and "O/U Odds" shows each side's price stacked the same way. If the combined final score lands exactly on the line, it's a push -- no winner or loser, same as an exact-margin push against the spread.</div>
        <div class="key-note"><b>+ / - odds:</b> a minus number is the favorite -- it's how much you'd need to bet to win $100 (e.g. -150 means bet $150 to win $100). A plus number is the underdog -- it's how much you'd win on a $100 bet (e.g. +150 means bet $100 to win $150). For a $10 bet: on -150, profit is 10 / (150/100) = $6.67; on +150, profit is 10 * (150/100) = $15. Either way you also get your original $10 back on a win. This applies the same way to ATS spread prices (usually around -110), moneyline prices, and O/U prices.</div>
        <div class="key-note">Picks are saved in your browser's cookies and expire every <b>August 1st</b>, just before the next season's week 1 -- so last season's picks clear out on their own before the new one starts.</div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
    document.getElementById('keyModalClose').addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  function openModal() {
    document.getElementById('keyModalOverlay').classList.add('open');
  }
  function closeModal() {
    document.getElementById('keyModalOverlay').classList.remove('open');
  }

  function buildButton() {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'keyFabBtn';
    btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="15" r="4"/><path d="M10.8 12.2L21 2M16 7l3 3M14 9l2 2"/></svg> Key';
    btn.addEventListener('click', openModal);
    document.body.appendChild(btn);
  }

  function init() {
    injectStyle();
    buildModal();
    buildButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
