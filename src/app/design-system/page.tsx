import { Button } from "@/components/ui";

const variants = ["primary", "secondary", "ghost", "link", "danger"] as const;
const sizes = ["sm", "md", "lg", "icon"] as const;

export default function DesignSystem() {
	return (
		<div className="min-h-screen bg-neutral-50 p-8">
			<h1 className="text-3xl font-bold mb-8">Design System</h1>

			<section className="mb-12">
				<h2 className="text-xl font-semibold mb-4">Button</h2>

				<div className="space-y-8">
					<div>
						<h3 className="text-sm font-medium text-neutral-500 mb-3">
							Variants
						</h3>
						<div className="flex flex-wrap gap-3">
							{variants.map((variant) => (
								<Button key={variant} variant={variant}>
									{variant}
								</Button>
							))}
						</div>
					</div>

					<div>
						<h3 className="text-sm font-medium text-neutral-500 mb-3">Sizes</h3>
						<div className="flex flex-wrap items-center gap-3">
							{sizes.map((size) => (
								<Button key={size} size={size}>
									{size}
								</Button>
							))}
						</div>
					</div>

					<div>
						<h3 className="text-sm font-medium text-neutral-500 mb-3">
							States
						</h3>
						<div className="flex flex-wrap gap-3">
							<Button>Default</Button>
							<Button disabled>Disabled</Button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
