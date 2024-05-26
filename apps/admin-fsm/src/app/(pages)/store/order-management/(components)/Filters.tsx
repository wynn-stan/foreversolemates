import { Field, Filters } from '@fsm/ui';

interface Props {
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

export default function LocalFilters({ filters, setFilters }: Props) {
  return (
    <div className="flex justify-between gap-4 flex-col md:flex-row">
      <div className="md:max-w-[300px] w-full">
        <Field.Search
          wrapperClassName="w-full"
          placeholder="Order reference"
          onSearch={() => {
            //
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
