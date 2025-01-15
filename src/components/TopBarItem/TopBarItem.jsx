'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function TopBarItem({ children, iconPath, href, onClick }) {
	return (
		<Link href={href} onClick={onClick}>
			<div className='flex justify-center items-center rounded p-1 mr-2 hover:bg-menuSecondary transition-all duration-300 ease-in-out'>
				<Image src={iconPath} alt={iconPath} width={24} height={24} />
				<p className={typeof children !== 'undefined' ? 'pl-2' : ''}>
					{children}
				</p>
			</div>
		</Link>
	);
}
