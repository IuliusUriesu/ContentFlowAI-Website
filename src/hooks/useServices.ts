import { useContext } from "react";
import { ServiceContext } from "../context/ServiceContext";

export const useServices = () => {
  return useContext(ServiceContext)!;
};
