'use client';;
import * as React from 'react';
import { useTheme } from 'next-themes';
import { Monitor, Moon, Sun } from 'lucide-react';

import { ThemeToggler as ThemeTogglerPrimitive } from '@/components/animate-ui/primitives/effects/theme-toggler';
import { buttonVariants } from '@/components/animate-ui/components/buttons/icon';
import { cn } from '@/lib/utils';

const getIcon = (
  effective,
  resolved,
  modes,
) => {
  const theme = modes.includes('system') ? effective : resolved;
  return theme === 'system' ? (
    <Monitor />
  ) : theme === 'dark' ? (
    <Moon />
  ) : (
    <Sun />
  );
};

const getNextTheme = (effective, modes) => {
  const i = modes.indexOf(effective);
  if (i === -1) return modes[0];
  return modes[(i + 1) % modes.length];
};

/**
 * Button component to toggle between light, dark, and system themes.
 *
 * @param {Object} props - The component props.
 * @param {"default"|"accent"|"destructive"|"outline"|"secondary"|"ghost"|"link"} [props.variant="default"] - The button variant.
 * @param {"default"|"xs"|"sm"|"lg"} [props.size="default"] - The button size.
 * @param {Array<"light"|"dark"|"system">} [props.modes=['light', 'dark', 'system']] - The available theme modes.
 * @param {"ltr"|"rtl"} [props.direction="ltr"] - The animation direction.
 * @param {function} [props.onImmediateChange] - Callback fired immediately upon theme change request.
 * @param {function} [props.onClick] - Click handler for the button.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered ThemeTogglerButton component.
 */
function ThemeTogglerButton({
  variant = 'default',
  size = 'default',
  modes = ['light', 'dark', 'system'],
  direction = 'ltr',
  onImmediateChange,
  onClick,
  className,
  ...props
}) {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <ThemeTogglerPrimitive
      theme={theme}
      resolvedTheme={resolvedTheme}
      setTheme={setTheme}
      direction={direction}
      onImmediateChange={onImmediateChange}>
      {({ effective, resolved, toggleTheme }) => (
        <button
          data-slot="theme-toggler-button"
          className={cn(buttonVariants({ variant, size, className }))}
          onClick={(e) => {
            onClick?.(e);
            toggleTheme(getNextTheme(effective, modes));
          }}
          {...props}>
          {getIcon(effective, resolved, modes)}
        </button>
      )}
    </ThemeTogglerPrimitive>
  );
}

export { ThemeTogglerButton };
