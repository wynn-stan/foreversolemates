'use client';

import { Button, Icons, Modal } from '@fsm/ui';
import clsx from 'clsx';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface IEvent {
  header: string;
  description: string;
  videoSrc: string;
  thumbnail: string;
}

export default function EventHighlights() {
  /**
   * Variables
   */
  const mediaList: IEvent[] = [
    {
      header: 'Foot Affair',
      description:
        "Foot Affair was a blast! 🎉 Thank you for your amazing support and unforgettable moments. Don't forget to share your photos 📸 and spread the word about our products!",
      videoSrc: '/assets/about-us/foot-affair.mp4',
      thumbnail: '/assets/about-us/thumb-foot-affair.png',
    },
    {
      header: 'Chosen Rehab Giveback Session',
      description:
        "We're proud to have made a meaningful impact by donating to Chosen Rehab 💖, aiding in the journey of recovery for individuals battling addiction. Grateful for the opportunity to make a difference 🙏.",
      videoSrc: '/assets/about-us/donation.mp4',
      thumbnail: '/assets/about-us/thumb-donation.png',
    },
    {
      header: 'Easter Picnic Edition',
      description:
        'ICGC: Holy Ghost Temple - Easter Picnic Edition 🌸. A big thank you goes out to all those who were present at our stand, to make purchases and enquire about our services. Thank you for making the Easter fair a success.',
      videoSrc: '/assets/about-us/easter.mp4',
      thumbnail: '/assets/about-us/thumb-easter.png',
    },
    {
      header: 'Kickoff with Sole Mates',
      description:
        "The launch of the 'MIJO' Collection was a success! ✨ Thank you all for your support. Sole Mates ~ a perfect foot match made for life!",
      videoSrc: '/assets/about-us/kickoff.mp4',
      thumbnail: '/assets/about-us/thumb-kickoff.png',
    },
  ];

  /**
   * State
   */
  const [selectedEvent, setSelectedEvent] = useState<IEvent>(mediaList[0]);
  const [showModal, setShowModal] = useState(false);

  /**
   * Ref
   */
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <>
      <div className="space-y-10">
        {/* Divider */}
        <div className="flex flex-col items-center gap-6">
          <div className="font-medium text-2xl">Event Highlights</div>
          <Icons.Line />
        </div>

        <div className="flex gap-3">
          <div
            className={clsx('max-w-[170px]', 'md:max-w-[300px]', 'space-y-4')}
          >
            <video
              controls
              className="rounded-xl"
              onClick={() => {
                if (videoRef.current) {
                  if (videoRef.current.paused) {
                    videoRef.current.play();
                  } else {
                    videoRef.current.pause();
                  }
                }
              }}
              // onProgress={() => {
              //   console.log('Downloading video');
              // }}
              // onCanPlay={() => {
              //   console.log('Can play');
              // }}
              // onCanPlayThrough={() => {
              //   console.log('Can play through');
              // }}
              // onLoadStart={() => {
              //   console.log('Loading started');
              // }}
              // onLoadedData={() => {
              //   console.log('Loaded data');
              // }}
              ref={videoRef}
              key={selectedEvent.videoSrc}
              width={300}
              height={533}
            >
              <>{selectedEvent.videoSrc}</>
              <source src={selectedEvent.videoSrc} type="video/mp4" />
              This browser does not support video tags
            </video>
            <div className="space-y-2">
              <div className="text-xl font-medium truncate">
                {selectedEvent.header}
              </div>
              <div>
                <div className="truncate text-sm text-gray-50">
                  {selectedEvent.description}
                </div>
                {selectedEvent.description.length > 33 && (
                  <div
                    onClick={() => setShowModal(true)}
                    className="font-medium text-sm underline cursor-pointer"
                  >
                    see more
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="max-w-[200px] space-y-3">
            {mediaList.map((item, key) => {
              const isActive = selectedEvent.header === item.header;
              return (
                <div
                  style={{
                    boxShadow: isActive
                      ? '0px 1px 16px rgba(0, 0, 0, 0.12)'
                      : '',
                  }}
                  className={clsx(
                    'rounded-lg border',
                    !isActive
                      ? ' border-gray-10'
                      : 'border-gray-20 border-[2px]',
                    'p-2 space-y-3'
                  )}
                  onClick={() => {
                    if (!isActive) {
                      setSelectedEvent(item);
                      setTimeout(() => videoRef.current?.play());
                    }
                  }}
                  key={key}
                >
                  <Image
                    src={item.thumbnail}
                    className={clsx(
                      'w-full max-w-[180px] max-h-[86px] object-cover',
                      'rounded-md',
                      !isActive ? 'brightness-[0.4]' : ''
                    )}
                    width={180}
                    height={86}
                    alt="thumbnail"
                  ></Image>
                  <div className="truncate text-sm font-medium">
                    {item.header}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Details
        show={showModal}
        onHide={() => setShowModal(false)}
        header={selectedEvent.header}
        description={selectedEvent.description}
      />
    </>
  );
}

function Details({
  show,
  onHide,
  header,
  description,
}: {
  show: boolean;
  onHide: () => void;
  header: string;
  description: string;
}) {
  return (
    <Modal header="Details" {...{ show, onHide }}>
      <div className="space-y-6">
        <div className="text-xl font-medium">{header}</div>
        <div>{description}</div>
        <div className="flex justify-end">
          <Button className="!rounded-xl" onClick={() => onHide()}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
