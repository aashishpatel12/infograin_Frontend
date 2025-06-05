import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../services/axios";
import { apiEndPoints } from "../../services/apis";

async function deleteProduct({ id, token }) {
  console.log(id, token);

  const res = await axiosInstance.put(
    `${apiEndPoints.DELETE_PRODUCT}/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
}

const useDeleteProduct = () => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => deleteProduct({ id, token }),
    onSuccess: (res) => {
      queryClient.invalidateQueries([apiEndPoints.GET_ALLpRODUCT]);
      toast.success(res.data.message || "Product deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Delete failed");
    },
  });
};

export default useDeleteProduct;
