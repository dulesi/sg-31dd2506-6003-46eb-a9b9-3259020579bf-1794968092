---
title: AdioSugar Mobile-First App
---

## Vision
AdioSugar je premium web aplikacija za 30-dnevni program odvikavanja od šećera (sugar detox), dizajnirana isključivo za mobilne uređaje (mobile-first web app). Fokusirana je na metaboličko zdravlje, stabilnu energiju i psihološku podršku protiv žudnje za šećerom. Ciljno tržište je globalno, na engleskom jeziku.

## Design
- **--primary**: 160 84% 39% (Emerald Green - za uspehe i streak)
- **--background**: 210 33% 98% (Soft Off-White - pozadina aplikacije)
- **--foreground**: 222 47% 11% (Deep Slate - glavni tekst i naslovi)
- **--muted**: 215 16% 47% (Muted Grey - sporedni tekst)
- **--accent**: 38 92% 50% (Warm Amber - za prekretnice/milestones)
- **--destructive**: 0 84% 60% (Coral Red - za PANIC dugme)
- **--card**: 0 0% 100% (Pure White)
- **Fonts**: Inter (ili sličan čist sans-serif) za naslove i tekst, visoka čitljivost.
- **Style**: Čist Health-Tech minimalizam. Kartice su potpuno bele sa blagom senkom (`shadow-md`) i zaobljenim ivicama (`rounded-2xl`). Dugmići trebaju biti veliki, laki za dodir prstom (touch-friendly). Interfejs simulira native mobilnu aplikaciju.

## Features
1. Fiksna donja navigacija (Bottom Nav Bar) sa 4 taba.
2. Dashboard sa kružnim prikazom progresa i velikim PANIC dugmetom.
3. Craving Coach sistem za hitne intervencije kroz 3 koraka.
4. Timeline oporavka tela i interaktivna šoping lista.
5. Account sekcija sa opcijom za besplatan restart programa.

*Napomena za backend: Dok se ne poveže Supabase Auth i Database za email login i čitanje web quiz podataka, state programa (streak, check-ins, odabrani podaci) će se čuvati u lokalnoj memoriji (localStorage).*