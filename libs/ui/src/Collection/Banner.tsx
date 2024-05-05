import clsx from 'clsx';

interface Props {
  title: string;
  top_tagline: string;
  imageSrc?: string;
}

export default function Banner({ imageSrc, title, top_tagline }: Props) {
  return (
    <div
      className={clsx(
        'bg-gray-5',
        'py-14',
        imageSrc ? 'sm:py-6' : '',
        'flex justify-center items-center gap-6'
      )}
    >
      <div
        className={clsx(
          'space-y-2 text-center',
          imageSrc ? ' sm:text-left' : ' '
        )}
      >
        <div className="text-sm text-gray-50 font-medium">{top_tagline}</div>
        <div className="text-3xl font-semibold">{title}</div>
      </div>
      {imageSrc && (
        <div className="hidden sm:block">
          <img src={imageSrc} className="w-[200px] h-[200px]" />
        </div>
      )}
    </div>
  );
}
