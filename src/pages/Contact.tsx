import { MapPin, Facebook, Instagram, Youtube } from 'lucide-react'
import { org } from '../data/site'
import PageHero from '../components/PageHero'
import ContactForm from '../components/ContactForm'

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Contact us"
        intro="Have a question, want to partner, or know a veteran family who needs help? Send us a message and we’ll get back to you as soon as we can."
        image="/images/flag-waving-poster.webp"
      />

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 reveal-left">
            <ContactForm />
          </div>

          <div className="lg:col-span-5 reveal-right space-y-6">
            <div className="card p-7">
              <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-ink">
                Our Office
              </h3>
              <a
                href={org.mapsDir}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-start gap-3 text-ink-soft hover:text-brand"
              >
                <MapPin size={20} className="mt-0.5 shrink-0 text-brand" />
                <span>
                  {org.address.street}
                  <br />
                  {org.address.city}, {org.address.state} {org.address.zip}
                </span>
              </a>
            </div>

            <div className="card p-7">
              <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-ink">
                Follow Us
              </h3>
              <div className="mt-4 flex gap-3">
                <a
                  href={org.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface-soft text-brand transition-colors hover:bg-brand hover:text-white"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href={org.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface-soft text-brand transition-colors hover:bg-brand hover:text-white"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href={org.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface-soft text-brand transition-colors hover:bg-brand hover:text-white"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            <div className="card overflow-hidden">
              <iframe
                title={`Map to ${org.name}`}
                src={org.mapsEmbed}
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
