import { useEffect, useState } from 'react';
import Header from '../components/Header';
import TableContent from '../components/TableContent';
import { RightDetailPanel } from '../components/RightDetailPanel';
import type { TableRow, ColumnDef, UIProductRow } from '../common/interfaces/TableRow.interface';
import { BACKEND_API } from '../scripts/api';

const getStatusColor = (available: boolean) => {
  return available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
};

const ProductPage = () => {
  const [products, setProducts] = useState<UIProductRow[]>([]);
  const [selectedItem, setSelectedItem] = useState<UIProductRow | null>(null);

  type ProductWithPopulatedCategory = Omit<TableRow, 'category_id'> & {
    category_id: {
      _id: string;
      name: string;
      is_active?: boolean;
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');

        const res = await fetch(`${BACKEND_API}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const productsData = await res.json();

        const mapped: UIProductRow[] = (productsData as ProductWithPopulatedCategory[]).map((item) => ({
          ...item,
          category_id: item.category_id._id,
          category_name: item.category_id?.name || 'Không rõ danh mục',
          description: item.description || 'Không có mô tả',
          img_url: item.img_url || '',
        }));

        setProducts(mapped);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

    fetchData();
  }, []);

  const columns: ColumnDef[] = [
    {
      header: 'Image',
      field: 'img_url',
      render: (item) => (
        <img src={item.img_url} alt="img" className="w-12 h-12 object-cover rounded" />
      ),
    },
    { header: 'Name', field: 'name' },
    {
      header: 'Price',
      field: 'price',
      render: (item) => `${item.price?.toLocaleString()} VNĐ`,
    },
    {
      header: 'Category',
      field: 'category_name',
    },
    {
      header: 'Created At',
      field: 'create_at',
      render: (item) => new Date(item.create_at!).toLocaleDateString(),
    },
    {
      header: 'Available',
      field: 'available',
      render: (item) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
            item.available ?? false
          )}`}
        >
          {item.available ? 'Yes' : 'No'}
        </span>
      ),
    },
  ];

  return (
    <>
      <div className={`transition-all duration-300 ease-in-out ${selectedItem ? 'w-[calc(100%-320px)]' : 'w-full'}`}>
        <Header activeMenu="Products" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <main
          className={`p-6 transition-all duration-300 ease-in-out ${
            selectedItem ? 'w-[calc(100%-320px)]' : 'w-full'
          }`}
        >
          <TableContent
            data={products}
            columns={columns}
            selectedItem={selectedItem}
            onRowClick={setSelectedItem}
            getStatusColor={() => ''}
          />
        </main>

        <div
          className={`w-80 h-full bg-white border-l border-gray-200 fixed right-0 top-0 z-50 transform transition-transform duration-300 ${
            selectedItem ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <RightDetailPanel
            selectedItem={selectedItem}
            activeMenu="Products"
            getStatusColor={getStatusColor}
            onClose={() => setSelectedItem(null)}
          />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
