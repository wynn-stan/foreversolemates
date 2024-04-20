interface Props {
  HeaderText: string;
  SubText: React.ReactNode;
}

export default function Header({ HeaderText, SubText }: Props) {
  return (
    <div className="space-y-1">
      <div className="font-semibold text-[32px]">{HeaderText}</div>
      <div className="text-sm text-gray-30">{SubText}</div>
    </div>
  );
}
