interface LoggedLayoutProps {
  children: React.ReactNode
}

export default function UnloggedLayout({
  children
}: Readonly<LoggedLayoutProps>) {
  return <>{children}</>
}
