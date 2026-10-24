// Design Studio (#/studio), "Find your look" quiz (#/quiz) and the saved visitor profile that personalises the site.
import { bath, OPTIONS, DEFAULT } from './art.js';

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const $ = (s, el = document) => el.querySelector(s);
const store = { get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } }, set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode */ } } };

export const PRESETS = [
  { id: 'brass', name: 'Warm Brass Spa', blurb: 'Brushed gold, walnut and soft evening light.', cfg: { finish: 'gold', tile: 'warm', pattern: 'subway', vanity: 'walnut', mirror: 'arch', tap: 'pillar', shower: 'round', light: 'warm', acc: ['towel', 'plant', 'mat'] } },
  { id: 'midnight', name: 'Midnight Matte', blurb: 'Dark, dramatic and easy to keep clean.', cfg: { finish: 'black', tile: 'charcoal', pattern: 'large', vanity: 'walnut', mirror: 'rect', tap: 'wall', shower: 'square', light: 'cool', acc: ['shelf', 'mat', 'soap'] } },
  { id: 'graphite', name: 'Graphite Minimal', blurb: 'Calm, pale and precise.', cfg: { finish: 'graphite', tile: 'warm', pattern: 'large', vanity: 'white', mirror: 'round', tap: 'lever', shower: 'square', light: 'daylight', acc: ['soap', 'towel'] } },
  { id: 'coastal', name: 'Coastal Fresh', blurb: 'Sky-blue subway tiles, bright and breezy.', cfg: { finish: 'gold', tile: 'sky', pattern: 'subway', vanity: 'white', mirror: 'round', tap: 'lever', shower: 'round', light: 'daylight', acc: ['plant', 'towel', 'mat'] } },
  { id: 'sage', name: 'Sage Retreat', blurb: 'Botanical greens with matte black accents.', cfg: { finish: 'black', tile: 'sage', pattern: 'square', vanity: 'sage', mirror: 'arch', tap: 'pillar', shower: 'round', light: 'warm', acc: ['plant', 'shelf', 'hook'] } },
  { id: 'terracotta', name: 'Terracotta Earth', blurb: 'Warm clay tones and brushed gold.', cfg: { finish: 'gold', tile: 'terracotta', pattern: 'square', vanity: 'charcoal', mirror: 'round', tap: 'wall', shower: 'square', light: 'warm', acc: ['plant', 'towel', 'mat'] } },
];
const ZONES = { sink: 'Sink', shower: 'Shower', hygiene: 'Toilet & hygiene' };

/* ---------- design <-> URL ---------- */
const KEYS = { z: 'zones', f: 'finish', t: 'tile', p: 'pattern', v: 'vanity', m: 'mirror', tap: 'tap', sh: 'shower', l: 'light', a: 'acc', eco: 'eco' };
export const toQuery = c => new URLSearchParams(Object.entries(KEYS).map(([k, f]) => [k, f === 'eco' ? (c.eco ? 1 : 0) : Array.isArray(c[f]) ? c[f].join('.') : c[f]])).toString();
export function fromQuery(q) {
  const c = {};
  for (const [k, f] of Object.entries(KEYS)) {
    if (!q.has(k)) continue;
    const v = q.get(k);
    if (f === 'eco') c.eco = v === '1';
    else if (f === 'zones') c.zones = v.split('.').filter(z => ZONES[z]);
    else if (f === 'acc') c.acc = v.split('.').filter(a => OPTIONS.acc[a]);
    else if (OPTIONS[f][v]) c[f] = v;
  }
  return c;
}

/* ---------- what a design contains ---------- */
export const serviceFor = c => (c.zones.length > 1 ? 'complete-bath' : c.zones.length ? `${c.zones[0]}-zone` : 'consultation');
export function itemise(c) {
  const F = OPTIONS.finish[c.finish][0], items = [];
  if (c.zones.includes('sink')) items.push(`${OPTIONS.tap[c.tap][0]} basin mixer`, 'Basin waste & bottle trap');
  if (c.zones.includes('shower')) items.push(`${OPTIONS.shower[c.shower][0]} shower + hand shower set${c.eco ? ', flow-regulated' : ''}`, 'Shower arm, holder & diverter');
  if (c.zones.includes('hygiene')) items.push('Health faucet, hose & holder', 'Angle valves');
  for (const a of ['towel', 'hook', 'soap']) if (c.acc.includes(a)) items.push(OPTIONS.acc[a][0]);
  const styling = [`${OPTIONS.tile[c.tile][0]} ${OPTIONS.pattern[c.pattern][0].toLowerCase()} tiles`, `${OPTIONS.vanity[c.vanity][0]} vanity`, `${OPTIONS.mirror[c.mirror][0].toLowerCase()} mirror`, `${OPTIONS.light[c.light][0].toLowerCase()} lighting`, ...['shelf', 'plant', 'mat'].filter(a => c.acc.includes(a)).map(a => OPTIONS.acc[a][0].toLowerCase())];
  return { finish: F, items, styling };
}
export const designText = (c, name) => { const d = itemise(c); return `${name || 'My design'}: ${c.zones.map(z => ZONES[z]).join(' + ') || 'consultation'} in ${d.finish}. Items: ${d.items.join('; ') || 'to be advised'}. Styling: ${d.styling.join(', ')}.`; };

