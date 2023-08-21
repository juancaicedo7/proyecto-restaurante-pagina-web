import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export function UseUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UseUser debe estar dentro del proveedor");
  }
  return context;
}