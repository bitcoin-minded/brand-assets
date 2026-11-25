/* ============================================================
   BITCOIN-MINDED — site + member-area script (one file, one place)
   Loaded ONCE, from Kajabi's site-wide header code, next to kajabi-site.css, same version:
     <script src="https://cdn.jsdelivr.net/gh/bitcoin-minded/brand-assets@vX.YY/marketing/website/member-area.js"></script>
   It decides by the page address what to do:
     /products/…  course pages  → member-area.css (same version) + member header + ink footer + previews
     /library…    library       → Kajabi header with member links, footer lined up
     /login …     log-in        → Paper text fields
     every page   footer blocks → ink logo
   ============================================================ */
(function () {
  if (window.__bmMemberArea) return;          // never run twice
  window.__bmMemberArea = true;

  var me = document.currentScript;
  var BASE = me && me.src ? me.src.replace(/member-area\.js.*$/, '') : '';
  var LOGOS = 'https://cdn.jsdelivr.net/gh/bitcoin-minded/brand-assets@v1.55/brand/logos/';
  var IMPRINT = { BFP: '#8C6A2F', BFB: '#2D4A47', BFA: '#1F2748' };
  var path = location.pathname;

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  function addStyle(css) {
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
  }
  // Our «Account» and «Logout» links borrow Kajabi's own (hidden) account-menu links, so they always go where
  // Kajabi's menu goes, whatever the address or method (a plain /logout answers 404 — owner 2026-11-25).
  function wireMemberLinks(scope) {
    function kajabi(re) {
      var all = document.querySelectorAll('a');
      for (var i = 0; i < all.length; i++) {
        var a = all[i];
        if (a.closest('.bm-header, .bm-member-nav, .bm-footer')) continue;
        if (re.test((a.textContent || '').replace(/\s+/g, ' ').trim())) return a;
      }
      return null;
    }
    [['Logout', /^log ?out$/i], ['Account', /^(settings|account|my account)$/i]].forEach(function (pair) {
      var ours = Array.prototype.filter.call(scope.querySelectorAll('a'), function (a) { return a.textContent === pair[0]; })[0];
      var theirs = kajabi(pair[1]);
      if (!ours || !theirs) return;
      ours.setAttribute('href', theirs.getAttribute('href'));
      ['data-method', 'rel'].forEach(function (k) { if (theirs.hasAttribute(k)) ours.setAttribute(k, theirs.getAttribute(k)); });
      ours.addEventListener('click', function (e) { e.preventDefault(); theirs.click(); });
    });
  }
  var FIELDS =
    'textarea, input[type="text"], input[type="email"], input[type="password"], input[type="search"], select' +
    ' { background: #F4EFE6 !important; border: 1px solid #D8CDB8 !important; color: #1A1714 !important; box-shadow: none !important; }' +
    'textarea:focus, input[type="text"]:focus, input[type="email"]:focus, input[type="password"]:focus, input[type="search"]:focus, select:focus' +
    ' { border-color: #5A4F45 !important; outline: none !important; }';

  // ---------- Every page: our footer blocks carry the all-ink lockup (owner 2026-11-25) ----------
  ready(function () {
    document.querySelectorAll('#bm-footer-landing .ft-lockup img, #bm-footer-company .ft-lockup img').forEach(function (img) {
      img.src = LOGOS + 'BRAND_Lockup_primary.svg';
    });
  });

  // ---------- Log-in ----------
  if (/^\/login(\/|$)/.test(path)) {
    addStyle(FIELDS);
    // No «Remember Me» (owner 2026-11-25): a student is never marked to be remembered; the box stays unticked and hidden.
    ready(function () {
      var cb = document.querySelector('input[type="checkbox"][name*="remember" i], input[type="checkbox"][id*="remember" i]');
      if (!cb) {
        document.querySelectorAll('label').forEach(function (l) {
          if (!cb && /remember me/i.test(l.textContent)) cb = l.querySelector('input[type="checkbox"]') || document.getElementById(l.htmlFor);
        });
      }
      if (!cb) return;
      cb.checked = false;
      var row = cb.closest('label') || cb.parentNode;
      if (row && row.querySelectorAll('input').length === 1 && !row.querySelector('button, [type="submit"]')) row.style.display = 'none';
      else cb.style.display = 'none';
      var lab = cb.id && document.querySelector('label[for="' + cb.id + '"]');
      if (lab) lab.style.display = 'none';
    });
    return;
  }

  // ---------- Library: Kajabi's header with member links; footer lined up with the content ----------
  if (/^\/library(\/|$)/.test(path)) {
    addStyle(FIELDS +
      'header.header--static .header__block--dropdown,' +
      'header.header--static .header__block--menu,' +
      'header.header--static .header__block--cta,' +
      'header.header--static .header__block--user { display: none !important; }' +
      '.bm-member-nav { display: flex !important; align-items: center; gap: 32px; }');
    ready(function () {
      var user = document.querySelector('header.header--static .header__block--user');
      if (user && !document.querySelector('.bm-member-nav')) {
        var nav = document.createElement('div');
        nav.className = 'header__block bm-member-nav';
        nav.innerHTML = '<a href="/library">My Learning</a><a href="/settings/account">Account</a><a href="/logout">Logout</a>';
        user.parentNode.insertBefore(nav, user);
        wireMemberLinks(nav);
      }
      var inner = document.querySelector('#bm-footer-landing .ft-inner');
      var ref = document.querySelector('.section .container') || document.querySelector('.container');
      if (!inner || !ref) return;
      function align() {
        if (window.innerWidth < 768) { inner.style.maxWidth = ''; inner.style.paddingLeft = ''; inner.style.paddingRight = ''; return; }
        var cs = getComputedStyle(ref);
        inner.style.boxSizing = 'border-box';
        inner.style.maxWidth = ref.getBoundingClientRect().width + 'px';
        inner.style.paddingLeft = cs.paddingLeft;
        inner.style.paddingRight = cs.paddingRight;
      }
      align();
      window.addEventListener('resize', align);
    });
    return;
  }

  // ---------- Course pages (/products/…) ----------
  if (!/^\/products\//.test(path)) return;

  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = BASE + 'member-area.css';
  document.head.appendChild(link);

  ready(function () {
    // Which course: from the page title / breadcrumb (course names never change, ids might).
    var label = document.title + ' ' + ((document.querySelector('.breadcrumbs') || {}).textContent || '');
    var course = /business/i.test(label) ? 'BFB' : /advisor/i.test(label) ? 'BFA' : /people/i.test(label) ? 'BFP' : '';
    if (IMPRINT[course]) document.documentElement.style.setProperty('--bm-imprint', IMPRINT[course]);

    if (!document.querySelector('.bm-header')) {
      var h = document.createElement('div');
      h.className = 'bm-header';
      h.innerHTML = '<div class="bm-header__inner">' +
        '<a href="/library"><img src="' + LOGOS + 'BRAND_Lockup_twotone-' + (course || 'terracotta') + '.svg" alt="Bitcoin-Minded"></a>' +
        '<nav><a href="/library">My Learning</a><a href="/settings/account">Account</a><a href="/logout">Logout</a></nav></div>';
      document.body.insertBefore(h, document.body.firstChild);
      wireMemberLinks(h);
    }
    if (!document.querySelector('.bm-footer')) {
      var ft = document.createElement('div');
      ft.className = 'bm-footer';
      ft.innerHTML = '<div class="bm-footer__inner">' +
        '<a href="/library"><img src="' + LOGOS + 'BRAND_Lockup_primary.svg" alt="Bitcoin-Minded"></a>' +
        '<div class="bm-footer__right"><a href="/privacy">Privacy</a><span class="bm-footer__sep">·</span><a href="/terms">Terms</a><span class="bm-footer__sep">·</span><a href="/contact">Contact</a>' +
        '<span class="bm-footer__pipe">|</span><span>© ' + new Date().getFullYear() + ' Bitcoin-Minded Intl.</span></div></div>';
      document.body.appendChild(ft);
    }

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
