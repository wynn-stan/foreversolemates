'use client';

import clsx from 'clsx';
import { Field, FieldAttributes } from 'formik';
import { MinusIcon, PlusIcon } from 'lucide-react';
import styled from 'styled-components';

export interface FieldNumberProps {
  max?: number;
  min?: number;
  value: number;
  name: string;
  setFieldValue: (
    field: string,
    value: number,
    shouldValidate?: boolean
  ) => void;
}

export default function Number({
  setFieldValue,
  name,
  value,
  max = 0,
  min = 0,
}: FieldNumberProps) {
  //does not cater for cases where max is 0 and min is 0
  return (
    <StyledContainer
      className={clsx(
        'flex flex-col gap-1',
        'p-2 max-w-[45px]',
        'border border-gray-5 rounded-xl'
      )}
    >
      <StyledButton
        className=""
        onClick={() => {
          if (max && value < max) setFieldValue(name, value + 1);
          if (!max) setFieldValue(name, value + 1);
        }}
      >
        <PlusIcon size={20} />
      </StyledButton>
      <div className="w-full font-medium">
        <StyledInput
          type="number"
          {...{ min, max, value }}
          onChange={(e) => {
            setFieldValue(name, parseInt(e.target.value));
          }}
        />
      </div>
      <StyledButton
        onClick={() => {
          if (min && value > min) setFieldValue(name, value - 1);
          if (min === 0 && value > min + 1) setFieldValue(name, value - 1);
          // if (!min) setFieldValue(name, value - 1);
        }}
      >
        <MinusIcon size={20} />
      </StyledButton>
    </StyledContainer>
  );
}

const StyledInput = styled.input`
  & {
    outline: none;
    width: 100%;
    text-align: center;
  }
`;

const StyledContainer = styled.div`
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

const StyledButton = styled.button`
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
  background: #e8e8e8;
`;
