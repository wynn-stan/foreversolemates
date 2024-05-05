import React, { createContext, useState } from 'react';

export interface LayoutInterface {
  banner?: {
    imageSrc?: string;
    top_tagline: string;
    title: string;
  };
}

export const LayoutContext = createContext<{
  layout: Partial<LayoutInterface>;
  setLayout: React.Dispatch<React.SetStateAction<Partial<LayoutInterface>>>;
}>({
  layout: {},
  setLayout: () => null,
});

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // State
  const [layout, setLayout] = useState<Partial<LayoutInterface>>({});

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
}
