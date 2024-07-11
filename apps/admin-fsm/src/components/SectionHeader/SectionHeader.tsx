import WithLine from './WithLine';

interface Props {
  header: string;
  actions: React.ReactNode;
}

function SectionHeader({ header, actions }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-2xl font-semibold">{header}</div>
      <div>{actions}</div>
    </div>
  );
}

export default Object.assign(SectionHeader, { WithLine });
