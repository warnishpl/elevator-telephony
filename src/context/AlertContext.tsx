'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface AlertContextType {
	showAlert: (
		message: string,
		severity?: 'success' | 'error' | 'warning' | 'info',
		autoHideDuration?: number
	) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
	children: ReactNode;
}

export function AlertProvider({ children }: AlertProviderProps) {
	const [alert, setAlert] = useState<{
		message: string;
		severity: 'success' | 'error' | 'warning' | 'info';
		open: boolean;
		autoHideDuration: number | null;
	}>({
		message: '',
		severity: 'info',
		open: false,
		autoHideDuration: null,
	});

	const showAlert = (
		message: string,
		severity: 'success' | 'error' | 'warning' | 'info' = 'info',
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
					sx={{ width: '100%' }}
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
		throw new Error('useAlert must be used within an AlertProvider');
	}
	return context;
};
