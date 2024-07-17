import { Button } from '@fsm/ui';

export default function ButtonGroup() {
  return (
    <div className="flex justify-between">
      <Button variant="outline-black">Cancel</Button>
      <Button variant="outline-black">Previous</Button>
      <Button>Next</Button>
      <Button>Update</Button>
    </div>
  );
}
