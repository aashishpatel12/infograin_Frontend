import React, { useEffect, useState } from "react";
import { useGetAllProduct } from "./https/useGetAllProduct";
import { useNavigate } from "react-router";
import useDeleteProduct from "./https/useDeleteMutation";

const AllProduct = () => {
  const token = localStorage.getItem("token");
  const [listData, setListData] = useState([]);
  const { data, isLoading } = useGetAllProduct();

  const { mutateAsync, isPending } = useDeleteProduct();
  const navigate = useNavigate();
  useEffect(() => {
    if (data?.products) {
      setListData(data?.products);
    }
  }, [data?.products]);

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await mutateAsync({ id });
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  if (isLoading) {
    return <div className="text-center text-xl mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 overflow-x-hidden">
      <h1 className="text-2xl font-bold mb-6 text-center">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listData?.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <img
              src={`http://localhost:5000/${product.image}`}
              alt={product.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>

            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <div className="flex justify-between text-sm font-medium">
              <p>₹ {product.price}</p>
              <p>Qty: {product.quantity}</p>
            </div>

            <div className="flex justify-between mt-4 gap-2">
              <button
                onClick={() => handleEdit(product._id)}
                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
