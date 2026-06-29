import { org, faqs, golf } from '../data/site'

// Production target domain. Canonicals, sitemap, OG and schema all point here so
// SEO value lands on the live host the moment DNS flips from the old Duda site.
export const SITE_URL = 'https://www.gunsgarin.com'

const OG_IMAGE = '/images/og-cover.jpg'

export const abs = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

// Netlify serves pages with a trailing slash; keep canonical/sitemap URLs aligned.
export const pageUrl = (path: string) =>
  abs(path === '/' ? '/' : path.endsWith('/') ? path : `${path}/`)

function ngoSchema() {
  const a = org.address
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    '@id': `${SITE_URL}/#org`,
    name: org.name,
    alternateName: org.acronym,
    url: SITE_URL,
    logo: abs('/images/logo.png'),
    image: abs(OG_IMAGE),
    description: org.shortBlurb,
    slogan: org.tagline,
    foundingDate: String(org.founded),
    nonprofitStatus: 'Nonprofit501c3',
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.state,
      postalCode: a.zip,
      addressCountry: 'US',
    },
    knowsAbout: [
      'Veteran family relief',
      'Military family support',
      'Aviation education',
      'Veteran mental health',
    ],
    sameAs: [org.social.facebook, org.social.instagram, org.social.youtube],
  }
}

function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: org.name,
    publisher: { '@id': `${SITE_URL}/#org` },
  }
}

function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

function golfEventSchema() {
  return golf.events
    .filter((e) => e.status === 'open')
    .map((e) => ({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: e.name,
      startDate: '2026-07-13',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: { '@type': 'Place', name: e.location, address: { '@type': 'PostalAddress', addressRegion: 'OH', addressCountry: 'US' } },
      organizer: { '@id': `${SITE_URL}/#org` },
      description: 'Annual charity golf tournament benefiting veterans and military families in crisis.',
      url: e.registerUrl || pageUrl('/golf-tournament'),
    }))
}

function ohioEventSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: '2026 Ohio GGMF Golf Tournament',
    startDate: '2026-07-13T08:00:00-04:00',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Turkeyfoot Lake Golf Links',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Akron',
        addressRegion: 'OH',
        addressCountry: 'US',
      },
    },
    organizer: { '@id': `${SITE_URL}/#org` },
    description:
      'The first-ever Ohio GGMF Golf Tournament, hosted by PGA Tour Pro Michael Thompson, benefiting veterans and military families in crisis.',
    offers: [
      { '@type': 'Offer', name: 'Individual Golfer', price: '120', priceCurrency: 'USD', url: org.give.golfOhio },
      { '@type': 'Offer', name: 'Foursome', price: '480', priceCurrency: 'USD', url: org.give.golfOhio },
    ],
    performer: { '@type': 'Person', name: 'Michael Thompson' },
    url: pageUrl('/ohio'),
  }
}

function donateActionSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'DonateAction',
    recipient: { '@id': `${SITE_URL}/#org` },
    target: org.give.donate,
  }
}

function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: pageUrl(it.path),
    })),
  }
}

export type PageMeta = {
  title: string
  description: string
  canonical: string
  ogImage: string
  jsonLd: object[]
}

