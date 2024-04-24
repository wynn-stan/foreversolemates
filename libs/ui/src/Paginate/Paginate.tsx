import { Dispatch, SetStateAction } from 'react';
import BasePaginate, { ReactPaginateProps } from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styled from 'styled-components';

export interface PaginateProps extends ReactPaginateProps {
  to?: number;
  page: number;
  from?: number;
  total?: number;
  perPage?: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export function Paginate({
  to,
  from,
  total,
  setPage,
  page = 0,
  perPage = 0,
  ...props
}: PaginateProps) {
  return (
    <Wrapper>
      {to && from && total && (
        <p className="mb-0 text-gray-50 text-sm font-medium">
          {from} - {to} of {total}
        </p>
      )}
      <BasePaginate
        initialPage={page}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => setPage(selected)}
        nextLabel={<ChevronRight />}
        previousLabel={<ChevronLeft />}
        {...props}
      />
    </Wrapper>
  );
}

/**
 * styles
 */
const Wrapper = styled.div`
  gap: 0.75rem;
  display: flex;
  overflow-x: auto;
  align-items: center;

  ul {
    padding: 0rem;
    display: flex;
    list-style: none;
    margin-bottom: 0rem;

    & > *:not(:last-child) {
      margin-right: 0.25rem;
    }

    li {
      margin-bottom: 0px;

      a {
        border: solid 1px #e8e8e8;
        transition: ease-in-out all 0.15s;
        justify-content: center;
        border-radius: 0.25rem;
        align-items: center;
        user-select: none;
        min-width: 2.5rem;
        padding: 0 0.5rem;
        height: 2.5rem;
        display: flex;
        outline: none;
        color: #000;
      }

      &.next,
      &.previous {
        a {
          padding: 0.5rem;
          gap: 0.5rem;
        }

        &.disabled {
          a {
            color: var(--color-gray-50);
            pointer-events: none;
          }
        }
      }

      &.selected {
        a {
          color: #fff;
          transition: ease all 0.25s;
          border-color: #000;
          background-color: #000;
        }
      }
    }
  }
`;

export default Paginate;
