import { org } from '../data/site'
import LegalPage from '../components/LegalPage'

export default function Accessibility() {
  return (
    <LegalPage title="Accessibility Statement" updated="June 2026">
      <h2>Our commitment</h2>
      <p>
        The {org.name} website is built to conform to the Web Content Accessibility Guidelines
        (WCAG) 2.1 Level AA, the standard referenced by the ADA for web accessibility. We review
        and update our accessibility practices on an ongoing basis.
      </p>

      <h2>What we have done</h2>
      <p>We have taken the following steps to make this site accessible to all visitors:</p>
      <ul>
        <li>
          <strong>Keyboard navigation:</strong> Skip links allow keyboard and screen reader users to
          bypass navigation and get straight to the main content without tabbing through every menu
          item.
        </li>
        <li>
          <strong>Focus indicators:</strong> A visible outline appears on every interactive element
 (links, buttons, and form fields) when navigated by keyboard.
        </li>
        <li>
          <strong>Color contrast:</strong> Text colors meet the 4.5:1 minimum contrast ratio
          required for readability by people with low vision.
        </li>
        <li>
          <strong>Screen reader labels:</strong> All form fields, buttons, and interactive elements
          carry descriptive labels so assistive technology can convey their purpose clearly.
        </li>
        <li>
          <strong>Motion sensitivity:</strong> Animations automatically reduce for users who have
          the Reduce Motion preference enabled on their device.
        </li>
      </ul>

      <h2>Report an issue</h2>
      <p>
        If you encounter any accessibility barrier on this site, please{' '}
        <a href="/contact">contact us</a> and we will address it promptly. Your feedback helps us
        ensure every visitor, and every veteran family, can access the support and information
        they need.
      </p>
    </LegalPage>
  )
}
