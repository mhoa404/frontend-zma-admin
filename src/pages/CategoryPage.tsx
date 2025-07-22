import Header from '../components/Header';

const CategoryPage = () => {
  return (
    <>
      <Header activeMenu="Categories" />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-800">Category Management</h2>
          <p className="text-sm text-gray-500 mt-2">
            This page will handle all product categories
          </p>
        </div>
      </main>
    </>
  );
};

export default CategoryPage;
