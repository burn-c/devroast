import { Button } from "@/components/ui";

export default function DesignSystem() {
	return (
		<div className="min-h-screen bg-neutral-950 p-8">
			<h1 className="text-3xl font-bold mb-8">Design System</h1>

			<section className="mb-12">
				<h2 className="text-xl font-semibold mb-4">Button</h2>

				<div className="space-y-8">
					<div>
						<h3 className="text-sm font-medium text-neutral-500 mb-3">
							Primary (roast_my_code)
						</h3>
						<div className="flex flex-wrap gap-3">
							<Button variant="primary">roast_my_code</Button>
							<Button variant="primary" disabled>
								roast_my_code
							</Button>
						</div>
					</div>

					<div>
						<h3 className="text-sm font-medium text-neutral-500 mb-3">
							Secondary (share_roast)
						</h3>
						<div className="flex flex-wrap gap-3">
							<Button variant="secondary">share_roast</Button>
							<Button variant="secondary" disabled>
								share_roast
							</Button>
						</div>
					</div>

					<div>
						<h3 className="text-sm font-medium text-neutral-500 mb-3">
							Link (view_all)
						</h3>
						<div className="flex flex-wrap gap-3">
							<Button variant="link">view_all &gt;&gt;</Button>
							<Button variant="link" disabled>
								view_all &gt;&gt;
							</Button>
						</div>
					</div>

					<div>
						<h3 className="text-sm font-medium text-neutral-500 mb-3">Sizes</h3>
						<div className="flex flex-wrap items-center gap-3">
							<Button size="sm">Small</Button>
							<Button size="md">Medium</Button>
							<Button size="lg">Large</Button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
