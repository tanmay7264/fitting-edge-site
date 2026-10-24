// All site content. Edit here, reload. Services come from the Fitting Edge strategy doc ("IIM C - Plastic").
export const SITE = {
  brand: 'Fitting Edge',
  tagline: 'See the Difference. Live the Upgrade.',
  promise: 'Your bathroom, beautifully sorted.',
  // TODO: replace these placeholders with the real business details before launch
  contact: {
    phone: '+91 00000 00000',
    whatsapp: '910000000000',           // digits only, used for wa.me links
    email: 'hello@fittingedge.example',
    hours: 'Mon–Sat, 9am–7pm',
    serving: 'Pilot cities announced soon. Ask us if we cover your area.',
  },
  // Where booking and contact forms are sent. Leave empty to fall back to a pre-filled email.
  // Works with any form backend that accepts a JSON POST (e.g. Formspree, Getform, your own API).
  formEndpoint: '',
  world3d: 'https://tanmay7264.github.io/fitting-edge-world/',
};

export const CATEGORIES = [
  { id: 'replace', name: 'Replace one fitting', blurb: 'Pick One: swap a single tap, shower or faucet.', faq: [['Will it fit my existing plumbing?', 'We check compatibility before you buy: connection sizes, wall or counter mounting and water pressure.'], ['Can I buy just the product?', 'Yes. Installation is itemised separately and optional.']] },
  { id: 'zone', name: 'Upgrade a zone', blurb: 'A coordinated sink, shower or hygiene package.', faq: [['How long does a zone upgrade take?', 'Most zone upgrades are planned as a single installation visit. Your quote says if more is needed.'], ['Will it match my other fittings?', 'Every piece in a zone comes in one coordinated finish, and you can add other zones later in the same finish.']] },
  { id: 'complete', name: 'Complete the look', blurb: 'Several zones, one coordinated finish, installed.', faq: [['Do I need to break tiles?', 'Fittings are chosen to work with your existing points wherever possible. If civil work is needed, the quote lists it separately.'], ['Can I see finishes before deciding?', 'Yes. A consultation brings finish samples to your home, and the Design Studio lets you preview combinations.']] },
  { id: 'care', name: 'Care & repair', blurb: 'Repair before replacement, spare parts, water-smart.', faq: [['Do you repair other brands?', "Tell us what you have. We'll say upfront whether a repair is technically feasible."], ['How do I know water use has dropped?', 'Water-Smart installs include a before-and-after flow check.']] },
  { id: 'business', name: 'For business', blurb: 'Builders, hotels, rental operators, institutions.', faq: [['Do you offer samples for specification?', 'Yes, finish samples and product support are available for projects.'], ['Can you maintain fittings after handover?', 'Maintenance contracts and replacement parts are available for qualified projects.']] },
  { id: 'partner', name: 'Partner with us', blurb: 'Plumbers, dealers, designers and contractors.', faq: [['What does it cost to join?', "Tell us about your business and we'll share the programme terms."], ['How are QR rewards paid?', 'Verified scans earn rewards through an approved payment method. Terms are shared when you join.']] },
];

export const FINISHES = [
  { id: 'black', name: 'Matte black', hex: '#1E1F22' },
  { id: 'gold', name: 'Brushed gold', hex: '#C8A15A' },
  { id: 'graphite', name: 'Graphite', hex: '#5C6470' },
];

