// Shaded bathroom illustration. Every option the Design Studio offers is drawn here.
// Zones in `zones` get new fittings in `finish`; the others show old, scaled-up chrome.
export const OPTIONS = {
  finish: { black: ['Matte black', '#1F2023', '#4A4C52', '#141517'], gold: ['Brushed gold', '#B88D44', '#EBD196', '#9C7432'], graphite: ['Graphite', '#4D545C', '#98A0A9', '#3A4046'] },
  tile: { warm: ['Warm white', '#EFE9DE'], sage: ['Sage', '#C9D6C4'], sky: ['Sky', '#CFE0EA'], terracotta: ['Terracotta', '#D8B49B'], charcoal: ['Charcoal', '#5A5D63'], blush: ['Blush', '#E9D4CC'] },
  pattern: { square: ['Square'], subway: ['Subway'], large: ['Large format'] },
  vanity: { walnut: ['Walnut', '#6E4A31'], white: ['Matt white', '#ECEAE5'], charcoal: ['Charcoal', '#2E3034'], sage: ['Sage green', '#8EA48C'] },
  mirror: { round: ['Round'], arch: ['Arch'], rect: ['Rectangle'] },
  tap: { lever: ['Single lever'], pillar: ['Tall vessel'], wall: ['Wall-mounted'] },
  shower: { round: ['Round rain'], square: ['Square rain'] },
  light: { warm: ['Warm evening', '#FFB76B', 0.12], daylight: ['Daylight', '#FFFFFF', 0], cool: ['Cool spa', '#8EC5FF', 0.1] },
  acc: { towel: ['Towel ring'], shelf: ['Shelf & bottles'], plant: ['Plant'], mat: ['Bath mat'], soap: ['Soap dispenser'], hook: ['Robe hook'] },
};
export const DEFAULT = { zones: ['sink', 'shower', 'hygiene'], finish: 'gold', tile: 'warm', pattern: 'square', vanity: 'walnut', mirror: 'round', tap: 'lever', shower: 'round', light: 'warm', acc: ['towel', 'plant', 'mat'], eco: false };
const VIEWS = { sink: '18 22 190 142', shower: '228 26 172 129', hygiene: '146 86 150 113' };

