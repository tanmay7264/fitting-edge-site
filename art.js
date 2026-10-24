// A flat bathroom illustration. Zones in `zones` show new fittings in `finish`; the rest show old, scaled-up fittings.
const OLD = '#A7ACB2';
let n = 0;
export function bath({ finish = '#C8A15A', zones = ['sink', 'shower', 'hygiene'], label = 'Bathroom illustration' } = {}) {
  const id = 'bt' + n++, on = z => zones.includes(z), c = z => (on(z) ? finish : OLD);
  const scale = (z, pts) => (on(z) ? '' : pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#E3D7BC"/>`).join(''));
  return `<svg class="bath" viewBox="0 0 400 300" role="img" aria-label="${label}">
  <defs><pattern id="${id}" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="#0000000f"/></pattern></defs>
  <rect width="400" height="300" fill="#EFE9DE"/><rect width="400" height="250" fill="url(#${id})"/>
  <rect y="250" width="400" height="50" fill="#D9D1C3"/><rect y="250" width="400" height="3" fill="#CFC6B6"/>
  <g class="z-sink">
    <circle cx="95" cy="82" r="36" fill="#CFE6F0" stroke="${c('sink')}" stroke-width="6"/>
    <path d="M78 66a24 24 0 0 1 20-8" stroke="#fff" stroke-width="4" fill="none" opacity=".7"/>
    <rect x="55" y="172" width="80" height="78" rx="4" fill="${on('sink') ? '#2B2D31' : '#BDB4A5'}"/>
    <rect x="93" y="200" width="4" height="22" rx="2" fill="${c('sink')}"/>
    <rect x="46" y="160" width="98" height="16" rx="8" fill="#fff"/>
    <rect x="91" y="132" width="8" height="30" rx="3" fill="${c('sink')}"/><rect x="91" y="132" width="25" height="7" rx="3" fill="${c('sink')}"/>
    ${on('sink') ? '' : '<circle class="drip" cx="114" cy="146" r="2.5" fill="#8FC3D8"/>'}
    ${scale('sink', [[95, 152, 4], [106, 136, 3], [72, 168, 3]])}
  </g>
  <g class="z-hygiene">
    <rect x="190" y="150" width="50" height="42" rx="5" fill="#fff"/><rect x="198" y="146" width="34" height="6" rx="3" fill="#E6E1D8"/>
    <path d="M182 196h66a33 30 0 0 1-33 30a33 30 0 0 1-33-30z" fill="#fff"/><rect x="201" y="224" width="28" height="26" fill="#fff"/>
    <rect x="256" y="158" width="8" height="22" rx="3" fill="${c('hygiene')}"/>
    <path d="M260 180c0 28-12 40-12 70" fill="none" stroke="${c('hygiene')}" stroke-width="3"/>
    ${scale('hygiene', [[260, 170, 3], [250, 232, 3]])}
  </g>
  <g class="z-shower">
    <rect x="290" y="244" width="104" height="8" rx="2" fill="#fff"/>
    <rect x="290" y="56" width="4" height="190" fill="#BFE0EE" opacity=".8"/>
    <rect x="370" y="46" width="6" height="170" rx="3" fill="${c('shower')}"/><rect x="326" y="46" width="50" height="6" rx="3" fill="${c('shower')}"/>
    <rect x="360" y="150" width="20" height="6" rx="3" fill="${c('shower')}"/>
    <ellipse cx="327" cy="60" rx="21" ry="7" fill="${c('shower')}"/>
    <g class="${on('shower') ? 'flow' : 'weak'}" stroke="#8FC3D8" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="7 11">
      ${(on('shower') ? [312, 318, 324, 330, 336, 342] : [322, 333]).map(x => `<path d="M${x} 70L${x + (x - 327) * 0.25} 240"/>`).join('')}
    </g>
    ${scale('shower', [[318, 61, 4], [334, 62, 3], [373, 120, 3]])}
  </g>
</svg>`;
}
