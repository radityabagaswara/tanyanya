import DonoTargetForm, {
  TargetFormProps,
} from '@/Components/dashboard/donations/DonoTargetForm';
import { router } from '@inertiajs/core';
import { InertiaFormProps } from '@inertiajs/react/types/useForm';
import {
  Anchor,
  Badge,
  Button,
  Loader,
  Modal,
  Progress,
  Select,
} from '@mantine/core';
import { IconCheck, IconPlus } from '@tabler/icons-react';
import axios from 'axios';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import React, { useEffect, useMemo, useState } from 'react';
import route from 'ziggy-js';

const DonationGoals = () => {
  const [modalCreate, setModalCreate] = useState<boolean>(false);
  const [dono, setDono] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [globalFilter, setGlobalFilter] = useState<String>('');
  const [pagination, setPagination] = useState<any>({
    pageIndex: 0,
    pageSize: 10,
    pageCount: 0,
  });

  const openCreateModal = () => {
    setModalCreate(true);
  };

  const createGoals = (e: InertiaFormProps<TargetFormProps>) => {
    console.log(e);
    e.post('/dashboard/donations/targets', {
      onSuccess: () => {
        setModalCreate(false);
      },
    });
  };

  const getDono = () => {
    setLoading(true);
    axios
      .get(
        route('dashboard.targets', {
          page: pagination.pageIndex + 1,
          rows: pagination.pageSize,
          q: globalFilter,
          ...columnFilters.reduce((acc: any, filter: any) => {
            acc[filter.id] = filter.value;
            return acc;
          }, {}),
        }),
      )
      .then(res => {
        setDono(res.data);
        setPagination({
          pageIndex: res.data.current_page - 1,
          pageSize: res.data.per_page,
          pageCount: res.data.last_page,
        });
        setLoading(false);
      });
  };

  useMemo(() => {
    getDono();
    console.log(globalFilter);
  }, [pagination.pageIndex, pagination.pageSize, columnFilters, globalFilter]);

  const table = useMantineReactTable({
    data: dono?.data || [],
    rowCount: dono?.last_page || 0,
    manualPagination: true,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    mantinePaperProps: { withBorder: true, shadow: 'none' },
    onGlobalFilterChange: setGlobalFilter,
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        router.visit(
          route('dashboard.targets.show', { target: row.original.id }),
        );
      },

      className: 'cursor-pointer',
    }),
    manualFiltering: true,
    state: {
      pagination: {
        pageIndex: dono?.current_page - 1 || 0,
        pageSize: dono?.per_page || 10,
      },
      isLoading: loading,
      globalFilter,
    },

    columns: [
      {
        accessorKey: 'name',
        header: 'Name',
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: 'Amount',
        enableColumnFilter: false,
        enableSorting: false,
        accessorFn: (originalRow: any) => (
          <div className="flex items-center gap-2">
            <p>Rp {originalRow.current.toLocaleString('id-ID')}</p>
            <p>/</p>
            <p>Rp {originalRow.amount.toLocaleString('id-ID')}</p>
          </div>
        ),
      },
      {
        header: 'Progress',
        enableColumnFilter: false,
        enableSorting: false,
        accessorFn: (originalRow: any) => (
          <div className="flex flex-row items-center gap-2">
            <Progress
              className="w-[80%]"
              radius="xl"
              value={(originalRow.current / originalRow.amount) * 100}
            />
            <p className="text-sm">
              {((originalRow.current / originalRow.amount) * 100).toFixed(0)}%
            </p>
          </div>
        ),
      },
      {
        accessorKey: 'is_active',
        header: 'Active',
        enableColumnFilter: true,
        enableSorting: false,
        filterVariant: 'select',
        mantineFilterSelectProps: {
          data: [
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
          ],
        },
        accessorFn: (originalRow: any) => (
          <Badge
            color={originalRow.is_active ? 'tanya-pink' : 'red'}
            leftSection={originalRow.is_active ? <IconCheck size={13} /> : null}
          >
            {originalRow.is_active ? 'Active' : 'Inactive'}
          </Badge>
        ),
      },
    ],
  });

  if (!dono) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">Your Donation Goals</h1>
        <Button leftSection={<IconPlus size={14} />} onClick={openCreateModal}>
          New Goals
        </Button>
      </div>
      {dono.data.length > 0 ||
      (globalFilter && globalFilter.length >= 1) ||
      columnFilters ? (
        <div className="mt-4">
          <MantineReactTable table={table} />
        </div>
      ) : (
        <div className="flex flex-col h-32 items-center justify-center">
          <p className="text-sm text-gray-500">
            You don't have any donation goals yet 😢{' '}
          </p>
          <Anchor className="text-sm" onClick={openCreateModal}>
            Create one here!
          </Anchor>
        </div>
      )}

      <Modal
        onClose={() => setModalCreate(false)}
        opened={modalCreate}
        size={'lg'}
        title="Create New Donation Target"
      >
        <DonoTargetForm onSubmit={createGoals} />
      </Modal>
    </>
  );
};

export default DonationGoals;
