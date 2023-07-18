import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

export default function ThemeToggle({ size }: { size: string }) {
	const [theme, setTheme] = useState('dark');

	const handleClick = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	useEffect(() => {
		setTheme(localStorage.getItem('theme') ?? 'dark');
	}, []);

	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
		localStorage.setItem('theme', theme);
	}, [theme]);

	return (
		<button className="pt-1 md:mr-2" onClick={handleClick}>
			{theme === 'dark' ? (
				<SunIcon className={`text-white h-${size} w-${size}`} />
			) : (
				<MoonIcon className={`text-black h-${size} w-${size}`} />
			)}
		</button>
	);
}
