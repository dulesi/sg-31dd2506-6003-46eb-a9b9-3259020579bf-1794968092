---
title: AdioSugar Homepage (/)
status: in_progress
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
- [ ] Create src/components/home/HomeNav.tsx - sticky nav, logo, anchor links, mobile menu, Sign In -> /app, Quiz CTA -> /quiz
- [ ] Create src/components/home/HomeHero.tsx - badge, H1, subheading, CTAs, phone mockup preview (Day 12/30, streak, panic button, energy stability)
- [ ] Create src/components/home/HomeHowItWorks.tsx - 3 step cards with badges 01/02/03
- [ ] Create src/components/home/HomeFeatures.tsx - 2x2 grid, 4 feature cards
- [ ] Create src/components/home/HomeComparison.tsx - side by side crash restriction vs AdioSugar system
- [ ] Create src/components/home/HomeFAQ.tsx - accordion with 4 Q&A
- [ ] Create src/components/home/HomeCTA.tsx - final banner with quiz CTA
- [ ] Create src/components/home/HomeFooter.tsx - brand/nav/legal columns
- [ ] Create src/pages/index.tsx composing all sections with SEO
- [ ] Verify no broken links, no AI wording, check_for_errors clean

## Acceptance
- Visiting / shows full marketing homepage with working nav, quiz CTA to /quiz, sign in CTA to /app, footer links to /privacy /terms /reset-password all functional, no console/build errors.