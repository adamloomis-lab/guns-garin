// Single source of truth for foundation facts, used across pages, footer, and
// JSON-LD schema. Pulled from the live Guns Garin Memorial Foundation (Duda) site.
// Scholarship / grant programs intentionally omitted — the foundation is not
// offering those right now. The "future aviators" mission is kept via the free
// E3 Aviation educational-content partnership only.

export const org = {
  name: 'Guns Garin Memorial Foundation',
  shortName: 'Guns Garin Memorial Foundation',
  acronym: 'GGMF',
  tagline: 'Serving Veterans & Future Aviators',
  ein: '', // TODO: confirm 501(c)(3) EIN with the foundation
  shortBlurb:
    'The Guns Garin Memorial Foundation honors the legacy of Major Richard “GUNS” Garin by standing with military families in their hardest moments and inspiring the next generation of aviators.',
  founded: 2020,
  email: '', // none published on the live site — TODO: confirm with the foundation
  emailHref: '',
  address: {
    street: '4611 Hard Scrabble Rd, Ste 109 #108',
    city: 'Columbia',
    state: 'SC',
    zip: '29229',
  },
  addressOneLine: '4611 Hard Scrabble Rd, Ste 109 #108, Columbia, SC 29229',
  mapsDir:
    'https://www.google.com/maps/dir/?api=1&destination=4611+Hard+Scrabble+Rd+Ste+109%2C+Columbia%2C+SC+29229',
  mapsEmbed:
    'https://www.google.com/maps?q=4611+Hard+Scrabble+Rd+Ste+109,+Columbia,+SC+29229&output=embed',
  social: {
    facebook: 'https://www.facebook.com/GUNSGARIN',
    instagram: 'https://www.instagram.com/gunsgarin/',
    youtube: 'https://www.youtube.com/channel/UCxQ8cFoHxaQOdyJugOwK5FA',
  },
  give: {
    // External GiveButter pages (kept as-is so nothing breaks at cutover).
    donate: 'https://givebutter.com/yNyXSq',
    flightCrew: 'https://givebutter.com/yNyXSq',
    golfOhio: 'https://givebutter.com/ggmf-ohio-golf-tournament-july-13-2026-nix7as',
  },
} as const

// Numeric targets so the homepage/impact counters can animate up. prefix/suffix
// reproduce the original display strings (100%, < 24 hrs, 350+, $87K).
export const stats = [
  { prefix: '', target: 100, suffix: '%', label: 'of donations go to veterans' },
  { prefix: '< ', target: 24, suffix: ' hrs', label: 'average aid response time' },
  { prefix: '', target: 350, suffix: '+', label: 'veteran families aided since 2020' },
  { prefix: '$', target: 87, suffix: 'K', label: 'donated to veterans in 2023' },
] as const

export const programs = [
  {
    id: 'veteran-relief',
    title: 'Veteran Family Relief',
    summary:
      'Fast, direct financial relief for military families facing crisis — rent, utilities, food, travel, and emergencies that can’t wait.',
    body: 'When a military family hits a wall, hours matter. Our relief program responds in under 24 hours on average, putting real help directly where it’s needed. Since 2020 we’ve stood with more than 350 veteran families, and 100% of donations go straight to the veterans we serve.',
    points: [
      'Emergency monetary relief, typically within 24 hours',
      '350+ families supported since 2020',
      '100% of donations directed to veterans',
    ],
  },
  {
    id: 'future-aviators',
    title: 'Inspiring Future Aviators',
    summary:
      'Free, premium aviation education for the next generation of pilots through our partnership with E3 Aviation.',
    body: 'Major Garin loved the sky, and we keep that love alive by opening the cockpit to young people who dream of flying. Our partnership with E3 Aviation provides premium aviation educational content — completely free — to young men and women pursuing a career in aviation.',
    points: [
      'Premium aviation curriculum, free of charge',
      'Powered by our E3 Aviation partnership',
      'Open to aspiring pilots nationwide',
    ],
  },
  {
    id: 'mental-health',
    title: 'Mental Health Support',
    summary:
      'Connecting veterans and their families with care for PTSD, depression, anxiety, and the invisible wounds of service.',
    body: 'No veteran should fight alone — on the battlefield or at home. Our mental health initiative helps connect service members and their families to in-person and group therapy support for PTSD, depression, anxiety, and related challenges.',
    points: [
      'Support for PTSD, depression & anxiety',
      'In-person and group therapy connections',
      'Care for veterans and their families',
    ],
  },
] as const

