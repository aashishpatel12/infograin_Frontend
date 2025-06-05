import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../services/axios";
import { apiEndPoints } from "../../services/apis";

async function add(formdata) {
  return axiosInstance.post(apiEndPoints.ADD_PRODUCT, formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${formdata.token}`,
    },
  });
}
const AddProductData = () => {
  return useMutation({
    mutationFn: add,

    onSuccess: async (res) => {
      toast.success(res.data.message);
    },
    onError: (res) => {
      toast.error(res.response.data.message);
    },
  });
};

export default AddProductData;
