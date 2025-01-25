import { Link } from "@mui/material";

export function UnloggedFooter() {
	return (
		<div className='flex flex-col gap-2 pt-4'>
			<span className='text-center'>
				Nie masz konta?{' '}
				<Link
					href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
					variant='body2'
				>
					Masz pecha
				</Link>
			</span>
		</div>
	);
}
