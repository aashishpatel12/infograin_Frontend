import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AddProductData from "./https/useAddProductMutation";

import useUpdateProductData from "./https/useUpdateProduct";
import { useParams, useNavigate } from "react-router-dom";
import { useGetOneProduct } from "./https/useGetSingleProduct";

const AddProduct = () => {
  const token = localStorage.getItem("token");
  const [value, setValue] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const imageFile = watch("image");

  const { mutateAsync, isPending } = AddProductData();
  const { mutateAsync: updateData, isPending: updatePending } =
    useUpdateProductData();
  const { data: productData, isLoading } = useGetOneProduct({ id, token });

  useEffect(() => {
    if (id && productData) {
      reset({
        title: productData.title,
        description: productData.description,
        price: productData.price,
        quantity: productData.quantity,
      });
      setExistingImage(
        productData.image ? `http://localhost:5000/${productData.image}` : ""
      );
    }
  }, [id, productData, reset]);

  const onSubmit = async (data) => {
    console.log("Product Data:", data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.token = token;
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }
    try {
      if (id) {
        updateData(
          { formData, id },
          {
            onSuccess: () => navigate("/allProduct"),
          }
        );
      } else {
        await mutateAsync(formData);
      }
      reset();
    } catch (error) {
      console.error("Error submitting form", error);
    }

    reset();
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-xl p-8 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {id ? "Edit product" : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full px-4 py-2 border rounded-xl resize-none focus:ring-2 focus:ring-blue-400 outline-none"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Price</label>
            <input
              type="number"
              {...register("price", {
                required: "Price is required",
                min: { value: 1, message: "Price must be greater than 0" },
              })}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Quantity</label>
            <input
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
                min: { value: 1, message: "Quantity must be at least 1" },
              })}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Product Image</label>

            <input
              type="file"
              {...register("image")}
              className="w-full px-4 py-2 border rounded-xl"
            />

            {imageFile && imageFile[0] ? (
              <img
                src={URL.createObjectURL(imageFile[0])}
                alt="Preview"
                className="w-40 h-40 object-cover mt-2 rounded-lg border"
              />
            ) : existingImage ? (
              <img
                src={existingImage}
                alt="Existing Product"
                className="w-40 h-40 object-cover mt-2 rounded-lg border"
              />
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300"
          >
            {id
              ? updatePending
                ? "edit product..."
                : "edit product"
              : isPending
              ? "Adding..."
              : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
