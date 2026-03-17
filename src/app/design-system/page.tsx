import { Badge, Button, CodeBlock, Toggle } from "@/components/ui";

export default async function DesignSystem() {
	const codeExample = `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}`;

	return (
		<div className="min-h-screen bg-[#0C0C0C] p-[80px_60px]">
			<div className="flex flex-col gap-14">
				<section>
					<div className="flex flex-col gap-1 mb-5">
						<span className="text-[#FAFAFA] font-mono text-[18px] font-bold">
							Button
						</span>
						<span className="text-[#737373] font-mono text-[12px]">
							src/components/ui/button.tsx
						</span>
					</div>

					<span className="text-[#737373] font-mono text-[12px] font-bold">
						VARIANTES
					</span>

					<div className="flex items-center gap-4 mt-3 mb-6">
						<Button variant="primary">$primary</Button>
						<Button variant="secondary">$secondary</Button>
						<Button variant="ghost">$ghost</Button>
						<Button variant="danger">$danger</Button>
					</div>

					<span className="text-[#737373] font-mono text-[12px] font-bold">
						TAMANHOS
					</span>

					<div className="flex items-center gap-4 mt-3 mb-6">
						<Button size="sm">$size_sm</Button>
						<Button size="md">$size_md</Button>
						<Button size="lg">$size_lg</Button>
					</div>

					<span className="text-[#737373] font-mono text-[12px] font-bold">
						MATRIZ VARIANTE X TAMANHO
					</span>

					<div className="flex flex-col gap-3 mt-3 mb-6">
						<div className="flex items-center gap-4">
							<span className="text-[#737373] font-mono text-[12px] w-[90px]">
								primary
							</span>
							<Button variant="primary" size="sm">
								$primary_sm
							</Button>
							<Button variant="primary" size="md">
								$primary_md
							</Button>
							<Button variant="primary" size="lg">
								$primary_lg
							</Button>
						</div>
						<div className="flex items-center gap-4">
							<span className="text-[#737373] font-mono text-[12px] w-[90px]">
								secondary
							</span>
							<Button variant="secondary" size="sm">
								$secondary_sm
							</Button>
							<Button variant="secondary" size="md">
								$secondary_md
							</Button>
							<Button variant="secondary" size="lg">
								$secondary_lg
							</Button>
						</div>
						<div className="flex items-center gap-4">
							<span className="text-[#737373] font-mono text-[12px] w-[90px]">
								ghost
							</span>
							<Button variant="ghost" size="sm">
								$ghost_sm
							</Button>
							<Button variant="ghost" size="md">
								$ghost_md
							</Button>
							<Button variant="ghost" size="lg">
								$ghost_lg
							</Button>
						</div>
						<div className="flex items-center gap-4">
							<span className="text-[#737373] font-mono text-[12px] w-[90px]">
								danger
							</span>
							<Button variant="danger" size="sm">
								$danger_sm
							</Button>
							<Button variant="danger" size="md">
								$danger_md
							</Button>
							<Button variant="danger" size="lg">
								$danger_lg
							</Button>
						</div>
					</div>

					<span className="text-[#737373] font-mono text-[12px] font-bold">
						DESABILITADO
					</span>

					<div className="flex items-center gap-4 mt-3">
						<Button variant="primary" disabled>
							$primary
						</Button>
						<Button variant="secondary" disabled>
							$secondary
						</Button>
						<Button variant="ghost" disabled>
							$ghost
						</Button>
						<Button variant="danger" disabled>
							$danger
						</Button>
					</div>
				</section>

				<section>
					<div className="flex items-center gap-2 mb-6">
						<span className="text-[#10B981] font-mono text-[14px] font-bold">
							&#47;&#47;
						</span>
						<span className="text-[#FAFAFA] font-mono text-[14px] font-bold">
							toggle
						</span>
					</div>

					<div className="flex items-center gap-8">
						<Toggle pressed>roast mode</Toggle>
						<Toggle>roast mode</Toggle>
					</div>
				</section>

				<section>
					<div className="flex items-center gap-2 mb-6">
						<span className="text-[#10B981] font-mono text-[14px] font-bold">
							&#47;&#47;
						</span>
						<span className="text-[#FAFAFA] font-mono text-[14px] font-bold">
							badge_status
						</span>
					</div>

					<div className="flex items-center gap-6">
						<Badge variant="critical">critical</Badge>
						<Badge variant="warning">warning</Badge>
						<Badge variant="good">good</Badge>
						<Badge variant="critical">needs_serious_help</Badge>
					</div>
				</section>

				<section>
					<div className="flex items-center gap-2 mb-6">
						<span className="text-[#10B981] font-mono text-[14px] font-bold">
							&#47;&#47;
						</span>
						<span className="text-[#FAFAFA] font-mono text-[14px] font-bold">
							code_block
						</span>
					</div>

					<div className="max-w-[560px]">
						<CodeBlock code={codeExample} filename="calculate.js" />
					</div>
				</section>
			</div>
		</div>
	);
}
