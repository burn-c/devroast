import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import { db } from "../src/db/index";
import { analyses, diffLines, problems, submissions } from "../src/db/schema";

const codes = {
	javascript: [
		`function add(a, b) {
  return a + b;
}`,
		`const users = [
  { name: "John", age: 25 },
  { name: "Jane", age: 30 }
];

users.forEach(u => console.log(u.name));`,
		`async function fetchData() {
  const res = await fetch('/api/data');
  return res.json();
}`,
		`class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  greet() {
    return \`Hello, \${this.name}!\`;
  }
}`,
		`const arr = [1, 2, 3, 4, 5];
const sum = arr.reduce((acc, curr) => acc + curr, 0);
console.log(sum);`,
	],
	python: [
		`def greet(name):
    return f"Hello, {name}!"`,
		`numbers = [1, 2, 3, 4, 5]
squared = [x**2 for x in numbers]
print(squared)`,
		`class Calculator:
    def add(self, a, b):
        return a + b
    
    def subtract(self, a, b):
        return a - b`,
		`import json

def read_file(filename):
    with open(filename, 'r') as f:
        return json.load(f)`,
		`def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)`,
	],
	typescript: [
		`interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): User | null {
  return { id, name: "John", email: "john@example.com" };
}`,
		`type Status = 'pending' | 'approved' | 'rejected';

function processRequest(status: Status): string {
  switch (status) {
    case 'pending': return 'Waiting...';
    case 'approved': return 'Done!';
    case 'rejected': return 'Sorry!';
  }
}`,
		`enum Role {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST'
}

const currentRole: Role = Role.User;`,
		`function sum<T extends number>(arr: T[]): number {
  return arr.reduce((a, b) => (a + b) as number, 0);
}`,
		`interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}`,
	],
	java: [
		`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
		`public int[] bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}`,
		`public interface Repository<T> {
    T findById(Long id);
    List<T> findAll();
    void save(T entity);
    void delete(Long id);
}`,
	],
	csharp: [
		`public class Program {
    public static void Main(string[] args) {
        Console.WriteLine("Hello .NET!");
    }
}`,
		`public IEnumerable<T> Filter<T>(IEnumerable<T> list, Func<T, bool> predicate) {
    return list.Where(predicate);
}`,
		`[HttpGet("{id}")]
public async Task<ActionResult<User>> GetUser(int id) {
    var user = await _context.Users.FindAsync(id);
    return user is null ? NotFound() : Ok(user);
}`,
	],
	go: [
		`package main

import "fmt"

func main() {
    fmt.Println("Hello Go!")
}`,
		`func reverse(s string) string {
    runes := []rune(s)
    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
        runes[i], runes[j] = runes[j], runes[i]
    }
    return string(runes)
}`,
	],
	rust: [
		`fn main() {
    println!("Hello, Rust!");
}`,
		`fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n-1) + fibonacci(n-2)
    }
}`,
	],
	ruby: [
		`def greet(name)
  "Hello, #{name}!"
end`,
		`users = [{name: "John", age: 25}, {name: "Jane", age: 30}]
users.each { |u| puts u[:name] }`,
	],
	php: [
		`<?php
function greet($name) {
    return "Hello, $name!";
}`,
		`$users = [
    ['name' => 'John', 'email' => 'john@example.com'],
    ['name' => 'Jane', 'email' => 'jane@example.com']
];`,
	],
	sql: [
		`SELECT * FROM users WHERE active = true;`,
		`SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id;`,
	],
	html: [
		`<div class="container">
  <h1>Hello World</h1>
  <p>Welcome to my site!</p>
</div>`,
	],
	css: [
		`.container {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
	],
};

const summaries = {
	needs_serious_help: [
		"This code is a disaster. I'm surprised it even runs.",
		"I've seen better code in a garbage disposal.",
		"Please, for the love of all that is holy, refactor this.",
		"This is what happens when you copy-paste from Stack Overflow without understanding.",
		"My grandmother codes better than this.",
	],
	rough_around_edges: [
		"Functional but needs work. Many improvements possible.",
		"Not terrible, but there's room for improvement.",
		"It works, but I'd sleep better if we refactored some parts.",
		"Decent effort, but please learn about best practices.",
	],
	decent_code: [
		"Pretty solid code. Nothing exciting, but gets the job done.",
		"Good baseline. Could be worse, could be better.",
		"Average code is perfectly fine sometimes.",
		"Nothing wrong with plain and simple code.",
	],
	solid_work: [
		"Nice work! Clean and maintainable.",
		"Great job! I'd hire you for this.",
		"This shows good understanding of the language.",
		"Well structured and easy to follow.",
	],
	exceptional: [
		"Wow! This is production-ready code.",
		"Beautiful! The code is elegant and performant.",
		"Outstanding work! This is reference material.",
		"Exceptional! Write a blog post about this.",
	],
};

