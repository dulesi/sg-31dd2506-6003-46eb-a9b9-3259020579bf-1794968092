---
title: Mobile Shell & Tab 1 (Dashboard)
status: todo
priority: urgent
type: feature
tags: [layout, dashboard, tracker]
created_by: agent
position: 1
---

## Notes
Ovo je osnovna struktura aplikacije. Svi ekrani treba da se renderuju unutar mobilnog prikaza sa fiksnom donjom navigacijom (Bottom Navigation Bar), simulirajući native app. Prvi tab je "Progress" (Dashboard). Tekst u UI-u mora biti na engleskom.

## Checklist
- [ ] Implementirati osnovni mobile-first layout (maksimalna širina, centrirano na većim ekranima, pozadina Soft Off-White).
- [ ] Dodati fiksni donji navigacioni meni sa 4 ikonice: Progress, Coach, Health, Account.
- [ ] Napraviti Top Bar u Progress tabu: AdioSugar logo, avatar korisnika i status bedž.
- [ ] Kreirati glavnu "30-Day Sugar-Free Challenge" karticu sa velikim kružnim prikazom napretka (npr. "Day 14 of 30") i indikatorom rekorda (best streak).
- [ ] Dodati PRIMARY ACTION WIDGET: Veliko Coral Red (crveno) dugme u sredini sa tekstom "PANIC! I WANT SUGAR" i podtekstom "Click for instant help" (sa blagim pulsirajućim efektom).
- [ ] Kreirati "Daily Check-in" karticu sa pitanjem "Did you stay sugar-free today?" i dva velika dugmeta: [ YES, I DID IT! ] i [ I SLIPPED UP ].
- [ ] Logika check-ina: Klik na YES povećava streak i prikazuje konfete; klik na I SLIPPED UP prikazuje overlay poruku ohrabrenja ("No-Judgment Reset") bez kazne.
- [ ] Dodati "Daily Anti-Craving Hack" swipe-abilnu karticu na dnu sa jednim psihološkim trikom od 15 sekundi.

## Acceptance
Aplikacija izgleda kao mobilna aplikacija. Donja navigacija omogućava prelazak između tabova. Kružni progres se menja kada korisnik klikne "YES". PANIC dugme je jako uočljivo.