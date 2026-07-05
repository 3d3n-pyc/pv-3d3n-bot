const colors = {
  reset: '\x1b[0m',
  info: '\x1b[36m',    // Cyan
  success: '\x1b[32m', // Green
  warn: '\x1b[33m',    // Yellow
  error: '\x1b[31m',   // Red
  debug: '\x1b[35m',   // Magenta
  gray: '\x1b[90m',    // Gray
};

export class Logger {
  private static getTimestamp(): string {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0];
    return `${colors.gray}[${date} ${time}]${colors.reset}`;
  }

  private static formatMessage(level: string, color: string, message: any, ...optionalParams: any[]): void {
    const timestamp = this.getTimestamp();
    const prefix = `${color}${level.padEnd(7, ' ')}${colors.reset}`;
    
    // We use console.log/warn/error directly so Node.js can still format objects natively
    const formattedPrefix = `${timestamp} ${prefix} |`;

    if (level === 'ERROR') {
      console.error(formattedPrefix, message, ...optionalParams);
    } else if (level === 'WARN') {
      console.warn(formattedPrefix, message, ...optionalParams);
    } else {
      console.log(formattedPrefix, message, ...optionalParams);
    }
  }

  static info(message: any, ...optionalParams: any[]) {
    this.formatMessage('INFO', colors.info, message, ...optionalParams);
  }

  static success(message: any, ...optionalParams: any[]) {
    this.formatMessage('SUCCESS', colors.success, message, ...optionalParams);
  }

  static warn(message: any, ...optionalParams: any[]) {
    this.formatMessage('WARN', colors.warn, message, ...optionalParams);
  }

  static error(message: any, ...optionalParams: any[]) {
    this.formatMessage('ERROR', colors.error, message, ...optionalParams);
  }

  static debug(message: any, ...optionalParams: any[]) {
    // You could wrap this in a check for process.env.DEBUG
    this.formatMessage('DEBUG', colors.debug, message, ...optionalParams);
  }
}
