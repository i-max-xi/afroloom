import { useQuery } from "@tanstack/react-query";
import AllServices from "../../../Services/usersService";

const fetchProducts = async () => {
  const response = await AllServices.getAllProducts();
  return response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false, // Don't refetch when switching tabs
  });
};
