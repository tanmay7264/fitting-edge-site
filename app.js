// Fitting Edge site: hash-routed pages (#/, #/services, #/services/<id>, #/book, #/contact). Content lives in data.js.
import { SITE, CATEGORIES, FINISHES, SERVICES, FAQ } from './data.js';
import { bath, OPTIONS, DEFAULT } from './art.js';
import { studioPage, quizPage, getProfile, toQuery, PRESETS } from './studio.js';

const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const main = $('#main');
const catOf = id => CATEGORIES.find(c => c.id === id);
const svcOf = id => SERVICES.find(s => s.id === id);
const C = SITE.contact;
const wa = text => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(text)}`;

const ICONS = {
  tap: '<path d="M7 21v-6a3 3 0 0 1 3-3h4"/><path d="M14 9h5a2 2 0 0 1 2 2v1"/><path d="M10 12V7h4v5"/><path d="M9 5h6"/><path d="M21 15v2"/>',
  shower: '<path d="M4 21V6a3 3 0 0 1 6 0"/><path d="M7 9h8l-1.5 3h-5z"/><path d="M9 15v1M12 15v2M15 15v1M10.5 19v1M13.5 19v1"/>',
  sink: '<path d="M3 12h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z"/><path d="M12 12V6a2 2 0 0 1 2-2h2"/><path d="M8 19v2M16 19v2"/>',
  hygiene: '<path d="M6 3h8v6H6z"/><path d="M4 9h12v3a6 6 0 0 1-12 0z"/><path d="M8 18l-1 3h6l-1-3"/><path d="M18 8c2 0 2 4 0 4"/>',
  bath: '<path d="M3 12h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z"/><path d="M5 12V5a2 2 0 0 1 4 0"/><path d="M7 20l-1 1M17 20l1 1"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9 14a3 3 0 0 0 3 3"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3z"/><path d="M14.7 6.3L17 4"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/>',
  building: '<path d="M4 21V5l8-2v18"/><path d="M12 9h8v12"/><path d="M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2"/>',
  hotel: '<path d="M3 21V7h18v14"/><path d="M3 12h18"/><path d="M7 16h2M11 16h2M15 16h2"/><path d="M9 7V4h6v3"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3"/>',
  school: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
  qr: '<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z"/><path d="M14 14h2v2h-2zM18 14h2M14 18h2v2M18 18h2v2"/>',
  store: '<path d="M4 9l1-5h14l1 5"/><path d="M4 9a2.7 2.7 0 0 0 5 0 2.7 2.7 0 0 0 6 0 2.7 2.7 0 0 0 5 0"/><path d="M5 11v10h14V11"/><path d="M10 21v-5h4v5"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>',
  leaf: '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19l7-7"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  mail: '<path d="M3 6h18v12H3z"/><path d="M3 7l9 6 9-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
};
const icon = n => `<span class="ico"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ICONS.tap}</svg></span>`;
const look = () => ({ ...DEFAULT, ...(getProfile()?.cfg || {}) });  // the visitor's look, or the default
const artFor = (s, big) => s.zones
  ? `<div class="art photo${big ? ' banner' : ''}" aria-hidden="true">${bath({ ...look(), zones: s.zones, eco: s.id === 'water-smart' || look().eco, view: s.zones.length === 1 && !big ? s.zones[0] : null, label: '' })}</div>`
  : `<div class="art art-${s.cat}${big ? ' banner' : ''}" aria-hidden="true"><i></i><i></i><svg viewBox="0 0 24 24">${ICONS[s.icon] || ICONS.tap}</svg></div>`;
const forYou = s => getProfile()?.services?.includes(s.id);
const card = s => `<a class="svc rv" href="#/services/${s.id}">${forYou(s) ? '<span class="foryou">Recommended for you</span>' : ''}${artFor(s)}<small>${esc(catOf(s.cat).name)}</small><h3>${esc(s.name)}</h3><p>${esc(s.tagline)}</p><span class="more">${s.kind === 'book' ? 'View & book' : 'View & enquire'} →</span></a>`;
const swatches = () => FINISHES.map(f => `<span class="chip"><i class="dot" style="background:${f.hex}"></i>${esc(f.name)}</span>`).join('');
const STEPS = [['Choose a look', 'Browse curated looks and finishes, or ask for a home consultation.'], ['Select products', 'Pick one fitting, a zone, or the complete bath. We check compatibility.'], ['Get a quote', 'Itemised: products, installation, exclusions and optional service plan.'], ['Install & maintain', 'Trained installers fit it. Repairs and spare parts when you need them.']];

/* ---------- Pages ---------- */
const pages = {
  home() {
    const featured = [...new Set([...(getProfile()?.services || []), 'sink-zone', 'shower-zone', 'hygiene-zone', 'complete-bath', 'water-smart', 'repair'])].slice(0, 6).map(svcOf);
    const [t1, t2] = SITE.tagline.split('. ');
    const ZONES = [['sink', 'Sink'], ['shower', 'Shower'], ['hygiene', 'Toilet & hygiene']];
    const p = getProfile(), mine = p && PRESETS.find(x => x.id === p.preset);
    setTimeout(wireHome);
    return `
    <section class="hero"><div class="glow" aria-hidden="true"></div><div class="wrap">
      <div class="rv">
        <span class="eyebrow">Design-led · service-backed bathroom upgrades</span>
        <h1>${esc(t1)}.<br><em>${esc(t2)}</em></h1>
        <p class="lead">${esc(SITE.promise)} Engineered fittings for Indian water, coordinated finishes and professional installation. Upgrade one fitting, one zone or the whole bathroom.</p>
        <div class="btns"><a class="btn" href="#/book?service=consultation">Book a free consultation</a><a class="btn ghost" href="#/services">Browse services</a></div>
        <ul class="proof"><li>Itemised quotes</li><li>Trained installers</li><li>Repair-first service</li></ul>
      </div>
      <div class="stage rv">
        <div id="heroArt">${bath({ ...look(), label: `Bathroom with ${OPTIONS.finish[look().finish][0].toLowerCase()} fittings` })}</div>
        <div class="switch" role="radiogroup" aria-label="Preview a finish">${FINISHES.map(f => `<button type="button" role="radio" aria-checked="${f.id === look().finish}" data-finish="${f.id}"><i class="dot" style="background:${f.hex}"></i>${esc(f.name)}</button>`).join('')}</div>
        <span class="tag">${mine ? `Your look: ${esc(mine.name)}` : 'Tap a finish to preview'}</span>
        <a class="stage-link" href="#/studio">Customise everything in the Design Studio →</a>
      </div>
    </div></section>
    ${p ? `<div class="hello"><div class="wrap"><span>👋 Welcome back${p.name ? `, ${esc(p.name)}` : ''}. Your look is <b>${esc(mine?.name || 'saved')}</b>.</span><span class="btns"><a class="btn sm gold" href="#/studio">Continue designing</a><a class="btn sm ghost light" href="#/services">Your recommendations</a></span></div></div>` : ''}

    <div class="marquee" aria-hidden="true"><div>${Array(2).fill(['Engineered for Indian Water', 'Matte black', 'Brushed gold', 'Graphite', 'Itemised quotes', 'Trained installers', 'Repair before replacement', 'Small Change. Better Bathroom.'].map(x => `<span>${x}</span>`).join('')).join('')}</div></div>

    <section><div class="wrap g3">
      ${[['shield', 'Engineered for Indian Water', 'Polymer engineering where it offers a real advantage, reinforced interfaces where mechanical loads need them, backed by product-specific testing.'],
         ['spark', 'Designed for Modern Living', 'Coordinated finishes and curated bathroom looks in matte black, brushed gold and graphite.'],
         ['wrench', 'Supported Beyond Purchase', 'Assisted selection, professional installation, spare parts and repair support.']]
        .map(([i, h, p], k) => `<div class="box lift rv" style="--d:${k * 80}ms">${icon(i)}<h3>${h}</h3><p>${p}</p></div>`).join('')}
    </div></section>

    <section class="dark"><div class="wrap ba-wrap">
      <div class="rv">
        <span class="eyebrow">See the difference</span>
        <h2>Same bathroom.<br>New feeling.</h2>
        <p class="lead">Drag the handle. Scaled-up, dripping, mismatched fittings on one side; one coordinated finish, installed in a single visit, on the other.</p>
        <a class="btn gold" href="#/services/complete-bath">Explore the Complete Bath Edit</a>
      </div>
      <div class="ba rv" style="--x:50%">
        ${bath({ zones: [], acc: [], light: 'daylight', label: 'Before: old, scaled fittings' })}
        <div class="after">${bath({ ...PRESETS[1].cfg, zones: DEFAULT.zones, label: 'After: matte black fittings, Midnight Matte look' })}</div>
        <span class="lbl l">Before</span><span class="lbl r">After</span>
        <div class="handle" aria-hidden="true"></div>
        <input type="range" min="0" max="100" value="50" aria-label="Compare before and after">
      </div>
    </div></section>

    <section id="build"><div class="wrap">
      <div class="rv" style="text-align:center;max-width:680px;margin:0 auto 36px">
        <span class="eyebrow">My Bathroom, My Way</span>
        <h2>Build your bathroom, one zone at a time</h2>
        <p class="lead" style="margin-inline:auto">Pick the zones you want to upgrade and a finish. Leave the rest as it is.</p>
      </div>
      <div class="builder rv">
        <div class="box">
          <fieldset><legend>1. Zones to upgrade</legend><div class="pills">${ZONES.map(([id, n], i) => `<label><input type="checkbox" name="zone" value="${id}" ${i ? '' : 'checked'}>${n}</label>`).join('')}</div></fieldset>
          <fieldset style="margin-top:22px"><legend>2. Finish</legend><div class="pills">${FINISHES.map((f, i) => `<label><input type="radio" name="bfinish" value="${i}" ${f.id === look().finish ? 'checked' : ''}><i class="dot" style="background:${f.hex}"></i>${esc(f.name)}</label>`).join('')}</div></fieldset>
          <div class="summary" id="bsum"></div>
        </div>
        <div class="stage" id="buildArt"></div>
      </div>
      <div class="g4" style="margin-top:56px">${STEPS.map(([h, p], i) => `<div class="step rv" style="--d:${i * 80}ms"><b>0${i + 1}</b><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>
    </div></section>

    <section class="dark looks"><div class="wrap">
      <div class="head rv"><div><span class="eyebrow">Curated looks</span><h2>Which bathroom is <em>you?</em></h2><p class="lead" style="margin:0">Start from a look, then make it yours in the Design Studio.</p></div>
        <a class="btn gold" href="#/quiz">${p ? 'Retake the quiz' : 'Take the 1-minute quiz'}</a></div>
      <div class="presets dark-presets">${PRESETS.map(x => `<a class="preset rv" href="#/studio?${toQuery({ ...DEFAULT, ...x.cfg })}">${bath({ ...DEFAULT, ...x.cfg, label: x.name })}<b>${esc(x.name)}</b><small>${esc(x.blurb)}</small></a>`).join('')}</div>
    </div></section>

    <section class="tint"><div class="wrap">
      <div class="head rv"><div><span class="eyebrow">Services</span><h2>${p ? 'Recommended for you' : 'Popular upgrades'}</h2></div><a class="btn ghost" href="#/services">See all ${SERVICES.length} services</a></div>
      <div class="grid" style="margin-top:28px">${featured.map(card).join('')}</div>
      <h3 style="margin:56px 0 16px">Or browse by what you need</h3>
      <div class="cats">${CATEGORIES.map(c => `<a class="catpill rv" href="#/services?cat=${c.id}"><span class="art art-${c.id}" aria-hidden="true"></span><b>${esc(c.name)}</b><small>${esc(c.blurb)}</small></a>`).join('')}</div>
    </div></section>

    <section class="dark"><div class="wrap g3" style="align-items:center">
      <div class="rv" style="grid-column:span 2">
        <span class="eyebrow">Plastic? Prove it.</span>
        <h2>Engineered polymers, not cheap plastic</h2>
        <p class="lead">PTMT bodies for taps and mixers, ABS for showers, POM for precision cartridges, and metal-reinforced interfaces where needed. We share product-specific test results and clear written warranty terms, so you can judge the evidence yourself.</p>
        <div class="mats">${[['PTMT', 'Taps & mixers'], ['ABS', 'Showers'], ['POM', 'Cartridges'], ['Hybrid core', 'Threaded interfaces']].map(([a, b]) => `<div><b>${a}</b><small>${b}</small></div>`).join('')}</div>
      </div>
      <div class="box rv">${icon('leaf')}<h3>Small Change. Better Bathroom.</h3><p>Water-smart fittings, repair before replacement, and modular upgrades that avoid unnecessary waste.</p><a class="btn gold" href="#/services/water-smart">Water-Smart bundle</a></div>
    </div></section>

    <section><div class="wrap g3" style="align-items:start">
      <div class="rv"><span class="eyebrow">For business</span><h2>Builders, hotels and property managers</h2><p class="lead">Standardised packages, bulk supply, replacement parts and maintenance contracts.</p><a class="btn" href="#/services?cat=business">Business services</a>
        <a class="world" href="${SITE.world3d}" target="_blank" rel="noopener"><b>See our plan in 3D →</b><small>Walk the Seed, Expand and Scale roadmap as an interactive model.</small></a></div>
      <div class="rv" style="grid-column:span 2"><h2>Questions</h2>${FAQ.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
    </div></section>

    <section class="cta"><div class="wrap rv">
      <div><h2 style="margin:0">Ready to see the difference?</h2><p style="margin:8px 0 0">Book a free home consultation or talk to us on WhatsApp.</p></div>
      <div class="btns"><a class="btn gold" href="#/book">Book a visit</a><a class="btn ghost light" href="${wa('Hi Fitting Edge, I would like to upgrade my bathroom.')}" target="_blank" rel="noopener">WhatsApp us</a></div>
    </div></section>`;
  },

  services(q) {
    const cat = q.get('cat') || 'all';
    const c = catOf(cat);
    setTimeout(() => wireServices(cat));
    return `<section><div class="wrap">
      <span class="eyebrow">Services</span>
      <h1 style="font-size:clamp(2rem,4vw,2.8rem)">${c ? esc(c.name) : 'All services'}</h1>
      <p class="lead">${c ? esc(c.blurb) : 'Replace one fitting, upgrade a zone, complete the look, or partner with us.'}</p>
      <div class="filters" role="group" aria-label="Filter services">
        <input class="search" type="search" placeholder="Search services…" aria-label="Search services">
        ${[{ id: 'all', name: 'All' }, ...CATEGORIES].map(x => `<button type="button" data-cat="${x.id}" aria-pressed="${x.id === cat}">${esc(x.name)}</button>`).join('')}
      </div>
      <div class="grid" id="list" aria-live="polite"></div>
    </div></section>`;
  },

  detail(id) {
    const s = svcOf(id); if (!s) return pages.notfound();
    const c = catOf(s.cat), related = SERVICES.filter(x => x.cat === s.cat && x.id !== s.id).slice(0, 3);
    const action = s.kind === 'book' ? 'Book this service' : 'Send an enquiry';
    const p = getProfile(), tip = p?.answers?.water === 'hard' && s.zones ? 'You told us you have hard water. We\'ll bring fittings suited to hard-water use and show you how to descale aerators and nozzles.' : null;
    const CUSTOM = { finish: ['Finish', 'Matte black, brushed gold or graphite'], tap: ['Tap style', 'Single lever, tall vessel or wall-mounted'], shower: ['Shower head', 'Round or square rain shower, plus hand shower'], eco: ['Water-smart', 'Flow-regulated option with a flow check'], mirror: ['Mirror trim', 'Coordinated with your finish'], acc: ['Accessories', 'Towel ring, robe hook, soap dispenser'], room: ['Whole-room styling', 'Preview tiles, vanity and lighting in the Studio'] };
    const timeline = s.kind === 'book'
      ? [['Request', 'Book online or on WhatsApp. We call to confirm.'], ['Visit', 'An advisor checks compatibility and water pressure, with finish samples.'], ['Quote', 'Itemised: products, installation, exclusions, optional service plan.'], ['Install', 'A trained installer fits everything and runs a leak check.'], ['Aftercare', 'Warranty registration, spare parts and repairs when needed.']]
      : [['Enquiry', 'Tell us about your organisation and requirement.'], ['Discovery', 'We understand volumes, sites and timelines.'], ['Proposal', 'Specification, samples and commercial terms.'], ['Pilot', 'Start with a pilot site or batch where useful.'], ['Scale', 'Supply, installation support and maintenance.']];
    return `<section><div class="wrap">
      <div class="crumbs"><a href="#/services">Services</a> / <a href="#/services?cat=${c.id}">${esc(c.name)}</a> / ${esc(s.name)}</div>
      <div class="detail">
        <div>
          ${artFor(s, true)}
          ${forYou(s) ? '<span class="foryou static">Recommended for you</span>' : ''}
          <h1 style="font-size:clamp(2rem,4vw,2.8rem)">${esc(s.name)}</h1>
          <p class="lead">${esc(s.tagline)}</p>
          <p>${esc(s.desc)}</p>
          ${tip ? `<div class="tipbox"><b>For your home</b><p>${esc(tip)}</p></div>` : ''}
          <h3 style="margin-top:32px">What's included</h3>
          <ul class="ticks">${s.includes.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
          ${s.custom?.length ? `<h3 style="margin-top:32px">Make it yours</h3>
            <div class="custom">${s.custom.map(k => `<div><b>${CUSTOM[k][0]}</b><small>${CUSTOM[k][1]}</small></div>`).join('')}</div>
            <a class="btn ghost" style="margin-top:14px" href="#/studio?${toQuery({ ...look(), zones: s.zones })}">Design it in the Studio →</a>` : ''}
          <h3 style="margin-top:40px">How it works</h3>
          <ol class="timeline">${timeline.map(([h, t]) => `<li><b>${h}</b><span>${t}</span></li>`).join('')}</ol>
          <h3 style="margin-top:40px">Specifications</h3>
          <dl class="facts specs">
            <div><dt>Materials</dt><dd>${esc(s.materials)}</dd></div>
            ${s.kind === 'book' ? `<div><dt>Finishes</dt><dd>${FINISHES.map(f => f.name).join(', ')}</dd></div>` : ''}
            <div><dt>Compatibility</dt><dd>Checked at the visit before you buy</dd></div>
            <div><dt>Installation</dt><dd>${s.kind === 'book' ? 'Trained Fitting Edge installer, leak-checked' : 'Installation support available'}</dd></div>
            <div><dt>Warranty</dt><dd>Clear written terms with every product</dd></div>
            <div><dt>Aftercare</dt><dd>Spare parts and repair-first service</dd></div>
          </dl>
          <h3 style="margin-top:40px">Questions</h3>
          ${c.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}
        </div>
        <aside class="box sticky">
          <dl class="facts" style="margin:0 0 18px">
            <div><dt>Category</dt><dd>${esc(c.name)}</dd></div>
            <div><dt>Best for</dt><dd>${esc(s.bestFor)}</dd></div>
            <div><dt>Price</dt><dd>${s.kind === 'book' ? 'Free itemised quote' : 'On enquiry'}</dd></div>
          </dl>
          <div class="btns" style="flex-direction:column">
            <a class="btn" style="justify-content:center" href="#/book?service=${s.id}${p ? `&finish=${encodeURIComponent(OPTIONS.finish[look().finish][0])}` : ''}">${action}</a>
            <a class="btn ghost" style="justify-content:center" href="${wa(`Hi Fitting Edge, I'm interested in: ${s.name}`)}" target="_blank" rel="noopener">Ask on WhatsApp</a>
          </div>
          <p class="hint" style="margin:14px 0 0">No obligation. You approve the itemised quote before any work starts.</p>
        </aside>
      </div>
      ${related.length ? `<h2 style="margin-top:64px">Related services</h2><div class="grid" style="margin-top:20px">${related.map(card).join('')}</div>` : ''}
    </div></section>`;
  },

  studio: q => studioPage(q),
  quiz: () => quizPage(ids => { $('#qRecs').innerHTML = `<h2 style="margin-top:48px">Recommended services</h2><div class="grid" style="margin-top:20px">${ids.map(svcOf).filter(Boolean).map(card).join('')}</div>`; $('#qRecs').querySelectorAll('.rv').forEach(el => el.classList.add('in')); }),

  book(q) {
    const pre = svcOf(q.get('service'));
    setTimeout(() => wireBook());
    const tomorrow = new Date(Date.now() + 864e5).toISOString().slice(0, 10);
    return `<section><div class="wrap detail">
      <div>
        <span class="eyebrow">Book a visit</span>
        <h1 style="font-size:clamp(2rem,4vw,2.8rem)">Tell us what you'd like to upgrade</h1>
        <p class="lead">We'll confirm your slot and share an itemised quote. No obligation.</p>
        <div class="box" id="formbox">
        <form id="book" novalidate>
          <div><label for="service">Service</label>
            <select id="service" name="service" required>
              ${CATEGORIES.map(c => `<optgroup label="${esc(c.name)}">${SERVICES.filter(s => s.cat === c.id).map(s => `<option value="${s.id}" ${s === pre ? 'selected' : ''}>${esc(s.name)}</option>`).join('')}</optgroup>`).join('')}
            </select></div>
          <div class="row">
            <div><label for="name">Full name</label><input id="name" name="name" autocomplete="name" required></div>
            <div><label for="phone">Mobile number</label><input id="phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel" pattern="[6-9][0-9]{9}" maxlength="10" required><p class="hint">10-digit Indian mobile number</p></div>
          </div>
          <div class="row">
            <div><label for="email">Email <span class="opt">(optional)</span></label><input id="email" name="email" type="email" autocomplete="email"></div>
            <div><label for="pincode">Pincode</label><input id="pincode" name="pincode" inputmode="numeric" pattern="[1-9][0-9]{5}" maxlength="6" autocomplete="postal-code" required></div>
          </div>
          <div data-for="book">
            <div><label for="address">Address <span class="opt">(for the visit)</span></label><textarea id="address" name="address" autocomplete="street-address" style="min-height:70px"></textarea></div>
            <div class="row" style="margin-top:18px">
              <div><label for="date">Preferred date</label><input id="date" name="date" type="date" min="${tomorrow}" value="${tomorrow}"></div>
              <fieldset><legend>Preferred time</legend><div class="pills">${['Morning 9–12', 'Afternoon 12–4', 'Evening 4–7'].map((t, i) => `<label><input type="radio" name="slot" value="${t}" ${i ? '' : 'checked'}>${t}</label>`).join('')}</div></fieldset>
            </div>
            <fieldset style="margin-top:18px"><legend>Finish preference</legend><div class="pills">${[{ name: 'Not sure yet', hex: '#fff' }, ...FINISHES].map((f, i) => `<label><input type="radio" name="finish" value="${esc(f.name)}" ${f.name === (q.get('finish') || 'Not sure yet') ? 'checked' : ''}><i class="dot" style="background:${f.hex}"></i>${esc(f.name)}</label>`).join('')}</div></fieldset>
          </div>
          <div data-for="enquire" class="row">
            <div><label for="org">Organisation</label><input id="org" name="organisation" autocomplete="organization"></div>
            <div><label for="size">Project size <span class="opt">(units, rooms or sites)</span></label><input id="size" name="projectSize"></div>
          </div>
          <div><label for="notes">Anything we should know? <span class="opt">(optional)</span></label><textarea id="notes" name="notes" placeholder="e.g. hard water in our area, old tap leaks, want matching accessories">${esc(q.get('design') || (q.get('zones') ? 'Zones: ' + q.get('zones') : ''))}</textarea></div>
          <label class="check"><input type="checkbox" name="consent" required> I agree to be contacted by Fitting Edge about this request.</label>
          <button class="btn" type="submit">Request booking</button>
        </form></div>
      </div>
      <aside class="box sticky">
        <h3>What happens next</h3>
        <ol style="padding-left:20px;color:var(--muted);margin:0 0 16px">
          <li>We call to confirm your slot.</li><li>An advisor checks compatibility and shares an itemised quote.</li><li>You approve, and a trained installer fits it.</li>
        </ol>
        <p style="margin:0;color:var(--muted)">Prefer to talk? <a href="tel:${C.phone.replace(/\s/g, '')}">${esc(C.phone)}</a> or <a href="${wa('Hi Fitting Edge, I would like to book a visit.')}" target="_blank" rel="noopener">WhatsApp</a>.</p>
      </aside>
    </div></section>`;
  },

  contact() {
    setTimeout(() => wireContact());
    return `<section><div class="wrap">
      <span class="eyebrow">Contact</span>
      <h1 style="font-size:clamp(2rem,4vw,2.8rem)">Talk to Fitting Edge</h1>
      <p class="lead">Questions about a product, a quote, an installation or a partnership? We're happy to help.</p>
      <div class="g4" style="margin:32px 0">
        <a class="box cat" href="tel:${C.phone.replace(/\s/g, '')}">${icon('phone')}<h3>Call</h3><p style="margin:0;color:var(--muted)">${esc(C.phone)}</p></a>
        <a class="box cat" href="${wa('Hi Fitting Edge!')}" target="_blank" rel="noopener">${icon('chat')}<h3>WhatsApp</h3><p style="margin:0;color:var(--muted)">Chat with us</p></a>
        <a class="box cat" href="mailto:${C.email}">${icon('mail')}<h3>Email</h3><p style="margin:0;color:var(--muted)">${esc(C.email)}</p></a>
        <div class="box">${icon('clock')}<h3>Hours</h3><p style="margin:0;color:var(--muted)">${esc(C.hours)}</p></div>
      </div>
      <div class="detail">
        <div class="box" id="formbox">
          <form id="contact" novalidate>
            <div class="row">
              <div><label for="cname">Name</label><input id="cname" name="name" autocomplete="name" required></div>
              <div><label for="creach">Phone or email</label><input id="creach" name="reach" required></div>
            </div>
            <div><label for="topic">Topic</label><select id="topic" name="topic">${['Product question', 'Quote or booking', 'Installation or repair', 'Warranty', 'Business / bulk order', 'Become a partner', 'Other'].map(t => `<option>${t}</option>`).join('')}</select></div>
            <div><label for="msg">Message</label><textarea id="msg" name="message" required></textarea></div>
            <button class="btn" type="submit">Send message</button>
          </form>
        </div>
        <aside class="box">${icon('pin')}<h3>Where we serve</h3><p style="color:var(--muted)">${esc(C.serving)}</p>
          <p style="color:var(--muted);margin:0">Want to see the plan behind Fitting Edge? <a href="${SITE.world3d}" target="_blank" rel="noopener">Explore it in 3D</a>.</p></aside>
      </div>
    </div></section>`;
  },

  notfound() {
    return `<section><div class="wrap"><h1>Page not found</h1><p class="lead">That page doesn't exist.</p><a class="btn" href="#/">Go home</a></div></section>`;
  },
};

