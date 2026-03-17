import { Button } from "@/components/ui";

export default function DesignSystem() {
	return (
		<div className="min-h-screen bg-[#0C0C0C] p-[80px_60px]">
			<div className="flex flex-col gap-5">
				<div className="flex flex-col gap-1">
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

				<div className="flex items-center gap-4">
					<Button variant="primary">$primary</Button>
					<Button variant="secondary">$secondary</Button>
					<Button variant="ghost">$ghost</Button>
					<Button variant="danger">$danger</Button>
				</div>

				<span className="text-[#737373] font-mono text-[12px] font-bold">
					TAMANHOS
				</span>

				<div className="flex items-center gap-4">
					<Button size="sm">$size_sm</Button>
					<Button size="md">$size_md</Button>
					<Button size="lg">$size_lg</Button>
				</div>

				<span className="text-[#737373] font-mono text-[12px] font-bold">
					MATRIZ VARIANTE X TAMANHO
				</span>

				<div className="flex flex-col gap-4">
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

				<div className="flex items-center gap-4">
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
			</div>
		</div>
	);
}
