import Image from 'next/image';

interface Props {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({ width = 32, height = 32, className }: Props) {
  return (
    <Image
      src="/assets/logo.jpg"
      className={`rounded-full ${className}`}
      width={width}
      height={height}
      alt="logo"
    />
  );
}