/* ---------- Interactive bits ---------- */
function wireHome() {
  document.querySelectorAll('[data-finish]').forEach(b => b.addEventListener('click', () => {
    const f = FINISHES.find(x => x.id === b.dataset.finish);
    document.querySelectorAll('[data-finish]').forEach(x => x.setAttribute('aria-checked', x === b));
    $('#heroArt').innerHTML = bath({ ...look(), finish: f.id, label: `Bathroom with ${f.name.toLowerCase()} fittings` });
  }));
  const ba = $('.ba'), range = $('.ba input');
  range.addEventListener('input', () => ba.style.setProperty('--x', range.value + '%'));
  const box = $('.builder'), art = $('#buildArt'), sum = $('#bsum');
  const update = () => {
    const zones = [...box.querySelectorAll('[name=zone]:checked')].map(i => i.value);
    const f = FINISHES[box.querySelector('[name=bfinish]:checked').value];
    const cfg = { ...look(), finish: f.id, zones };
    art.innerHTML = bath({ ...cfg, label: `Preview: ${zones.join(', ') || 'no zones'} upgraded in ${f.name}` });
    const svc = svcOf(zones.length > 1 ? 'complete-bath' : `${zones[0]}-zone`);
    const names = { sink: 'Sink', shower: 'Shower', hygiene: 'Toilet & hygiene' };
    sum.innerHTML = zones.length
      ? `<small>Your package</small><b>${esc(svc.name)}</b><span>${zones.map(z => names[z]).join(' + ')} · ${esc(f.name)}</span>
         <span class="btns"><a class="btn" href="#/book?service=${svc.id}&finish=${encodeURIComponent(f.name)}&zones=${encodeURIComponent(zones.map(z => names[z]).join(', '))}">Book this look</a><a class="btn ghost" href="#/studio?${toQuery(cfg)}">More options</a></span>`
      : `<small>Your package</small><b>Pick at least one zone</b><span>Only change what you want to change.</span>`;
  };
  box.addEventListener('change', update); update();
}

