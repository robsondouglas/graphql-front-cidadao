import { useContext } from 'react'
import ToastContext from 'app/contexts/ToastContext'

const useToast = () => useContext(ToastContext)
export default useToast
