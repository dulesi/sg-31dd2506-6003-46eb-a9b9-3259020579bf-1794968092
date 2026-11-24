import Link from 'next/link'
import { ArrowLeft, Shield } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { SEO } from '@/components/SEO'

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
              <p className="text-xs text-muted">Last updated: November 2026</p>
            </div>
          </div>

          <Card className="p-6 shadow-md rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-muted leading-relaxed">
              At AdioSugar, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our application.
            </p>
          </Card>

          <Card className="p-6 shadow-md rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-foreground">1. Information We Collect</h2>
            <p className="text-sm text-muted leading-relaxed">
              We collect information you provide directly to us, such as your email address, name, and responses to our sugar intake quiz. We also collect usage data related to your progress within the app, including streaks, check-ins, and craving logs.
            </p>
          </Card>

          <Card className="p-6 shadow-md rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-foreground">2. How We Use Your Information</h2>
            <p className="text-sm text-muted leading-relaxed">
              Your information is used to provide and personalize your 30-day sugar detox program, track your progress, send you relevant notifications, and improve our services. We do not sell your personal data to third parties.
            </p>
          </Card>

          <Card className="p-6 shadow-md rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-foreground">3. Data Storage & Security</h2>
            <p className="text-sm text-muted leading-relaxed">
              Your data is stored securely using industry-standard encryption via our backend provider, Supabase. Access to your personal data is restricted to authenticated sessions tied to your account.
            </p>
          </Card>

          <Card className="p-6 shadow-md rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-foreground">4. Your Rights</h2>
            <p className="text-sm text-muted leading-relaxed">
              You have the right to access, update, or delete your personal data at any time. You can manage your account settings or permanently delete your account directly from the Account section of the app.
            </p>
          </Card>

          <Card className="p-6 shadow-md rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-foreground">5. Cookies & Tracking</h2>
            <p className="text-sm text-muted leading-relaxed">
              We use local storage and session cookies solely to maintain your login session and app preferences. We do not use third-party advertising trackers.
            </p>
          </Card>

          <Card className="p-6 shadow-md rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-foreground">6. Changes to This Policy</h2>
            <p className="text-sm text-muted leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any significant changes via email or an in-app notification.
            </p>
          </Card>

          <Card className="p-6 shadow-md rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-foreground">7. Contact Us</h2>
            <p className="text-sm text-muted leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at support@adiosugar.com.
            </p>
          </Card>

          <div className="pb-8 text-center">
            <p className="text-xs text-muted">© 2026 AdioSugar. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  )
}