function wireServices(cat) {
  const list = $('#list'), search = $('.search');
  const draw = () => {
    const term = search.value.trim().toLowerCase();
    const hits = SERVICES.filter(s => (cat === 'all' || s.cat === cat) && (!term || [s.name, s.tagline, s.desc, s.bestFor].join(' ').toLowerCase().includes(term)))
      .sort((a, b) => forYou(b) - forYou(a));
    list.innerHTML = hits.length ? hits.map(card).join('') : `<p class="empty">No services match “${esc(term)}”. <a href="#/contact">Ask us</a> instead.</p>`;
  };
  search.addEventListener('input', draw);
  document.querySelectorAll('[data-cat]').forEach(b => b.addEventListener('click', () => { location.hash = b.dataset.cat === 'all' ? '#/services' : `#/services?cat=${b.dataset.cat}`; }));
  draw();
}

function wireBook() {
  const form = $('#book'), sel = $('#service');
  const sync = () => { // home-visit fields for bookings, organisation fields for enquiries
    const kind = svcOf(sel.value).kind;
    form.querySelectorAll('[data-for]').forEach(el => { const on = el.dataset.for === kind; el.hidden = !on; el.querySelectorAll('input,textarea').forEach(i => { i.disabled = !on; }); });
    $('#date').required = kind === 'book'; $('#org').required = kind === 'enquire';
    form.querySelector('[type=submit]').textContent = kind === 'book' ? 'Request booking' : 'Send enquiry';
  };
  sel.addEventListener('change', sync); sync();
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form)); delete data.consent;
    const s = svcOf(data.service); data.service = s.name;
    send(s.kind === 'book' ? 'Booking request' : 'Business enquiry', data, ref => `
      <div class="done"><div class="big">✓</div><h2>${s.kind === 'book' ? 'Booking requested' : 'Enquiry received'}</h2>
      <p class="lead" style="margin-inline:auto">Thanks, ${esc(data.name)}. Your reference is <span class="ref">${ref}</span>. We'll call you on ${esc(data.phone)} to confirm${s.kind === 'book' ? ` your ${esc(data.date)} (${esc(data.slot)}) visit` : ''}.</p>
      <div class="btns" style="justify-content:center"><a class="btn" href="#/services">Browse more services</a><a class="btn ghost" href="${wa(`Hi Fitting Edge, my reference is ${ref} (${s.name}).`)}" target="_blank" rel="noopener">Follow up on WhatsApp</a></div></div>`);
  });
}