let n = 0;
export function bath(cfg = {}) {
  const o = { ...DEFAULT, ...cfg }, id = 'fe' + n++, on = z => o.zones.includes(z), has = a => o.acc.includes(a);
  const F = OPTIONS.finish[o.finish] || OPTIONS.finish.gold, tile = OPTIONS.tile[o.tile][1], vanity = OPTIONS.vanity[o.vanity][1], L = OPTIONS.light[o.light];
  const metal = z => `url(#${id}${on(z) ? 'm' : 'o'})`;
  const scale = (z, pts) => (on(z) ? '' : pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#E5D9BD" opacity=".95"/><circle cx="${x - r / 3}" cy="${y - r / 3}" r="${r / 3}" fill="#F3EBD6"/>`).join(''));
  const dark = o.tile === 'charcoal';
  const [tw, th, off] = { square: [25, 25, 0], subway: [36, 14, 18], large: [80, 50, 0] }[o.pattern];
  const view = o.view && VIEWS[o.view] ? VIEWS[o.view] : '0 0 400 300';

  const tap = {
    lever: `<rect x="90" y="134" width="10" height="28" rx="4" fill="${metal('sink')}"/><rect x="90" y="134" width="27" height="7" rx="3.5" fill="${metal('sink')}"/><rect x="88" y="126" width="4" height="12" rx="2" transform="rotate(-25 90 132)" fill="${metal('sink')}"/>`,
    pillar: `<rect x="91" y="110" width="8" height="52" rx="3" fill="${metal('sink')}"/><path d="M95 112q0-10 12-10q10 0 10 12v6" fill="none" stroke="${metal('sink')}" stroke-width="6" stroke-linecap="round"/><rect x="86" y="140" width="5" height="10" rx="2" fill="${metal('sink')}"/>`,
    wall: `<rect x="86" y="134" width="18" height="13" rx="3" fill="${metal('sink')}"/><rect x="96" y="139" width="26" height="5" rx="2.5" fill="${metal('sink')}"/><circle cx="79" cy="141" r="4.5" fill="${metal('sink')}"/>`,
  }[o.tap];
  const spoutX = { lever: 115, pillar: 117, wall: 120 }[o.tap], spoutY = { lever: 142, pillar: 122, wall: 145 }[o.tap];
  const mirror = {
    round: `<circle cx="95" cy="82" r="38" fill="url(#${id}g)" stroke="${metal('sink')}" stroke-width="5" filter="url(#${id}s)"/><path d="M74 62a28 28 0 0 1 22-11" stroke="#fff" stroke-width="4" fill="none" opacity=".75" stroke-linecap="round"/>`,
    arch: `<path d="M60 122V78a35 35 0 0 1 70 0v44z" fill="url(#${id}g)" stroke="${metal('sink')}" stroke-width="5" filter="url(#${id}s)"/><path d="M72 70a24 24 0 0 1 18-16" stroke="#fff" stroke-width="4" fill="none" opacity=".75" stroke-linecap="round"/>`,
    rect: `<rect x="56" y="44" width="78" height="80" rx="6" fill="url(#${id}g)" stroke="${metal('sink')}" stroke-width="5" filter="url(#${id}s)"/><path d="M68 58l22-8M68 72l34-12" stroke="#fff" stroke-width="3.5" opacity=".6" stroke-linecap="round"/>`,
  }[o.mirror];
  const showerHead = o.shower === 'square'
    ? `<rect x="306" y="54" width="42" height="8" rx="2" fill="${metal('shower')}" filter="url(#${id}s)"/>`
    : `<ellipse cx="327" cy="59" rx="22" ry="7" fill="${metal('shower')}" filter="url(#${id}s)"/>`;
  const jets = on('shower') ? (o.eco ? [316, 324, 332, 340] : [310, 316, 322, 328, 334, 340, 345]) : [322, 333];

  return `<svg class="bath" viewBox="${view}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${o.label || 'Bathroom design preview'}">
  <defs>
    <linearGradient id="${id}m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${F[1]}"/><stop offset=".45" stop-color="${F[2]}"/><stop offset="1" stop-color="${F[3]}"/></linearGradient>
    <linearGradient id="${id}o" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9AA0A6"/><stop offset=".45" stop-color="#D7DADD"/><stop offset="1" stop-color="#7E848A"/></linearGradient>
    <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E6F2F7"/><stop offset=".55" stop-color="#B7D3E0"/><stop offset="1" stop-color="#94B8C9"/></linearGradient>
    <linearGradient id="${id}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".08"/></linearGradient>
    <linearGradient id="${id}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".18"/><stop offset=".3" stop-color="#000" stop-opacity="0"/></linearGradient>
    <linearGradient id="${id}glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#DDF0F7" stop-opacity=".55"/><stop offset=".5" stop-color="#fff" stop-opacity=".25"/><stop offset="1" stop-color="#BFE0EE" stop-opacity=".45"/></linearGradient>
    <linearGradient id="${id}v" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".12"/><stop offset=".5" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient>
    <radialGradient id="${id}l" cx=".25" cy="0" r=".9"><stop offset="0" stop-color="#FFF6E5" stop-opacity=".55"/><stop offset="1" stop-color="#FFF6E5" stop-opacity="0"/></radialGradient>
    <radialGradient id="${id}vig" cx=".5" cy=".45" r=".75"><stop offset=".65" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></radialGradient>
    <pattern id="${id}t" width="${tw}" height="${th * (off ? 2 : 1)}" patternUnits="userSpaceOnUse">
      <rect width="${tw}" height="${th * (off ? 2 : 1)}" fill="${tile}"/>
      <path d="M0 .5H${tw}M.5 0V${th}${off ? `M0 ${th + .5}H${tw}M${off + .5} ${th}V${th * 2}` : ''}" stroke="${dark ? '#44474C' : '#00000018'}" stroke-width="1"/>
      <rect x="2" y="2" width="${tw / 2}" height="${th / 3}" fill="#fff" opacity="${dark ? .04 : .18}"/>
    </pattern>
    <pattern id="${id}fl" width="50" height="50" patternUnits="userSpaceOnUse"><rect width="50" height="50" fill="#CFC5B4"/><path d="M0 .5H50M.5 0V50" stroke="#00000022"/></pattern>
    <pattern id="${id}grain" width="80" height="6" patternUnits="userSpaceOnUse"><path d="M0 3q20-2 40 0t40 0" stroke="#000" stroke-opacity="${o.vanity === 'walnut' ? .18 : .05}" fill="none"/></pattern>
    <filter id="${id}s" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="1.5" dy="3" stdDeviation="2.5" flood-opacity=".22"/></filter>
  </defs>

  <rect width="400" height="250" fill="url(#${id}t)"/>
  <rect width="400" height="250" fill="url(#${id}w)"/>
  <rect width="400" height="250" fill="url(#${id}l)"/>
  <rect y="250" width="400" height="50" fill="url(#${id}fl)"/>
  <rect y="250" width="400" height="50" fill="url(#${id}f)"/>
  <rect y="244" width="400" height="7" fill="${dark ? '#3E4145' : '#DDD4C4'}"/>

  <!-- vanity light -->
  <rect x="70" y="24" width="50" height="5" rx="2.5" fill="${metal('sink')}"/>
  <ellipse cx="95" cy="40" rx="48" ry="14" fill="#FFF3D6" opacity="${o.light === 'warm' ? .45 : .25}"/>

  <!-- sink zone -->
  <g class="z-sink">
    ${mirror}
    <g filter="url(#${id}s)">
      <rect x="52" y="172" width="86" height="72" rx="3" fill="${vanity}"/>
      <rect x="52" y="172" width="86" height="72" rx="3" fill="url(#${id}grain)"/>
      <rect x="52" y="172" width="86" height="72" rx="3" fill="url(#${id}v)"/>
      <path d="M95 178v60" stroke="#000" stroke-opacity=".2"/>
      <rect x="84" y="200" width="3" height="16" rx="1.5" fill="${metal('sink')}"/><rect x="103" y="200" width="3" height="16" rx="1.5" fill="${metal('sink')}"/>
      <rect x="44" y="160" width="102" height="14" rx="3" fill="#F7F5F1"/>
      <rect x="44" y="160" width="102" height="3" rx="1.5" fill="#fff"/>
      <path d="M64 164q31 14 62 0" fill="#E3E0DA"/>
    </g>
    ${tap}
    ${on('sink') ? '' : `<circle class="drip" cx="${spoutX}" cy="${spoutY + 6}" r="2.5" fill="#8FC3D8"/>`}
    ${scale('sink', [[96, 152, 4], [106, 137, 3], [70, 168, 3]])}
    ${has('soap') ? `<g filter="url(#${id}s)"><rect x="124" y="142" width="10" height="18" rx="3" fill="#E9E4DC"/><rect x="127" y="136" width="4" height="7" fill="${metal('sink')}"/><rect x="127" y="136" width="9" height="3" fill="${metal('sink')}"/></g>` : ''}
  </g>

  ${has('towel') ? `<g><circle cx="165" cy="112" r="10" fill="none" stroke="${metal('hygiene')}" stroke-width="3"/><rect x="161" y="96" width="8" height="5" rx="2" fill="${metal('hygiene')}"/>
    <path d="M154 116h22v34q-11 6-22 0z" fill="${o.vanity === 'walnut' ? '#F2EEE6' : '#D9C9A8'}" filter="url(#${id}s)"/><path d="M154 140h22" stroke="#00000014" stroke-width="3"/></g>` : ''}
  ${has('shelf') ? `<g filter="url(#${id}s)"><rect x="188" y="110" width="54" height="5" rx="1" fill="${vanity}"/>
    <rect x="194" y="94" width="9" height="16" rx="3" fill="#B8D4C6"/><rect x="207" y="98" width="8" height="12" rx="3" fill="#F2EEE6"/><rect x="219" y="90" width="10" height="20" rx="4" fill="#D8B49B"/><rect x="232" y="100" width="6" height="10" rx="2" fill="#8EA48C"/></g>` : ''}
  ${has('hook') ? `<g><rect x="270" y="88" width="6" height="10" rx="2" fill="${metal('shower')}"/><path d="M266 98h14l4 60q-11 8-22 0z" fill="#E9D4CC" filter="url(#${id}s)"/></g>` : ''}

  <!-- hygiene zone -->
  <g class="z-hygiene" filter="url(#${id}s)">
    <rect x="190" y="148" width="50" height="44" rx="6" fill="#FBFAF8"/><rect x="198" y="144" width="34" height="7" rx="3" fill="#ECE8E1"/>
    <rect x="210" y="139" width="10" height="5" rx="2" fill="${metal('hygiene')}"/>
    <path d="M182 196h66a33 30 0 0 1-33 30a33 30 0 0 1-33-30z" fill="#FBFAF8"/><rect x="182" y="192" width="66" height="7" rx="3" fill="#F1EEE8"/>
    <rect x="201" y="224" width="28" height="22" fill="#F3F0EB"/>
  </g>
  <g>
    <rect x="254" y="156" width="10" height="7" rx="2" fill="${metal('hygiene')}"/>
    <rect x="256" y="160" width="7" height="22" rx="3" fill="${metal('hygiene')}"/>
    <path d="M260 182c0 28-12 40-12 64" fill="none" stroke="${metal('hygiene')}" stroke-width="3"/>
    ${scale('hygiene', [[260, 172, 3], [250, 232, 3]])}
  </g>

  <!-- shower zone -->
  <g class="z-shower">
    <rect x="290" y="242" width="108" height="9" rx="2" fill="#F7F5F1" filter="url(#${id}s)"/>
    <rect x="370" y="44" width="7" height="172" rx="3.5" fill="${metal('shower')}"/>
    <rect x="${o.shower === 'square' ? 327 : 326}" y="44" width="51" height="6" rx="3" fill="${metal('shower')}"/>
    <rect x="360" y="150" width="22" height="7" rx="3" fill="${metal('shower')}"/><circle cx="373" cy="180" r="6" fill="${metal('shower')}"/>
    ${showerHead}
    <g class="${on('shower') ? 'flow' : 'weak'}" stroke="#9CCBDF" stroke-width="${o.eco ? 1.6 : 2.2}" stroke-linecap="round" stroke-dasharray="7 11" opacity=".9">
      ${jets.map(x => `<path d="M${x} 68L${x + (x - 327) * 0.28} 238"/>`).join('')}
    </g>
    ${scale('shower', [[318, 60, 4], [334, 61, 3], [373, 120, 3]])}
    <rect x="290" y="48" width="5" height="196" fill="url(#${id}glass)"/>
    <rect x="292" y="48" width="70" height="196" fill="url(#${id}glass)" opacity=".35"/>
    <path d="M300 60l40 150" stroke="#fff" stroke-opacity=".45" stroke-width="3"/>
    ${o.eco && on('shower') ? `<g transform="translate(346 72)"><circle r="9" fill="#3E8E7E"/><path d="M-4 3c0-5 3-8 8-8 0 5-3 8-8 8M-4 3l4-4" stroke="#fff" stroke-width="1.5" fill="none"/></g>` : ''}
  </g>

  ${has('plant') ? `<g filter="url(#${id}s)"><path d="M150 248l3-26h20l3 26z" fill="#C8A98A"/><path d="M163 222c-2-14-12-20-20-22 6 6 9 13 10 22M163 222c1-16 8-25 18-28-5 8-8 17-8 28M163 222c0-12-2-24-2-34 4 10 5 22 5 34" fill="#5E8C66"/></g>` : ''}
  ${has('mat') ? `<rect x="300" y="262" width="80" height="12" rx="4" fill="${o.tile === 'sage' ? '#E9D4CC' : '#BFD3C5'}" opacity=".95"/><path d="M304 268h72" stroke="#fff" stroke-opacity=".4" stroke-dasharray="2 3"/>` : ''}

  <rect width="400" height="300" fill="${L[1]}" opacity="${L[2]}"/>
  <rect width="400" height="300" fill="url(#${id}vig)"/>
</svg>`;
}
