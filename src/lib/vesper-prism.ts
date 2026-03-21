const highlightJsStyles = `
code.hljs,
.hljs {
	color: #ABB2BF;
	background: transparent;
	font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
	font-size: 13px;
	line-height: 1.625;
}

.hljs-comment,
.hljs-quote {
	color: #5C6370;
	font-style: italic;
}

.hljs-doctag,
.hljs-keyword,
.hljs-formula {
	color: #C678DD;
}

.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
	color: #E06C75;
}

.hljs-literal {
	color: #56B6C2;
}

.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta .hljs-string {
	color: #98C379;
}

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
	color: #D19A66;
}

.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
	color: #61AFEF;
}

.hljs-built_in,
.hljs-title.class_,
.hljs-class .hljs-title {
	color: #E6C07B;
}

.hljs-emphasis {
	font-style: italic;
}

.hljs-strong {
	font-weight: bold;
}

.hljs-link {
	text-decoration: underline;
}
`;

export function loadVesperPrism() {
	if (typeof window === "undefined") return;

	const existing = document.getElementById("highlightjs-styles");
	if (existing) return;

	const style = document.createElement("style");
	style.id = "highlightjs-styles";
	style.textContent = highlightJsStyles;
	document.head.appendChild(style);
}

export const SUPPORTED_LANGUAGES = [
	{ value: "javascript", label: "JavaScript" },
	{ value: "typescript", label: "TypeScript" },
	{ value: "python", label: "Python" },
	{ value: "java", label: "Java" },
	{ value: "csharp", label: "C#" },
	{ value: "go", label: "Go" },
	{ value: "rust", label: "Rust" },
	{ value: "ruby", label: "Ruby" },
	{ value: "php", label: "PHP" },
	{ value: "sql", label: "SQL" },
	{ value: "html", label: "HTML" },
	{ value: "css", label: "CSS" },
	{ value: "json", label: "JSON" },
	{ value: "yaml", label: "YAML" },
	{ value: "markdown", label: "Markdown" },
	{ value: "bash", label: "Bash" },
	{ value: "markup", label: "HTML" },
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]["value"];

export const LANGUAGE_ALIASES: Record<string, string> = {
	js: "javascript",
	ts: "typescript",
	py: "python",
	rb: "ruby",
	sh: "bash",
	shell: "bash",
	yml: "yaml",
	xml: "html",
};
