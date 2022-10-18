import { CustomerForm } from '../../../frontend/components/customerForm/customerForm'
import { ProtectedPage } from '../../../frontend/components/protectedPage'

const ReportsPage = (): JSX.Element => {
  return (
    <ProtectedPage>
      <div>
        <h1>Add a customer</h1>
        <CustomerForm />
      </div>
    </ProtectedPage>
  )
}

export default ReportsPage
