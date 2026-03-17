import { Button } from "@/components/ui";

export default function DesignSystem() {
	return (
		<div className="min-h-screen bg-[#0C0C0C] p-[80px_60px]">
			<div className="flex flex-col gap-6">
				<div className="flex items-center gap-2">
					<span className="text-[#10B981] font-mono text-[14px] font-bold">
						&#47;&#47;
					</span>
					<span className="text-[#FAFAFA] font-mono text-[14px] font-bold">
						buttons
					</span>
				</div>

				<div className="flex items-center gap-4">
					<Button variant="primary">roast_my_code</Button>
					<Button variant="secondary">share_roast</Button>
					<Button variant="link">view_all &gt;&gt;</Button>
				</div>
			</div>
		</div>
	);
}
