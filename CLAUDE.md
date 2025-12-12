# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Unify Agentic AI** is a comprehensive platform for building, deploying, and managing autonomous AI agents. This is a Next.js 15 application with:
- **Next.js 15.5.7** with App Router
- **React 19.1.0**
- **Tailwind CSS v4** (using @tailwindcss/postcss)
- **ESLint 9** with flat config

## Development Commands

### Running the Application
```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Create production build
npm start            # Start production server
```

### Code Quality
```bash
npm run lint         # Run ESLint
```

## Architecture

### Application Structure

The application follows a **feature-based routing structure** using Next.js App Router. All routes use a shared layout pattern (`AppLayout`) that provides:
- Consistent sidebar navigation (`AppSidebar`)
- Unified header (`Header`)
- Theme support (light/dark mode via `next-themes`)

### Main Feature Modules

```
src/app/
  ├── (auth)/                # Authentication route group (no sidebar/header)
  │   ├── layout.jsx         # Minimal auth layout
  │   ├── login/             # Login page → redirects to /dashboard
  │   └── forgot-password/   # Password recovery flow
  │       ├── page.jsx       # Email input step
  │       ├── verify-code/   # OTP verification step
  │       └── change-password/ # Password reset step
  │
  ├── dashboard/             # Main dashboard (original home page)
  │   └── page.jsx           # Dashboard with metrics and feature cards
  │
  ├── agent-studio/          # AI agent management
  │   ├── agents/            # Agent CRUD (list, create, [id])
  │   ├── llms/              # LLM selection & fine-tuning
  │   ├── prompts/           # Prompt library & templates
  │   ├── knowledge-bases/   # Knowledge base management
  │   ├── tools/             # Tool integrations
  │   ├── memories/          # Memory storage
  │   ├── guardrails/        # Safety & constraint rules
  │   └── testing/           # Agent testing suites
  │
  ├── ai-studio/             # Model development & inference
  │   ├── quick-start/       # Getting started flows
  │   ├── use-cases/         # Use case templates ([id] routes)
  │   ├── inference/         # Model inference
  │   └── monitoring/        # Model monitoring
  │
  ├── data-engineering/      # Data pipelines
  │   ├── data-ingestion/    # Data ingestion tools
  │   └── data-explorer/     # Data exploration UI
  │
  ├── feature-store/         # ML feature management
  │   ├── feature-transformations/
  │   ├── feature-views/
  │   └── feature-services/
  │
  └── console/               # Central dashboard
```

**Note**: The root `/` route automatically redirects to `/login`, creating a login-first user experience.

### Component Organization

Components are organized by purpose:
- **`src/components/ui/`** - shadcn/ui components (Button, Card, Dialog, etc.)
- **`src/components/auth/`** - Authentication-specific components:
  - `auth-layout.jsx` - Split-screen layout for auth pages (left: background image, right: form)
  - `password-input.jsx` - Password field with visibility toggle
  - `otp-input.jsx` - 4-digit OTP input with auto-focus
  - `return-to-login-button.jsx` - Circular back button
- **`src/components/`** - Feature-specific components:
  - `app-layout.jsx` - Main application wrapper (sidebar + header)
  - `appsidebar.jsx` - Navigation sidebar with collapsible sections
  - `header.jsx`, `headerdark.jsx` - Page headers
  - Feature cards: `agent-card.jsx`, `prompt-card.jsx`, `LLMCard.jsx`, etc.
  - Modals: `CreatePromptModal.jsx`, `api-endpoint-modal.jsx`

### Utilities & Hooks

- **`src/lib/utils.js`** - Contains `cn()` utility for className merging (clsx + tailwind-merge)
- **`src/lib/get-strict-context.jsx`** - Context utilities
- **`src/hooks/`** - Custom React hooks:
  - `use-mobile.js` - Mobile detection
  - `use-is-in-view.jsx` - Viewport intersection observer
  - `use-controlled-state.jsx` - Controlled state management

### Path Aliases
- `@/*` maps to `./src/*` (configured in jsconfig.json)

## Component Library

This project uses **shadcn/ui** with custom registries:
- **Style**: New York variant
- **Configuration**: `components.json` at project root
- **Components Path**: `@/components/ui`
- **Icon Library**: Lucide React
- **Base Color**: Neutral

