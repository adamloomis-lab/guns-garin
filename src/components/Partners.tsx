import { partners } from '../data/site'
import LogoCarousel from './LogoCarousel'

// "Proud to Partner With" — animated logo carousel (cult-ui pattern, adapted
// for image URLs). Columns stagger in on mount, then logos crossfade through
// each slot so all sponsors get airtime in a small, polished footprint.
export default function Partners({ heading = true }: { readonly heading?: boolean }) {
  const items = partners.map((p) => ({ name: p.name, src: p.logo }))
  return (
    <div className="text-center reveal">
      {heading && (
        <>
          <span className="eyebrow">Proud to Partner With</span>
          <p className="mx-auto mt-3 max-w-xl text-ink-soft">
            Generous partners who help us answer the call for veterans and future aviators.
          </p>
        </>
      )}
      <div className="mt-10">
        <LogoCarousel logos={items} columnCount={5} />
      </div>
    </div>
  )
}
