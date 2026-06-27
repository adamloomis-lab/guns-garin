import { useState } from 'react'
import { Send, HelpCircle, Heart, Users, Plane, MessageCircle } from 'lucide-react'
import { FloatField, IconCardSelect, SuccessCheck, type IconCardOption } from './FluidField'
import { org } from '../data/site'

// Netlify Forms. The form is prerendered into static HTML (SSG), so Netlify's
// build-time bot detects it; this live form submits the same fields via an AJAX
// POST so we can show an inline success state without a full-page redirect.
const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&')

const reasonOptions: readonly IconCardOption[] = [
  { value: 'General question', label: 'General question', Icon: HelpCircle },
  { value: 'Donate / Support', label: 'Donate / Support', Icon: Heart },
  { value: 'Volunteer', label: 'Volunteer', Icon: Users },
  { value: 'Aviation education', label: 'Aviation education', Icon: Plane },
  { value: 'Something else', label: 'Something else', Icon: MessageCircle },
]

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [firstName, setFirstName] = useState('')
  const [reason, setReason] = useState('General question')
  const [fields, setFields] = useState({ name: '', email: '', phone: '', subject: '', message: '' })

  const onField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }))

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form) as unknown as Iterable<[string, string]>)
    if (data['bot-field']) return // honeypot tripped
    // Capture the first name before we reset so the thank-you can stay personal.
    setFirstName((fields.name || '').trim().split(/\s+/)[0] || '')
    setStatus('sending')
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...data }),
      })
      setStatus('sent')
      form.reset()
      setFields({ name: '', email: '', phone: '', subject: '', message: '' })
      setReason('General question')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="card gg-rise p-8 text-center sm:p-10">
        <div className="mx-auto flex justify-center">
          <SuccessCheck />
        </div>
        <h3 className="font-display mt-5 text-3xl font-semibold uppercase tracking-wide text-ink">
          {firstName ? `Thank You, ${firstName}!` : 'Thank You!'}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          Your message reached the Guns Garin Memorial Foundation. We read every note personally and
          will be in touch as soon as we can. Thank you for standing with our veterans.
        </p>
        <a
          href={org.give.donate}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-gold mt-7"
        >
          <Heart size={18} /> Support a Veteran Today
        </a>
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
      <input type="hidden" name="reason" value={reason} />
      <p hidden>
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </p>

      <fieldset className="border-0 p-0">
        <legend className="font-display text-sm font-medium uppercase tracking-wide text-ink">
          How can we help?
        </legend>
        <div className="mt-3">
          <IconCardSelect options={reasonOptions} selected={reason} onSelect={setReason} />
        </div>
      </fieldset>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <FloatField name="name" label="Name" value={fields.name} onChange={onField} required autoComplete="name" />
        <FloatField name="email" label="Email" type="email" value={fields.email} onChange={onField} required autoComplete="email" />
      </div>

      <div className="mt-4">
        <FloatField name="phone" label="Phone (optional)" type="tel" value={fields.phone} onChange={onField} autoComplete="tel" />
      </div>

      <div className="mt-4">
        <FloatField name="subject" label="Subject" value={fields.subject} onChange={onField} />
      </div>

      <div className="mt-4">
        <FloatField name="message" label="Message" value={fields.message} onChange={onField} required textarea rows={5} />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn btn-primary group relative mt-6 w-full overflow-hidden disabled:opacity-70"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/25 blur-md group-hover:[animation:gg-sheen_0.9s_ease]"
        />
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
