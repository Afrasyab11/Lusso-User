type ClassValue = string | undefined | null | { [key: string]: boolean };

function cn(...args: ClassValue[]): string {
  return args.filter(Boolean).join(" ");
}

export { cn };
