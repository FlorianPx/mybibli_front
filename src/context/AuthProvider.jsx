import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    status: "pending",
    error: null,
    user: { token: localStorage.getItem("authToken") },
  });

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_URL_API}profile`,
        {},
        {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        }
      )
      .then(({ data: { formData } }) => {
        setState({
          ...state,
          user: {
            ...state.user,
            id: formData.id,
            iconId: formData.image_id,
            name: formData.name,
          },
          status: "success",
        });
      })
      .catch(() => {
        setState({ ...state, status: "error" });
      });
  }, []);

  const login = (email, password) => {
    axios
      .post(`${process.env.REACT_APP_URL_API}login`, { email, password })
      .then(({ data }) => {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userId", data.id);
        setState({
          ...state,
          status: "success",
          user: { ...data },
        });
      })
      .catch((error) => {
        localStorage.setItem("error", error);
      });
  };

  const logout = () => {
    localStorage.clear();
    setState({ ...state, user: null, status: "pending" });
  };

  const register = (formValues) => {};

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthState = () => {
  const { state, login, logout } = useContext(AuthContext);
  const isPending = state.status === "pending";
  const isError = state.status === "error";
  const isSuccess = state.status === "success";
  const isAuthenticated = state.user && isSuccess;
  return {
    ...state,
    isPending,
    isError,
    isSuccess,
    isAuthenticated,
    login,
    logout,
  };
};
