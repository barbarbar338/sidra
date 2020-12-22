import colors from "colors";

export const logger = {
	info: (message: string) => {
		const date = generateDate();
		const icon = colors.blue("ℹ");
		const log = `${date} ${icon} ${message}`;
		console.info(log);
		return log;
	},
	success: (message: string) => {
		const date = generateDate();
		const icon = colors.green("✔");
		const log = `${date} ${icon} ${message}`;
		console.log(log);
		return log;
	},
	warning: (message: string) => {
		const date = generateDate();
		const icon = colors.yellow("⚠");
		const log = `${date} ${icon} ${message}`;
		console.warn(log);
		return log;
	},
	error: (message: string) => {
		const date = generateDate();
		const icon = colors.red("✖");
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
	const colored = colors.magenta(date);
	return colored;
}
