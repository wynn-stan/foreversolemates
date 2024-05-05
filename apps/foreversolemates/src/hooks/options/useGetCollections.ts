import useSWR from 'swr';
import { CollectionModel, PaginatedData } from '../../models';
import queryString from 'query-string';
import routes from '../../routes';

const useGetCollections = () => {
  //api
  const { data, isLoading } = useSWR<PaginatedData<CollectionModel>>(
    `/secure/collections?${queryString.stringify({
      page: 1,
      size: 50,
    })}`
  );

  //variables
  const list =
    data?.data?.map((item) => ({
      id: item._id,
      collection_name: item.collection_name,
      slug: routes.shop.all.index, //|| routes.store.inventory.collection.index.replace('[id]', item._id),
    })) || [];

  const collections = [
    {
      id: 'all',
      collection_name: 'All',
      slug: routes.shop.all.index,
    },
    // {
    //   id: 'collection',
    //   collection_name: 'Collections',
    //   slug: list[0]?.slug,
    //   sub_collections: list,
    // },
  ];

  // for select component
  const collectionOptions = list.map((item) => ({
    label: item.collection_name,
    value: item.id,
  }));

  return { collections, collectionOptions };
};

export default useGetCollections;
