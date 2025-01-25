import sitemarkIcon from 'public/sitemark.svg';
import moonIcon from 'public/moon.svg';
import sunIcon from 'public/sun.svg';
import Image from 'next/image';

export function UnloggedHeader({
	isDarkMode,
	toggleTheme,
}: {
	isDarkMode: boolean;
	toggleTheme: () => void;
}) {
	return (
		<div className='flex flex-row justify-between'>
			<Image priority src={sitemarkIcon} alt='sitemark-icon' />
			<button onClick={toggleTheme} className='mr-2'>
				<div className='flex justify-center items-center rounded p-1 hover:bg-menuSecondary transition-all duration-300 ease-in-out'>
					<Image
						src={isDarkMode ? moonIcon : sunIcon}
						alt='theme-button'
						width={24}
						height={24}
					/>
				</div>
			</button>
		</div>
	);
}