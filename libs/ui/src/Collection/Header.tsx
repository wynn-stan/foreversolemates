import SideModalToggle from './SideModalToggle';
import { Collection } from './Sidebar';

interface Props {
  heading: string;
  collections: Collection[];
  pageDetails: {
    from: number;
    to: number;
    total: number;
  };
  actions?: React.ReactNode;
}

export default function Header({
  heading,
  collections,
  pageDetails,
  actions,
}: Props) {
  return (
    <div className="space-y-8">
      <div className="flex gap-4">
        <SideModalToggle collections={collections} />
        <div className="font-medium text-4xl">{heading}</div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs">
          Showing {pageDetails.from + 1 || '--'} to {pageDetails.to} of{' '}
          {pageDetails.total || '--'} total
        </div>
        {actions}
      </div>
    </div>
  );
}
