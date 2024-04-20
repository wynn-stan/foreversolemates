import clsx from 'clsx';
import Image from 'next/image';
import AllCollections from './AllCollections';

interface Props {
  topTagline?: string;
  bottomTagline?: string;
  bannerImage?: string;
  collectionName: string;
  actions: React.ReactNode;
}

function CollectionCard({
  topTagline,
  actions,
  collectionName,
  bannerImage,
  bottomTagline,
}: Props) {
  return (
    <div
      className={clsx(
        'bg-[#F0F0F0] h-[255px]',
        'flex-grow xl:flex-grow-0 xl:w-[550px] rounded-md',
        'px-8 py-6',
        'flex gap-6 items-center',
        'justify-center text-center xl:justify-between xl:text-left'
      )}
    >
      <div>
        <div className="text-gray-50 font-semibold">{topTagline}</div>
        <div className="font-bold text-3xl">{collectionName}</div>
        <div className="my-6 text-sm font-medium text-gray-40">
          {bottomTagline}
        </div>
        <div className="flex justify-center xl:block">{actions}</div>
      </div>
      {bannerImage ? (
        <div className="hidden xl:block">
          <Image
            unoptimized
            className="object-contain"
            width={200}
            height={200}
            alt="banner_image"
            src={bannerImage}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Object.assign(CollectionCard, { AllCollections });
