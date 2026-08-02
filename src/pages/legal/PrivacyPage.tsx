import AppShell from "../../components/layout/AppShell";

export default function PrivacyPage() {
  return (
    <AppShell>
      <div className="px-4 pb-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <div className="prose prose-sm dark:prose-invert space-y-4">
          <p><strong>Last updated:</strong> {new Date().getFullYear()}-01-01</p>
          <p>
            Campus (by Warren) ("we", "our", "us") is committed to protecting your privacy.
            This Privacy Policy explains how your personal information is collected,
            used, and disclosed by Campus (by Warren).
          </p>
          <h3>Information We Collect</h3>
          <p>
            We collect information you provide directly to us, such as when you
            create an account, post content, or communicate with other users.
            This may include your email address, username, and profile information.
          </p>
          <h3>How We Use Your Information</h3>
          <p>
            We use your information to operate, maintain, and improve our services,
            to communicate with you, and to personalise your experience.
          </p>
          <h3>Third‑Party Services</h3>
          <p>
            Campus (by Warren) uses Google AdSense to display advertisements. AdSense may use
            cookies to serve ads based on your prior visits to our website or other
            websites. You can opt out of personalised advertising by visiting
            Google's Ads Settings.
          </p>
          <h3>Contact</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact us
            at support@warren.app.
          </p>
        </div>
      </div>
    </AppShell>
  );
}