import { org } from '../data/site'
import LegalPage from '../components/LegalPage'

export default function Terms() {
  return (
    <LegalPage title="Terms of Use" updated="May 28, 2026">
      <p>
        Welcome to the {org.name} website. By accessing or using this site, you agree to these Terms
        of Use. If you do not agree, please do not use the site.
      </p>

      <h2>Use of This Site</h2>
      <p>
        This website is provided for informational purposes and to facilitate donations and
        engagement with our programs. You agree to use it lawfully and not to interfere with its
        operation or security.
      </p>

      <h2>Donations</h2>
      <p>
        Donations made through this site are processed by GiveButter. The {org.name} is a registered
        501(c)(3) nonprofit organization; donations may be tax-deductible to the extent allowed by
        law. Donations are generally non-refundable — if you believe an error was made, please
        contact us.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on this site — including text, logos, and images — is the property of the{' '}
        {org.name} or its partners and may not be reproduced without permission.
      </p>

      <h2>Third-Party Links</h2>
      <p>
        Our site may link to third-party websites and services (such as GiveButter and social media).
        We are not responsible for the content or practices of those sites.
      </p>

      <h2>Disclaimer</h2>
      <p>
        This site is provided “as is” without warranties of any kind. We strive for accuracy but do
        not guarantee that all information is complete or current.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Write to us at {org.name}, {org.addressOneLine}.
      </p>
    </LegalPage>
  )
}
