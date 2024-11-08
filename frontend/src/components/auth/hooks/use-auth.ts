import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "@/api/auth.api";
import { useNavigate } from "react-router-dom";
import { saveUserToLocalStorage } from "../utils/utils";

export const useAuth = () => {
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      saveUserToLocalStorage(data.accessToken);
      navigate("/dashboard/overview");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { loginMutation };
};
