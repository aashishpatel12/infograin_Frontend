import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../services/axios";
import { apiEndPoints } from "../../services/apis";

async function updateProduct({ formData, id }) {
  const res = await axiosInstance.put(
    `${apiEndPoints.UPDATE_PRODUCT}/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${formData.token}`,
      },
    }
  );
  return res;
}

const useUpdateProductData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [apiEndPoints.GET_ALLpRODUCT],
        refetchType: "all",
      });
      toast.success(res.data.message || "Product updated successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Update failed");
    },
  });
};

export default useUpdateProductData;
