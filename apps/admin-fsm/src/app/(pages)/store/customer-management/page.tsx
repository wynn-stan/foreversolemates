'use client';

import { MoreHorizontal, PlusIcon } from 'lucide-react';
import { helpers } from '@foreversolemates/utils';
import { Button, Dropdown, Table } from '@fsm/ui';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { useLayout, useStore } from '../../../../hooks';
import { SectionHeader } from '../../../../components';
import { AdminUserModel } from '../../../../models';

export default function Page() {
  //navigation
  const router = useRouter();

  //hooks
  const { layout, setLayout } = useLayout();
  const { store } = useStore();

  //state
  const [showAdd, setShowAdd] = useState(false);

  //api
  const { data, isLoading, error, mutate } = useSWR<{
    data: AdminUserModel[];
    page: number;
    size: number;
    totalCount: number;
    totalPages: number;
  }>('/user/accounts');

  //variables
  const users = data?.data || [];

  // effect
  useEffect(() => {
    setLayout({
      menuText: 'Registered Customers',
    });

    return () => setLayout({});
  }, []);

  return (
    <>
      <div className="space-y-4">
        {/* <SectionHeader
          header="Registered Customers"
          actions={
            <>
               <Button
                onClick={() => setShowAdd(true)}
                variant="dark"
                className="flex gap-2"
              >
                <span>
                  <PlusIcon size={20} />
                </span>
                <span>Add User</span>
              </Button> 
            </>
          }
        /> */}
        <Table>
          <thead>
            <Table.Th>Fullname</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone number</Table.Th>
            {/* <Table.Th className="text-center">Actions</Table.Th> */}
          </thead>
          <tbody>
            {/* Loading */}
            {isLoading && <Table.Skeleton count={3} />}

            {/* Response Recieved */}
            {data && (
              <>
                {/* Empty list */}
                {!users.length && (
                  <tr>
                    <td colSpan={3}>
                      <Table.Empty title="No records found" description="" />
                    </td>
                  </tr>
                )}

                {/* Populated List */}
                {users.map((user, key) => (
                  <tr
                    key={key}
                    className="cursor-pointer"
                    onClick={() => {
                      //
                    }}
                  >
                    <Table.Td>{`${helpers.capitalize(
                      user?.firstName
                    )} ${helpers.capitalize(user?.lastName)}`}</Table.Td>
                    <Table.Td>{user?.email}</Table.Td>
                    <Table.Td>{user?.mobileNo}</Table.Td>
                    {/* <Table.Td onClick={(e) => e.stopPropagation()}>
                      <Dropdown className="w-full">
                        <Dropdown.Toggle className="mx-auto">
                          <MoreHorizontal />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => {
                              //
                            }}
                          >
                            Update User
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="text-red-40"
                            onClick={() => {
                              //
                            }}
                          >
                            Remove User
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Table.Td> */}
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}