const problemTitles = {
	info: [
		"Missing JSDoc comment",
		"Consider adding type hints",
		"Could use a constant here",
	],
	warning: [
		"Variable declared but never used",
		"Missing error handling",
		"Consider using const instead of let",
		"Hardcoded value should be a config",
	],
	error: [
		"Null pointer exception possible",
		"SQL injection vulnerability",
		"Memory leak detected",
	],
	critical: [
		"Security vulnerability found",
		"Infinite loop risk",
		"Unhandled promise rejection",
	],
};

function getRandomElement<T>(arr: readonly T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomLanguage() {
	const languages = [
		"javascript",
		"typescript",
		"python",
		"java",
		"csharp",
		"go",
		"rust",
		"ruby",
		"php",
		"sql",
		"html",
		"css",
	] as const;
	return getRandomElement(languages);
}

function getRandomVerdict() {
	const verdicts = [
		"needs_serious_help",
		"rough_around_edges",
		"decent_code",
		"solid_work",
		"exceptional",
	] as const;
	return getRandomElement(verdicts);
}

function getRandomScore(verdict: string): string {
	const ranges: Record<string, [number, number]> = {
		needs_serious_help: [0, 2],
		rough_around_edges: [2.1, 4],
		decent_code: [4.1, 6],
		solid_work: [6.1, 8],
		exceptional: [8.1, 10],
	};
	const [min, max] = ranges[verdict];
	return (Math.random() * (max - min) + min).toFixed(1);
}

function getRandomRoastMode() {
	return Math.random() > 0.5 ? "roast" : "normal";
}

async function seed() {
	console.log("🌱 Starting seed...");

	for (let i = 0; i < 100; i++) {
		const language = getRandomLanguage();
		const languageCodes = codes[language];
		const code = getRandomElement(languageCodes);
		const verdict = getRandomVerdict();
		const score = getRandomScore(verdict);
		const roastMode = getRandomRoastMode();

		const submissionId = uuidv4();
		const analysisId = uuidv4();

		await db.insert(submissions).values({
			id: submissionId,
			code,
			language,
			roastMode,
			createdAt: new Date(
				Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
			),
		});

		await db.insert(analyses).values({
			id: analysisId,
			submissionId,
			score,
			verdict,
			summary: getRandomElement(summaries[verdict]),
			createdAt: new Date(),
		});

		const numProblems = Math.floor(Math.random() * 4);
		for (let j = 0; j < numProblems; j++) {
			const severity = getRandomElement([
				"info",
				"warning",
				"error",
				"critical",
			] as const);
			await db.insert(problems).values({
				id: uuidv4(),
				analysisId,
				title: getRandomElement(problemTitles[severity]),
				description: `Found at line ${Math.floor(Math.random() * 50) + 1}`,
				severity,
				lineStart: Math.floor(Math.random() * 50) + 1,
				lineEnd: Math.floor(Math.random() * 10) + 1,
				codeSnippet: code.split("\n")[0],
			});
		}

		const numDiffLines = Math.floor(Math.random() * 3) + 1;
		for (let k = 0; k < numDiffLines; k++) {
			const lineType = getRandomElement([
				"unchanged",
				"addition",
				"deletion",
			] as const);
			await db.insert(diffLines).values({
				id: uuidv4(),
				analysisId,
				lineNumber: k + 1,
				lineType,
				originalCode: lineType === "deletion" ? code.split("\n")[0] : null,
				suggestedCode: lineType === "addition" ? code.split("\n")[0] : null,
				explanation: "Consider improving this line",
			});
		}

		if ((i + 1) % 10 === 0) {
			console.log(`✅ Seeded ${i + 1}/100 submissions...`);
		}
	}

	console.log("✅ Seed completed!");
}

seed().catch(console.error);