export function getPageMeta(rawPath: string): PageMeta {
  const path = rawPath !== '/' ? rawPath.replace(/\/$/, '') : '/'
  const ogImage = abs(OG_IMAGE)
  const base = ngoSchema()

  switch (path) {
    case '/':
      return {
        title: 'Guns Garin Memorial Foundation | Serving Veterans & Future Aviators',
        description: org.shortBlurb,
        canonical: pageUrl('/'),
        ogImage,
        jsonLd: [base, websiteSchema(), donateActionSchema()],
      }
    case '/about':
      return {
        title: 'About Major Rick “Guns” Garin | Guns Garin Memorial Foundation',
        description:
          'Founded in 2020 to honor Major Richard “GUNS” Garin, our foundation supports military families in crisis and inspires the next generation of aviators. Meet the man behind the mission.',
        canonical: pageUrl('/about'),
        ogImage,
        jsonLd: [base, breadcrumb([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])],
      }
    case '/impact':
      return {
        title: 'Our Impact | Guns Garin Memorial Foundation',
        description:
          'Since 2020 we’ve supported 350+ veteran families with fast, direct relief and inspired future pilots through free aviation education. See the impact your support makes.',
        canonical: pageUrl('/impact'),
        ogImage,
        jsonLd: [base, breadcrumb([{ name: 'Home', path: '/' }, { name: 'Impact', path: '/impact' }])],
      }
    case '/golf-tournament':
      return {
        title: 'Annual Golf Tournament | Play for a Purpose | Guns Garin Memorial Foundation',
        description:
          'Join the 2026 Guns Garin Memorial Foundation Golf Series. The Ohio tournament tees off July 13, 2026. Multiple tournaments, one mission: supporting veterans in crisis.',
        canonical: pageUrl('/golf-tournament'),
        ogImage,
        jsonLd: [
          base,
          ...golfEventSchema(),
          breadcrumb([{ name: 'Home', path: '/' }, { name: 'Golf Tournament', path: '/golf-tournament' }]),
        ],
      }
    case '/ohio':
      return {
        title: '2026 Ohio GGMF Golf Tournament | Play with PGA Pro Michael Thompson',
        description:
          'Join the first-ever Ohio GGMF Golf Tournament. Monday, July 13, 2026 at Turkeyfoot Lake Golf Links, Akron. Hosted by PGA Tour Pro Michael Thompson. $120/golfer, $480/foursome, sponsorships available. 97¢ of every dollar goes to veterans.',
        canonical: pageUrl('/ohio'),
        ogImage,
        jsonLd: [
          base,
          ohioEventSchema(),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Golf Tournament', path: '/golf-tournament' },
            { name: 'Ohio', path: '/ohio' },
          ]),
        ],
      }
    case '/aviation-events':
      return {
        title: 'Aviation Events & Fly-Ins | Guns Garin Memorial Foundation',
        description:
          'Throughout the year, the Guns Garin Memorial Foundation hosts and supports aviation fly-ins in partnership with the Carolina Aviators Network, bringing pilots, veterans, students, and families together around a shared passion for flight.',
        canonical: pageUrl('/aviation-events'),
        ogImage,
        jsonLd: [
          base,
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Aviation Events', path: '/aviation-events' },
          ]),
        ],
      }
    case '/flight-crew':
      return {
        title: 'Join the Flight Crew | Monthly Giving | Guns Garin Memorial Foundation',
        description:
          'Flight Crew is our monthly donor program. A recurring gift ensures no veteran is left behind, on the battlefield or at home. Become a member today.',
        canonical: pageUrl('/flight-crew'),
        ogImage,
        jsonLd: [
          base,
          donateActionSchema(),
          breadcrumb([{ name: 'Home', path: '/' }, { name: 'Flight Crew', path: '/flight-crew' }]),
        ],
      }
    case '/donate':
      return {
        title: 'Donate | Support Veterans & Future Aviators | Guns Garin Memorial Foundation',
        description:
          'Make a tax-deductible gift to the Guns Garin Memorial Foundation. 100% of donations go to veterans and military families. Give online or by mail.',
        canonical: pageUrl('/donate'),
        ogImage,
        jsonLd: [
          base,
          donateActionSchema(),
          faqSchema(),
          breadcrumb([{ name: 'Home', path: '/' }, { name: 'Donate', path: '/donate' }]),
        ],
      }
    case '/contact':
      return {
        title: 'Contact Us | Guns Garin Memorial Foundation',
        description:
          'Get in touch with the Guns Garin Memorial Foundation. Send us a message, follow us on social, or give by mail to our Columbia, SC office.',
        canonical: pageUrl('/contact'),
        ogImage,
        jsonLd: [
          base,
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            url: pageUrl('/contact'),
            about: { '@id': `${SITE_URL}/#org` },
          },
          breadcrumb([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]),
        ],
      }
    case '/privacy':
      return {
        title: 'Privacy Policy | Guns Garin Memorial Foundation',
        description: 'How the Guns Garin Memorial Foundation collects, uses, and protects your information.',
        canonical: pageUrl('/privacy'),
        ogImage,
        jsonLd: [base],
      }
    case '/terms':
      return {
        title: 'Terms of Use | Guns Garin Memorial Foundation',
        description: 'The terms that govern your use of the Guns Garin Memorial Foundation website.',
        canonical: pageUrl('/terms'),
        ogImage,
        jsonLd: [base],
      }
    case '/accessibility':
      return {
        title: 'Accessibility Statement | Guns Garin Memorial Foundation',
        description: 'Our commitment to making the Guns Garin Memorial Foundation website accessible to everyone.',
        canonical: pageUrl('/accessibility'),
        ogImage,
        jsonLd: [base],
      }
    default:
      return {
        title: 'Page Not Found | Guns Garin Memorial Foundation',
        description:
          'Sorry, we couldn’t find that page. The Guns Garin Memorial Foundation serves veterans and future aviators.',
        canonical: pageUrl(path),
        ogImage,
        jsonLd: [base],
      }
  }
}

export const ALL_ROUTES: string[] = [
  '/',
  '/about',
  '/impact',
  '/golf-tournament',
  '/ohio',
  '/aviation-events',
  '/flight-crew',
  '/donate',
  '/contact',
  '/privacy',
  '/terms',
  '/accessibility',
]
