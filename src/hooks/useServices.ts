import { useContext } from "react";
import { ServiceContext } from "../context/ServiceContext";
import { DevelopmentError } from "../utils/utils";

export const useServices = () => {
  const services = useContext(ServiceContext);
  if (!services) {
    throw new DevelopmentError("Services are undefined.");
  }
  return services;
};
