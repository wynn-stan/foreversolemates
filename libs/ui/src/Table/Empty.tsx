import Button from '../Button/Button';

function Empty({
  title,
  description,
  action,
  classNames,
}: {
  title: string;
  description: string;
  action?: { onClick: () => void; label: string };
  classNames?: string;
}) {
  return (
    <div
      className={`max-w-[348px] mx-auto py-16 whitespace-normal ${classNames}`}
    >
      {/* eslint-disable-next-line */}
      {/* <img
        alt="Empty cards"
        src="/cards.svg"
        className="w-full block mx-auto mb-6"
      /> */}

      <div className="text-center mb-8">
        <p className="font-semibold text-xl mb-2">{title}</p>
        <p className="text-gray">{description}</p>
      </div>

      {action && (
        <Button
          className="mx-auto btn btn-primary"
          onClick={() => action.onClick()}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}

export default Empty;
