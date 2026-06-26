import { org } from '../data/site'

export default function Logo({ className = 'h-11' }: { readonly className?: string }) {
  return (
    <img
      src="/images/logo.png"
      alt={`${org.name} logo`}
      className={`${className} w-auto`}
      width={241}
      height={128}
    />
  )
}
