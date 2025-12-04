# Unify Agentic AI

Unify Agentic AI is a comprehensive platform for building, deploying, and managing autonomous AI agents. This repository contains the frontend application built with Next.js, offering a rich user interface for managing various aspects of the AI lifecycle, including data engineering, feature stores, AI studios, and agent management.

## Features

- **Data Engineering**: Tools for data ingestion, exploration, visualization, and validation.
- **Feature Store**: Manage feature transformations, views, and services.
- **AI Studio**: A suite for quick starts, use cases, model development, monitoring, and inference.
- **Agent Studio**: Build and manage agents, prompts, LLMs, knowledge bases, tools, memories, guardrails, and testing.
- **Workflow Builder**: Design complex workflows integrating agents and models.
- **Console**: Centralized dashboard for monitoring and management.

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm, yarn, pnpm, or bun

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd dsw-unify
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

### Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

To start the production server:

```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```

## Project Structure

- `src/app`: Contains the Next.js app router pages and layouts.
- `src/components`: Reusable React components organized by feature (e.g., `agent-studio`, `feature-store`, `ui`).
- `src/hooks`: Custom React hooks.
- `src/lib`: Utility functions and libraries.
- `public`: Static assets like images and icons.

## Documentation

The codebase is thoroughly documented with JSDoc comments. You can explore individual component files to understand their props and functionality.

## Technologies Used

- [Next.js](https://nextjs.org) - React framework for production.
- [React](https://reactjs.org) - JavaScript library for building user interfaces.
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework.
- [Radix UI](https://www.radix-ui.com) - Unstyled, accessible UI primitives.
- [Framer Motion](https://www.framer.com/motion) - Animation library for React.
- [Recharts](https://recharts.org) - Composable charting library for React.
- [Lucide React](https://lucide.dev) - Icon library.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
