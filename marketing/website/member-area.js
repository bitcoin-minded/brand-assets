/* ============================================================
   BITCOIN-MINDED — member area script
   Course pages:  <script src="…/member-area.js" data-course="BFP|BFB|BFA"></script>
                  in the course's Settings → Custom Code (with member-area.css).
   Library:       loaded from the website theme's Custom Javascript box with data-course="SITE".
   ============================================================ */
(function () {
  var me = document.currentScript;
  var course = ((me && me.dataset && me.dataset.course) || 'SITE').toUpperCase();
  var LOGOS = 'https://cdn.jsdelivr.net/gh/bitcoin-minded/brand-assets@v1.55/brand/logos/';
  var IMPRINT = { BFP: '#8C6A2F', BFB: '#2D4A47', BFA: '#1F2748' };

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  // ---------- Library (website theme): Kajabi's header, member links instead of visitor items ----------
  if (course === 'SITE') {
    if (!/^\/library(\/|$)/.test(location.pathname)) return;
    var st = document.createElement('style');
    st.textContent =
      'header.header--static .header__block--dropdown,' +
      'header.header--static .header__block--menu,' +
      'header.header--static .header__block--cta,' +
      'header.header--static .header__block--user { display: none !important; }' +
      '.bm-member-nav { display: flex !important; align-items: center; gap: 32px; }';
    document.head.appendChild(st);
    ready(function () {
      var user = document.querySelector('header.header--static .header__block--user');
      if (!user || document.querySelector('.bm-member-nav')) return;
      var nav = document.createElement('div');
      nav.className = 'header__block bm-member-nav';
      nav.innerHTML = '<a href="/library">My Learning</a><a href="/settings/account">Account</a><a href="/logout">Logout</a>';
      user.parentNode.insertBefore(nav, user);
    });
    return;
  }

  // ---------- Course pages (product theme) ----------
  if (IMPRINT[course]) document.documentElement.style.setProperty('--bm-imprint', IMPRINT[course]);
  ready(function () {
    var h = document.createElement('div');
    h.className = 'bm-header';
    h.innerHTML = '<div class="bm-header__inner">' +
      '<a href="/library"><img src="' + LOGOS + 'BRAND_Lockup_twotone-' + (IMPRINT[course] ? course : 'terracotta') + '.svg" alt="Bitcoin-Minded"></a>' +
      '<nav><a href="/library">My Learning</a><a href="/settings/account">Account</a><a href="/logout">Logout</a></nav></div>';
    document.body.insertBefore(h, document.body.firstChild);

    var ft = document.createElement('div');
    ft.className = 'bm-footer';
    ft.innerHTML = '<div class="bm-footer__inner">' +
      '<a href="/library"><img src="' + LOGOS + 'BRAND_Lockup_primary.svg" alt="Bitcoin-Minded"></a>' +
      '<div class="bm-footer__right"><a href="/privacy">Privacy</a><span class="bm-footer__sep">·</span><a href="/terms">Terms</a><span class="bm-footer__sep">·</span><a href="/contact">Contact</a>' +
      '<span class="bm-footer__pipe">|</span><span>© ' + new Date().getFullYear() + ' Bitcoin-Minded Intl.</span></div></div>';
    document.body.appendChild(ft);

    function bmAlign() {
      var ref = document.querySelector('.section-wrap .container') || document.querySelector('.container:not(.container--main)');
      if (!ref) return;
      var cs = getComputedStyle(ref);
      var w = ref.getBoundingClientRect().width + 'px';
      ['.bm-header__inner', '.bm-footer__inner'].forEach(function (sel) {
        var el = document.querySelector(sel);
        if (!el) return;
        el.style.width = w;
        el.style.maxWidth = '100%';
        el.style.margin = '0 auto';
        el.style.paddingLeft = cs.paddingLeft;
        el.style.paddingRight = cs.paddingRight;
      });
    }
    bmAlign();
    window.addEventListener('resize', bmAlign);

    // Syllabus previews start with the body's first subhead («What You Will Learn …»): strip it there.
    // On the lesson page that subhead is its own heading (text = exactly the label), so it is never touched.
    var LEAD = /^\s*What You Will Learn\s+/;
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var n;
    while ((n = walker.nextNode())) {
      if (!LEAD.test(n.nodeValue)) continue;
      if (n.parentNode && /^H[1-6]$/.test(n.parentNode.nodeName)) continue;
      if (n.nodeValue.replace(LEAD, '').trim() === '') continue;
      n.nodeValue = n.nodeValue.replace(LEAD, '');
    }
  });
})();
