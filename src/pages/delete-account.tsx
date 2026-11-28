import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, Mail, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SEO } from "@/components/SEO";

const MAILTO_LINK =
  "mailto:support@adiosugar.com?subject=AdioSugar%20Account%20Deletion%20Request";

export default function DeleteAccount() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    const body = encodeURIComponent(
      "Please permanently delete my AdioSugar account and all associated data for the following registered email address:\n\n" +
        email.trim()
    );
    window.location.href = `mailto:support@adiosugar.com?subject=AdioSugar%20Account%20Deletion%20Request&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      <SEO
        title="AdioSugar - Account & Data Deletion"
        description="Learn how to permanently delete your AdioSugar account and all associated personal data."
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
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-destructive/10">
              <Trash2 className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Account & Data Deletion
              </h1>
              <p className="text-sm text-muted-foreground">AdioSugar</p>
            </div>
          </div>

          <Card className="rounded-2xl shadow-md mt-6">
            <CardContent className="p-6 sm:p-8">
              <p className="text-sm sm:text-base leading-relaxed text-foreground">
                This page explains how to permanently delete your AdioSugar
                (com.adiosugar.twa / https://adiosugar.com) account and all
                associated personal data.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md mt-6">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">
                Option 1: Instant Self-Service Deletion Inside the App (Recommended)
              </h2>
              <ol className="list-decimal list-inside space-y-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                <li>
                  Open the AdioSugar Android app or visit{" "}
                  <Link href="/app" className="text-primary font-medium underline">
                    https://adiosugar.com/app
                  </Link>{" "}
                  and sign in.
                </li>
                <li>Open your Account tab/settings.</li>
                <li>Tap &quot;Delete account&quot; and confirm.</li>
                <li>
                  Your account, email address, display name/nickname, quiz
                  responses, and daily habit/streak logs are permanently
                  erased immediately from our active database and
                  authentication system.
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md mt-6">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">
                Option 2: Request Deletion via Web / Email (If You No Longer Have App Access)
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-4">
                If you have uninstalled the app or cannot sign in, you can
                request permanent account deletion externally:
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-2">
                Send an email to support@adiosugar.com from the email address
                registered with your AdioSugar account with the subject line:{" "}
                <span className="font-semibold text-foreground">
                  AdioSugar Account Deletion Request
                </span>
                .
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-6">
                Once we verify ownership of the email address, we will
                permanently delete your account and all associated profile,
                quiz, and habit records from our active database and confirm
                completion by email.
              </p>

              <a href={MAILTO_LINK} className="block mb-6">
                <Button className="w-full h-12 rounded-2xl text-base font-semibold" variant="destructive">
                  <Mail className="w-5 h-5 mr-2" />
                  Email support@adiosugar.com
                </Button>
              </a>

              <div className="border-t border-border pt-6">
                <p className="text-sm font-medium text-foreground mb-3">
                  Or confirm your registered email below to open a pre-filled deletion request:
                </p>
                {submitted ? (
                  <div className="flex items-start gap-3 rounded-2xl bg-primary/10 p-4">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-foreground leading-relaxed">
                      Your email app should now be open with a pre-filled
                      deletion request to support@adiosugar.com. If it did not
                      open, email us directly with your registered address.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <Label htmlFor="delete-email" className="text-sm text-muted-foreground">
                      Email registered with your AdioSugar account
                    </Label>
                    <Input
                      id="delete-email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-2xl"
                    />
                    <Button
                      type="submit"
                      className="w-full h-12 rounded-2xl text-base font-semibold"
                      variant="outline"
                    >
                      Send Deletion Request
                    </Button>
                  </form>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md mt-6">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">
                What Data Is Deleted vs. Retained
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">
                    Permanently Deleted:
                  </span>{" "}
                  Email address, authentication account, optional display
                  name/nickname, quiz answers, craving check-ins, and
                  habit/streak logs.
                </p>
                <p>
                  <span className="font-semibold text-foreground">
                    Temporary Technical Retention:
                  </span>{" "}
                  Residual copies in automated infrastructure backups and
                  short-term server security logs (Supabase/Vercel) are
                  retained only temporarily in accordance with standard
                  provider retention cycles before being automatically
                  overwritten or purged.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-10 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Operator: Dusan Gacic | Contact: support@adiosugar.com
            </p>
            <p className="text-sm text-muted-foreground">
              &copy; 2026 AdioSugar. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}