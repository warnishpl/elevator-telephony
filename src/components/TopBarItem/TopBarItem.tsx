// 'use client';
// import Image from 'next/image';
// import React from 'react';

// interface TopBarItemProps {
// 	children?: React.ReactNode;
// 	iconPath: string;
// 	onClick?: () => void;
// }
// export default function TopBarItem({
// 	children,
// 	iconPath,
// 	onClick,
// }: TopBarItemProps) {
// 	return (
// 		<button onClick={onClick} className='mr-2'>
// 			<div className='flex justify-center items-center rounded p-1 hover:bg-menuSecondary transition-all duration-300 ease-in-out'>
// 				<Image src={iconPath} alt={iconPath} width={24} height={24} />
// 				<p className={typeof children !== 'undefined' ? 'pl-2' : ''}>
// 					{children}
// 				</p>
// 			</div>
// 		</button>
// 	);
// }
