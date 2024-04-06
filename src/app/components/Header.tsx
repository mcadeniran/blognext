import {getCurrentUser} from '@/lib/session';
import Link from 'next/link';
import React from 'react';
import ButtonLogout from './button_logout';

export default async function Header() {
	const user = await getCurrentUser();
	return (
		<header className='bg-slate-500 p-4'>
			<nav className="flex justify-between items-center max-w-4xl mx-auto">
				<Link
					className='text-white text-2xl font-bold'
					href={'/'}>
					My Blogs
				</Link>

				<ul className='flex space-x-4'>
					<li>
						<Link href={'/blogs'} className='text-white hover:underline'>Blogs</Link>
					</li>
					{user?.email ? (
						<ButtonLogout />
					) : (<li>
						<Link href={'/api/auth/signin'} className='text-white hover:underline'>Login</Link>
					</li>)}

				</ul>
			</nav>
		</header >
	);
}
