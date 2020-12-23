import chalk from "chalk";

const isSupported =
	process.platform !== "win32" ||
	process.env.CI ||
	process.env.TERM === "xterm-256color";

/**
 * Sidra logger
 */
export class Logger {
	private static generateDate() {
		const date = new Date().toLocaleString("en-US", {
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			hour12: false,
		});
		const colored = chalk.grey(date);
		return colored;
	}

	/**
	 * logs message to console with date and "ℹ" icon
	 *
	 * 12:00:00 ℹ Info message
	 * @param message Log message
	 */
	public static info(message: string): string {
		const date = this.generateDate();
		const icon = isSupported ? "ℹ" : "i";
		const log = `${date} ${chalk.cyan(icon)} ${message}`;
		console.info(log);
		return log;
	}

	/**
	 * logs message to console with date and "✔" icon
	 *
	 * 12:00:00 ✔ Success message
	 * @param message Log message
	 */
	public static success(message: string): string {
		const date = this.generateDate();
		const icon = isSupported ? "✔" : "√";
		const log = `${date} ${chalk.green(icon)} ${message}`;
		console.log(log);
		return log;
	}

	/**
	 * logs message to console with date and "⚠" icon
	 *
	 * 12:00:00 ⚠ Warning message
	 * @param message Log message
	 */
	public static warning(message: string): string {
		const date = this.generateDate();
		const icon = isSupported ? "⚠" : "‼";
		const log = `${date} ${chalk.yellowBright(icon)} ${message}`;
		console.warn(log);
		return log;
	}

	/**
	 * logs message to console with date and "✖" icon
	 *
	 * 12:00:00 ✖ Error message
	 * @param message Log message
	 */
	public static error(message: string): string {
		const date = this.generateDate();
		const icon = isSupported ? "✖" : "×";
		const log = `${date} ${chalk.red(icon)} ${message}`;
		console.error(log);
		return log;
	}
}
