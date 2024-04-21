interface Props {
  heading: string;
  children: React.ReactNode;
}

export default function Header({ heading, children }: Props) {
  return (
    <div className="space-y-8">
      <div className="font-medium text-4xl">{heading}</div>
      <div>{children}</div>
    </div>
  );
}
