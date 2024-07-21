import clsx from 'clsx';

interface Props {
  children?: React.ReactNode;
  currentStep: number;
  count: number;
  currentTitle: string;
  nextTitle?: string;
}

export default function MultiStep({
  children,
  currentTitle,
  currentStep,
  count,
  nextTitle,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="flex gap-3 items-center">
        <div
          className={clsx(
            'w-[60px] h-[60px] rounded-full bg-gray-10 text-gray-50 font-medium',
            'flex items-center justify-center',
            'text-sm'
          )}
        >
          {currentStep} of {count}
        </div>
        <div className="">
          <div className="font-medium">{currentTitle}</div>
          <div className="text-gray-50 text-sm">
            {nextTitle ? `Next: ${nextTitle}` : 'Final Step!'}
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-10" />
      <div>{children}</div>
    </div>
  );
}
