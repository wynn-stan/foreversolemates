'use client';

import { Button, Icons, Modal } from '@fsm/ui';
import clsx from 'clsx';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Thumbnail from './(eventHighlights)/thumbnail';

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
  const [page, setPage] = useState(1);

  /**
   * Ref
   */
  const videoRef = useRef<HTMLVideoElement>(null);

  /**
   * Logic
   */
  const items_per_page = 2;
  const total_pages = Math.ceil(mediaList.length / items_per_page);
  const last_item_on_page = (() => {
    const last = page * items_per_page;
    if (mediaList.length < last) return mediaList.length;
    return last;
  })();
  const first_item_on_page = last_item_on_page - (items_per_page - 1);
  const paginatedMediaList = [];

  for (let i = first_item_on_page - 1; i < last_item_on_page; i++) {
    paginatedMediaList.push(i);
  }

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
          <div className="hidden md:block max-w-[200px] space-y-3">
            {mediaList.map((item, key) => {
              const isActive = selectedEvent.header === item.header;
              return (
                <Thumbnail
                  key={key}
                  header={item.header}
                  isActive={isActive}
                  onClick={() => {
                    if (!isActive) {
                      setSelectedEvent(item);
                      setTimeout(() => videoRef.current?.play());
                    }
                  }}
                  thumbnail_image={item.thumbnail}
                />
              );
            })}
          </div>
          <div className="md:hidden max-w-[180px] space-y-3">
            {paginatedMediaList.map((index, key) => {
              const item = mediaList[index];
              const isActive = selectedEvent.header === item.header;
              return (
                <Thumbnail
                  key={key}
                  header={item.header}
                  isActive={isActive}
                  onClick={() => {
                    if (!isActive) {
                      setSelectedEvent(item);
                      setTimeout(() => videoRef.current?.play());
                    }
                  }}
                  thumbnail_image={item.thumbnail}
                />
              );
            })}
            <div className="flex justify-center gap-2 pt-2">
              {Array.from({ length: total_pages }, (_, index) => {
                const isActive = page === index + 1;
                return (
                  <div
                    key={index}
                    className={clsx(
                      'flex items-center justify-center w-[24px] h-[24px] rounded-full cursor-pointer',
                      'text-sm',
                      isActive
                        ? 'bg-black text-white'
                        : 'bg-gray-5 text-gray-50'
                    )}
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </div>
                );
              })}
            </div>
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
    <Modal size="sm" header="Details" {...{ show, onHide }}>
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