/* ---------- profile (quiz answers) ---------- */
export const getProfile = () => store.get('fe-profile', null);
const VIBE = { warm: 'brass', dark: 'midnight', minimal: 'graphite', fresh: 'coastal', botanical: 'sage', earthy: 'terracotta' };
export function recommend(p) {
  const preset = PRESETS.find(x => x.id === VIBE[p.vibe]) || PRESETS[0];
  const cfg = { ...DEFAULT, ...preset.cfg };
  const services = new Set(['consultation']), tips = [];
  if (p.space === 'compact') { cfg.tap = 'wall'; cfg.zones = ['sink', 'shower']; tips.push(['Compact space', 'A wall-mounted spout frees up counter space, and a round or arch mirror keeps the room feeling open.']); }
  if (p.space === 'large' || p.priority === 'design') { services.add('complete-bath'); tips.push(['Statement look', 'Carry one finish across all three zones with the Complete Bath Edit for a fully coordinated room.']); }
  if (p.water === 'hard') { services.add('repair'); services.add('water-smart'); tips.push(['Hard water', "We'll suggest fittings suited to hard-water use, with easy-clean nozzles and aerators you can descale, and share the relevant test results."]); }
  if (p.priority === 'water') { cfg.eco = true; services.add('water-smart'); tips.push(['Saving water', 'Flow-regulating taps and showers, with a before-and-after flow check at installation.']); }
  if (p.priority === 'value') { services.add('sink-zone'); services.add('repair'); cfg.zones = ['sink']; tips.push(['Best value', 'Start with one zone now and add the others later. Every piece matches across zones.']); }
  if (p.priority === 'easy') { tips.push(['Easy to clean', 'Matte and brushed finishes tend to show fewer water spots than polished ones.']); }
  if (p.users === 'elders') { cfg.tap = 'lever'; tips.push(['For elders', 'Single-lever taps and a hand shower at a comfortable height are easier to use. Ask us about placement during the visit.']); }
  if (p.users === 'kids') { services.add('hygiene-zone'); tips.push(['Families', 'A health faucet and a hand shower make bath time easier for little ones.']); }
  if (p.users === 'guests') { services.add('rental-refresh'); tips.push(['Rentals & guests', 'Durable, coordinated fittings and quick modular refreshes between guests.']); }
  if (!services.has('complete-bath') && !services.has('sink-zone')) services.add(serviceFor(cfg));
  return { preset, cfg, services: [...services], tips };
}

/* ---------- Design Studio ---------- */
const swatch = hex => `<i class="dot" style="background:${hex}"></i>`;
const group = (title, name, type, entries, checked, extra = '') => `<fieldset class="opt"><legend>${title}</legend><div class="pills">${entries.map(([v, label, hex]) =>
  `<label><input type="${type}" name="${name}" value="${v}" ${checked(v) ? 'checked' : ''}>${hex ? swatch(hex) : ''}${esc(label)}</label>`).join('')}${extra}</div></fieldset>`;
const opts = k => Object.entries(OPTIONS[k]).map(([v, [label, hex]]) => [v, label, k === 'light' ? null : hex]);

