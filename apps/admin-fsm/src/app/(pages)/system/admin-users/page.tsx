'use client';

import { MoreHorizontal, PlusIcon } from 'lucide-react';
import { helpers } from '@foreversolemates/utils';
import { Button, Dropdown, Table } from '@fsm/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';

import { SectionHeader } from '../../../../components';
import { AdminUserModel } from '../../../../models';
import { useStore } from '../../../../hooks';
import routes from '../../../../routes';
import Add from './(components)/Add';

export default function Page() {
  //navigation
  const router = useRouter();

  //store
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
  }>('/secure/user/accounts');

  //variables
  const users = data?.data || [];

  return (
    <>
      <div className="space-y-4">
        <SectionHeader
          header="Admin Users"
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
        />
        <Table>
          <thead>
            <Table.Th>Fullname</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone number</Table.Th>
            <Table.Th className="text-center">Actions</Table.Th>
          </thead>
          <tbody>
            {/* Loading */}
            {isLoading && <Table.Skeleton count={4} />}

            {/* Response Recieved */}
            {data && (
              <>
                {/* Empty list */}
                {!users.length && (
                  <tr>
                    <td colSpan={9}>
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
                    <Table.Td onClick={(e) => e.stopPropagation()}>
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
                    </Table.Td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </Table>
      </div>

      <Add mutate={mutate} show={showAdd} onHide={() => setShowAdd(false)} />
    </>
  );
}