// kind: 'book' = home visit / installation booking, 'enquire' = business or partner enquiry
export const SERVICES = [
  {
    id: 'tap-replacement', zones: ['sink'], custom: ['finish', 'tap'], cat: 'replace', kind: 'book', icon: 'tap', name: 'Tap & mixer replacement',
    tagline: 'Swap a worn tap or mixer for an engineered, design-led one.',
    desc: 'Choose a basin tap or mixer from the Everyday Essentials or Design Edge range. We check compatibility with your existing plumbing, quote the product and installation separately, and install it.',
    includes: ['Compatibility check before you buy', 'Itemised price: product, installation, exclusions', 'Installation by a trained Fitting Edge installer', 'Warranty registration'],
    bestFor: 'A single fitting that leaks, scales up or no longer matches.',
    materials: 'PTMT body or hybrid metal-core, depending on the product',
  },
  {
    id: 'shower-replacement', zones: ['shower'], custom: ['finish', 'shower', 'eco'], cat: 'replace', kind: 'book', icon: 'shower', name: 'Shower & health faucet replacement',
    tagline: 'A new hand shower, overhead shower or health faucet.',
    desc: 'Replace one shower or health faucet with a coordinated finish. Ideal when only one fitting needs attention.',
    includes: ['Hand, overhead or health faucet options', 'Matching hoses and holders where needed', 'Installation and leak check'],
    bestFor: 'Clogged nozzles, low flow or a dated look.',
    materials: 'ABS and other qualified polymer components',
  },
  {
    id: 'sink-zone', zones: ['sink'], custom: ['finish', 'tap', 'mirror', 'acc'], cat: 'zone', kind: 'book', icon: 'sink', name: 'Sink zone upgrade',
    tagline: 'Basin tap, mixer and matching accessories in one finish.',
    desc: 'Upgrade only the sink area: a coordinated tap or mixer with matching accessories, chosen from a curated look and installed in one visit.',
    includes: ['Curated looks to choose from', 'Coordinated finish across every piece', 'Compatibility check and itemised quote', 'Installation and optional service plan'],
    bestFor: 'A quick, visible refresh without renovating the whole bathroom.',
    materials: 'PTMT bodies, POM cartridges, premium finishes',
  },
  {
    id: 'shower-zone', zones: ['shower'], custom: ['finish', 'shower', 'eco', 'acc'], cat: 'zone', kind: 'book', icon: 'shower', name: 'Shower zone upgrade',
    tagline: 'Hand shower, overhead shower and accessories, coordinated.',
    desc: 'Build a shower zone that looks designed: overhead and hand shower, holders and accessories in one finish, with water-flow options.',
    includes: ['Overhead + hand shower set', 'Water-smart flow options', 'Matching accessories', 'Installation and leak check'],
    bestFor: 'The everyday shower you want to feel new again.',
    materials: 'ABS showers, tested for hot-water use',
  },
  {
    id: 'hygiene-zone', zones: ['hygiene'], custom: ['finish', 'acc'], cat: 'zone', kind: 'book', icon: 'hygiene', name: 'Toilet & hygiene zone upgrade',
    tagline: 'Health faucet, hose and allied fittings. No toilet replacement needed.',
    desc: 'Refresh the hygiene zone without replacing the toilet: health faucet, hose and selected allied fittings in your chosen finish.',
    includes: ['Health faucet and hose set', 'Selected allied fittings', 'Installation and leak check'],
    bestFor: 'A cleaner, matching look around the WC.',
    materials: 'ABS components with reinforced interfaces where needed',
  },
  {
    id: 'complete-bath', zones: ['sink', 'shower', 'hygiene'], custom: ['finish', 'tap', 'shower', 'eco', 'acc', 'room'], cat: 'complete', kind: 'book', icon: 'bath', name: 'Complete Bath Edit',
    tagline: 'Sink, shower and hygiene zones in one coordinated look.',
    desc: 'Choose a look, and we coordinate products across several bathroom zones, with an in-home consultation, a single itemised quote and installation.',
    includes: ['In-home design consultation', 'Fittings coordinated across zones', 'One itemised quote with installation', 'Optional service plan'],
    bestFor: 'A new home, a rental refresh or a full makeover.',
    materials: 'Mixed polymer and hybrid range, one finish throughout',
  },
  {
    id: 'water-smart', zones: ['sink', 'shower', 'hygiene'], custom: ['finish', 'eco'], cat: 'care', kind: 'book', icon: 'drop', name: 'Water-Smart Bathroom bundle',
    tagline: 'Flow-regulating fittings that use less water.',
    desc: 'Swap in flow-regulating taps and showers selected for verified water-flow performance. Small Change. Better Bathroom.',
    includes: ['Flow-regulating taps and showers', 'Before/after flow check', 'Installation'],
    bestFor: 'Households and buildings that want to cut water use.',
    materials: 'Products chosen for verified flow performance',
  },
  {
    id: 'repair', zones: [], custom: [], cat: 'care', kind: 'book', icon: 'wrench', name: 'Repair & spare parts',
    tagline: 'Repair before replacement, wherever it is technically possible.',
    desc: 'A trained technician diagnoses leaks, low flow or worn cartridges and fixes them with genuine spare parts, so your fittings last longer.',
    includes: ['Diagnosis visit', 'Genuine replacement parts', 'Transparent repair estimate before work starts'],
    bestFor: 'Leaks, drips, stiff handles and worn cartridges.',
    materials: 'Replaceable cartridges and components',
  },
  {
    id: 'consultation', zones: ['sink', 'shower', 'hygiene'], custom: ['finish', 'tap', 'shower', 'eco', 'acc', 'room'], cat: 'complete', kind: 'book', icon: 'chat', name: 'Design consultation',
    tagline: 'See samples, check compatibility and get a quote at home.',
    desc: 'A trained advisor visits with finish samples, checks what will fit your bathroom and gives you an itemised quotation. No obligation to buy.',
    includes: ['Finish samples: matte black, brushed gold, graphite', 'Compatibility check', 'Itemised quotation'],
    bestFor: 'Anyone unsure what to choose.',
    materials: 'All ranges',
  },
  {
    id: 'project-pro', cat: 'business', kind: 'enquire', icon: 'building', name: 'Project Pro for builders',
    tagline: 'Standardised fitting packages and specification support.',
    desc: 'Standardised SKUs, bulk packs and specification support for housing projects, with replacement parts and maintenance options.',
    includes: ['Standardised fitting packages', 'Specification support', 'Bulk supply and replacement parts'],
    bestFor: 'Developers and contractors.',
    materials: 'Project Pro range',
  },
  {
    id: 'hospitality', cat: 'business', kind: 'enquire', icon: 'hotel', name: 'Hotels & serviced apartments',
    tagline: 'Bulk fittings, replacement parts and maintenance contracts.',
    desc: 'Repeat procurement, spare-part availability and planned maintenance for hotels, serviced apartments, PGs and hostels.',
    includes: ['Bulk fittings', 'Replacement parts', 'Maintenance contracts'],
    bestFor: 'Hotels, serviced apartments, PGs and hostels.',
    materials: 'High-usage fittings',
  },
  {
    id: 'rental-refresh', cat: 'business', kind: 'enquire', icon: 'key', name: 'Rental refresh packages',
    tagline: 'Modular bathroom refreshes between tenants.',
    desc: 'Modular sink, shower and hygiene refreshes for property managers and rental operators, repeatable across properties.',
    includes: ['Modular refresh bundles', 'Repeatable across properties', 'Installation scheduling'],
    bestFor: 'Property managers and rental-property owners.',
    materials: 'Everyday Essentials and Design Edge',
  },
  {
    id: 'institutions', cat: 'business', kind: 'enquire', icon: 'school', name: 'Schools, offices, malls & cinemas',
    tagline: 'High-usage fittings with planned maintenance.',
    desc: 'Suitable high-usage fittings and planned maintenance for institutions, offered once durability and service coverage are validated for your site.',
    includes: ['Site assessment', 'High-usage fittings', 'Planned maintenance'],
    bestFor: 'Premium schools, offices, malls and cinemas.',
    materials: 'Project Pro range',
  },
  {
    id: 'plumber-programme', cat: 'partner', kind: 'enquire', icon: 'qr', name: 'Plumber partner programme',
    tagline: 'Training, an installation toolkit and verified QR rewards.',
    desc: 'Get certified on product compatibility, installation and warranty procedures. Scan the tamper-resistant QR code on eligible packs to earn transparent rewards.',
    includes: ['Installer certification', 'Installation toolkit', 'QR-based rewards on eligible packs'],
    bestFor: 'Plumbers and installers.',
    materials: 'Whole range',
  },
  {
    id: 'dealer-programme', cat: 'partner', kind: 'enquire', icon: 'store', name: 'Dealer & designer trade programme',
    tagline: 'Display support, finish samples and trade terms.',
    desc: 'Sanitaryware dealers get compact display kits and trade terms that reward sell-through. Interior designers and contractors get finish samples and product support.',
    includes: ['Compact display kit', 'Finish samples', 'Trade terms and product support'],
    bestFor: 'Dealers, interior designers and contractors.',
    materials: 'Whole range',
  },
];

export const FAQ = [
  ['Is it plastic?', 'Our fittings use engineered polymers (PTMT, ABS, POM) where they offer a functional advantage, with metal-reinforced interfaces where mechanical loads need them, and premium finishes. Product-specific test results are shared on request.'],
  ['Do I have to redo my whole bathroom?', 'No. Pick one fitting, upgrade one zone, or complete the look. You only change what you want to change.'],
  ['What does the price include?', 'Every quote is itemised: product, installation, exclusions and any optional service plan, so there are no surprises.'],
  ['What about warranty?', 'Each product comes with clear written warranty terms, and spare parts are available for repairs.'],
  ['Do you cover my city?', 'We are starting in selected cities. Send us your pincode and we will tell you.'],
];
