import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../services/axios";
import { apiEndPoints } from "../../services/apis";

async function fetchData({ token }) {
  const { data } = await axiosInstance.get(apiEndPoints.GET_ALLpRODUCT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export const useGetAllProduct = () => {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: [apiEndPoints.GET_ALLpRODUCT],
    queryFn: () => fetchData({ token }),
  });
};
