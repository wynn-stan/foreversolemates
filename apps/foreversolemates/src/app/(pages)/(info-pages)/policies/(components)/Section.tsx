'use client';

import { SectionHeader } from '../../../../../components';

interface Props {
  header: string;
  description: React.ReactNode;
}

function Content({ description, header }: Props) {
  return (
    <div className="">
      <SectionHeader title={header} />
      <div className="leading-relaxed">{description}</div>
    </div>
  );
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="space-y-[60px]">{children}</div>;
}

export default Object.assign({}, { Wrapper, Content });