function wireContact() {
  const form = $('#contact');
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    send('Contact message', data, ref => `<div class="done"><div class="big">✓</div><h2>Message sent</h2><p class="lead" style="margin-inline:auto">Thanks, ${esc(data.name)}. We'll reply to ${esc(data.reach)} within one working day. Reference <span class="ref">${ref}</span>.</p></div>`);
  });
}

// Send to SITE.formEndpoint if set; otherwise open a pre-filled email to the business.
async function send(subject, data, doneHtml) {
  const ref = 'FE-' + Date.now().toString(36).slice(-6).toUpperCase();
  const box = $('#formbox'), btn = box.querySelector('[type=submit]');
  const body = Object.entries({ reference: ref, ...data }).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n');
  if (SITE.formEndpoint) {
    btn.disabled = true; btn.textContent = 'Sending…';
    try {
      const r = await fetch(SITE.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ _subject: `${subject} ${ref}`, reference: ref, ...data }) });
      if (!r.ok) throw new Error(r.status);
    } catch {
      btn.disabled = false; btn.textContent = 'Try again';
      box.insertAdjacentHTML('afterbegin', `<p role="alert" style="color:var(--err);margin-top:0">Couldn't send right now. Please try again, or call ${esc(C.phone)}.</p>`);
      return;
    }
  } else {
    location.href = `mailto:${C.email}?subject=${encodeURIComponent(`${subject} ${ref}`)}&body=${encodeURIComponent(body)}`;
  }
  box.innerHTML = doneHtml(ref) + (SITE.formEndpoint ? '' : `<p class="hint" style="text-align:center">Your email app opened with these details. Press send to complete your request.</p>`);
  box.scrollIntoView({ block: 'center' });
}