### Custom Registries
In addition to the default shadcn registry, the project uses:
- `@animate-ui` - Animation components (https://animate-ui.com)
- `@shadcn-studio` - Extended shadcn components
- `@ss-components`, `@ss-blocks`, `@ss-themes` - Shadcn Studio registry

### Adding Components
```bash
npx shadcn@latest add [component-name]
```

### Component Aliases
- `@/components` - Main components directory
- `@/components/ui` - shadcn/ui components
- `@/lib/utils` - Utility functions (cn for className merging)
- `@/hooks` - Custom React hooks

### Usage Guidelines
- **Always prefer shadcn components** when available instead of building from scratch
- Use the New York style variant for consistency
- Leverage Radix UI primitives (pre-installed via shadcn)
- Combine with Tailwind CSS for custom styling

## Styling & Theming

### Tailwind CSS v4
- Uses `@import "tailwindcss"` in globals.css (v4 syntax)
- Uses `@import "tw-animate-css"` for animation utilities
- PostCSS configured with `@tailwindcss/postcss` plugin

### Theme System
- **Theme Provider**: `next-themes` for dark/light mode
- **Default Theme**: Light
- **Custom CSS Variables**: Extensive color system defined in `:root` and `.dark`
  - Primary color: `#f76809` (orange accent)
  - Custom badge colors: green, yellow, blue, mint, gray, sea-green
  - Sidebar-specific variables
  - Border and icon color variants

### Font Configuration
- **Primary Font**: Inter (Google Fonts) loaded via next/font
- Font variable: `--font-inter`
- Weights: 400, 500, 600, 700
- Fallbacks: system-ui, sans-serif

### Custom Styles
- **Custom scrollbar** styling (orange primary color)
- **`.customScrollbar`** class hides scrollbar
- **`.no-sidebar-scrollbar`** hides sidebar scrollbar
- **`.feature-card-hover-container`** - Gradient hover effect with `/bg-hover2.png`
- **`.animate-fade-in`** - Custom fade-in animation

## Key Technologies

### Core Dependencies
- **Next.js** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS v4** - Utility-first CSS
- **Radix UI** - Accessible UI primitives (Avatar, Dialog, Dropdown, Select, Tabs, etc.)
- **Lucide React** - Icon library
- **Framer Motion** - Animation library
- **Recharts** - Charting library
- **next-themes** - Theme management

### Utility Libraries
- **clsx** & **tailwind-merge** - ClassName utilities
- **class-variance-authority** - Variant management

## ESLint Configuration

- Uses flat config format (`eslint.config.mjs`)
- Extends `next/core-web-vitals`
- Uses `@eslint/eslintrc` FlatCompat for compatibility
- **Ignored paths**: node_modules, .next, out, build, next-env.d.ts

## Page Layout Patterns

### Authenticated Pages (with sidebar/header)
Most feature pages use `AppLayout`:
```jsx
import { AppLayout } from "@/components/app-layout";

export default function Page() {
  return (
    <AppLayout title="Feature Name">
      {/* Your page content */}
    </AppLayout>
  );
}
```

### Authentication Pages (full-screen)
Auth pages use `AuthLayout` for split-screen design:
```jsx
import { AuthLayout } from "@/components/auth/auth-layout";

export default function AuthPage() {
  return (
    <AuthLayout
      title="Page Title"
      subtitle="Optional subtitle"
    >
      {/* Your form content */}
    </AuthLayout>
  );
}
```

## Authentication Flow

The application uses a **login-first approach** with UI-only authentication (no backend integration yet):

### Route Protection
- Root `/` → automatically redirects to `/login`
- After login → redirects to `/dashboard`
- Auth pages use the `(auth)` route group with minimal layout

### Navigation Flow
```
/ → /login (auto-redirect)
/login → /dashboard (after login)
/login → /forgot-password (forgot password link)
/forgot-password → /forgot-password/verify-code (send code)
/forgot-password/verify-code → /forgot-password/change-password (verify OTP)
/forgot-password/change-password → /login (after password change)
```

### Auth Components
- **AuthLayout**: Split-screen layout with rounded background image (left) and form area (right)
- **PasswordInput**: Reusable password field with Eye/EyeOff toggle
- **OTPInput**: 4-digit input with auto-focus, auto-advance, and paste support
- **ReturnToLoginButton**: Circular back button that navigates to `/login`

### Form Validation
All auth forms include client-side validation:
- Email format validation
- Password length requirements
- Password matching (change password)
- OTP digit validation
- Error messages displayed below fields

## Design References

The `design-screens/` directory contains UI mockups for the platform's intended features. Reference these when implementing new features to maintain design consistency.
