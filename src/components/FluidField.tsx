import type { ChangeEvent, ComponentType } from 'react'

// Shared "fluid" form controls for the Guns Garin Memorial Foundation, tuned to
// the navy + brass brand: floating-label fields (brass underline + focus glow),
// single-select icon cards, and the drawn thank-you checkmark.

interface FloatFieldProps {
  name: string
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string
  required?: boolean
  textarea?: boolean
  rows?: number
  autoComplete?: string
  idPrefix?: string
}

export function FloatField({
  name,
  label,
  value,
  onChange,
  type = 'text',
  required,
  textarea,
  rows = 5,
  autoComplete,
  idPrefix = 'gg',
}: FloatFieldProps) {
  const id = `${idPrefix}-${name}`
  const input =
    'peer w-full bg-transparent px-4 pt-6 pb-2 font-body text-base text-ink placeholder-transparent outline-none'
  const labelCls =
    'pointer-events-none absolute left-4 top-4 origin-left font-body text-base text-muted transition-all duration-200 ' +
    'peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-brand ' +
    'peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.16em] peer-[:not(:placeholder-shown)]:text-ink-soft'
  return (
    <div className="group relative rounded-md border border-line bg-white transition-all duration-300 focus-within:border-[var(--color-gold)] focus-within:shadow-[0_12px_30px_-16px_rgba(192,144,47,0.55)]">
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          required={required}
          placeholder=" "
          value={value}
          onChange={onChange}
          className={`${input} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          required={required}
          autoComplete={autoComplete}
          placeholder=" "
          value={value}
          onChange={onChange}
          className={input}
        />
      )}
      <label htmlFor={id} className={labelCls}>
        {label}
        {required && <span className="ml-1 text-[var(--color-gold)]">*</span>}
      </label>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-0.5 w-[calc(100%-2rem)] -translate-x-1/2 scale-x-0 bg-[var(--color-gold)] transition-transform duration-300 peer-focus:scale-x-100"
      />
    </div>
  )
}

export interface IconCardOption {
  value: string
  label: string
  Icon: ComponentType<{ size?: number; className?: string }>
}

interface IconCardSelectProps {
  options: readonly IconCardOption[]
  selected: string
  onSelect: (value: string) => void
}

// Single-select icon cards. The selected value is surfaced to the form via the
// hidden input rendered by the caller, so Netlify receives the same field value.
export function IconCardSelect({ options, selected, onSelect }: IconCardSelectProps) {
  return (
    <div role="radiogroup" aria-label="Reason for reaching out" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {options.map(({ value, label, Icon }) => {
        const active = selected === value
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onSelect(value)}
            className={`group flex flex-col items-center gap-2 rounded-lg border px-3 py-4 text-center transition-all duration-200 ${
              active
                ? 'border-[var(--color-gold)] bg-[var(--color-gold)] text-[#1a1303] shadow-[0_12px_26px_-12px_rgba(192,144,47,0.65)]'
                : 'border-line bg-white text-ink-soft hover:border-[var(--color-gold-soft)] hover:text-brand'
            }`}
          >
            <Icon
              size={22}
              className={active ? 'text-[#1a1303]' : 'text-brand transition-colors group-hover:text-brand'}
            />
            <span className="font-display text-[11px] font-semibold uppercase leading-tight tracking-wide">
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

// Animated drawn checkmark for the personalized thank-you state (brass stroke).
export function SuccessCheck() {
  return (
    <svg viewBox="0 0 52 52" className="h-16 w-16" aria-hidden="true">
      <circle
        cx="26"
        cy="26"
        r="24"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="3"
        strokeDasharray="151"
        strokeDashoffset="151"
        style={{ animation: 'gg-draw-check 0.6s ease forwards' }}
      />
      <path
        d="M15 27 l7 7 l15 -16"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="40"
        strokeDashoffset="40"
        style={{ animation: 'gg-draw-check 0.4s 0.5s ease forwards' }}
      />
    </svg>
  )
}
