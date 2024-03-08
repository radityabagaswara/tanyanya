import { notifications } from '@mantine/notifications';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import route from 'ziggy-js';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { format } from 'date-fns';
import { Avatar, Divider, Image, Menu, Space } from '@mantine/core';
import { IconMaximize, IconRepeat, IconReport } from '@tabler/icons-react';

const DonationList = () => {
  const [data, setDonation] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({
    pageIndex: 0,
    pageSize: 10,
    pageCount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [columnFilters, setColumnFilters] = useState([]);

  //FETCH DONATION LIST
  useMemo(() => {
    setDonation([]);
    setLoading(true);
    axios
      .get(
        route('api.dashboard.donationList', {
          page: pagination.pageIndex + 1,
          rows: pagination.pageSize,
          ...columnFilters.reduce((acc: any, filter: any) => {
            acc[filter.id] = filter.value;
            return acc;
          }, {}),
        }),
      )
      .then(res => {
        setDonation(res.data.data);
        setPagination({
          pageIndex: res.data.current_page - 1,
          pageSize: res.data.per_page,
          pageCount: res.data.last_page,
        });

        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        notifications.show({
          title: 'Failed to fetch donation list.',
          message: err.message,
          color: 'red',
        });
      });
  }, [pagination.pageIndex, pagination.pageSize, columnFilters]);

  const columns = useMemo<any>(
    () => [
      {
        accessorKey: 'transaction_time',
        header: 'Time',
        filterVariant: 'date-range',
        accessorFn: (originalRow: any) =>
          format(new Date(originalRow.transaction_time), 'dd MMM yyyy @ HH:mm'),
      },
      {
        accessorKey: 'users',
        header: 'From',
        accessorFn: (originalRow: any) =>
          originalRow.is_anon === 1 ? (
            'Anonymous'
          ) : (
            <div className="flex flex-row gap-1 items-center">
              <Avatar
                src={originalRow.users?.profile_photo_url ?? null}
                color="tanya-pink"
              />
              {originalRow.users?.name ?? 'n/a'}
            </div>
          ),
      },
      {
        accessorKey: 'ammount',
        enableColumnFilter: false,
        header: 'Amount',
        accessorFn: (originalRow: any) => (
          <div className=" flex flex-row gap-1 items-center">
            <Image
              w={48}
              h={48}
              src="https://velcro.is3.cloudhost.id/tanyanya/25498.jpg"
              fit="cover"
            />
            <div>
              <p className="font-semibold">{originalRow.amount ?? 0} unit</p>
              <p>Rp {originalRow.price.toLocaleString('ID-id')}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'message',
        header: 'Message',
        enableColumnFilter: false,
        accessorFn: (originalRow: any) => originalRow.message,
      },
    ],
    [],
  );
  const table = useMantineReactTable({
    columns,
    data,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters as any,
    manualPagination: true,
    state: { pagination, columnFilters, isLoading: loading },
    rowCount: pagination.pageCount,
    initialState: {
      showGlobalFilter: false,
    },
    enableGlobalFilter: false,
    enableSorting: false,
    manualFiltering: true,
    mantinePaperProps: { withBorder: false, shadow: 'none' },
    mantinePaginationProps: { rowsPerPageOptions: ['10', '20', '50', '100'] },
    enableRowActions: true,
    positionActionsColumn: 'last',
    enableFullScreenToggle: false,
    renderRowActionMenuItems: ({ row }) => (
      <>
        <Menu.Item
          onClick={() => console.info('detail')}
          leftSection={<IconMaximize size={14} />}
        >
          Donation Detail
        </Menu.Item>
        <Menu.Item
          onClick={() => console.info('detail')}
          leftSection={<IconRepeat size={14} />}
        >
          Resend Stream Overlay
        </Menu.Item>
        <Space m={'sm'} />
        <Divider />
        <Space m={'sm'} />
        <Menu.Item
          onClick={() => console.info('Edit')}
          leftSection={<IconReport size={14} />}
          color="red"
        >
          Report User
        </Menu.Item>
      </>
    ),
  });
  return <MantineReactTable table={table} />;
};

export default DonationList;
