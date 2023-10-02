import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const items = [
	'html5',
	'css3',
	'javascript',
	'tailwind',
	'typescript',
	'react',
	'nextjs',
	'vite',
	'astro',
	'nodejs',
	'postgresql',
	'prisma',
	'reactquery',
	'chakra',
	'openai',
];

export default function StackAnimation() {
	const [activeIndex, setActiveIndex] = useState<number>(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex((prev: number) => (prev + 1) % items.length);
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	const getVisibleItems = () => {
		if (activeIndex + 3 <= items.length) {
			return items.slice(activeIndex, activeIndex + 3);
		} else {
			return [
				...items.slice(activeIndex),
				...items.slice(0, 3 - (items.length - activeIndex)),
			];
		}
	};

	return (
		<div className="flex flex-col items-center w-full">
			<div className="flex my-5">
				<AnimatePresence mode="popLayout" initial={false}>
					{getVisibleItems().map((item, id) => {
						return (
							<motion.div
								className="flex bg-white rounded-xl shadow-lg justify-center items-center border-4 border-[#1E90FF] w-[6rem] h-[6rem] md:w-[7rem] md:h-[7rem] mx-1 md:mx-3"
								key={item}
								layout
								custom={{
									position: () => {
										if (id === 0) {
											return 'left';
										} else if (id === 1) {
											return 'center';
										} else {
											return 'right';
										}
									},
								}}
								variants={{
									enter: ({ position }) => {
										return {
											scale: 0.2,
											x: position() === 'left' ? 50 : -50,
											opacity: 0,
										};
									},
									center: ({ position }) => {
										return {
											scale: position() === 'center' ? 1 : 0.7,
											x: 0,
											zIndex: position() === 'center' ? 2 : 1,
											opacity: 1,
										};
									},
									exit: ({ position }) => {
										return {
											scale: 0.2,
											x: position() === 'left' ? -50 : 50,
											opacity: 0,
										};
									},
								}}
								initial="enter"
								animate="center"
								exit="exit"
								transition={{ duration: 1 }}
							>
								<img
									src={`/icons/${item}.svg`}
									className="w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem]"
								/>
							</motion.div>
						);
					})}
				</AnimatePresence>
			</div>
		</div>
	);
}
