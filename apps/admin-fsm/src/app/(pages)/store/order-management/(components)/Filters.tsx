import { Field, Filters, Models } from '@fsm/ui';

interface Props {
  filters: Models.FiltersModel;
  setFilters: React.Dispatch<React.SetStateAction<Models.FiltersModel>>;
}

export default function LocalFilters({ filters, setFilters }: Props) {
  return (
    <div className="flex justify-between gap-4 flex-col md:flex-row">
      <div className="md:max-w-[300px] w-full">
        <Field.Search
          wrapperClassName="w-full"
          placeholder="Order reference"
          onSearch={(search) => {
            setFilters((filters) => ({ ...filters, order_reference: search }));
          }}
        />
      </div>

      <div className="flex gap-2">
        <Filters.AmountPaid {...{ filters, setFilters }} />
        <Filters.Channel {...{ filters, setFilters }} />
        <Filters.Status {...{ filters, setFilters }} />
      </div>
    </div>
  );
}
