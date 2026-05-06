import { useBooleanFlagValue } from '@openfeature/react-sdk'
import type { FlagKey } from '../flags'

function DisabledPage() {
  return (
    <div className="text-center py-24" style={{ color: 'var(--c-3)' }}>
      <p className="text-base font-medium">This feature is not enabled.</p>
    </div>
  )
}

export function FlagGate({ flag, children }: { flag?: FlagKey; children: React.ReactNode }) {
  const enabled = useBooleanFlagValue(flag ?? '', true)
  if (!flag) return <>{children}</>
  return enabled ? <>{children}</> : <DisabledPage />
}
