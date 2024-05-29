'use client';

import { Animated } from '@fsm/ui';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Animated.FadeInFromBelow className="mx-auto max-w-[600px]">
      {children}
    </Animated.FadeInFromBelow>
  );
}
