import { FC, useEffect } from 'react'
import { usePrevious } from 'hooks'

import SqlEditor from 'components/to-be-cleaned/SqlEditor'

interface Props {
  operation: string
  definition: string
  check: string
  onUpdatePolicyUsing: (using: string | null) => void
  onUpdatePolicyCheck: (check: string | null) => void
}

const PolicyDefinition: FC<Props> = ({
  operation = '',
  definition = '',
  check = '',
  onUpdatePolicyUsing,
  onUpdatePolicyCheck,
}) => {
  const showUsing = (operation: string) =>
    ['SELECT', 'UPDATE', 'DELETE', 'ALL'].includes(operation) || !operation
  const showCheck = (operation: string) => ['INSERT', 'UPDATE', 'ALL'].includes(operation)

  const previousOperation = usePrevious(operation) || ''
  useEffect(() => {
    if (showUsing(previousOperation) && !showUsing(operation)) onUpdatePolicyUsing(null)
    if (showCheck(previousOperation) && !showCheck(operation)) onUpdatePolicyCheck(null)
  }, [operation])

  return (
    <div className="space-y-4">
      {showUsing(operation) && (
        <div className="flex space-x-12">
          <div className="flex w-1/3 flex-col space-y-2">
            <label className="text-scale-1100 text-base" htmlFor="policy-name">
              USING expression
            </label>
            <p className="text-scale-900 text-sm">
              Provide a SQL conditional expression that returns a boolean.
            </p>
          </div>
          <div className={`w-2/3 ${showCheck(operation) ? 'h-32' : 'h-56'}`}>
            <SqlEditor defaultValue={definition} onInputChange={onUpdatePolicyUsing} />
          </div>
        </div>
      )}
      {showCheck(operation) && (
        <div className="flex space-x-12">
          <div className="flex w-1/3 flex-col space-y-2">
            <label className="text-scale-1100 text-base" htmlFor="policy-name">
              WITH CHECK expression
            </label>
            <p className="text-scale-900 text-sm">
              Provide a SQL conditional expression that returns a boolean.
            </p>
          </div>
          <div className={`w-2/3 ${showUsing(operation) ? 'h-32' : 'h-56'}`}>
            <SqlEditor defaultValue={check} onInputChange={onUpdatePolicyCheck} />
          </div>
        </div>
      )}
    </div>
  )
}

export default PolicyDefinition
