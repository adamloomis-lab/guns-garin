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
  min?: number
  max?: number
  inputMode?: 'text' | 'numeric' | 'decimal' | 'tel' | 'email'
  hint?: string
  question?: string
}

// A `question` turns off the floating label and puts the full question on its
// own line above the control. Long questions cannot ride inside the box: at
// 10px uppercase they run past the field on a phone and push the page sideways.
function QuestionLabel({
  htmlFor,
  children,
  required,
}: {
  readonly htmlFor: string
  readonly children: React.ReactNode
  readonly required?: boolean
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block font-body text-[15px] leading-snug text-ink">
      {children}
      {required && <span className="ml-1 text-[var(--color-gold)]">*</span>}
    </label>
  )
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
  min,
  max,
  inputMode,
  hint,
  question,
}: FloatFieldProps) {
  const id = `${idPrefix}-${name}`
  const input =
    'peer w-full bg-transparent px-4 pt-6 pb-2 font-body text-base text-ink placeholder-transparent outline-none'
  const labelCls =
    'pointer-events-none absolute left-4 top-4 origin-left font-body text-base text-muted transition-all duration-200 ' +
    'peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-brand ' +
    'peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.16em] peer-[:not(:placeholder-shown)]:text-ink-soft'
  // With a question above, the control drops the reserved top gutter the
  // floating label needs and shows the label text as a placeholder instead.
  const boxed = question
    ? 'peer w-full bg-transparent px-4 py-3.5 font-body text-base text-ink outline-none'
    : input
  return (
    <div>
      {question && (
        <QuestionLabel htmlFor={id} required={required}>
          {question}
        </QuestionLabel>
      )}
      <div className="group relative rounded-md border border-line bg-white transition-all duration-300 focus-within:border-[var(--color-gold)] focus-within:shadow-[0_12px_30px_-16px_rgba(192,144,47,0.55)]">
        {textarea ? (
          <textarea
            id={id}
            name={name}
            rows={rows}
            required={required}
            placeholder={question ? label : ' '}
            value={value}
            onChange={onChange}
            aria-describedby={hint ? `${id}-hint` : undefined}
            className={`${boxed} resize-none`}
          />
        ) : (
          <input
            id={id}
            type={type}
            name={name}
            required={required}
            autoComplete={autoComplete}
            min={min}
            max={max}
            inputMode={inputMode}
            placeholder={question ? label : ' '}
            value={value}
            onChange={onChange}
            aria-describedby={hint ? `${id}-hint` : undefined}
            className={boxed}
          />
        )}
        {!question && (
          <label htmlFor={id} className={labelCls}>
            {label}
            {required && <span className="ml-1 text-[var(--color-gold)]">*</span>}
          </label>
        )}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 h-0.5 w-[calc(100%-2rem)] -translate-x-1/2 scale-x-0 bg-[var(--color-gold)] transition-transform duration-300 peer-focus:scale-x-100"
        />
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 px-1 text-[13px] leading-snug text-muted">
          {hint}
        </p>
      )}
    </div>
  )
}

interface SelectFieldProps {
  name: string
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  options: readonly string[]
  required?: boolean
  placeholder?: string
  autoComplete?: string
  idPrefix?: string
  hint?: string
  question?: string
}

// Select styled to match FloatField. The label stays pinned small because a
// select always shows either the placeholder option or a chosen value. Pass a
// `question` instead when the wording is too long to sit inside the box.
export function SelectField({
  name,
  label,
  value,
  onChange,
  options,
  required,
  placeholder = 'Select…',
  autoComplete,
  idPrefix = 'gg',
  hint,
  question,
}: SelectFieldProps) {
  const id = `${idPrefix}-${name}`
  return (
    <div>
      {question && (
        <QuestionLabel htmlFor={id} required={required}>
          {question}
        </QuestionLabel>
      )}
      <div className="group relative rounded-md border border-line bg-white transition-all duration-300 focus-within:border-[var(--color-gold)] focus-within:shadow-[0_12px_30px_-16px_rgba(192,144,47,0.55)]">
        {!question && (
          <label
            htmlFor={id}
            className={`pointer-events-none absolute left-4 top-2 font-body text-[10px] font-semibold uppercase tracking-[0.16em] ${
              value ? 'text-ink-soft' : 'text-muted'
            }`}
          >
            {label}
            {required && <span className="ml-1 text-[var(--color-gold)]">*</span>}
          </label>
        )}
        <select
          id={id}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className={`peer w-full appearance-none bg-transparent pr-10 font-body text-base outline-none ${
            question ? 'px-4 py-3.5' : 'px-4 pt-6 pb-2'
          } ${value ? 'text-ink' : 'text-muted'}`}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
        >
          <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
            <path
              d="M1 1l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 h-0.5 w-[calc(100%-2rem)] -translate-x-1/2 scale-x-0 bg-[var(--color-gold)] transition-transform duration-300 peer-focus:scale-x-100"
        />
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 px-1 text-[13px] leading-snug text-muted">
          {hint}
        </p>
      )}
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
