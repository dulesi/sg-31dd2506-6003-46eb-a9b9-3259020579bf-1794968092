import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HomeNav() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "FAQ", href: "#faq" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-foreground">
            <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm">A</span>
            AdioSugar
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/app" className="text-sm font-semibold text-foreground hover:text-primary transition-colors px-3 py-2">
              Sign In
            </Link>
            <Link href="/quiz">
              <Button className="rounded-full bg-primary hover:bg-[#059669] text-primary-foreground font-semibold px-5">
                Take the 60-Second Quiz
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-6 space-y-1 border-t border-border pt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-2 py-3 text-base font-medium text-foreground hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/app"
              onClick={() => setIsOpen(false)}
              className="block px-2 py-3 text-base font-semibold text-foreground"
            >
              Sign In
            </Link>
            <Link href="/quiz" onClick={() => setIsOpen(false)} className="block pt-2">
              <Button className="w-full rounded-full bg-primary hover:bg-[#059669] text-primary-foreground font-semibold">
                Take the 60-Second Quiz
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}