import LoggedLayout from '@/layouts/LoggedLayout';
import UnloggedLayout from '@/layouts/UnloggedLayout';
import { User } from '@/utils/sessionTypes';
import { useSession } from '@/utils/useSession';
import React, { createContext, useContext, ReactNode } from 'react';

interface SessionContextType {
	isAuthenticated: boolean;
	getUser: () => User | null;
	loading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSessionContext = () => {
	const context = useContext(SessionContext);
	if (!context) {
		throw new Error('useSessionContext must be used within a SessionProvider');
	}
	return context;
};

interface SessionProviderProps {
	children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
	children,
}) => {
	const { isAuthenticated, getUser, loading } = useSession();
	return (
		<SessionContext.Provider value={{ isAuthenticated, getUser, loading }}>
			{!isAuthenticated ? (
				<UnloggedLayout>{children}</UnloggedLayout>
			) : (
				<LoggedLayout>{children}</LoggedLayout>
			)}
		</SessionContext.Provider>
	);
};
