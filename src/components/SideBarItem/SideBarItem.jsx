'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function SideBarItem({ isOpen, children, iconPath, href }) {
	const pathname = usePathname();
	return (
		<Link href={href}>
			
			<div className={`flex justify-between items-center p-2 mb-[2px] rounded ${pathname === href ? "bg-menuSecondary hover:bg-menuTertiary" : ""} hover:bg-menuSecondary transition-all duration-300 ease-in-out transform`}>
				<Image src={iconPath} alt={children} width={24} height={24} />
				<div>{isOpen && children}</div>
			</div>
		</Link>
	);
}
