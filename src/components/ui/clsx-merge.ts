import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function clsxMerge(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
