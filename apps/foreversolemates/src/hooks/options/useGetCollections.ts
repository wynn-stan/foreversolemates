import useSWR from 'swr';
import { CollectionModel, PaginatedData } from '../../models';
import queryString from 'query-string';
import routes from '../../routes';

const useGetCollections = () => {
  //api
  const { data, isLoading, error } = useSWR<{
    data: CollectionModel[][];
  }>(
    `/collections?${queryString.stringify({
      page: 1,
      size: 50,
    })}`
  );

  //variables

  const apiCollections = data?.data?.[0] || [];

  const list =
    data?.data?.[0]?.map((item) => ({
      id: item._id,
      collection_name: item.collection_name,
      banner_image: item.banner_image,
      top_tagline: item.top_tagline,
      bottom_tagline: item.bottom_tagline,
      slug: routes.shop.collection.index.replace('[id]', item._id || ''),
    })) || [];

  const collections = [
    {
      id: 'all',
      collection_name: 'All',
      slug: routes.shop.all.index,
    },
    {
      id: 'collection',
      collection_name: 'Collections',
      slug: list[0]?.slug,
      sub_collections: list,
    },
  ];

  // for select component
  const collectionOptions = list.map((item) => ({
    label: item.collection_name,
    value: item.id,
  }));

  return {
    api: {
      apiCollections,
      isLoading,
      error,
    },
    collections,
    collectionOptions,
  };
};

export default useGetCollections;
