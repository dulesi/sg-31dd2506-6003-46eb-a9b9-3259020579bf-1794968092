import Link from "next/link"

export function HomeFooter() {
  return (
    <footer className="bg-background pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 font-serif text-xl font-bold text-foreground mb-4">
              <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm">A</span>
              AdioSugar
            </div>
            <p className="text-muted text-sm leading-relaxed mb-2 max-w-xs">
              Practical daily habit and sugar-reset guidance for steadier energy and better control.
            </p>
            <p className="text-muted text-xs">Educational wellness tool only — not medical advice.</p>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4 text-sm tracking-wide">NAVIGATION</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-muted hover:text-primary">Home</Link></li>
              <li><Link href="/quiz" className="text-muted hover:text-primary">60-Second Quiz</Link></li>
              <li><Link href="/app" className="text-muted hover:text-primary">Member Sign In</Link></li>
              <li><a href="#faq" className="text-muted hover:text-primary">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4 text-sm tracking-wide">LEGAL &amp; SUPPORT</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy" className="text-muted hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted hover:text-primary">Terms of Service</Link></li>
              <li><Link href="/reset-password" className="text-muted hover:text-primary">Password Reset</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-sm text-muted">© 2026 AdioSugar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}