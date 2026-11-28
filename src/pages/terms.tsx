import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Use - AdioSugar"
        description="Terms of Use and Legal Disclaimer for AdioSugar - 30-Day Sugar Detox program."
      />
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
          <Link
            href="/app"
            className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Terms of Use & Legal Disclaimer</h1>
              <p className="text-sm text-muted">AdioSugar</p>
            </div>
          </div>
          <p className="text-sm text-muted mb-8">Last Updated: November 28, 2026</p>

          <Card className="p-6 shadow-md rounded-2xl space-y-6">
            <p className="text-sm text-foreground leading-relaxed">
              These Terms of Use ("Terms") govern your access to and use of the AdioSugar web application
              (https://adiosugar.com) and the AdioSugar Android mobile application (com.adiosugar.twa) (collectively,
              the "Service"), operated and managed by Dusan Gacic ("Operator," "we," "us," or "our").
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              By accessing, downloading, installing, registering for, or using the Service, you agree to be bound by
              these Terms and our{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              . If you do not agree with these Terms, please do not use the Service.
            </p>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">1. Eligibility</h2>
              <p className="text-sm text-muted leading-relaxed">
                The Service is intended for individuals aged 18 and older. By using the Service, you confirm that
                you meet this age requirement and have the legal capacity to enter into these Terms.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">2. Acceptable Use</h2>
              <p className="text-sm text-muted leading-relaxed">
                You agree to use the Service lawfully and only for its intended personal self-tracking purpose. You
                must not misuse, disrupt, reverse-engineer, attempt unauthorized access to, or use the Service in a
                way that infringes the rights of others or violates applicable law.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">
                3. Informational Suggestions Only; Allergies & Health Notice
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                <span className="font-semibold text-foreground">General Suggestions, Not Medical Advice:</span>{" "}
                AdioSugar is a personal self-tracking and habit-awareness tool. It is not a medical device,
                healthcare provider, physician, or licensed nutritionist, and nothing in the Service constitutes
                medical advice, diagnosis, treatment, or a dietary prescription. Any snack, food, beverage, or habit
                ideas shown in the Service are non-binding suggestions for personal consideration, not medical
                directives.
              </p>
              <p className="text-sm text-muted leading-relaxed">
                <span className="font-semibold text-foreground">Allergies, Intolerances & Health Conditions:</span>{" "}
                If you choose to try any suggested food, snack, beverage, or habit change, you do so on your own
                responsibility. Always check ingredients and labels yourself, especially if you have food
                allergies, intolerances, diabetes, hypoglycemia, or other medical conditions, and consult a
                qualified healthcare professional where appropriate.
              </p>
              <p className="text-sm text-muted leading-relaxed">
                <span className="font-semibold text-foreground">Adverse Reactions:</span> If you experience any
                adverse reaction, discomfort, or health symptoms in connection with foods or dietary changes, seek
                appropriate medical advice and discontinue any food or habit that does not suit you. If you no
                longer wish to use the Service, you may stop using it at any time.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">4. Disclaimer of Warranties ("AS IS")</h2>
              <p className="text-sm text-muted leading-relaxed">
                To the extent permitted by applicable law, the Service is provided on an "as is" and "as available"
                basis, with all faults and without warranties of any kind, whether express or implied, including
                implied warranties of merchantability, fitness for a particular purpose, accuracy, availability, or
                non-infringement. We do not guarantee that the Service will be uninterrupted, error-free, secure, or
                free of bugs, viruses, or other harmful components, nor that any data will be preserved without
                loss.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">5. Limitation of Liability & Assumption of Risk</h2>
              <p className="text-sm text-muted leading-relaxed">
                You understand and agree that your use of the Service, and any reliance on information, content, or
                food/beverage alternative suggestions provided through it, is at your own risk, except where
                applicable law prohibits excluding or limiting liability (such as mandatory consumer protection
                rules or liability that cannot lawfully be waived).
              </p>
              <p className="text-sm text-muted leading-relaxed">
                Where permitted by applicable law, neither Dusan Gacic nor any affiliates, contractors, or service
                providers involved with AdioSugar shall be liable for indirect, incidental, special, consequential,
                or punitive damages, or for loss of profits, loss of data, business interruption, device issues, or
                other similar losses arising out of or connected with your access to, use of, or inability to use
                the Service, or any interruptions, errors, or changes to the Service.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">6. Indemnification</h2>
              <p className="text-sm text-muted leading-relaxed">
                You agree to indemnify and hold harmless Dusan Gacic from claims, damages, losses, and reasonable
                legal costs brought by third parties to the extent directly arising from your unlawful use of the
                Service, your breach of these Terms, or your violation of third-party rights.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">
                7. Account Deletion, Discontinuation of Service & Termination
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                <span className="font-semibold text-foreground">Deleting Your Account:</span> You may permanently
                delete your account and associated data at any time inside the application (on the Account tab at{" "}
                <Link href="/app" className="text-primary hover:underline">
                  /app
                </Link>{" "}
                or in the Android app) using the "Delete account (permanently erase all your data)" button, or
                follow the instructions on our deletion page (
                <Link href="/delete-account" className="text-primary hover:underline">
                  https://adiosugar.com/delete-account
                </Link>
                ) / contact support@adiosugar.com if you no longer have access to the application. Deleting your
                account removes your account, profile, email address, display name/nickname, quiz responses, and
                daily habit/streak logs from our active database and authentication system, subject to temporary
                technical backups/logs maintained by our service providers.
              </p>
              <p className="text-sm text-muted leading-relaxed">
                <span className="font-semibold text-foreground">Discontinuation of the Service by Operator:</span>{" "}
                We reserve the right to modify, suspend, or permanently discontinue the Service (in whole or in
                part) at any time, without advance notice and without any obligation to continue operating or
                maintaining the Service.
              </p>
              <p className="text-sm text-muted leading-relaxed">
                <span className="font-semibold text-foreground">Suspension or Termination of an Account:</span> We
                may suspend or terminate access to an account if we reasonably believe there has been a breach of
                these Terms, misuse or security risk to the Service, or a legal requirement to do so. Where
                reasonable and safe to do so, we will notify you and provide an opportunity to address the issue.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">8. Changes to These Terms</h2>
              <p className="text-sm text-muted leading-relaxed">
                We may update these Terms from time to time to reflect changes in the Service or applicable law.
                When we make material changes, we will update the "Last Updated" date and provide notice in the
                Service or on our website. Continued use of the Service after updated Terms take effect constitutes
                acceptance, except where applicable law requires explicit consent.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">9. Governing Law & Contact</h2>
              <p className="text-sm text-muted leading-relaxed">
                These Terms are governed by applicable law, without prejudice to any mandatory consumer protection
                rights that apply to you in your country of residence.
              </p>
              <p className="text-sm text-muted leading-relaxed">
                For questions, support, or legal notices, contact:
                <br />
                Operator: Dusan Gacic
                <br />
                Email:{" "}
                <a href="mailto:support@adiosugar.com" className="text-primary hover:underline">
                  support@adiosugar.com
                </a>
                <br />
                Website:{" "}
                <a
                  href="https://adiosugar.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://adiosugar.com
                </a>
                <br />
                Privacy Policy:{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  https://adiosugar.com/privacy
                </Link>
                <br />
                Account Deletion:{" "}
                <Link href="/delete-account" className="text-primary hover:underline">
                  https://adiosugar.com/delete-account
                </Link>
              </p>
            </section>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted">© 2026 AdioSugar. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}