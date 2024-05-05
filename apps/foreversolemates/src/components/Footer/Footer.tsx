import clsx from 'clsx';
import Info from './Info';
import Links from './Links';
import Subscribe from './Subscribe';

export default function Footer() {
  return (
    <div className="border-t border-gray-20 mt-10">
      <div
        className={clsx(
          'gap-4 py-10 px-4',
          'flex flex-col-reverse sm:flex-row justify-between',
          'max-w-6xl ',
          'mx-4 sm:mx-10 xl:mx-auto'
        )}
      >
        <div className="md:max-w-[300px]">
          <Info />
        </div>

        <div className="hidden lg:block">
          <Links />
        </div>

        <Subscribe />
      </div>
    </div>
  );
}
