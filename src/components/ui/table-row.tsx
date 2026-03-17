import { forwardRef, type HTMLAttributes } from "react";

export interface TableRowProps extends HTMLAttributes<HTMLDivElement> {
	rank: string;
	score: string;
	codePreview: string;
	language: string;
}

export const TableRow = forwardRef<HTMLDivElement, TableRowProps>(
	({ className, rank, score, codePreview, language, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={
					className ??
					"flex items-center py-4 px-5 border-b border-[#2A2A2A] w-full"
				}
				{...props}
			>
				<div className="w-10 text-[#737373] font-mono text-[13px]">{rank}</div>
				<div className="w-15 text-red-500 font-mono text-[13px] font-bold">
					{score}
				</div>
				<div className="flex-1 text-[#A3A3A3] font-mono text-[12px] truncate">
					{codePreview}
				</div>
				<div className="w-25 text-[#737373] font-mono text-[12px]">
					{language}
				</div>
			</div>
		);
	},
);

TableRow.displayName = "TableRow";
