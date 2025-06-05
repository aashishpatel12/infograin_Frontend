import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../services/axios";
import { apiEndPoints } from "../../services/apis";

const fetchProductById = async ({ id, token }) => {
  const { data } = await axiosInstance.get(
    `${apiEndPoints.Get_OneProduct}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data?.product;
};

export const useGetOneProduct = ({ id, token }) => {
  return useQuery({
    queryKey: ["getOneProduct", id],
    queryFn: () => fetchProductById({ id, token }),
    enabled: !!id && !!token,
  });
};