export function studioPage(q) {
  const p = getProfile();
  const c = { ...DEFAULT, ...(p?.cfg || {}), ...fromQuery(q) };
  setTimeout(() => wireStudio(c));
  return `<section class="studio"><div class="wrap">
    <div class="studio-head">
      <div><span class="eyebrow">Design Studio</span><h1>${p?.name ? `${esc(p.name)}, design` : 'Design'} <em>your</em> bathroom</h1>
      <p class="lead">Choose zones, finishes, fitting styles and the room around them. Everything updates live. Save it, share it, or book it.</p></div>
      <div class="btns"><button class="btn ghost" type="button" data-act="random">Surprise me</button><a class="btn ghost" href="#/quiz">${p ? 'Retake the quiz' : 'Find your look quiz'}</a></div>
    </div>
    <div class="presets">${PRESETS.map(x => `<button type="button" class="preset" data-preset="${x.id}">${bath({ ...DEFAULT, ...x.cfg, label: x.name })}<b>${esc(x.name)}</b><small>${esc(x.blurb)}</small></button>`).join('')}</div>
    <div class="studio-grid">
      <div class="studio-preview">
        <div class="stage"><div id="sArt"></div><span class="tag" id="sTag"></span></div>
        <div class="toolbar">
          <div class="seg" role="group" aria-label="Zoom to a zone">${[['all', 'Whole room'], ['sink', 'Sink'], ['shower', 'Shower'], ['hygiene', 'Hygiene']].map(([v, l], i) => `<button type="button" data-view="${v}" aria-pressed="${!i}">${l}</button>`).join('')}</div>
          <button type="button" class="seg-btn" data-act="compare" aria-pressed="false">Show before</button>
        </div>
      </div>
      <form class="studio-controls box" id="sForm">
        ${group('Zones to upgrade', 'zones', 'checkbox', Object.entries(ZONES), v => c.zones.includes(v))}
        ${group('Finish', 'finish', 'radio', opts('finish'), v => v === c.finish)}
        ${group('Basin tap style', 'tap', 'radio', opts('tap'), v => v === c.tap)}
        ${group('Shower head', 'shower', 'radio', opts('shower'), v => v === c.shower, `<label class="eco"><input type="checkbox" name="eco" ${c.eco ? 'checked' : ''}>Water-smart flow</label>`)}
        ${group('Accessories', 'acc', 'checkbox', opts('acc'), v => c.acc.includes(v))}
        <details class="room" open><summary>Style the room <span class="opt">(preview only)</span></summary>
          ${group('Wall tiles', 'tile', 'radio', opts('tile'), v => v === c.tile)}
          ${group('Tile layout', 'pattern', 'radio', opts('pattern'), v => v === c.pattern)}
          ${group('Vanity', 'vanity', 'radio', opts('vanity'), v => v === c.vanity)}
          ${group('Mirror', 'mirror', 'radio', opts('mirror'), v => v === c.mirror)}
          ${group('Lighting mood', 'light', 'radio', opts('light'), v => v === c.light)}
        </details>
      </form>
    </div>
    <div class="studio-sum box" id="sSum"></div>
    <div id="sSaved"></div>
  </div></section>`;
}

