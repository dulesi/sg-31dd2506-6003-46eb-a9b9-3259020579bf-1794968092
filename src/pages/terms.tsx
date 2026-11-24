import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { SEO } from '@/components/SEO'

export default function TermsOfService() {
  return (
    <>
      <SEO title="Terms of Service | AdioSugar" description="AdioSugar Terms of Service - user agreement and guidelines." />
      <div className="min-h-screen bg-background">
        <div className="max-w-[640px] mx-auto p-4 space-y-4">
          <div className="flex items-center gap-3 pt-4 pb-2">
            <Link href="/app" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <ArrowLeft className="w-5 h-5 text-primary" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">Terms of Service</h1>
              <p className="text-xs text-muted">Last updated: November 2026</p>
            </div>
          </div>

          <Card className="p-6 shadow-md rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-muted leading-relaxed">
              Welcome to AdioSugar. By accessing or using our application, you agree to be bound by these Terms of Service. Please read them carefully before using the app.
            </p>
          </Card>

          <Card className="p-6 shadow-md rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-foreground">1. Acceptance of Terms</h2>
            <p className="text-sm text-muted leading-relaxed">
              By creating an account and using AdioSugar, you confirm that you accept these Terms of Service and agree to comply with them. If you do not agree, please do not use the app.
            </p>
          </Card>

          <Card className="p-6 shadow-md rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-foreground">2. Medical Disclaimer</h2>
            <p className="text-sm text-muted leading-relaxed">
              AdioSugar is a lifestyle and habit-tracking application, not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider before making significant changes to your diet, especially if you have any pre-existing medical conditions.
            </p>
          </Card>

          <Card className="p-6 shadow-md rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-foreground">3. User Accounts</h2>
            <p className="text-sm text-muted leading-relaxed">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use of your account.
            </p>
          </Card>

          <Card className="p-6 shadow-md rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-foreground">4. Payment & Refunds</h2>
            <p className="text-sm text-muted leading-relaxed">
              The 30-Day Program is offered as a one-time payment with lifetime access. All purchases are final. For questions regarding billing, please contact our support team.
            </p>
          </Card>

          <Card className="p-6 shadow-md rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-foreground">5. Acceptable Use</h2>
            <p className="text-sm text-muted leading-relaxed">
              You agree not to misuse the application, attempt unauthorized access to our systems, or use the service for any unlawful purpose. We reserve the right to suspend or terminate accounts that violate these terms.
            </p>
          </Card>

          <Card className="p-6 shadow-md rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-foreground">6. Limitation of Liability</h2>
            <p className="text-sm text-muted leading-relaxed">
              AdioSugar and its affiliates shall not be liable for any indirect, incidental, or consequential damages arising from your use of the application.
            </p>
          </Card>

          <Card className="p-6 shadow-md rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-foreground">7. Changes to Terms</h2>
            <p className="text-sm text-muted leading-relaxed">
              We may update these Terms of Service periodically. Continued use of the app after changes constitutes acceptance of the revised terms.
            </p>
          </Card>

          <Card className="p-6 shadow-md rounded-2xl space-y-3">
            <h2 className="text-lg font-bold text-foreground">8. Contact Us</h2>
            <p className="text-sm text-muted leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at support@adiosugar.com.
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