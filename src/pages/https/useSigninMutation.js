import { replace, useNavigate } from "react-router";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../services/axios";
import { apiEndPoints } from "../../services/apis";

async function login(data) {
  return axiosInstance.post(apiEndPoints.SIGNIN_API, data);
}
const SigInInMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,

    onSuccess: async (res) => {
      localStorage.setItem("token", res.data.token);
      navigate("/addProduct");
      toast.success(res.data.message);
    },
    onError: (res) => {
      toast.error(res.response.data.message);
    },
  });
};

export default SigInInMutation;
