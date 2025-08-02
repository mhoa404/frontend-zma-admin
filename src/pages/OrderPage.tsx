import { useEffect, useState } from 'react';
import TableComponent from '../components/Table';
import { fetchAllOrders } from '../scripts/orderApi';
import type { ColumnDef, TableRow } from '../interfaces/TableRow.interface';
import TbodyOrders from '../components/Table/TbodyOrders';
import { formatDate } from '../utils/formatDate';

const OrderPage = () => {
  const [orders, setOrders] = useState<TableRow[]>([]);
  const [selectedItem, setSelectedItem] = useState<TableRow | null>(null);

  const loadOrders = async () => {
    try {
      const data = await fetchAllOrders();

      const mapped = data.map((order: any) => ({
        _id: order._id,
        orderId: order._id,
        name: order.payment_method?.toUpperCase?.() || 'UNKNOWN',
        status: order.status,
        value: `${order.total_price.toLocaleString()}₫`,
        date: order.created_at,
      }));

      setOrders(mapped);
    } catch (err) {
      console.error("❌ Lỗi tải đơn hàng:", err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const columns: ColumnDef[] = [
    { header: 'Order ID', field: 'orderId' },
    { header: 'Payment', field: 'name' },
    {
      header: 'Status',
      field: 'status',
      render: (item) => (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          item.status === 'completed'
            ? 'bg-green-100 text-green-800'
            : item.status === 'pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {item.status}
        </span>
      )
    },
    { header: 'Total', field: 'value' },
    {
      header: 'Created At',
      field: 'date',
      render: (item) => formatDate(item.date || ''),
    }
  ];

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex justify-between items-center px-6 pt-6">
        <h2 className="text-xl font-semibold text-gray-800">Orders Management</h2>
      </div>

      <main className={`p-6 pt-4 transition-all duration-300 ease-in-out ${
        selectedItem ? 'w-[calc(100%-320px)]' : 'w-full'
      }`}>
        <TableComponent
          columns={columns}
          data={orders}
          selectedItem={selectedItem}
          onRowClick={setSelectedItem}
          BodyComponent={TbodyOrders}
        />
      </main>
    </div>
  );
};

export default OrderPage;
