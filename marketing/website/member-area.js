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
    // Phones show «© 2026» only, so it fits on the line with Privacy · Terms · Contact (owner 2026-11-26).
    document.querySelectorAll('#bm-footer-landing .ft-right > span:last-child, #bm-footer-company .ft-right > span:last-child').forEach(function (sp) {
      if (sp.querySelector('.bm-legal-name')) return;
      sp.innerHTML = sp.innerHTML.replace(/\s*(Bitcoin-Minded Intl\.?)/, '<span class="bm-legal-name"> $1</span>');
    });
  });
  addStyle('@media (max-width: 767px) { .bm-legal-name { display: none !important; }' +
    ' #bm-footer-landing .ft-right, #bm-footer-company .ft-right { flex-wrap: nowrap !important; white-space: nowrap; } }');

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
      '.bm-member-nav { display: flex !important; align-items: center; gap: 32px; }' +
      // Phones: Kajabi folds its header into its own menu; there our three links stack like the course-page menu.
      '@media (max-width: 767px) {' +
      ' .bm-member-nav { flex-direction: column !important; align-items: stretch !important; gap: 0 !important; width: 100% !important; padding: 0 !important; margin: 0 !important; }' +
      ' .bm-member-nav a { display: block !important; font-size: 16px !important; padding: 16px 20px !important; border-top: 1px solid #D8CDB8 !important; color: #1A1714 !important; text-decoration: none !important; text-align: left !important; }' +
      // Phones: no «Resume» block (a giant lesson card with a doubled title; the course page's Resume Course
      // button is one tap further), a slimmer course card, and the footer stacked on the left edge.
      ' .bm-resume { display: none !important; }' +
      // Course cards, exact Kajabi structure (owner's page source 2026-11-26): .products .container adds 12 px,
      // .product__content adds 30 px padding, .product--12 puts image and content side by side (max 380 px image).
      // On phones: one column, image full width, one 20 px inset for everything — the course page's card.
      ' .products .product, .products .product.bm-product-card { flex-direction: column !important; padding: 20px !important; margin-left: -7px !important; margin-right: -7px !important; width: auto !important; }' +
      ' .products .product > a { display: block !important; width: 100% !important; }' +
      ' .products .product__image { max-width: none !important; width: 100% !important; margin: 0 !important; padding: 0 !important; }' +
      ' .products .product__image img { display: block !important; width: 100% !important; max-width: none !important; height: auto !important; margin: 0 !important; }' +
      ' .products .product__content { flex-direction: column !important; padding: 20px 0 0 !important; margin: 0 !important; }' +
      ' .products .product__info { padding: 0 !important; margin: 0 !important; width: 100% !important; }' +
      ' .products .product__button { margin: 16px 0 0 !important; padding: 0 !important; width: 100% !important; }' +
      ' .products .product__button .btn { display: block !important; width: 100% !important; box-sizing: border-box; text-align: center; }' +
      ' #bm-footer-landing .ft-inner { padding: 24px 0 !important; max-width: none !important; }' +

      '}' +
      // Progress track in Rule, like the course page (Kajabi draws it in a generic grey).
      '.progress__bar, [class*="progress__bar"] { background: #D8CDB8 !important; }' +
      // Each course row sits on a Paper-warm card, as on the course page, so the thumbnail's Paper band reads.
      '.bm-product-card { background: #EBE3D4 !important; padding: 32px !important; box-sizing: border-box; }');
    ready(function () {
      var user = document.querySelector('header.header--static .header__block--user');
      if (user && !document.querySelector('.bm-member-nav')) {
        var nav = document.createElement('div');
        nav.className = 'header__block bm-member-nav';
        nav.innerHTML = '<a href="/library">My Learning</a><a href="/settings/account">Account</a><a href="/logout">Logout</a>';
        user.parentNode.insertBefore(nav, user);
        wireMemberLinks(nav);
      }
      // The «Resume Course» block (last lesson watched): marked so phones can hide it.
      Array.prototype.forEach.call(document.querySelectorAll('a, h1, h2, h3, h4, p, span, div'), function (el) {
        if (el.children.length || !/^\s*resume course\s*$/i.test(el.textContent)) return;
        var box = el.parentNode;
        while (box && box !== document.body && !box.querySelector('img')) box = box.parentNode;
        if (box && box !== document.body && !box.querySelector('.bm-product-card') && !box.closest('.bm-product-card')) box.classList.add('bm-resume');
      });
      // Course rows: the smallest block that holds both the course image and its «Enter» button.
      Array.prototype.forEach.call(document.querySelectorAll('a, button'), function (b) {
        if (!/^\s*enter\s*$/i.test(b.textContent)) return;
        var row = b.parentNode;
        while (row && row !== document.body && !row.querySelector('img')) row = row.parentNode;
        if (row && row !== document.body && !row.closest('.bm-product-card')) row.classList.add('bm-product-card');
      });
      // Progress bars on the cards: Kajabi draws a grey (#EEEEEE) track inside a Paper box. Make it the course
      // page's look: no box, a Rule track, the course's imprint colour for the progress made.
      Array.prototype.forEach.call(document.querySelectorAll('.bm-product-card'), function (card) {
        var label = card.textContent;
        var fillColour = /business/i.test(label) ? IMPRINT.BFB : /advisor/i.test(label) ? IMPRINT.BFA : /people/i.test(label) ? IMPRINT.BFP : '#5A4F45';
        Array.prototype.forEach.call(card.querySelectorAll('*'), function (el) {
          if (getComputedStyle(el).backgroundColor !== 'rgb(238, 238, 238)') return;
          el.style.setProperty('background-color', '#D8CDB8', 'important');
          el.style.setProperty('height', '6px', 'important');
          el.style.setProperty('border-radius', '3px', 'important');
          Array.prototype.forEach.call(el.querySelectorAll('*'), function (f) {
            if (getComputedStyle(f).backgroundColor === 'rgba(0, 0, 0, 0)') return;
            f.style.setProperty('background-color', fillColour, 'important');
            f.style.setProperty('height', '6px', 'important');
            f.style.setProperty('border-radius', '3px', 'important');
          });
          for (var p = el.parentNode; p && p !== card; p = p.parentNode) {
            if (getComputedStyle(p).backgroundColor === 'rgb(244, 239, 230)') {
              p.style.setProperty('background-color', 'transparent', 'important');
              p.style.setProperty('box-shadow', 'none', 'important');
            }
          }
        });
      });
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

  // Which course: from the address and the title (course names never change, ids might).
  var label = path + ' ' + document.title;
  var course = /business/i.test(label) ? 'BFB' : /advisor/i.test(label) ? 'BFA' : /people/i.test(label) ? 'BFP' : '';
  if (IMPRINT[course]) document.documentElement.style.setProperty('--bm-imprint', IMPRINT[course]);

  // The member header goes in the moment <body> exists, not after the whole page has loaded, so it never
  // «arrives late» above content that is already showing (owner 2026-11-26).
  var h = null;
  function bmBuildHeader() {
    if (h || !document.body) return;
    h = document.createElement('div');
    h.className = 'bm-header';
    h.innerHTML = '<div class="bm-header__inner">' +
      '<a href="/library"><img src="' + LOGOS + 'BRAND_Lockup_twotone-' + (course || 'terracotta') + '.svg" alt="Bitcoin-Minded"></a>' +
      '<nav><a href="/library">My Learning</a><a href="/settings/account">Account</a><a href="/logout">Logout</a></nav></div>';
    document.body.insertBefore(h, document.body.firstChild);
    // Phones: the three links live behind a menu button (shown by member-area.css below 768 px).
    var burger = document.createElement('button');
    burger.type = 'button';
    burger.className = 'bm-burger';
    burger.setAttribute('aria-label', 'Menu');
    burger.setAttribute('aria-expanded', 'false');
    burger.innerHTML = '<span></span>';
    h.firstChild.appendChild(burger);
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = h.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!h.contains(e.target) && h.classList.contains('is-open')) {
        h.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }
  if (document.body) bmBuildHeader();
  else {
    var bodyWatch = new MutationObserver(function () { if (document.body) { bodyWatch.disconnect(); bmBuildHeader(); } });
    bodyWatch.observe(document.documentElement, { childList: true });
  }

  ready(function () {
    bmBuildHeader();
    wireMemberLinks(h);   // Kajabi's own account links exist only once the page is parsed
    if (!document.querySelector('.bm-footer')) {
      var ft = document.createElement('div');
      ft.className = 'bm-footer';
      ft.innerHTML = '<div class="bm-footer__inner">' +
        '<a href="/library"><img src="' + LOGOS + 'BRAND_Lockup_primary.svg" alt="Bitcoin-Minded"></a>' +
        '<div class="bm-footer__right"><a href="/privacy">Privacy</a><span class="bm-footer__sep">·</span><a href="/terms">Terms</a><span class="bm-footer__sep">·</span><a href="/contact">Contact</a>' +
        '<span class="bm-footer__pipe">|</span><span>© ' + new Date().getFullYear() + '<span class="bm-legal-name"> Bitcoin-Minded Intl.</span></span></div></div>';
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

    // Lesson page: the lesson title stands on its own — space and a Rule hairline before the lesson text
    // (owner 2026-11-26: title and first subhead sat too close).
    var done = document.querySelector('.mark-as-complete');
    var lessonPanel = done && done.closest('.panel');
    var lessonTitle = lessonPanel && lessonPanel.querySelector('h1, h2');
    if (lessonTitle) {
      lessonTitle.style.setProperty('margin-bottom', '28px', 'important');
      lessonTitle.style.setProperty('padding-bottom', '24px', 'important');
      lessonTitle.style.setProperty('border-bottom', '1px solid #D8CDB8', 'important');
    }

    // Lesson page: a Rule hairline around the video player, like the lesson text card (owner 2026-11-27: on slide
    // shots the player had no edge and the slide paper, a shade lighter, bled into the page). Kajabi's player loads
    // late and its wrapper names are not known here, so: the biggest player element, then up through every parent
    // of the same size; the outermost one gets the frame (its parent is bigger, so nothing clips it).
    function bmFramePlayer() {
      if (!done) return true;
      var best = null, area = 0;
      Array.prototype.forEach.call(document.querySelectorAll('iframe, video, mux-player, .wistia_embed, [class*="kjb-video"]'), function (el) {
        var r = el.getBoundingClientRect();
        if (r.width * r.height > area && r.width > 200) { best = el; area = r.width * r.height; }
      });
      if (!best) return false;
      var box = best, br = best.getBoundingClientRect();
      for (var p = box.parentElement; p && p !== document.body; p = p.parentElement) {
        var pr = p.getBoundingClientRect();
        if (Math.abs(pr.width - br.width) > 2 || Math.abs(pr.height - br.height) > 2) break;
        box = p;
      }
      // v1.83: the frame is its own thin layer laid ON TOP of the player (pointer-events off, so every click still
      // reaches the video). v1.81's outline was covered at the bottom by the Previous/Next bar; v1.82's inset outline
      // was covered by the video itself (owner 2026-11-27). A layer above the video, inside its box, is covered by neither.
      if (document.getElementById('bm-player-frame')) return true;
      var host = /^(IFRAME|VIDEO|MUX-PLAYER)$/.test(box.tagName) ? box.parentElement : box;
      if (getComputedStyle(host).position === 'static') host.style.setProperty('position', 'relative', 'important');
      var hr = host.getBoundingClientRect(), xr = box.getBoundingClientRect();
      var frame = document.createElement('div');
      frame.id = 'bm-player-frame';
      frame.setAttribute('aria-hidden', 'true');
      frame.style.cssText = 'position:absolute;pointer-events:none;box-sizing:border-box;border:1px solid #D8CDB8;z-index:2147483647;'
        + 'left:' + (xr.left - hr.left) + 'px;top:' + (xr.top - hr.top) + 'px;width:' + xr.width + 'px;height:' + xr.height + 'px;';
      host.appendChild(frame);
      function bmFrameFit() {
        var h = host.getBoundingClientRect(), x = box.getBoundingClientRect();
        frame.style.left = (x.left - h.left) + 'px'; frame.style.top = (x.top - h.top) + 'px';
        frame.style.width = x.width + 'px'; frame.style.height = x.height + 'px';
      }
      window.addEventListener('resize', bmFrameFit);
      return true;
    }
    if (done && !bmFramePlayer()) {
      var bmFrameTries = 0, bmFrameTimer = setInterval(function () {
        if (bmFramePlayer() || ++bmFrameTries > 40) clearInterval(bmFrameTimer);
      }, 250);
    }

    // «Download Video» = one click (owner 2026-11-26). Kajabi's button opens the MP4 (a signed S3 link that
    // allows cross-origin reads) in a new tab; here the file is fetched and saved under the lesson's title, with
    // progress on the button. Phones and any failure fall back to Kajabi's own behaviour (open the video).
    var mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    Array.prototype.forEach.call(document.querySelectorAll('a'), function (a) {
      var href = a.getAttribute('href') || '';
      if (!/\.mp4(\?|$)/i.test(href) || !/download/i.test(a.textContent)) return;
      if (mobile || !window.fetch || !window.ReadableStream || !window.URL || !URL.createObjectURL) return;
      var label = a.textContent;
      var busy = false;
      a.removeAttribute('target');
      a.addEventListener('click', function (e) {
        e.preventDefault();
        if (busy) return;
        busy = true;
        var name = ((lessonTitle && lessonTitle.textContent) || document.title || 'Lesson').replace(/[\\/:*?"<>|]+/g, '').replace(/\s+/g, ' ').trim() + '.mp4';
        a.textContent = 'Preparing download…';
        fetch(href).then(function (r) {
          if (!r.ok || !r.body) throw new Error('http ' + r.status);
          var total = +r.headers.get('Content-Length') || 0, got = 0, chunks = [];
          var reader = r.body.getReader();
          function pump() {
            return reader.read().then(function (res) {
              if (res.done) return new Blob(chunks, { type: 'video/mp4' });
              chunks.push(res.value);
              got += res.value.length;
              if (total) a.textContent = 'Downloading… ' + Math.floor(got * 100 / total) + '%';
              return pump();
            });
          }
          return pump();
        }).then(function (blob) {
          var url = URL.createObjectURL(blob);
          var tmp = document.createElement('a');
          tmp.href = url; tmp.download = name; tmp.style.display = 'none';
          document.body.appendChild(tmp); tmp.click(); tmp.remove();
          setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
          a.textContent = label; busy = false;
        }).catch(function () {
          a.textContent = label; busy = false;
          window.open(href, '_blank', 'noopener');
        });
      });
    });

    // Breadcrumbs: a lesson that sits directly in a section (no Part) leaves an empty crumb, so the trail shows
    // two dividers in a row («Course · · Section»). Drop empty crumbs and any doubled, leading or trailing divider.
    Array.prototype.forEach.call(document.querySelectorAll('.breadcrumbs'), function (wrap) {
      var first = wrap.querySelector('.breadcrumbs__crumb');
      var bc = first ? first.parentNode : wrap;
      function isDivider(el) {
        return /devider|divider|separator/i.test(el.className || '') || /^[\s·•\/>›|]+$/.test(el.textContent || '');
      }
      Array.prototype.slice.call(bc.children).forEach(function (el) {
        if (!isDivider(el) && !(el.textContent || '').trim() && !el.querySelector('img, svg')) el.remove();
      });
      var prevDivider = true;
      Array.prototype.slice.call(bc.children).forEach(function (el) {
        var d = isDivider(el);
        if (d && prevDivider) { el.remove(); return; }
        prevDivider = d;
      });
      var last = bc.lastElementChild;
      if (last && isDivider(last)) last.remove();
    });

    // Lesson breadcrumbs: «Section N» in place of the course name (owner 2026-11-27). Kajabi leaves the parent section
    // out of the trail (its crumb is empty), so the number is looked up once per course and kept for the visit:
    // the course page lists the sections in order; a lesson in a group is matched through its section's page, which
    // links to the groups inside it. Until the number is known the course crumb is hidden; on any failure it comes back.
    var bmLessonPath = location.pathname.match(/^\/products\/([^\/]+)\/categories\/(\d+)\/posts\//);
    var bmCourseCrumb = bmLessonPath && document.querySelector('.breadcrumbs .breadcrumbs__crumb a[href$="/products/' + bmLessonPath[1] + '"]');
    if (bmCourseCrumb) {
      var bmSlug = bmLessonPath[1], bmCat = bmLessonPath[2], bmKey = 'bmSections:' + bmSlug;
      var bmMap = {};
      try { bmMap = JSON.parse(sessionStorage.getItem(bmKey) || '{}'); } catch (e) {}
      var bmShow = function (n) {
        if (n) bmCourseCrumb.textContent = 'Section ' + n;
        bmCourseCrumb.style.visibility = '';
      };
      if (bmMap[bmCat]) { bmShow(bmMap[bmCat]); }
      else if (window.fetch && window.DOMParser) {
        bmCourseCrumb.style.visibility = 'hidden';
        var bmGet = function (url) {
          return fetch(url, { credentials: 'same-origin' }).then(function (r) {
            if (!r.ok) throw new Error('http ' + r.status);
            return r.text();
          }).then(function (t) { return new DOMParser().parseFromString(t, 'text/html'); });
        };
        var bmIds = function (doc) {
          var links = doc.querySelectorAll('.syllabus__item a[href*="/categories/"]');
          if (!links.length) links = doc.querySelectorAll('a[href*="/categories/"]');
          var ids = [];
          Array.prototype.forEach.call(links, function (a) {
            var m = (a.getAttribute('href') || '').match(/\/categories\/(\d+)\/?$/);
            if (m && ids.indexOf(m[1]) < 0) ids.push(m[1]);
          });
          return ids;
        };
        // A section's page lists each group as <div class="syllabus__item--sub" id="category-N"> with links to its
        // lessons (…/categories/N/posts/…), not to the group itself (seen in the owner's S2 page source, 2026-11-27).
        var bmSubIds = function (doc) {
          var ids = [];
          Array.prototype.forEach.call(doc.querySelectorAll('[id^="category-"]'), function (el) {
            var m = el.id.match(/^category-(\d+)$/);
            if (m && ids.indexOf(m[1]) < 0) ids.push(m[1]);
          });
          Array.prototype.forEach.call(doc.querySelectorAll('a[href*="/posts/"]'), function (a) {
            var m = (a.getAttribute('href') || '').match(/\/categories\/(\d+)\/posts\//);
            if (m && ids.indexOf(m[1]) < 0) ids.push(m[1]);
          });
          return ids;
        };
        bmGet('/products/' + bmSlug).then(function (doc) {
          var sections = bmIds(doc);
          if (!sections.length) throw new Error('no sections');
          sections.forEach(function (id, i) { bmMap[id] = i + 1; });
          if (bmMap[bmCat]) return;
          return Promise.all(sections.map(function (id) {
            return bmGet('/products/' + bmSlug + '/categories/' + id).then(bmSubIds).catch(function () { return []; });
          })).then(function (lists) {
            lists.forEach(function (ids, i) {
              ids.forEach(function (id) { if (!bmMap[id]) bmMap[id] = i + 1; });
            });
          });
        }).then(function () {
          try { sessionStorage.setItem(bmKey, JSON.stringify(bmMap)); } catch (e) {}
          bmShow(bmMap[bmCat]);
        }).catch(function () { bmShow(0); });
      }
    }

    // Phones: the course card's top gap (image to card edge) equals its side gap, as on My Learning (owner 2026-11-26:
    // measured 44 pt top vs 20 pt sides). Measured live, so it holds whatever Kajabi's wrappers are called.
    function bmEvenCourseCardTop() {
      if (window.innerWidth >= 768) return;
      var img = Array.prototype.filter.call(document.querySelectorAll('.panel img'), function (i) { return /COURSE-THUMB/i.test(i.src); })[0];
      var panel = img && img.closest('.panel');
      if (!panel) return;
      // Everything between the card edge and the image loses its top spacing; the card's own top padding then equals
      // its side padding. (v1.78 used a negative margin, which collapsed through the card and pulled it under the header.)
      // v1.79 found nothing to remove around the image, so the 24 pt sits in an empty element ABOVE it
      // (an unused slot of Kajabi's card). Empty elements before the image are hidden; spacing around it is zeroed.
      for (var el = img; el && el !== panel; el = el.parentNode) {
        if (el !== img) {
          el.style.setProperty('margin-top', '0', 'important');
          el.style.setProperty('padding-top', '0', 'important');
        }
        for (var sib = el.previousElementSibling; sib; sib = sib.previousElementSibling) {
          if (/^(SCRIPT|STYLE|LINK|META)$/.test(sib.tagName)) continue;
          if (!(sib.textContent || '').trim() && !sib.querySelector('img, video, iframe, svg')) sib.style.setProperty('display', 'none', 'important');
        }
      }
      img.style.setProperty('margin-top', '0', 'important');
      var side = img.getBoundingClientRect().left - panel.getBoundingClientRect().left;
      panel.style.setProperty('padding-top', Math.max(side, 1) + 'px', 'important');
    }
    bmEvenCourseCardTop();
    window.addEventListener('load', bmEvenCourseCardTop);

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
