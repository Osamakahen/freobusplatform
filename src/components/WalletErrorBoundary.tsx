import * as React from 'react';
import { WalletError } from '../types/wallet';

type Props = {
  children: any;
  fallback?: any;
};

type State = {
  hasError: boolean;
  error: WalletError | null;
};

export class WalletErrorBoundary extends React.Component<Props, State> {
  public state: State;
  public props: Props;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error: {
        code: 500,
        message: error.message,
        details: error.stack
      }
    };
  }

  public componentDidCatch(error: Error, errorInfo: any) {
    console.error('Wallet Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-lg font-semibold text-red-800">Wallet Error</h2>
          <p className="mt-2 text-sm text-red-600">{this.state.error?.message}</p>
          {this.state.error?.details && (
            <pre className="mt-2 text-xs text-red-500 overflow-auto">
              {JSON.stringify(this.state.error.details, null, 2)}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
} 