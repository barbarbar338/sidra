import chalk from "chalk";

const isSupported =
	process.platform !== "win32" ||
	process.env.CI ||
	process.env.TERM === "xterm-256color";

export const logger = {
	info: (message: string) => {
		const date = generateDate();
		const icon = isSupported ? "ℹ" : "i";
		const log = `${date} ${chalk.blue(icon)} ${message}`;
		console.info(log);
		return log;
	},
	success: (message: string) => {
		const date = generateDate();
		const icon = isSupported ? "✔" : "√";
		const log = `${date} ${chalk.green(icon)} ${message}`;
		console.log(log);
		return log;
	},
	warning: (message: string) => {
		const date = generateDate();
		const icon = isSupported ? "⚠" : "‼";
		const log = `${date} ${chalk.yellow(icon)} ${message}`;
		console.warn(log);
		return log;
	},
	error: (message: string) => {
		const date = generateDate();
		const icon = isSupported ? "✖" : "×";
		const log = `${date} ${icon} ${message}`;
		console.error(log);
		return log;
	},
};

function generateDate() {
	const date = new Date().toLocaleString("en-US", {
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hour12: false,
	});
	const colored = chalk.magenta(date);
	return colored;
}
