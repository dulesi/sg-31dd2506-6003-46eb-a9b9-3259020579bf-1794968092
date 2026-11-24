---
title: AdioSugar Homepage (/)
status: done
priority: urgent
type: feature
tags: [marketing, homepage, routing]
created_by: agent
created_at: 2026-11-24T23:23:00Z
position: 5
---
## Notes
Create and register a new home page on root route `/`. Must not modify existing routes (/404, /app, /email-confirmed, /privacy, /quiz, /reset-password, /terms). No "AI" wording anywhere. No pricing/checkout on this page. Fully responsive 360px-1440px+. Design tokens: background #FAFAFA, card #FFFFFF, border #E5E7EB, foreground #111827, muted #4B5563, primary emerald #10B981 (hover #059669).

Sections required: Sticky nav, Hero (2-col), How It Works (3 cards), Features (2x2), Comparison (crash diet vs AdioSugar), FAQ accordion, Final CTA banner, Footer (multi-column).

## Checklist
- [x] Create src/components/home/HomeNav.tsx - sticky nav, logo, anchor links, mobile menu, Sign In -> /app, Quiz CTA -> /quiz
- [x] Create src/components/home/HomeHero.tsx - badge, H1, subheading, CTAs, phone mockup preview (Day 12/30, streak, panic button, energy stability)
- [x] Create src/components/home/HomeHowItWorks.tsx - 3 step cards with badges 01/02/03
- [x] Create src/components/home/HomeFeatures.tsx - 2x2 grid, 4 feature cards
- [x] Create src/components/home/HomeComparison.tsx - side by side crash restriction vs AdioSugar system
- [x] Create src/components/home/HomeFAQ.tsx - accordion with 4 Q&A
- [x] Create src/components/home/HomeCTA.tsx - final banner with quiz CTA
- [x] Create src/components/home/HomeFooter.tsx - brand/nav/legal columns
- [x] Create src/pages/index.tsx composing all sections with SEO
- [x] Verify no broken links, no AI wording, check_for_errors clean

## Acceptance
- Visiting / shows full marketing homepage with working nav, quiz CTA to /quiz, sign in CTA to /app, footer links to /privacy /terms /reset-password all functional, no console/build errors.