/* ---------- Router ---------- */
function render() {
  const [path, query = ''] = location.hash.replace(/^#/, '').split('?');
  const parts = (path || '/').split('/').filter(Boolean), q = new URLSearchParams(query);
  const page = parts[0] || 'home';
  let html, title;
  if (page === 'home') { html = pages.home(); title = SITE.tagline; }
  else if (page === 'services' && parts[1]) { html = pages.detail(parts[1]); title = svcOf(parts[1])?.name || 'Not found'; }
  else if (pages[page] && page !== 'detail' && page !== 'notfound') { html = pages[page](q); title = { services: 'Services', book: 'Book a visit', contact: 'Contact', studio: 'Design Studio', quiz: 'Find your look' }[page]; }
  else { html = pages.notfound(); title = 'Not found'; }
  main.innerHTML = html;
  document.title = `${title} · ${SITE.brand}`;
  const nav = page === 'services' && q.get('cat') === 'business' ? 'business' : page;
  document.querySelectorAll('[data-nav]').forEach(a => a.toggleAttribute('aria-current', a.dataset.nav === nav));
  $('#nav').classList.remove('open'); $('.menu').setAttribute('aria-expanded', 'false');
  scrollTo(0, 0); main.focus({ preventScroll: true });
  setTimeout(() => main.querySelectorAll('.rv').forEach(el => reveal ? reveal.observe(el) : el.classList.add('in')));
}
// Fade sections up as they scroll into view (skipped for reduced motion)
const reveal = !matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window
  ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' })
  : null;
$('.menu').addEventListener('click', e => { const open = $('#nav').classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', open); });

$('#foot').innerHTML = `
  <div><a class="logo" href="#/"><span class="mark" aria-hidden="true"></span>Fitting Edge</a><p>${esc(SITE.tagline)}<br>${esc(SITE.promise)}</p></div>
  <div><h4>Services</h4>${CATEGORIES.slice(0, 4).map(c => `<a href="#/services?cat=${c.id}">${esc(c.name)}</a>`).join('')}</div>
  <div><h4>Business</h4>${CATEGORIES.slice(4).map(c => `<a href="#/services?cat=${c.id}">${esc(c.name)}</a>`).join('')}<a href="${SITE.world3d}" target="_blank" rel="noopener">Our plan in 3D</a></div>
  <div><h4>Contact</h4><a href="tel:${C.phone.replace(/\s/g, '')}">${esc(C.phone)}</a><a href="mailto:${C.email}">${esc(C.email)}</a><a href="#/contact">Contact form</a><span>${esc(C.hours)}</span></div>
  <p class="small">© ${new Date().getFullYear()} Fitting Edge. Product performance claims are product-specific and backed by test results available on request.</p>`;

addEventListener('hashchange', render);
render();
