import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
	logo?: ReactNode;
	links?: ReactNode[];
}

export const Navbar = forwardRef<HTMLDivElement, NavbarProps>(
	({ className, logo, links, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={
					className ??
					"flex items-center justify-between h-14 px-6 bg-[#0C0C0C] border-b border-[#2A2A2A] w-full"
				}
				{...props}
			>
				<div className="flex items-center gap-2">
					{logo ?? (
						<>
							<span className="text-emerald-500 font-mono text-xl font-bold">
								&gt;
							</span>
							<span className="text-[#FAFAFA] font-mono text-[18px] font-medium">
								devroast
							</span>
						</>
					)}
				</div>
				{links && (
					<div className="flex items-center gap-6">
						{links.map((link, i) => (
							<span key={i} className="text-[#A3A3A3] font-mono text-[13px]">
								{link}
							</span>
						))}
					</div>
				)}
			</div>
		);
	},
);

Navbar.displayName = "Navbar";
