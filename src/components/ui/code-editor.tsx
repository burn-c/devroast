"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import csharp from "highlight.js/lib/languages/csharp";
import css from "highlight.js/lib/languages/css";
import go from "highlight.js/lib/languages/go";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import markdown from "highlight.js/lib/languages/markdown";
import php from "highlight.js/lib/languages/php";
import python from "highlight.js/lib/languages/python";
import ruby from "highlight.js/lib/languages/ruby";
import rust from "highlight.js/lib/languages/rust";
import sql from "highlight.js/lib/languages/sql";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";
import {
	forwardRef,
	type HTMLAttributes,
	useCallback,
	useEffect,
	useState,
} from "react";
import Editor from "react-simple-code-editor";
import { tv } from "tailwind-variants";
import {
	loadVesperPrism,
	SUPPORTED_LANGUAGES,
	type SupportedLanguage,
} from "@/lib/vesper-prism";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("java", java);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("go", go);
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("ruby", ruby);
hljs.registerLanguage("php", php);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("json", json);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("markup", xml);

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("java", java);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("go", go);
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("ruby", ruby);
hljs.registerLanguage("php", php);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("json", json);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("markup", xml);

const editorContainer = tv({
	base: "rounded-[6px] border border-[#2A2A2A] overflow-hidden bg-[#111111]",
});

const editorHeader = tv({
	base: "flex items-center justify-between h-10 px-4 border-b border-[#2A2A2A]",
});

const editorWindowDots = tv({
	base: "flex items-center gap-2",
	variants: {
		color: {
			red: "bg-red-500",
			amber: "bg-amber-500",
			emerald: "bg-emerald-500",
		},
	},
});

const editorArea = tv({
	base: "flex min-h-[360px] font-mono text-[13px]",
});

const lineNumbers = tv({
	base: "flex flex-col items-end gap-1.5 py-3 px-3 min-w-[48px] border-r border-[#2A2A2A] text-[12px] text-[#737373] select-none",
});

const selectTrigger = tv({
	base: "flex items-center justify-between gap-2 px-3 py-1.5 rounded-[4px] text-[12px] font-mono bg-transparent border border-[#2A2A2A] text-[#A3A3A3] hover:border-[#404040] focus:outline-none focus:border-[#10B981] transition-colors",
});

const selectContent = tv({
	base: "bg-[#171717] border border-[#2A2A2A] rounded-[6px] shadow-lg overflow-hidden z-50",
});

const selectItem = tv({
	base: "px-3 py-2 text-[12px] font-mono text-[#A3A3A3] cursor-pointer outline-none hover:bg-[#262626] hover:text-[#FAFAFA] data-[highlighted]:bg-[#262626] data-[highlighted]:text-[#FAFAFA]",
});

export interface CodeEditorProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
	value: string;
	onChange: (value: string) => void;
	language?: SupportedLanguage;
	onLanguageChange?: (language: SupportedLanguage) => void;
	minHeight?: number;
}

const languageMap: Record<string, string> = {
	javascript: "javascript",
	typescript: "typescript",
	python: "python",
	java: "java",
	csharp: "csharp",
	go: "go",
	rust: "rust",
	ruby: "ruby",
	php: "php",
	sql: "sql",
	html: "markup",
	css: "css",
	json: "json",
	yaml: "yaml",
	bash: "bash",
	plaintext: "plaintext",
};

const highlightCode = (code: string, lang: string): string => {
	try {
		if (typeof window === "undefined") return code;
		const hlLang = languageMap[lang] || "plaintext";
		if (hljs.getLanguage(hlLang)) {
			return hljs.highlight(code, { language: hlLang }).value;
		}
	} catch {
		// Fallback to plain text
	}
	return code;
};

const _detectLanguage = (code: string): SupportedLanguage => {
	try {
		const result = hljs.highlightAuto(code);
		if (
			result.language &&
			SUPPORTED_LANGUAGES.some((l) => l.value === result.language)
		) {
			return result.language as SupportedLanguage;
		}
	} catch {
		// Fall through to default
	}
	return "javascript";
};

export const CodeEditor = forwardRef<HTMLDivElement, CodeEditorProps>(
	(
		{
			className,
			value,
			onChange,
			language: controlledLanguage,
			onLanguageChange,
			minHeight = 360,
			...props
		},
		ref,
	) => {
		const [language, setLanguage] = useState<SupportedLanguage>(
			controlledLanguage || "javascript",
		);
		const [isMounted, setIsMounted] = useState(false);

		useEffect(() => {
			setIsMounted(true);
			loadVesperPrism();
		}, []);

		const handleLanguageChange = useCallback(
			(newLanguage: SupportedLanguage) => {
				setLanguage(newLanguage);
				onLanguageChange?.(newLanguage);
			},
			[onLanguageChange],
		);

		const handleCodeChange = useCallback(
			(newCode: string) => {
				onChange(newCode);
			},
			[onChange],
		);

		const lines = value.split("\n");

		return (
			<div className={editorContainer({ className })} ref={ref} {...props}>
				<div className={editorHeader()}>
					<div className={editorWindowDots()}>
						<span className="w-3 h-3 rounded-full bg-red-500" />
						<span className="w-3 h-3 rounded-full bg-amber-500" />
						<span className="w-3 h-3 rounded-full bg-emerald-500" />
					</div>

					<SelectPrimitive.Root
						value={language}
						onValueChange={(val) =>
							handleLanguageChange(val as SupportedLanguage)
						}
					>
						<SelectPrimitive.Trigger className={selectTrigger()}>
							<SelectPrimitive.Value>
								{SUPPORTED_LANGUAGES.find((l) => l.value === language)?.label ||
									"JavaScript"}
							</SelectPrimitive.Value>
							<SelectPrimitive.Icon>▼</SelectPrimitive.Icon>
						</SelectPrimitive.Trigger>

						<SelectPrimitive.Portal>
							<SelectPrimitive.Content
								className={selectContent()}
								position="popper"
								sideOffset={4}
							>
								<SelectPrimitive.Viewport className="p-1">
									{SUPPORTED_LANGUAGES.map((lang) => (
										<SelectPrimitive.Item
											key={lang.value}
											value={lang.value}
											className={selectItem()}
										>
											<SelectPrimitive.ItemText>
												{lang.label}
											</SelectPrimitive.ItemText>
										</SelectPrimitive.Item>
									))}
								</SelectPrimitive.Viewport>
							</SelectPrimitive.Content>
						</SelectPrimitive.Portal>
					</SelectPrimitive.Root>
				</div>

				<div className={editorArea()} style={{ minHeight }}>
					<div className={lineNumbers()}>
						{lines.map((_, i) => (
							<span key={i}>{i + 1}</span>
						))}
					</div>

					<div className="flex-1 relative">
						<Editor
							value={value}
							onValueChange={handleCodeChange}
							highlight={(code) =>
								isMounted ? highlightCode(code, language) : code
							}
							padding={16}
							className="font-mono text-[13px]"
							style={{
								fontFamily:
									'"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
								fontSize: 13,
								minHeight: minHeight - 40,
							}}
							textareaClassName="focus:outline-none"
						/>
					</div>
				</div>
			</div>
		);
	},
);

CodeEditor.displayName = "CodeEditor";