function wireStudio(c) {
  let view = 'all', compare = false;
  const form = $('#sForm'), art = $('#sArt'), sum = $('#sSum'), tag = $('#sTag');
  const read = () => {
    const fd = new FormData(form), one = k => fd.get(k) || c[k];
    Object.assign(c, { zones: fd.getAll('zones'), acc: fd.getAll('acc'), eco: fd.has('eco'), finish: one('finish'), tap: one('tap'), shower: one('shower'), tile: one('tile'), pattern: one('pattern'), vanity: one('vanity'), mirror: one('mirror'), light: one('light') });
  };
  const write = () => form.querySelectorAll('input').forEach(i => {
    i.checked = i.name === 'eco' ? c.eco : Array.isArray(c[i.name]) ? c[i.name].includes(i.value) : c[i.name] === i.value;
  });
  const draw = () => {
    art.innerHTML = bath({ ...c, zones: compare ? [] : c.zones, view: view === 'all' ? null : view, label: compare ? 'Before: existing fittings' : `Your design in ${OPTIONS.finish[c.finish][0]}` });
    tag.textContent = compare ? 'Before' : `${OPTIONS.finish[c.finish][0]} · ${c.zones.length ? c.zones.map(z => ZONES[z]).join(' + ') : 'no zones yet'}`;
    const d = itemise(c), svc = serviceFor(c), name = $('#sName')?.value || 'My bathroom';
    sum.innerHTML = `
      <div><small class="eyebrow">Your design</small><input id="sName" class="name" value="${esc(name)}" aria-label="Design name" maxlength="40"></div>
      <div><h4>Fittings in ${esc(d.finish)}</h4>${d.items.length ? `<ul class="ticks">${d.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>` : '<p class="hint">Pick at least one zone to see the fittings.</p>'}</div>
      <div><h4>Room styling</h4><p class="hint" style="margin-top:0">${esc(d.styling.join(' · '))}. Shown to help you visualise; tiles and furniture aren't part of the quote.</p>
        <p class="hint">Every quote is itemised after a free compatibility check.</p></div>
      <div class="btns sum-actions">
        <a class="btn" href="#/book?service=${svc}&finish=${encodeURIComponent(d.finish)}&design=${encodeURIComponent(designText(c, name))}">Book this design</a>
        <button class="btn ghost" type="button" data-act="save">Save design</button>
        <button class="btn ghost" type="button" data-act="share">Copy share link</button>
        <span class="toast" role="status" id="sToast"></span>
      </div>`;
    history.replaceState(null, '', '#/studio?' + toQuery(c));
  };
  const toast = msg => { const t = $('#sToast'); t.textContent = msg; setTimeout(() => { t.textContent = ''; }, 2200); };
  const saved = () => {
    const list = store.get('fe-designs', []);
    $('#sSaved').innerHTML = list.length ? `<h2 style="margin-top:56px">Saved designs</h2><div class="presets saved">${list.map((x, i) => `<div class="preset">${bath({ ...DEFAULT, ...x.cfg, label: x.name })}<b>${esc(x.name)}</b><small>${new Date(x.at).toLocaleDateString()}</small><span class="btns"><button type="button" class="btn ghost sm" data-load="${i}">Open</button><button type="button" class="btn ghost sm" data-del="${i}" aria-label="Delete ${esc(x.name)}">Delete</button></span></div>`).join('')}</div>` : '';
  };
  form.addEventListener('change', () => { read(); draw(); });
  sum.addEventListener('change', e => { if (e.target.id === 'sName') draw(); });
  $('.studio').addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.preset) { Object.assign(c, PRESETS.find(x => x.id === t.dataset.preset).cfg); write(); draw(); art.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
    if (t.dataset.view) { view = t.dataset.view; document.querySelectorAll('[data-view]').forEach(b => b.setAttribute('aria-pressed', b === t)); draw(); }
    if (t.dataset.act === 'compare') { compare = !compare; t.setAttribute('aria-pressed', compare); t.textContent = compare ? 'Show after' : 'Show before'; draw(); }
    if (t.dataset.act === 'random') {
      const pick = k => { const ks = Object.keys(OPTIONS[k]); return ks[Math.floor(Math.random() * ks.length)]; };
      for (const k of ['finish', 'tile', 'pattern', 'vanity', 'mirror', 'tap', 'shower', 'light']) c[k] = pick(k);
      c.acc = Object.keys(OPTIONS.acc).filter(() => Math.random() < 0.5); write(); draw();
    }
    if (t.dataset.act === 'save') {
      const list = store.get('fe-designs', []); list.unshift({ name: $('#sName').value || 'My bathroom', cfg: { ...c }, at: Date.now() });
      store.set('fe-designs', list.slice(0, 12)); saved(); toast('Saved on this device');
    }
    if (t.dataset.act === 'share') {
      navigator.clipboard?.writeText(location.href).then(() => toast('Link copied'), () => toast('Copy the address bar to share'));
    }
    if (t.dataset.load) { Object.assign(c, store.get('fe-designs', [])[t.dataset.load].cfg); write(); draw(); scrollTo({ top: 0, behavior: 'smooth' }); }
    if (t.dataset.del) { const list = store.get('fe-designs', []); list.splice(t.dataset.del, 1); store.set('fe-designs', list); saved(); }
  });
  draw(); saved();
}

/* ---------- Find your look quiz ---------- */
const QUIZ = [
  ['space', 'How big is the bathroom?', [['compact', 'Compact', 'Under about 35 sq ft'], ['standard', 'Standard', 'A typical apartment bathroom'], ['large', 'Spacious', 'Room to make a statement']]],
  ['users', 'Who uses it most?', [['adults', 'Just adults', 'Couples, singles'], ['kids', 'Family with kids', 'Busy mornings'], ['elders', 'Elders at home', 'Ease of use matters'], ['guests', 'Guests or tenants', 'Rentals, PGs, guest rooms']]],
  ['water', 'What is your water like?', [['hard', 'Hard water', 'White marks, scaling, clogged nozzles'], ['normal', 'Normal', 'No real issues'], ['unsure', 'Not sure', "We'll check during the visit"]]],
  ['priority', 'What matters most?', [['design', 'A statement look', 'Coordinated and beautiful'], ['easy', 'Easy to keep clean', 'Low maintenance'], ['water', 'Saving water', 'Use less, waste less'], ['value', 'Best value', 'Upgrade smart, step by step']]],
  ['vibe', 'Which feels like you?', Object.entries(VIBE).map(([v, pid]) => { const x = PRESETS.find(p => p.id === pid); return [v, x.name, x.blurb, x.cfg]; })],
];

