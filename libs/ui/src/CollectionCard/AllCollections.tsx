import Button from '../Button/Button';
import CollectionCard from './CollectionCard';

export default function AllCollections() {
  return (
    <CollectionCard
      topTagline={'Ease and elegance for your feet'}
      bottomTagline={'Delve into our curated collections'}
      bannerImage={'/assets/all-collections.png'}
      collectionName={'All Products'}
      actions={
        <>
          <Button className="rounded-md">View</Button>
        </>
      }
    />
  );
}
