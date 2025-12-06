const logLevels = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
};

class Logger {
  constructor(context = 'app') {
    this.context = context;
  }

  log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      context: this.context,
      message,
      ...(data && { data }),
    };

    if (process.env.NODE_ENV === 'production') {
      console.log(JSON.stringify(logEntry));
    } else {
      console.log(`[${timestamp}] [${level}] [${this.context}]`, message, data || '');
    }
  }

  debug(message, data) {
    this.log(logLevels.DEBUG, message, data);
  }

  info(message, data) {
    this.log(logLevels.INFO, message, data);
  }

  warn(message, data) {
    this.log(logLevels.WARN, message, data);
  }

  error(message, data) {
    this.log(logLevels.ERROR, message, data);
  }
}

export default Logger;
