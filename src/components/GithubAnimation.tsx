import { animate, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface AnimationProps {
	from: number;
	to: number;
}

export default function GithubAnimation({ from, to }: AnimationProps) {
	const nodeRef = useRef<HTMLParagraphElement | null>(null);
	const [isInView, setIsInView] = useState(false);

	useEffect(() => {
		const node = nodeRef.current;
		if (!node) return;

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setIsInView(true);
					}
				});
			},
			{ threshold: 0.1 }
		);

		observer.observe(node);

		return () => {
			observer.unobserve(node);
		};
	}, []);

	useEffect(() => {
		if (!isInView) return;

		const node = nodeRef.current;
		if (!node) return;

		const controls = animate(from, to, {
			duration: 2,
			onUpdate(value) {
				node.textContent = Math.round(value).toString();
			},
		});

		return () => controls.stop();
	}, [from, to, isInView]);

	return (
		<motion.p
			ref={nodeRef}
			initial={{ opacity: 0, scale: 0.1 }}
			animate={isInView ? { opacity: 1, scale: 1 } : {}}
			transition={{ duration: 0.4 }}
			className="text-8xl font-semibold text-[#39D353]"
		/>
	);
}
