"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * AuthLayout component that provides a split-screen layout for authentication pages
 *
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The content to be rendered in the form area
 * @param {string} props.title - The title to display above the form
 * @param {string} [props.subtitle] - Optional subtitle below the title
 * @returns {React.JSX.Element} The rendered AuthLayout component
 */
export function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Side - Background Image with Overlay */}
      <div className="relative h-48 w-full md:h-screen md:w-1/2 p-3">
        <div className="w-full h-full relative rounded-2xl overflow-hidden">
        {/* Background Image */}
        <Image
          src="/login-img/login-bg.png"
          alt="Login Background"
          fill
          className="object-cover"
          priority
        />
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16">
          <div className="max-w-md text-white">
            <p className="text-lg md:text-xl font-normal leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form Content */}
      <div className="flex min-h-screen w-full flex-col bg-background md:w-1/2">
        {/* Logo and Title */}
        <div className="flex items-center justify-center gap-3 p-6 md:p-8">
          <Image
            src="/unify-logo.png"
            alt="UnifyAI Logo"
            width={56}
            height={56}
            // className="rounded-xl"
          />
          <span className="text-2xl font-semibold text-foreground">UnifyAI</span>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-md space-y-6">
            {/* Title and Subtitle */}
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-semibold text-foreground md:text-4xl">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-muted-foreground md:text-base">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Form Content */}
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 text-center md:p-8">
          <p className="text-xs text-muted-foreground">
            Trademark Copyright © Data Science Wizards
          </p>
        </div>
      </div>
    </div>
  );
}
