import { useEffect } from 'react';
import { useOrderHandlers } from '../hooks/useOrderHandlers';
import TableComponent from '../components/Table';
import TbodyOrders from '../components/Table/TbodyOrders';
import { formatDate } from '../utils/formatDate';
import { RightDetailPanel } from '../components/RightDetailPanel';
import type { ColumnDef } from '../interfaces/ColumnDef.interface';
import type { UIOrderRow } from '../interfaces/UIOrderRow.interface';

const OrderPage = () => {
  const {
    orders,
    selectedItem,
    loadOrders,
    handleEdit,
    handleConfirm,
    setSelectedItem,
  } = useOrderHandlers();

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const columns: ColumnDef<UIOrderRow>[] = [
    {
      header: 'Tên người đặt',
      field: 'customer_name',
      render: (item) => item.customer_name?.trim() || item.orderId,
    },
    { header: 'SĐT', field: 'phone' },
    { header: 'Order ID', field: 'orderId' },
    { header: 'Payment', field: 'payment_method' },
    {
      header: 'Status',
      field: 'status',
      render: (item) => (
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            item.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : item.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : item.status === 'cancelled'
              ? 'bg-gray-300 text-gray-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {item.status}
        </span>
      ),
    },
    { header: 'Total', field: 'value' },
    {
      header: 'Created At',
      field: 'date',
      render: (item) => formatDate(item.date || ''),
    },
  ];

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex justify-between items-center px-6 pt-6">
        <h2 className="text-xl font-semibold text-gray-800">Orders Management</h2>
      </div>

      <main
        className={`p-6 pt-4 transition-all duration-300 ease-in-out ${
          selectedItem ? 'w-[calc(100%-320px)]' : 'w-full'
        }`}
      >
        <TableComponent
          columns={columns}
          data={orders}
          selectedItem={selectedItem}
          onRowClick={setSelectedItem}
          BodyComponent={TbodyOrders}
        />
      </main>

      <div
        className={`w-80 h-full bg-white border-l border-gray-200 fixed right-0 top-0 z-50 transform transition-transform duration-300 ${
          selectedItem ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <RightDetailPanel
          selectedItem={selectedItem}
          activeMenu="Orders"
          getStatusColor={() => ''}
          onClose={() => {
            setSelectedItem(null);
            loadOrders();
          }}
          onEdit={handleEdit}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
};

export default OrderPage;
