import clsx from 'clsx';
import Logo from './Logo';

interface Props {
  variant?: 'light' | 'dark';
}

export default function Full({ variant = 'dark' }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <Logo width={50} height={50} />
      <div className="text-left font-semibold text-base leading-tight">
        <span className="text-gray-40">Forever</span>
        <br />
        <span className={clsx(variant === 'light' ? 'text-gray-10' : '')}>
          SoleMates
        </span>
      </div>
    </div>
  );
}
