import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "@/api/auth.api";
import { LoginType } from "../types/login-type";
import { useNavigate } from "react-router-dom";

const USER_INFO_KEY = "user_info";

const saveUserToLocalStorage = (user: LoginType) => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
};

export const useAuth = () => {
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      saveUserToLocalStorage(data);
      navigate("/dashboard");
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { loginMutation };
};
