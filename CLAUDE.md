# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application called "dsw-unify" bootstrapped with `create-next-app`. It uses:
- **Next.js 15.5.6** with App Router
- **React 19.1.0**
- **Tailwind CSS v4** (using @tailwindcss/postcss)
- **ESLint 9** with Next.js config

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

## Project Structure

This project follows Next.js 15 App Router conventions:

```
src/
  app/                 # App Router directory
    layout.js          # Root layout with Geist fonts
    page.js            # Home page component
    globals.css        # Global styles with Tailwind v4
    favicon.ico        # Site favicon

public/                # Static assets (served from root)

design-screens/        # Design mockups for the application
                       # Contains UI designs for various features:
                       # - Agents (creation, API, customer support)
                       # - LLMs (model selection, finetuning)
                       # - Knowledge Bases, Guardrails, Memories
                       # - Prompt Library (templates, prompts)
                       # - Testing (suites, results, analytics)
                       # - Tools management
```

### Path Aliases
- `@/*` maps to `./src/*` (configured in jsconfig.json)

## Component Library

This project uses **shadcn/ui** as the primary component library:
- **Style**: New York variant
- **Configuration**: `components.json` at project root
- **Components Path**: `@/components/ui`
- **Icon Library**: Lucide React
- **Installation**: `npx shadcn@latest add [component-name]`
- **Registry**: Uses default shadcn/ui registry

### Component Aliases
- `@/components` - Main components directory
- `@/components/ui` - shadcn/ui components
- `@/lib/utils` - Utility functions (including cn for className merging)
- `@/hooks` - Custom React hooks

### Usage Guidelines
- **Always prefer shadcn components** when available instead of building from scratch
- Use the New York style variant for consistency
- Leverage Radix UI primitives (pre-installed via shadcn)
- Combine with Tailwind CSS for custom styling

## Styling

This project uses **Tailwind CSS v4** (latest version):
- Uses `@import "tailwindcss"` in globals.css (v4 syntax)
- Custom CSS variables for theming (`--background`, `--foreground`)
- Font variables from next/font (`--font-geist-sans`, `--font-geist-mono`)
- Automatic dark mode based on system preferences
- PostCSS configured with @tailwindcss/postcss plugin
- **Base Color**: Neutral (for shadcn components)

## Key Technologies

### Fonts
- Uses Next.js optimized fonts (next/font/google)
- Geist Sans and Geist Mono fonts are configured in layout.js

### ESLint Configuration
- Uses flat config format (eslint.config.mjs)
- Extends "next/core-web-vitals"
- Ignores: node_modules, .next, out, build, next-env.d.ts

## Design Context

The `design-screens/` directory contains comprehensive UI mockups that outline the intended application features. These designs suggest this will be an AI/LLM platform with capabilities for:
- Agent management and deployment
- LLM selection and fine-tuning
- Knowledge base integration
- Prompt management and templates
- Testing and analytics
- Guardrails and safety features

Reference these designs when implementing new features to maintain consistency with the intended UX.
