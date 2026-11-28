import Link from "next/link"
import { ArrowLeft, Shield } from "lucide-react"
import { Card } from "@/components/ui/card"
import { SEO } from "@/components/SEO"

export default function PrivacyPolicy() {
  return (
    <>
      <SEO title="Privacy Policy | AdioSugar" description="AdioSugar Privacy Policy - how we handle and protect your data." />
      <div className="min-h-screen bg-background">
        <div className="max-w-[640px] mx-auto p-4 space-y-4">
          <div className="flex items-center gap-3 pt-4 pb-2">
            <Link href="/app" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <ArrowLeft className="w-5 h-5 text-primary" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">Privacy Policy</h1>
              <p className="text-xs text-muted">Last Updated: November 26, 2026</p>
            </div>
          </div>

          <Card className="p-6 shadow-md rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-muted leading-relaxed">
              This Privacy Policy governs how AdioSugar (<a href="https://adiosugar.com" className="text-primary hover:underline">https://adiosugar.com</a> and the com.adiosugar.twa Android application), operated by Dusan Gacic (&ldquo;Operator,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), collects, uses, stores, and deletes your personal information.
            </p>
          </Card>

          <Card className="p-6 shadow-md rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-foreground">1. Information We Collect</h2>
            <p className="text-sm text-muted leading-relaxed">
              We collect only the minimum personal data strictly required for the Service to function:
            </p>
            <ul className="space-y-2 text-sm text-muted leading-relaxed list-disc pl-5">
              <li><span className="font-semibold text-foreground">Email Address:</span> Collected solely for account authentication, sign-in access, and essential service-related communication.</li>
              <li><span className="font-semibold text-foreground">Optional Display Name / Nickname:</span> Within the application, you may voluntarily enter a name, nickname, or any custom text solely for personalized in-app greeting and display purposes. You are not required to provide your real legal name.</li>
              <li><span className="font-semibold text-foreground">Self-Tracking & Quiz Data:</span> Any quiz responses (such as sugar-habit or energy-dip answers), daily streaks, craving check-ins, or personal notes you enter are stored in Supabase tied to your account solely for your own personal self-tracking within the Service. These entries are personal habit logs only, not medical records or clinical health data.</li>
              <li><span className="font-semibold text-foreground">Basic Technical Data:</span> Standard operational logs (such as IP address, browser/device type, and error diagnostics) automatically processed by our hosting infrastructure to maintain security, prevent abuse, and ensure stability.</li>
            </ul>
            <p className="text-sm text-muted leading-relaxed">
              We do not collect financial/payment card details, precise geolocation, contacts, photos, or sensitive medical records, and we do not sell, rent, or trade your personal data to any third parties.
            </p>
          </Card>

          <Card className="p-6 shadow-md rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-foreground">2. Data Storage & Third-Party Infrastructure</h2>
            <p className="text-sm text-muted leading-relaxed">
              All account data (your email address, optional display name/nickname, and personal self-tracking/quiz entries) is securely stored and processed using Supabase (authentication and database infrastructure) and delivered via Vercel (web hosting) and Google Play (Android application distribution). These providers process data strictly to operate the Service under industry-standard encryption and security practices.
            </p>
          </Card>

          <Card className="p-6 shadow-md rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-foreground">3. Cookies & Local Storage</h2>
            <p className="text-sm text-muted leading-relaxed">
              We use only strictly necessary session tokens, local storage entries, and authentication cookies required to keep you signed in, maintain your session state, and ensure core app functionality on web and Android. We do not use advertising cookies, cross-site behavioral tracking, or third-party ad networks.
            </p>
          </Card>

          <Card className="p-6 shadow-md rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-foreground">4. Instant Self-Service Account & Data Deletion (Absolute User Control)</h2>
            <p className="text-sm text-muted leading-relaxed">
              You maintain complete and immediate control over your personal data at all times:
            </p>
            <ul className="space-y-2 text-sm text-muted leading-relaxed list-disc pl-5">
              <li>Inside the application, you can permanently delete your account and 100% of your stored data (including your email address, optional name/nickname, and self-tracking/quiz entries) at any moment with a single click on the &ldquo;Delete account (permanently erase all your data)&rdquo; button.</li>
              <li>Deletion is immediate, irreversible, and requires no additional verification steps or manual approval. Once triggered, the Service retains zero personal data about you.</li>
            </ul>
            <p className="text-sm text-muted leading-relaxed">
              If you no longer have access to the application and wish to request assistance, you may also contact us at support@adiosugar.com.
            </p>
          </Card>

          <Card className="p-6 shadow-md rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-foreground">5. Data Retention, Your Rights & International Processing</h2>
            <p className="text-sm text-muted leading-relaxed">
              <span className="font-semibold text-foreground">Retention:</span> Your account profile, quiz responses, and habit/streak data stored in Supabase remain active until you permanently erase them using the &ldquo;Delete account (permanently erase all your data)&rdquo; button inside the app or contact support@adiosugar.com. Short-term technical and security logs handled by our infrastructure providers are retained only for standard operational and security windows before automatic rotation or deletion.
            </p>
            <p className="text-sm text-muted leading-relaxed">
              <span className="font-semibold text-foreground">Lawful Basis & Your Rights (GDPR / Applicable Data Laws):</span> We process your data as necessary to provide the Service you request and maintain basic security and abuse prevention. In addition to instant self-service deletion inside the app, you have the right to request access to, correction of, or a copy/export of your personal data (or raise a privacy concern) by emailing support@adiosugar.com.
            </p>
            <p className="text-sm text-muted leading-relaxed">
              <span className="font-semibold text-foreground">International Data Processing:</span> Because Supabase, Vercel, and Google Play may process data on servers outside your country (including in the United States or other regions), data transfers rely on those providers&apos; standard security and contractual safeguards.
            </p>
          </Card>

          <Card className="p-6 shadow-md rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-foreground">6. Children&apos;s Privacy</h2>
            <p className="text-sm text-muted leading-relaxed">
              The Service is intended strictly for individuals aged 18 and older. We do not knowingly collect personal information from anyone under 18. If we become aware that a minor has submitted personal data, it will be permanently deleted immediately.
            </p>
          </Card>

          <Card className="p-6 shadow-md rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-foreground">7. Changes to This Privacy Policy & Contact Information</h2>
            <p className="text-sm text-muted leading-relaxed">
              We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page with an updated effective date.
            </p>
            <p className="text-sm text-muted leading-relaxed">
              For any privacy inquiries or data requests, contact:
            </p>
            <ul className="space-y-1 text-sm text-muted leading-relaxed">
              <li><span className="font-semibold text-foreground">Operator:</span> Dusan Gacic</li>
              <li><span className="font-semibold text-foreground">Email:</span> support@adiosugar.com</li>
              <li><span className="font-semibold text-foreground">Website:</span> <a href="https://adiosugar.com" className="text-primary hover:underline">https://adiosugar.com</a></li>
              <li><span className="font-semibold text-foreground">Terms of Use:</span> <Link href="/terms" className="text-primary hover:underline">https://adiosugar.com/terms</Link></li>
            </ul>
          </Card>

          <div className="pb-8 text-center">
            <p className="text-xs text-muted">© 2026 AdioSugar. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  )
}