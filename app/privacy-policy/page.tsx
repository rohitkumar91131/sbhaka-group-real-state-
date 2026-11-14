import type { Metadata } from "next";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "Privacy Policy | Shabka Group",
  description: "Learn how Shabka Ideal Private Limited collects, uses, stores, and protects information submitted through the Shabka Group website.",
};

export default function PrivacyPolicyPage() {
  return <>
    <SiteHeader />
    <main className="privacy-page wrap">
      <p className="privacy-eyebrow">Shabka Ideal Private Limited</p>
      <h1>Privacy Policy</h1>
      <p className="privacy-updated">Effective date: 14 November 2026</p>
      <p>This policy explains how Shabka Ideal Private Limited (“Shabka”, “we”, “us”, or “our”) handles personal information when you visit <a href="https://shabkagroup.com">shabkagroup.com</a> or send us an enquiry. Our website introduces our businesses and provides a contact form; it does not take orders or payments.</p>

      <section>
        <h2>Information we collect</h2>
        <p>If you use the contact form, we collect the information you provide:</p>
        <ul>
          <li>Your name and email address;</li>
          <li>Your phone number, if you choose to provide it;</li>
          <li>The business area you select; and</li>
          <li>The message you send us.</li>
        </ul>
        <p>Our system also records when an enquiry is received and that it came from the website contact form. Our hosting and security services may process routine technical information, such as your IP address, browser details, and request time, to deliver and protect the website.</p>
      </section>

      <section>
        <h2>How we use your information</h2>
        <p>We use enquiry information to respond to you, direct your request to the relevant business team, keep track of our communication, protect the form against misuse, and meet legal obligations. We do not sell personal information or use contact-form details for advertising.</p>
      </section>

      <section>
        <h2>How information is stored and shared</h2>
        <p>Contact enquiries are stored in our website database, which uses MongoDB. Access is limited to people who need the information to handle the enquiry. Website, hosting, and database service providers may process information on our behalf to operate and secure the service. We may also disclose information if required by law or to protect our rights and the security of the website.</p>
        <p>The location used by our hosting and database providers depends on how those services are configured. Information may therefore be processed outside India. We will handle any such processing in accordance with applicable law.</p>
      </section>

      <section>
        <h2>How long we keep information</h2>
        <p>We keep enquiry information while we are handling your request and for a reasonable period afterwards to maintain business records, follow up on the enquiry, address disputes, and meet legal requirements. We delete or anonymise it when it is no longer needed for those purposes, unless a longer period is required by law.</p>
      </section>

      <section>
        <h2>Cookies and third-party services</h2>
        <p>The public website is not configured to use advertising or analytics cookies. Essential session cookies may be used in the restricted website administration area to authenticate authorised administrators; they are not used to track public visitors.</p>
        <p>The website loads fonts from Google Fonts. When your browser requests those fonts, Google may receive technical request information under its own privacy practices. Links to services such as Google Maps or WhatsApp open third-party services if you choose to use them, and those services have their own privacy policies.</p>
      </section>

      <section>
        <h2>Your choices and requests</h2>
        <p>You can choose not to submit the contact form, and the phone field is optional. You may contact us to ask what enquiry information we hold about you, request correction or deletion, or raise a concern about its use. We will handle requests in line with applicable law. We may need to retain some information where it is required for a legal obligation or an active business matter.</p>
      </section>

      <section>
        <h2>Children’s information</h2>
        <p>This website and its contact form are intended for business and general enquiries, not for children. Please do not submit a child’s personal information. If you believe a child has sent us personal information, contact us so we can review and delete it where appropriate.</p>
      </section>

      <section>
        <h2>Security</h2>
        <p>We use access controls and reasonable technical and organisational safeguards to protect enquiry information. No website or electronic storage system can be guaranteed to be completely secure.</p>
      </section>

      <section>
        <h2>Privacy contact and grievances</h2>
        <p>For privacy questions, requests, or grievances, contact Shabka Ideal Private Limited at <a href="mailto:info@shabkagroup.com">info@shabkagroup.com</a> or <a href="mailto:shabkagroup@gmail.com">shabkagroup@gmail.com</a>. You may also write to us in Ranchi, Jharkhand, India. We will review and respond to your request.</p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>We may update this policy as our website, data practices, or legal requirements change. The effective date at the top of this page shows when it was last updated.</p>
      </section>
    </main>
    <SiteFooter />
  </>;
}
