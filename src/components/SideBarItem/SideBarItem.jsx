import Link from 'next/link';
import Image from 'next/image';

export default function SideBarItem({ isOpen, children, iconPath, href }) {
	return (
		<Link href={href}>
			<div className='flex justify-center items-center p-2 rounded hover:bg-menuSecondary'>
				<Image src={iconPath} alt={children} width={24} height={24} />
				{isOpen && children}
			</div>
		</Link>
	);
}
