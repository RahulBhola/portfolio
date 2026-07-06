# Rahul Bhola — 3D Developer Portfolio

Premium enterprise-grade portfolio built with Next.js 15, Three.js, Framer Motion, and GSAP.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **3D:** Three.js, React Three Fiber, Drei
- **Animation:** Framer Motion, GSAP, Lenis Smooth Scroll
- **UI:** Shadcn-style components, Lucide Icons
- **Contact:** EmailJS
- **API:** GitHub REST API

## Installation

```bash
# Clone and enter the project
cd portfolio2

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create `.env.local` from `.env.example`:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `GITHUB_TOKEN` | Optional GitHub PAT for higher API rate limits |

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Project Structure

```
src/
├── app/
│   ├── api/github/route.ts    # GitHub stats API
│   ├── globals.css            # Design system & Tailwind
│   ├── layout.tsx             # Root layout & SEO metadata
│   └── page.tsx               # Main page with lazy-loaded sections
├── components/
│   ├── 3d/
│   │   ├── Globe.tsx          # Interactive 3D globe with markers
│   │   ├── HeroScene.tsx      # Hero canvas composition
│   │   ├── Particles.tsx      # Particle background system
│   │   ├── SkillsGalaxy.tsx   # 3D skills node galaxy
│   │   └── TechOrbit.tsx      # Orbiting tech icons
│   ├── layout/
│   │   ├── CursorGlow.tsx     # Custom cursor glow effect
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── Providers.tsx      # Client-side providers wrapper
│   │   ├── SmoothScroll.tsx   # Lenis smooth scroll
│   │   └── TerminalMode.tsx   # Hidden terminal navigation
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── Certifications.tsx
│   │   ├── Contact.tsx
│   │   ├── Experience.tsx
│   │   ├── GitHub.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   └── ui/
│       ├── brand-icons.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── magnetic-button.tsx
│       ├── section-heading.tsx
│       └── textarea.tsx
├── hooks/
│   ├── useMagnetic.ts
│   ├── useMediaQuery.ts
│   └── useTerminal.ts
├── lib/
│   ├── emailjs.ts
│   └── utils.ts
├── data/
│   ├── about.ts
│   ├── certifications.ts
│   ├── experience.ts
│   ├── profile.ts
│   ├── projects.ts
│   └── skills.ts
├── animations/
│   ├── framer.ts
│   └── gsap.ts
├── constants/
│   ├── colors.ts
│   └── navigation.ts
└── types/
    └── index.ts
```

## Features

- **3D Hero** — Interactive globe with India/USA markers, orbiting tech icons, particle system
- **Skills Galaxy** — Clickable 3D skill nodes with detail panel
- **Scroll Animations** — GSAP ScrollTrigger + Framer Motion stagger reveals
- **Project Cards** — 3D tilt hover effects with live demo & GitHub links
- **GitHub Integration** — Live repo stats, languages, contribution graph
- **Contact Form** — EmailJS with success animation (mailto fallback)
- **Terminal Mode** — Press `Ctrl+`` ` and type commands (`about`, `skills`, `projects`, `resume`, `contact`)
- **Responsive** — Reduced 3D complexity on mobile devices
- **Performance** — Dynamic imports, Suspense, code splitting

## Terminal Commands

| Command | Action |
|---|---|
| `about` | Scroll to About |
| `skills` | Scroll to Skills |
| `projects` | Scroll to Projects |
| `experience` | Scroll to Experience |
| `certifications` | Scroll to Certifications |
| `github` | Scroll to GitHub |
| `contact` | Scroll to Contact |
| `resume` | Open resume PDF |
| `help` | Show commands |
| `clear` | Clear terminal |

## Customization

- **Profile data:** `src/data/profile.ts`
- **Projects:** `src/data/projects.ts`
- **Skills:** `src/data/skills.ts`
- **Experience:** `src/data/experience.ts`
- **Certifications:** `src/data/certifications.ts`
- **Colors:** `src/constants/colors.ts` and `src/app/globals.css`
- **Resume:** Replace `public/resume.pdf`

## Dependencies

```json
{
  "dependencies": {
    "next": "16.2.9",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "framer-motion": "latest",
    "gsap": "latest",
    "three": "latest",
    "@react-three/fiber": "latest",
    "@react-three/drei": "latest",
    "lenis": "latest",
    "lucide-react": "latest",
    "@emailjs/browser": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest",
    "class-variance-authority": "latest",
    "@radix-ui/react-slot": "latest",
    "@radix-ui/react-label": "latest",
    "@radix-ui/react-dialog": "latest"
  },
  "devDependencies": {
    "@types/three": "latest",
    "typescript": "latest",
    "tailwindcss": "latest",
    "@tailwindcss/postcss": "latest"
  }
}
```

## License

Private — © Rahul Bhola
