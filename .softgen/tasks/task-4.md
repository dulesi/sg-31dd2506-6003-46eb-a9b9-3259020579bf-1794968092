---
title: Tab 4 (Account & Program Guarantees)
status: done
priority: low
type: feature
tags: [account, reset]
created_by: agent
created_at: 2026-10-19T23:45:49Z
position: 4
---

## Notes
Završni tab za podešavanja i resetovanje programa. Ovde stoji i informacija o povezanosti sa web quiz bazom. Tekst na engleskom.

## Checklist
- [ ] Kreirati prikaz profila i "Sync Status" indikator (trenutno može pisati "Local Mode" ili "Connected to Web Quiz Data").
- [ ] Prikazati trenutni status programa (npr. "30-Day Transformation Active").
- [ ] Kreirati veliku karticu "FREE RESTART GUARANTEE" / "Our Commitment to You".
- [ ] Dodati dugme [ RESTART MY 30 DAYS FOR FREE ].
- [ ] Implementirati logiku reseta: Klik na restart dugme (uz prozor za potvrdu) resetuje trenutni streak i dan na 0/1 u lokalnoj memoriji.
- [ ] Nakon reseta, korisnik se automatski prebacuje nazad na Tab 1 (Dashboard).

## Acceptance
Tab prikazuje podatke o profilu. Klik na Restart dugme vraća celokupan progres na početak i vraća korisnika na početni ekran.