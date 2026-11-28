import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

interface Section {
  title: string;
  paragraphs: string[];
}

const sections: Section[] = [
  {
    title: "1. Information We Collect",
    paragraphs: [
      "We collect only the minimum personal data strictly required for the Service to function:",
      "Account & Authentication Data: Email address and password (cryptographically hashed by our authentication provider; never stored in plain text), along with internal account identifiers and session tokens.",
      "Optional Display Name / Nickname: Within the application, you may voluntarily enter a name, nickname, or custom text solely for personalized in-app greeting and display purposes. You are not required to provide your real legal name.",
      "Self-Tracking & Quiz Data: Quiz responses (such as sugar-habit or energy-dip answers), daily streaks, craving check-ins (such as trigger type, craving intensity, mood/timing selections), and personal notes you enter. These entries are stored tied to your account solely for your personal self-tracking and in-app coaching suggestions - they are personal habit logs only, not medical records or clinical health data.",
      "On-Device Storage: A local copy of basic profile and session state (display name, email address, account creation timestamp, and login state) is stored in your device/browser localStorage so the app loads quickly and keeps you signed in.",
      "Basic Technical & Platform Logs: Standard operational logs (such as IP address, browser/device user-agent, and timestamps) processed automatically by our hosting infrastructure, along with standard technical telemetry loaded by the application's web runtime script.",
      "We do not collect payment card details (no in-app purchases or subscriptions are active), precise GPS geolocation, contacts, photos, or clinical medical records, and we do not sell, rent, or trade your personal data to any third parties."
    ]
  },
  {
    title: "2. How We Use Your Data & Third-Party Service Providers",
    paragraphs: [
      "We process your personal data strictly to operate, secure, and deliver the features of AdioSugar, relying on the following infrastructure and service providers:",
      "Supabase (Authentication & Database): Stores your account credentials, profile, quiz responses, and habit/streak logs, and sends essential transactional emails (account confirmation and password reset).",
      "Third-Party Language Processing Service (OpenAI API): When you request personalized craving-support suggestions inside the app, your selected craving trigger, intensity, timing/support preferences, and non-identifying habit context summary are transmitted to OpenAI's API solely to generate in-app response suggestions. Your email address and display name are not sent with these requests.",
      "Vercel (Web Hosting & Delivery): Hosts the web application and processes standard server-access logs to deliver content reliably and prevent abuse.",
      "Softgen Platform Runtime (cdn.softgen.ai): Provides core web application runtime script infrastructure on production pages.",
      "Google Play: Distributes the Android application (com.adiosugar.twa) and provides platform-level installation and security services.",
      "We do not use Google Analytics, Mixpanel, advertising networks, or third-party crash-reporting SDKs."
    ]
  },
  {
    title: "3. Security Measures",
    paragraphs: [
      "We implement concrete technical and organizational safeguards aligned with the actual architecture of the Service:",
      "Encryption in Transit: All communication between your device, our web hosting (Vercel), our database/authentication provider (Supabase), and our language-processing provider (OpenAI API) is encrypted using HTTPS/TLS.",
      "Password Protection: Passwords are hashed and managed exclusively by Supabase Auth and are never accessible in plain text.",
      "Database Access Controls: Your self-tracking and profile records in Supabase Postgres are protected by Row Level Security (RLS) policies ensuring each authenticated user can access only their own records (user_id). Administrative infrastructure access is restricted solely to the Operator (Dusan Gacic).",
      "While no internet transmission or storage system can be guaranteed 100% invulnerable, we limit data collection to the bare minimum necessary to reduce risk."
    ]
  },
  {
    title: "4. Cookies & Local Storage",
    paragraphs: [
      "We use only strictly necessary authentication tokens, session cookies, and browser localStorage entries required to maintain your signed-in session and store your local profile state on your device. We do not use advertising cookies or cross-site behavioral tracking."
    ]
  },
  {
    title: "5. Account & Data Deletion (In-App and Web Request Path)",
    paragraphs: [
      "You can permanently delete your AdioSugar account and data at any time using either of the following methods:",
      "Instant In-App Deletion (\"Erase my data\"): Inside the application, select \"Erase my data\". This immediately executes an automated database deletion procedure that removes your account and associated records (profile, email address, quiz responses, and habit/streak logs) from the active database and authentication system, and clears local device storage. Once deleted, those records can no longer be accessed through standard administrative tools of the Service.",
      "External Web Deletion Request Path: If you no longer have access to the application or uninstalled it, visit our dedicated public deletion page at https://adiosugar.com/delete-account for step-by-step instructions and to submit a deletion request directly, or email support@adiosugar.com from the email address registered to your account. Verified web/email requests are processed promptly.",
      "Backup & Log Retention: Residual copies in automated infrastructure backup systems and short-term technical server logs, where applicable, may remain temporarily in accordance with the retention schedules of our infrastructure providers (Supabase and Vercel) before being automatically purged or overwritten."
    ]
  },
  {
    title: "6. Data Retention, Legal Bases & Your Privacy Rights (GDPR / Applicable Laws)",
    paragraphs: [
      "Retention Period: Your account profile, quiz responses, and habit logs remain active in Supabase until you delete your account via \"Erase my data\" or submit a deletion request via https://adiosugar.com/delete-account or support@adiosugar.com. Standard server access logs are retained only for short operational security windows before automatic rotation.",
      "Legal Bases for Processing: Where the EU/UK GDPR, Serbian Law on Personal Data Protection, or similar laws apply, we process personal data on the following legal bases:",
      "Performance of a Contract: To create and authenticate your account, save your quiz and habit logs, and generate the in-app coaching suggestions you request.",
      "Legitimate Interests: To maintain application security, prevent fraud or abuse, diagnose technical errors, and ensure service availability.",
      "Consent (where applicable): Where you voluntarily provide optional profile details or submit optional self-tracking inputs.",
      "Your Rights: Subject to applicable law, you have the right to:",
      "Access the personal data we hold about you; Rectify (Correct) inaccurate or incomplete profile data (which you can also edit directly in the app); Erase (Delete) your account and personal data at any time via \"Erase my data\" in the app or via https://adiosugar.com/delete-account; Restrict or Object to certain processing based on legitimate interests; Data Portability (request a copy/export of your personal data in a structured, machine-readable format); Withdraw Consent at any time where processing is based on consent, without affecting prior lawful processing; and Lodge a Complaint with a competent data protection supervisory authority (such as the Commissioner for Information of Public Importance and Personal Data Protection in Serbia or your local EU/EEA supervisory authority).",
      "To exercise any of these rights, email support@adiosugar.com. We will respond without undue delay and within statutory deadlines (typically within 30 days)."
    ]
  },
  {
    title: "7. International Data Transfers",
    paragraphs: [
      "Because Supabase, OpenAI, Vercel, Softgen, and Google Play operate infrastructure that may process data outside your country of residence (including in the United States or EU/EEA), international transfers rely on those providers' Standard Contractual Clauses (SCCs) and security safeguards."
    ]
  },
  {
    title: "8. Children's Privacy",
    paragraphs: [
      "The Service is intended strictly for individuals aged 18 and older. We do not knowingly collect personal information from anyone under 18. If we become aware that a minor has submitted personal data, it will be permanently deleted immediately."
    ]
  },
  {
    title: "9. Changes to This Privacy Policy & Contact Information",
    paragraphs: [
      "We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated effective date.",
      "For any privacy inquiries or rights requests, contact:",
      "Operator: Dusan Gacic",
      "Email: support@adiosugar.com",
      "Website: https://adiosugar.com",
      "Account Deletion Page: https://adiosugar.com/delete-account",
      "Terms of Use: https://adiosugar.com/terms"
    ]
  }
];

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy - AdioSugar"
        description="Read the AdioSugar privacy policy to learn how we collect, use, store, and delete your personal information."
      />
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Privacy Policy
              </h1>
              <p className="text-sm text-muted-foreground">
                Last Updated: November 28, 2026
              </p>
            </div>
          </div>

          <Card className="rounded-2xl shadow-md mt-6">
            <CardContent className="p-6 sm:p-8">
              <p className="text-sm sm:text-base leading-relaxed text-foreground">
                This Privacy Policy governs how AdioSugar (https://adiosugar.com
                and the com.adiosugar.twa Android application), operated by
                Dusan Gacic ("Operator," "we," "us," or "our"), collects, uses,
                stores, shares, and deletes your personal information.
              </p>
            </CardContent>
          </Card>

          <div className="mt-6 space-y-6">
            {sections.map((section) => (
              <Card key={section.title} className="rounded-2xl shadow-md">
                <CardContent className="p-6 sm:p-8">
                  <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">
                    {section.title}
                  </h2>
                  <div className="space-y-3">
                    {section.paragraphs.map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-sm sm:text-base leading-relaxed text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; 2026 AdioSugar. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}