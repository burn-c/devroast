import {
	Badge,
	Button,
	Card,
	CodeBlock,
	DiffLine,
	Navbar,
	ScoreRing,
	TableRow,
} from "@/components/ui";
import { ToggleExample } from "./toggle-example";

export const dynamic = "force-dynamic";

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
				{/* Button */}
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

				{/* Toggle */}
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
						<ToggleExample />
					</div>
				</section>

				{/* Badge */}
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

				{/* Cards */}
				<section>
					<div className="flex items-center gap-2 mb-6">
						<span className="text-[#10B981] font-mono text-[14px] font-bold">
							&#47;&#47;
						</span>
						<span className="text-[#FAFAFA] font-mono text-[14px] font-bold">
							cards
						</span>
					</div>

					<div className="flex flex-col gap-3">
						<Card
							variant="critical"
							label="critical"
							title="using var instead of const/let"
							description="the var keyword is function-scoped rather than block-scoped, which can lead to unexpected behavior and bugs. modern javascript uses const for immutable bindings and let for mutable ones."
						/>
						<Card
							variant="warning"
							label="warning"
							title="using var instead of const/let"
							description="the var keyword is function-scoped rather than block-scoped."
						/>
						<Card
							variant="good"
							label="good"
							title="using const correctly"
							description="using const for immutable bindings is recommended."
						/>
					</div>
				</section>

				{/* CodeBlock */}
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

				{/* DiffLine */}
				<section>
					<div className="flex items-center gap-2 mb-6">
						<span className="text-[#10B981] font-mono text-[14px] font-bold">
							&#47;&#47;
						</span>
						<span className="text-[#FAFAFA] font-mono text-[14px] font-bold">
							diff_line
						</span>
					</div>

					<div className="flex flex-col rounded-[6px] border border-[#2A2A2A] overflow-hidden w-[560px]">
						<DiffLine type="removed" content="var total = 0;" />
						<DiffLine type="added" content="const total = 0;" />
						<DiffLine
							type="context"
							content="for (let i = 0; i &lt; items.length; i++) {"
						/>
					</div>
				</section>

				{/* TableRow */}
				<section>
					<div className="flex items-center gap-2 mb-6">
						<span className="text-[#10B981] font-mono text-[14px] font-bold">
							&#47;&#47;
						</span>
						<span className="text-[#FAFAFA] font-mono text-[14px] font-bold">
							table_row
						</span>
					</div>

					<div className="flex flex-col rounded-[6px] border border-[#2A2A2A] overflow-hidden w-full max-w-[600px]">
						<TableRow
							rank="#1"
							score="2.1"
							codePreview="function calculateTotal(items) { var total = 0; ..."
							language="javascript"
						/>
						<TableRow
							rank="#2"
							score="5.8"
							codePreview="function calculateTotal(items) { let total = 0; ..."
							language="javascript"
						/>
						<TableRow
							rank="#3"
							score="8.3"
							codePreview="const calculateTotal = (items) => items.reduce..."
							language="javascript"
						/>
					</div>
				</section>

				{/* Navbar */}
				<section>
					<div className="flex items-center gap-2 mb-6">
						<span className="text-[#10B981] font-mono text-[14px] font-bold">
							&#47;&#47;
						</span>
						<span className="text-[#FAFAFA] font-mono text-[14px] font-bold">
							navbar
						</span>
					</div>

					<Navbar links={[{ label: "leaderboard", href: "/leaderboard" }]} />
				</section>

				{/* ScoreRing */}
				<section>
					<div className="flex items-center gap-2 mb-6">
						<span className="text-[#10B981] font-mono text-[14px] font-bold">
							&#47;&#47;
						</span>
						<span className="text-[#FAFAFA] font-mono text-[14px] font-bold">
							score_ring
						</span>
					</div>

					<div className="flex items-center gap-8">
						<ScoreRing score={3.5} maxScore={10} />
						<ScoreRing score={8} maxScore={10} />
						<ScoreRing score={10} maxScore={10} />
					</div>
				</section>
			</div>
		</div>
	);
}
