import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'

// Netlify Forms. A matching hidden static <form name="contact"> lives in
// index.html so Netlify's build-time bot detects it; this live form submits the
// same fields via an AJAX POST so we can show an inline success state without a
// full-page redirect.
const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&')

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form) as unknown as Iterable<[string, string]>)
    if (data['bot-field']) return // honeypot tripped
    setStatus('sending')
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...data }),
      })
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="card p-8 text-center">
        <CheckCircle2 className="mx-auto text-[var(--color-success)]" size={44} />
        <h3 className="font-display mt-4 text-2xl font-semibold uppercase tracking-wide text-ink">
          Message received
        </h3>
        <p className="mt-2 text-ink-soft">
          Thank you for reaching out. We’ll get back to you as soon as we can.
        </p>
      </div>
    )
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="card p-6 sm:p-8"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="font-display text-sm font-medium uppercase tracking-wide text-ink">Name</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            className="mt-1.5 w-full rounded-md border border-line bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="font-display text-sm font-medium uppercase tracking-wide text-ink">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="mt-1.5 w-full rounded-md border border-line bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-brand"
          />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="font-display text-sm font-medium uppercase tracking-wide text-ink">
          Phone <span className="text-muted normal-case">(optional)</span>
        </span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          className="mt-1.5 w-full rounded-md border border-line bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-brand"
        />
      </label>

      <label className="mt-5 block">
        <span className="font-display text-sm font-medium uppercase tracking-wide text-ink">Subject</span>
        <input
          type="text"
          name="subject"
          className="mt-1.5 w-full rounded-md border border-line bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-brand"
        />
      </label>

      <label className="mt-5 block">
        <span className="font-display text-sm font-medium uppercase tracking-wide text-ink">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-1.5 w-full rounded-md border border-line bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-brand"
        />
      </label>

      <button type="submit" disabled={status === 'sending'} className="btn btn-primary mt-6 w-full disabled:opacity-70">
        <Send size={17} /> {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
      {status === 'error' && (
        <p className="mt-3 text-center text-sm text-[var(--color-honor)]">
          Something went wrong. Please try again or reach us on social media.
        </p>
      )}
    </form>
  )
}
