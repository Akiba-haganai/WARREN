import AppShell from "../../components/layout/AppShell";

export default function TermsPage() {
  return (
    <AppShell>
      <div className="px-4 pb-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
        <div className="prose prose-sm dark:prose-invert space-y-4">
          <p><strong>Last updated:</strong> {new Date().getFullYear()}-01-01</p>
          <p>
            By accessing or using Warren, you agree to be bound by these Terms
            of Service. If you do not agree, please do not use the service.
          </p>
          <h3>Acceptable Use</h3>
          <p>
            You agree not to post content that is illegal, abusive, harassing,
            defamatory, or otherwise objectionable. We reserve the right to
            remove any content and terminate accounts at our sole discretion.
          </p>
          <h3>Content Rights</h3>
          <p>
            All content and materials available on Warren are protected by
            applicable intellectual property laws. You may not reproduce,
            distribute, or create derivative works without permission.
          </p>
          <h3>Termination</h3>
          <p>
            We may suspend or terminate your access to Warren at any time,
            without prior notice, for any reason.
          </p>
          <h3>Contact</h3>
          <p>
            For questions about these Terms, contact support@warren.app.
          </p>
        </div>
      </div>
    </AppShell>
  );
}