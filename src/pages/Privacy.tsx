import { org } from '../data/site'
import LegalPage from '../components/LegalPage'

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="May 28, 2026">
      <p>
        The {org.name} (“we,” “us,” or “our”) respects your privacy. This policy explains what
        information we collect through this website and how we use it.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We collect information you voluntarily provide — such as your name, email address, phone
        number, and message — when you submit our contact form. Our website may also collect standard
        technical information (such as browser type and pages visited) through cookies and analytics.
      </p>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To respond to your inquiries and messages</li>
        <li>To share updates about our programs and events, where you have opted in</li>
        <li>To improve our website and understand how visitors use it</li>
      </ul>

      <h2>Donations</h2>
      <p>
        Online donations are processed by our third-party payment partner, GiveButter. Payment
        details are handled directly by GiveButter under its own privacy and security policies; we do
        not store your card information.
      </p>

      <h2>Sharing Your Information</h2>
      <p>
        We do not sell or rent your personal information. We may share information with trusted
        service providers who help us operate our website and programs, and as required by law.
      </p>

      <h2>Your Choices</h2>
      <p>
        You may request that we correct or delete your personal information by contacting us through
        our <a href="/contact">contact page</a>.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Write to us at {org.name}, {org.addressOneLine}.
      </p>
    </LegalPage>
  )
}
