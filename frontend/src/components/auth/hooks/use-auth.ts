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
      navigate("/dashboard");
    },
  });

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("access_token");
  };
  return { loginMutation, logout, isAuthenticated };
};
