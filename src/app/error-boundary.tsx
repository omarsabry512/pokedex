import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }

type State = {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary', error, info.componentStack)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="mx-auto max-w-md rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center shadow-sm"
        >
          <p className="font-semibold text-amber-900">Unexpected UI error</p>
          <p className="mt-2 break-words text-sm text-amber-800/90">
            {this.state.message}
          </p>
          <button
            type="button"
            className="mt-6 rounded-xl border border-amber-300 bg-white px-5 py-2 text-sm font-medium text-amber-900 shadow-sm hover:bg-amber-100/80"
            onClick={() => this.setState({ hasError: false, message: '' })}
          >
            Dismiss
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
