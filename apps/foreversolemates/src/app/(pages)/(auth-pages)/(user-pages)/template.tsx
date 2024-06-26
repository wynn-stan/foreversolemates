'use client';

import { Animated } from '@fsm/ui';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Animated.FadeInFromBelow className="px-4">
      {children}
    </Animated.FadeInFromBelow>
  );
}
