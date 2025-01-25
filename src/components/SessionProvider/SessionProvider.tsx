import LoggedLayout from '../layout/LoggedLayout';
import UnloggedLayout from '../layout/UnloggedLayout';

interface LoggedLayoutProps {
	children: React.ReactNode;
}

export default function SessionProvider({ children }: LoggedLayoutProps) {
	return (
		<>
			<LoggedLayout>{children}</LoggedLayout>
			{/* <UnloggedLayout>{children}</UnloggedLayout> */}
		</>
	);
}