// Themed impact statements — NOT attributed quotes. The live site used recipient
// testimonials whose verbatim text we don't have; real quotes can be dropped in here.
export const impactAreas = [
  {
    title: 'A roof overhead',
    body: 'Emergency rent and housing assistance that keeps military families in their homes through the hardest stretches.',
  },
  {
    title: 'Food on the table',
    body: 'Direct help with groceries and daily essentials when a paycheck falls short and pride says nothing.',
  },
  {
    title: 'The road home',
    body: 'Travel and relocation support that reunites service members with the families who need them most.',
  },
  {
    title: 'A path to the sky',
    body: 'Free aviation education that turns a young person’s dream of flight into a real and reachable goal.',
  },
  {
    title: 'Hope after service',
    body: 'Connections to mental-health care so the wounds you can’t see get the attention they deserve.',
  },
  {
    title: 'A community that shows up',
    body: 'Donors, partners, and volunteers who answer the call — fast — when a veteran family needs them.',
  },
] as const

// Real sponsor logos pulled from the live site (Academy of Aviation omitted —
// that was the scholarship partner). Rendered on light cards in the Partners strip.
export const partners = [
  { name: 'Chick-fil-A', logo: '/images/sponsors/chick-fil-a.png' },
  { name: 'Ping', logo: '/images/sponsors/ping.svg' },
  { name: "Tito's Handmade Vodka", logo: '/images/sponsors/titos.webp' },
  { name: 'Lockheed Martin', logo: '/images/sponsors/lockheed-martin.svg' },
  { name: 'PGA Tour', logo: '/images/sponsors/pga-tour.svg' },
  { name: 'Coca-Cola', logo: '/images/sponsors/coca-cola.jpg' },
  { name: 'E3 Aviation', logo: '/images/sponsors/e3-aviation.webp' },
  { name: 'Carolina Aviators Network', logo: '/images/sponsors/carolina-aviators.jpg' },
  { name: 'Elevation Church', logo: '/images/sponsors/elevation-church.png' },
  { name: 'Blackbridge Financial', logo: '/images/sponsors/blackbridge-financial.jpg' },
  { name: "Lizard's Thicket", logo: '/images/sponsors/lizards-thicket.jpg' },
  { name: 'Silver Foxes', logo: '/images/sponsors/silver-foxes.jpg' },
  { name: 'Adam Loomis Marketing', logo: '/images/sponsors/adam-loomis-marketing.webp' },
] as const

export const golf = {
  seriesYear: 2026,
  intro:
    'Multiple tournaments. One mission. Supporting veterans and military families in crisis.',
  host: 'Hosted by PGA Tour player Michael Thompson',
  events: [
    {
      name: '2026 Ohio GGMF Golf Tournament',
      date: 'July 13, 2026',
      location: 'Turkeyfoot Lake Golf Links, Akron, OH',
      status: 'open' as const,
      detailsPath: '/ohio',
      registerUrl: 'https://givebutter.com/ggmf-ohio-golf-tournament-july-13-2026-nix7as',
    },
    {
      name: '2026 Las Vegas Tournament',
      date: 'Dates coming soon',
      location: 'Las Vegas, NV',
      status: 'soon' as const,
      registerUrl: '',
    },
  ],
} as const

export const faqs = [
  {
    q: 'Where do my donations go?',
    a: '100% of donations are directed to the veterans and military families we serve. The Guns Garin Memorial Foundation is a registered 501(c)(3) tax-exempt organization.',
  },
  {
    q: 'How fast does help reach a family in crisis?',
    a: 'Our veteran family relief program responds in under 24 hours on average. When a family hits a wall, we move quickly to put real help where it’s needed.',
  },
  {
    q: 'What is the Flight Crew?',
    a: 'Flight Crew is our monthly donor program. A recurring gift empowers you to help those who protect us all — ensuring no veteran is left behind on the battlefield or at home.',
  },
  {
    q: 'How does the foundation support future pilots?',
    a: 'Through our partnership with E3 Aviation, we provide premium aviation educational content free of charge to young men and women pursuing a career in aviation.',
  },
  {
    q: 'Can I give by mail?',
    a: 'Yes. You can mail a gift to Guns Garin Memorial Foundation, 4611 Hard Scrabble Rd, Ste 109 #108, Columbia, SC 29229.',
  },
] as const
