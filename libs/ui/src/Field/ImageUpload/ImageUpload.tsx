'use client';

import clsx from 'clsx';
import { PlusIcon, X } from 'lucide-react';
import { useMemo, useRef } from 'react';
import styled from 'styled-components';

interface Props {
  onChange: (file: FileList) => void;
}

interface PreviewProps {
  onClose?: () => void;
  url?: string;
  file?: Blob | MediaSource;
}

function ImageUpload({ onChange }: Props) {
  //ref
  const imageRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <StyledInput
        onClick={() => imageRef.current?.click()}
        className={clsx('cursor-pointer')}
      >
        <PlusIcon size={24} />
      </StyledInput>

      <input
        className="hidden"
        type="file"
        ref={imageRef}
        accept="image/*"
        value=""
        onChange={({ currentTarget: { files } }) => {
          if (files) {
            onChange(files);
          }
        }}
      />
    </>
  );
}

function Preview({ url, file, onClose }: PreviewProps) {
  //memo
  const objectUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : '';
  }, [file]);

  return (
    <StyledInput className="relative">
      {file ? <StyledImage src={objectUrl} /> : ''}
      {url ? <StyledImage src={url} /> : ''}

      {onClose ? (
        <span
          onClick={onClose}
          className={clsx(
            'cursor-pointer rounded-full bg-gray-20 p-[2px]',
            'absolute right-[-8px] top-[-8px]'
          )}
        >
          <X size={12} />
        </span>
      ) : (
        ''
      )}
    </StyledInput>
  );
}

const StyledImage = styled.img`
  object-fit: contain;
  width: 75px;
  height: 75px;
`;

const StyledInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 75px;
  height: 75px;

  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;

export default Object.assign(ImageUpload, { Preview });
