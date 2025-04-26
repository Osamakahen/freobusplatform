import { WalletTransaction, WalletError } from '../types/wallet';

export class WalletLogger {
  private static instance: WalletLogger;
  private logLevel: 'debug' | 'info' | 'warn' | 'error' = 'info';

  private constructor() {}

  public static getInstance(): WalletLogger {
    if (!WalletLogger.instance) {
      WalletLogger.instance = new WalletLogger();
    }
    return WalletLogger.instance;
  }

  public setLogLevel(level: 'debug' | 'info' | 'warn' | 'error') {
    this.logLevel = level;
  }

  private shouldLog(level: string): boolean {
    const levels = ['debug', 'info', 'warn', 'error'];
    return levels.indexOf(level) >= levels.indexOf(this.logLevel);
  }

  public logTransaction(transaction: WalletTransaction) {
    if (this.shouldLog('info')) {
      console.log('[Wallet Transaction]', {
        hash: transaction.hash,
        from: transaction.from,
        to: transaction.to,
        value: transaction.value,
        status: transaction.status,
        timestamp: new Date(transaction.timestamp).toISOString()
      });
    }
  }

  public logError(error: WalletError) {
    if (this.shouldLog('error')) {
      console.error('[Wallet Error]', {
        code: error.code,
        message: error.message,
        details: error.details
      });
    }
  }

  public logConnection(address: string) {
    if (this.shouldLog('info')) {
      console.log('[Wallet Connection]', {
        address,
        timestamp: new Date().toISOString()
      });
    }
  }

  public logDisconnection() {
    if (this.shouldLog('info')) {
      console.log('[Wallet Disconnection]', {
        timestamp: new Date().toISOString()
      });
    }
  }
}

export const walletLogger = WalletLogger.getInstance(); 