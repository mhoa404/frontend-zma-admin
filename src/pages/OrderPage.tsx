import { useEffect, useState } from 'react';
import TableComponent from '../components/Table';
import { fetchAllOrders, updateOrderStatus } from '../scripts/orderApi';
import type { ColumnDef, TableRow } from '../interfaces/TableRow.interface';
import TbodyOrders from '../components/Table/TbodyOrders';
import { formatDate } from '../utils/formatDate';
import { RightDetailPanel } from '../components/RightDetailPanel';

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
        order_items: order.order_items, 
      }));

      setOrders(mapped);
    } catch (err) {
      console.error('❌ Lỗi tải đơn hàng:', err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleEdit = (item: TableRow) => {
    alert(`Mở modal cập nhật đơn hàng: ${item.orderId}`);
  };

  const handleConfirm = async (item: TableRow) => {
    const confirmed = window.confirm('Bạn có chắc muốn xác nhận đơn hàng này?');
    if (!confirmed) return;

    try {
      await updateOrderStatus(item.orderId?.toString() || '', 'confirmed');
      alert('✅ Đã xác nhận đơn hàng');
      setSelectedItem(null);
      loadOrders();
    } catch (err) {
      console.error('❌ Lỗi xác nhận đơn hàng:', err);
      alert('❌ Không thể xác nhận đơn hàng');
    }
  };

  const columns: ColumnDef[] = [
    { header: 'Order ID', field: 'orderId' },
    { header: 'Payment', field: 'name' },
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
