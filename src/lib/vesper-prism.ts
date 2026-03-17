import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-php";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";

const baseStyles = `
code[class*="language-"],
pre[class*="language-"] {
	color: #FAFAFA;
	background: none;
	font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
	font-size: 13px;
	text-align: left;
	white-space: pre;
	word-spacing: normal;
	word-break: normal;
	word-wrap: normal;
	line-height: 1.625;
	-moz-tab-size: 2;
	-o-tab-size: 2;
	tab-size: 2;
	-webkit-hyphens: none;
	-moz-hyphens: none;
	-ms-hyphens: none;
	hyphens: none;
}

pre[class*="language-"] {
	padding: 1em;
	margin: 0;
	overflow: auto;
	background: #111111;
}

:not(pre) > code[class*="language-"] {
	padding: 0.1em 0.3em;
	border-radius: 0.3em;
	white-space: normal;
	background: #111111;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
	color: #5C6370;
	font-style: italic;
}

.token.punctuation {
	color: #ABB2BF;
}

.token.namespace {
	opacity: 0.7;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
	color: #D19A66;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
	color: #C5E447;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
	color: #56B6C2;
}

.token.atrule,
.token.attr-value,
.token.keyword {
	color: #FF6B6B;
}

.token.function,
.token.class-name {
	color: #61AFEF;
}

.token.regex,
.token.important,
.token.variable {
	color: #C678DD;
}

.token.important,
.token.bold {
	font-weight: bold;
}

.token.italic {
	font-style: italic;
}

.token.entity {
	cursor: help;
}

.token.directive,
.token.directive-hash {
	color: #61AFEF;
}

.token.cookie {
	color: #D19A66;
}

.token.entity-css {
	cursor: help;
}

.token.functional {
	color: #E5C07B;
}

.token.property-access {
	color: #E06C75;
}
`;

export function loadVesperPrism() {
	if (typeof window === "undefined") return;

	const style = document.createElement("style");
	style.textContent = baseStyles;
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
