---
title: Tab 2 (Craving Coach & Emergency System)
status: done
priority: high
type: feature
tags: [craving-coach, emergency]
created_by: agent
created_at: 2026-10-19T23:45:49Z
position: 2
---

## Notes
Ovo je interaktivni flow koji se aktivira kada korisnik klikne na PANIC dugme ili pređe na Tab 2 ("Craving Coach"). UI treba da vodi korisnika kroz 3 brza koraka da prevaziđe želju za slatkišima. Tekst mora biti na engleskom.

## Checklist
- [ ] Napraviti Step 1 ekran: "What is triggering this craving right now?" sa 5 opcija i ikonicama (Hunger, Stress, Fatigue, Boredom, Habit). Prikazati kao grid.
- [ ] Napraviti Step 2 ekran: "How strong is the impulse?" sa 4 nivoa intenziteta (Mild, Moderate, Strong, EMERGENCY!). Boje bedževa treba da prate intenzitet (zelena do crvene).
- [ ] Napraviti Step 3 ekran: Taktički protokol (Tactical Relief Protocol). Na osnovu odgovora prikazati jedan jasan akcioni korak (npr. "Drink 1 large glass of ice-cold water...").
- [ ] Na Step 3 ekranu dodati sekundarno dugme ispod glavnog saveta: [ I DON'T HAVE THIS AT HOME ].
- [ ] Povezati logiku sekundarnog dugmeta: Klik na njega trenutno menja savet i generiše alternativu bez sastojaka (npr. "60-Second Expanding Circle Breathing Exercise" ili "10 Jump-Squats").
- [ ] Osigurati da klik na PANIC dugme iz Taba 1 direktno prebacuje korisnika na Step 1 ovog flow-a.

## Acceptance
Korisnik može u 3 klika od PANIC dugmeta da dobije konkretan savet. Dugme "I don't have this at home" uspešno menja predloženi savet.