type QueryErrorPanelProps = {
  message: string
  onRetry: () => void
}

export function QueryErrorPanel({ message, onRetry }: QueryErrorPanelProps) {
  return (
    <div
      role="alert"
      className="mx-auto max-w-md rounded-2xl border border-red-200 bg-red-50/90 p-6 text-center shadow-sm"
    >
      <p className="text-sm font-semibold text-red-900">Something went wrong</p>
      <p className="mt-2 break-words text-xs leading-relaxed text-red-800/90">
        {message}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-xl border border-red-300 bg-white px-5 py-2 text-sm font-semibold text-red-800 shadow-sm transition hover:bg-red-50"
      >
        Try again
      </button>
    </div>
  )
}
