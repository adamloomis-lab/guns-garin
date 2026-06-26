import { Link } from 'wouter'
import { Heart } from 'lucide-react'
import { useScrolled } from '../hooks/useScrolled'

// Fixed bottom action bar on mobile — appears after the user scrolls past the
// hero so a donate CTA is always within reach.
export default function DonateBar() {
  const show = useScrolled(560)
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 p-3 backdrop-blur transition-transform duration-300 md:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <Link href="/donate" className="btn btn-gold w-full">
        <Heart size={17} /> Donate to Our Veterans
      </Link>
    </div>
  )
}
