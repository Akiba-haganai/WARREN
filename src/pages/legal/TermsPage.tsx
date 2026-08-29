import AppShell from "../../components/layout/AppShell";

export default function TermsPage() {
  return (
    <AppShell>
      <div className="px-4 pb-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
        <div className="prose prose-sm dark:prose-invert space-y-4">
          <p><strong>Last updated:</strong> {new Date().getFullYear()}-01-01</p>
          <p>
            By accessing or using Wave, you agree to be bound by these Terms
            of Service. If you do not agree, please do not use the service.
          </p>
          <h3>1. Independent Student Project & Disclaimer of Affiliation</h3>
          <p>
            Wave is an independent, student-run platform and is <strong>not affiliated with, endorsed by, sponsored by, or officially connected to any university, college, school, or educational institution</strong>. All university names, school titles, department names, course codes, and acronyms referenced on this platform are used solely for nominative, descriptive, and organizational purposes to help students coordinate their peer study activities.
          </p>
          <h3>2. Acceptable Use</h3>
          <p>
            You agree to use Wave solely for lawful educational, collaboration, and networking purposes. You agree not to post content that is illegal, abusive, harassing, defamatory, fraudulent, or otherwise objectionable. We reserve the right to remove any content and terminate or suspend accounts at our sole discretion without notice.
          </p>
          <h3>3. User-Generated Content & Academic Materials</h3>
          <p>
            Users are solely responsible for the content, study notes, past papers, questions, and messages they post or upload. By submitting content to Wave, you represent and warrant that you have the right to share such material or that your contribution constitutes non-commercial, transformative educational fair use. Wave does not claim ownership of user-uploaded study resources.
          </p>
          <h3>4. Copyright & Takedown Policy (DMCA / Notice & Action)</h3>
          <p>
            We respect intellectual property rights and respond expeditiously to valid copyright infringement and takedown requests. If you are a copyright owner, lecturer, or authorized institutional representative and believe that material available on Wave infringes your copyright or intellectual property, please contact us immediately at <strong>support@warren.app</strong> with the specific link, description of the work, and proof of ownership. The disputed material will be promptly investigated and removed.
          </p>
          <h3>5. Disclaimer of Warranties & Limitation of Liability</h3>
          <p>
            Wave is a non-commercial, zero-budget project provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied. We do not guarantee the accuracy, completeness, or reliability of any study materials or user advice. Under no circumstances shall Wave, its creators, or administrators be liable for any academic outcomes, loss of data, service interruptions, or damages arising out of your use of the service.
          </p>
          <h3>6. Termination</h3>
          <p>
            We may suspend or terminate your access to Wave at any time, without prior notice, for any reason, including violation of these Terms.
          </p>
          <h3>7. Contact</h3>
          <p>
            For questions, legal inquiries, or takedown requests regarding these Terms, contact <strong>support@warren.app</strong>.
          </p>
        </div>
      </div>
    </AppShell>
  );
}