import { Suspense } from 'react'
import { BrowserRouter } from 'react-router'
import { ErrorBoundary } from '@/app/error-boundary'
import { AppProviders } from '@/app/providers/app-providers'
import { AppRoutes } from '@/app/routes'

export function AppShell() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="flex min-h-[40vh] items-center justify-center text-zinc-500">
                Loading…
              </div>
            }
          >
            <AppRoutes />
          </Suspense>
        </BrowserRouter>
      </AppProviders>
    </ErrorBoundary>
  )
}
