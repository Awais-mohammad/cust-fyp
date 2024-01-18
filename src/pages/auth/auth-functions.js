import { toast } from "react-toastify";
import { toastUtil } from "../../utils/toast.utils";

export function logout() {
    toast.success("Logged out",toastUtil)
    localStorage.clear();
  }