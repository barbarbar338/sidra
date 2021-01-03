export default function clearConsole(): void {
	process.stdout.write("\u001b[3J\u001b[2J\u001b[1J\u001b[3J");
	console.clear();
}
