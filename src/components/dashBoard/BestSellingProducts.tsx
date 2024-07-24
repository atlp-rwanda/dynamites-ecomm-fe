import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '@/app/hooks';
import { Product } from '@/types/Product';

function ProductTable() {
  const token = useAppSelector((state) => state.signIn.token);
  const [bestselling, setBestSelling] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/product/bestselling`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response): void => {
        setBestSelling(response.data.slice(0, 5));
      });
  }, [token]);
  return (
    <div className="w-full md:w-[60%] pt-4 px-4 bg-white rounded-lg">
      <h1 className="text-lg font-bold mb-4">Best selling Products</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-xs">
              <th className="px-4 py-2 border-b">No</th>
              <th className="px-4 py-2 border-b">IMAGE</th>
              <th className="px-4 py-2 border-b">PRODUCT NAME</th>
              <th className="px-4 py-2 border-b">CATEGORY</th>
              <th className="px-4 py-2 border-b">PRICE</th>
              <th className="px-4 py-2 border-b">VENDOR</th>
            </tr>
          </thead>
          <tbody>
            {bestselling.map((product, idx) => (
              <tr key={product.id} className="text-gray-600 text-sm">
                <td className="px-4 py-2 border-b text-center">{idx + 1}</td>
                <td className="px-4 py-2 border-b text-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 mx-auto"
                  />
                </td>
                <td className="px-4 py-2 border-b">{product.name}</td>
                <td className="px-4 py-2 border-b">
                  {product.category ? `${product.category}` : 'N/A'}
                </td>
                <td className="px-4 py-2 border-b text-right">
                  {product.regularPrice.toLocaleString()}
                </td>
                <td className="px-4 py-2 border-b">
                  {product.vendor
                    ? `${product.vendor.firstName} ${product.vendor.lastName}`
                    : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
