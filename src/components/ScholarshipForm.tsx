import { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import { FloatField, SelectField, SuccessCheck } from './FluidField'
import { usStates, scholarshipForm } from '../data/site'

// Netlify Forms, same pattern as the aid application: prerendered into static
// HTML for Netlify's build-time form detection, submitted over AJAX at runtime.
const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&')

const emptyFields = {
  'first-name': '',
  'last-name': '',
  age: '',
  email: '',
  phone: '',
  street: '',
  'address-2': '',
  city: '',
  zip: '',
  'flight-hours': '',
  'preferred-location': '',
  help: '',
  why: '',
  essay: '',
}

// `first` is an explicit prop rather than a :first-child selector: the hidden
// inputs and honeypot sit ahead of this in the form, so the CSS pseudo-class
// would never match the heading we actually want unruled.
function SectionHeading({
  children,
  first,
}: {
  readonly children: React.ReactNode
  readonly first?: boolean
}) {
  return (
    <div className={first ? '' : 'mt-9 border-t border-line pt-7'}>
      <h3 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-brand">
        {children}
      </h3>
    </div>
  )
}

const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length

export default function ScholarshipForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [firstName, setFirstName] = useState('')
  const [fields, setFields] = useState(emptyFields)
  const [state, setState] = useState('')
  const openedAt = useRef(0)

  useEffect(() => {
    openedAt.current = Date.now()
  }, [])

  const onField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }))

  const essayWords = words(fields.essay)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form) as unknown as Iterable<[string, string]>)
    if (data['bot-field']) return // honeypot tripped
    if (Date.now() - openedAt.current < 4000) return // filled too fast to be human
    setFirstName(fields['first-name'].trim())
    setStatus('sending')
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'flight-scholarship', ...data }),
      })
      setStatus('sent')
      form.reset()
      setFields(emptyFields)
      setState('')
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
        <h2 className="font-display mt-5 text-3xl font-semibold uppercase tracking-wide text-ink">
          {firstName ? `Thank You, ${firstName}!` : 'Thank You!'}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          Your scholarship application is in. We read every essay, and we will follow up at the
          email address you gave us. Keep flying.
        </p>
      </div>
    )
  }

  return (
    <form
      name="flight-scholarship"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="card p-6 sm:p-8"
    >
      <input type="hidden" name="form-name" value="flight-scholarship" />
      <p hidden>
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </p>

      <SectionHeading first>About you</SectionHeading>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <FloatField
          name="first-name"
          label="First name"
          value={fields['first-name']}
          onChange={onField}
          required
          autoComplete="given-name"
          idPrefix="sch"
        />
        <FloatField
          name="last-name"
          label="Last name"
          value={fields['last-name']}
          onChange={onField}
          required
          autoComplete="family-name"
          idPrefix="sch"
        />
      </div>
      <div className="mt-4">
        <FloatField
          name="age"
          label="Age"
          type="number"
          min={15}
          max={25}
          inputMode="numeric"
          value={fields.age}
          onChange={onField}
          required
          idPrefix="sch"
          hint={scholarshipForm.ageHint}
        />
      </div>

      <SectionHeading>How we reach you</SectionHeading>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <FloatField
          name="email"
          label="Email"
          type="email"
          value={fields.email}
          onChange={onField}
          required
          autoComplete="email"
          idPrefix="sch"
        />
        <FloatField
          name="phone"
          label="Phone"
          type="tel"
          value={fields.phone}
          onChange={onField}
          required
          autoComplete="tel"
          idPrefix="sch"
        />
      </div>
      <div className="mt-4">
        <FloatField
          name="street"
          label="Street address"
          value={fields.street}
          onChange={onField}
          required
          autoComplete="address-line1"
          idPrefix="sch"
        />
      </div>
      <div className="mt-4">
        <FloatField
          name="address-2"
          label="Address line 2 (optional)"
          value={fields['address-2']}
          onChange={onField}
          autoComplete="address-line2"
          idPrefix="sch"
        />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <FloatField
          name="city"
          label="City"
          value={fields.city}
          onChange={onField}
          required
          autoComplete="address-level2"
          idPrefix="sch"
        />
        <SelectField
          name="state"
          label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          options={usStates}
          required
          autoComplete="address-level1"
          idPrefix="sch"
        />
        <FloatField
          name="zip"
          label="ZIP code"
          value={fields.zip}
          onChange={onField}
          required
          autoComplete="postal-code"
          idPrefix="sch"
        />
      </div>

      <SectionHeading>Your flying</SectionHeading>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <FloatField
          name="flight-hours"
          label="Current flight hours"
          value={fields['flight-hours']}
          onChange={onField}
          required
          idPrefix="sch"
          hint="Enter 0 if you have not started lessons yet."
        />
        <FloatField
          name="preferred-location"
          label="Preferred flight school location (optional)"
          value={fields['preferred-location']}
          onChange={onField}
          idPrefix="sch"
        />
      </div>

      <SectionHeading>Tell us your story</SectionHeading>
      <div className="mt-4">
        <FloatField
          name="help"
          label={scholarshipForm.prompts.help}
          value={fields.help}
          onChange={onField}
          required
          textarea
          rows={5}
          idPrefix="sch"
        />
      </div>
      <div className="mt-4">
        <FloatField
          name="why"
          label={scholarshipForm.prompts.why}
          value={fields.why}
          onChange={onField}
          required
          textarea
          rows={5}
          idPrefix="sch"
        />
      </div>
      <div className="mt-4">
        <FloatField
          name="essay"
          label={scholarshipForm.prompts.essay}
          value={fields.essay}
          onChange={onField}
          required
          textarea
          rows={12}
          idPrefix="sch"
        />
        <p
          className={`mt-1.5 px-1 text-[13px] ${essayWords >= 300 ? 'text-brand' : 'text-muted'}`}
          aria-live="polite"
        >
          {essayWords} {essayWords === 1 ? 'word' : 'words'}
          {essayWords < 300 && ` · ${300 - essayWords} to go`}
        </p>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn btn-primary group relative mt-7 w-full overflow-hidden disabled:opacity-70"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/25 blur-md group-hover:[animation:gg-sheen_0.9s_ease]"
        />
        <Send size={17} /> {status === 'sending' ? 'Sending…' : 'Submit Application'}
      </button>
      {status === 'error' && (
        <p className="mt-3 text-center text-sm text-[var(--color-honor)]">
          Something went wrong sending your application. Please try again, or reach us through the{' '}
          <a href="/contact" className="underline">
            contact page
          </a>
          .
        </p>
      )}
      <p className="mt-4 text-center text-[13px] text-muted">
        Everything you share here stays with the foundation. Read our{' '}
        <a href="/privacy" className="underline hover:text-brand">
          privacy policy
        </a>
        .
      </p>
    </form>
  )
}
