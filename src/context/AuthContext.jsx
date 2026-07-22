import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );
  const [showModal, setShowModal] = useState(false);
  const [pendingFeature, setPendingFeature] = useState(null);
  const [pendingRedirect, setPendingRedirect] = useState(null);
  const [justLoggedOut, setJustLoggedOut] = useState(false);
  const [userName, setUserName] = useState(
    () => localStorage.getItem("userName") || ""
  );

  const loginUser = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    setShowModal(false);
  };

  const logoutUser = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    setUserName("");
    setJustLoggedOut(true);
    setIsLoggedIn(false);
    setShowModal(false);
    setTimeout(() => {
      setJustLoggedOut(false);
    }, 1000);
  };

  const updateUserName = (name) => {
    localStorage.setItem("userName", name);
    setUserName(name);
  };

  const triggerLoginModal = (featureName, redirectPath) => {
    setPendingFeature(featureName);
    setPendingRedirect(redirectPath);
    setShowModal(true);
  };

  const closeLoginModal = () => {
    setShowModal(false);
    setPendingFeature(null);
    setPendingRedirect(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loginUser,
        logoutUser,
        showModal,
        setShowModal,
        pendingFeature,
        pendingRedirect,
        triggerLoginModal,
        closeLoginModal,
        justLoggedOut,
        userName,
        updateUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