export function quizPage(onRecs) { // onRecs(serviceIds) renders recommended services below the result
  setTimeout(() => wireQuiz(onRecs));
  return `<section class="quiz"><div class="wrap narrow">
    <span class="eyebrow">Find your look</span>
    <h1>Which bathroom is <em>you?</em></h1>
    <p class="lead">Six quick questions. We'll suggest a look, the right services and tips for your home. Your answers stay on this device.</p>
    <div class="bar-track" aria-hidden="true"><i id="qBar"></i></div>
    <form id="quiz" class="box"></form>
  </div></section>`;
}

function wireQuiz(onRecs) {
  const form = $('#quiz'), bar = $('#qBar'), ans = { ...(getProfile()?.answers || {}) };
  let step = 0;
  const show = () => {
    bar.style.width = `${(step / (QUIZ.length + 1)) * 100}%`;
    if (step === 0) {
      form.innerHTML = `<label for="qName">What should we call you? <span class="opt">(optional)</span></label><input id="qName" maxlength="30" autocomplete="given-name" value="${esc(ans.name || '')}">
        <div class="btns" style="margin-top:20px"><button class="btn" type="submit">Start</button></div>`;
      return $('#qName').focus();
    }
    if (step > QUIZ.length) return result();
    const [key, title, choices] = QUIZ[step - 1];
    form.innerHTML = `<fieldset><legend class="qtitle">${step}. ${title}</legend><div class="choices${key === 'vibe' ? ' vibes' : ''}">${choices.map(([v, l, sub, cfg]) => `
      <label class="choice"><input type="radio" name="${key}" value="${v}" ${ans[key] === v ? 'checked' : ''} required>${cfg ? bath({ ...DEFAULT, ...cfg, label: l }) : ''}<b>${esc(l)}</b><small>${esc(sub)}</small></label>`).join('')}</div></fieldset>
      <div class="btns" style="margin-top:20px"><button class="btn ghost" type="button" data-back>Back</button><button class="btn" type="submit">${step === QUIZ.length ? 'See my look' : 'Next'}</button></div>`;
  };
  const result = () => {
    const r = recommend(ans);
    store.set('fe-profile', { name: ans.name, answers: ans, cfg: r.cfg, preset: r.preset.id, services: r.services });
    bar.style.width = '100%';
    form.outerHTML = `<div class="box result">
      <div class="result-grid">
        <div class="stage">${bath({ ...r.cfg, label: r.preset.name })}</div>
        <div><small class="eyebrow">${ans.name ? `${esc(ans.name)}, your look is` : 'Your look is'}</small><h2>${esc(r.preset.name)}</h2><p class="lead">${esc(r.preset.blurb)}</p>
          <div class="btns"><a class="btn" href="#/studio?${toQuery(r.cfg)}">Customise it in the Studio</a><a class="btn ghost" href="#/book?service=consultation&finish=${encodeURIComponent(OPTIONS.finish[r.cfg.finish][0])}&design=${encodeURIComponent(designText(r.cfg, r.preset.name))}">Book a consultation</a></div></div>
      </div>
      ${r.tips.length ? `<h3 style="margin-top:32px">Tips for your home</h3><div class="tips">${r.tips.map(([h, t]) => `<div><b>${esc(h)}</b><p>${esc(t)}</p></div>`).join('')}</div>` : ''}
      <p class="hint" style="margin-top:20px">We've personalised the site with your answers on this device. <button type="button" class="linkbtn" data-reset>Clear my answers</button></p>
    </div><div id="qRecs"></div>`;
    onRecs?.(r.services);
    $('[data-reset]').addEventListener('click', () => { localStorage.removeItem('fe-profile'); location.hash = '#/quiz?' + Date.now(); });
  };
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (step === 0) ans.name = $('#qName').value.trim();
    else { if (!form.reportValidity()) return; ans[QUIZ[step - 1][0]] = new FormData(form).get(QUIZ[step - 1][0]); }
    step++; show();
  });
  form.addEventListener('click', e => { if (e.target.closest('[data-back]')) { step--; show(); } });
  form.addEventListener('change', e => { if (e.target.type === 'radio') setTimeout(() => form.requestSubmit(), 180); }); // one tap per question
  show();
}
