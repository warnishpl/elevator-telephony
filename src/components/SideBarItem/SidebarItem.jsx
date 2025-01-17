'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function SidebarItem({
	isOpen,
	children,
	iconPath,
	href,
	isActive,
}) {
	const containerClassName = isActive
		? 'bg-menuSecondary hover:bg-menuTertiary'
		: '';
	return (
		<Link href={href}>
			<div
				className={`flex justify-between items-center p-2 mb-[2px] rounded  hover:bg-menuSecondary transition-all duration-300 ease-in-out transform ${containerClassName}`}
			>
				<Image src={iconPath} alt={children} width={24} height={24} />
				<div>{isOpen && children}</div>
			</div>
		</Link>
	);
}
