import AppShell from "../../components/layout/AppShell";

export default function PrivacyPage() {
  return (
    <AppShell>
      <div className="px-4 pb-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <div className="prose prose-sm dark:prose-invert space-y-4">
          <p><strong>Last updated:</strong> {new Date().getFullYear()}-01-01</p>
          <p>
            Wave ("we", "our", "us") is committed to protecting your privacy.
            This Privacy Policy explains how your personal information is collected,
            used, and disclosed by Wave.
          </p>
          <h3>1. Information We Collect</h3>
          <p>
            We collect information you provide directly to us when using Wave, such as when you create an account, complete your profile, post questions, upload study resources, participate in communities, or send messages. This may include your email address, chosen username, and profile details.
          </p>
          <h3>2. How We Use Your Information</h3>
          <p>
            We use collected information solely to provide, maintain, and improve our services, facilitate peer-to-peer student study interactions, personalize community recommendations, and safeguard against bot spam or abusive behavior.
          </p>
          <h3>3. Advertising & Cookies</h3>
          <p>
            Wave may use third-party advertising partners such as Google AdSense to serve non-intrusive advertisements to help support our zero-budget server hosting costs. Google and third-party vendors use cookies to serve ads based on user visits to this or other websites. Users may opt out of personalized advertising by visiting Google's Ads Settings or <a href="https://aboutads.info" target="_blank" rel="noopener noreferrer" className="underline">aboutads.info</a>.
          </p>
          <h3>4. Data Storage & Security</h3>
          <p>
            We implement security best practices to protect your information against unauthorized access. We do not sell, rent, or trade your personal data to third parties.
          </p>
          <h3>5. Account Deletion & Data Rights</h3>
          <p>
            You have the right to request deletion of your account and associated personal data at any time. You can initiate a deletion request through the app settings or by contacting us directly.
          </p>
          <h3>6. Contact</h3>
          <p>
            If you have any questions or privacy concerns, please contact our team at <strong>support@warren.app</strong>.
          </p>
        </div>
      </div>
    </AppShell>
  );
}