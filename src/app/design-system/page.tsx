import { Button } from "@/components/ui";

export default function DesignSystem() {
	return (
		<div className="min-h-screen bg-[#0C0C0C] p-8">
			<section className="mb-12">
				<div className="flex items-center gap-2 mb-6">
					<span className="text-emerald-500 font-mono text-xl font-bold">
						&#47;&#47;
					</span>
					<span className="text-[#FAFAFA] font-mono text-xl font-bold">
						buttons
					</span>
				</div>

				<div className="flex flex-wrap items-center gap-4">
					<Button variant="primary">roast_my_code</Button>
					<Button variant="secondary">share_roast</Button>
					<Button variant="link">view_all &gt;&gt;</Button>
				</div>
			</section>
		</div>
	);
}
