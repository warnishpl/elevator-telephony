"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";

interface AlertContextType {
  showAlert: (
    message: string,
    severity?: AlertColor,
    autoHideDuration?: number
  ) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode;
}

let showAlert: (
  message: string,
  severity?: AlertColor,
  autoHideDuration?: number
) => void;

export function AlertProvider({ children }: Readonly<AlertProviderProps>) {
  const [alert, setAlert] = useState<{
    message: string;
    severity: AlertColor;
    open: boolean;
    autoHideDuration: number | null;
  }>({
    message: "",
    severity: "info",
    open: false,
    autoHideDuration: null,
  });

  showAlert = (
    message: string,
    severity: AlertColor = "info",
    autoHideDuration: number = 3000
  ) => {
    setAlert({ message, severity, open: true, autoHideDuration });
  };

  const handleClose = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        open={alert.open}
        autoHideDuration={alert.autoHideDuration}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const enqueueAlert = (
  message: string,
  severity?: AlertColor,
  autoHideDuration?: number
) => {
  if (showAlert) {
    showAlert(message, severity, autoHideDuration);
  } else {
    console.error("AlertProvider not initialized");
  }
};
