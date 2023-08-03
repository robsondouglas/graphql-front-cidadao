import { SnackbarProvider, useSnackbar } from "notistack";
import { createContext } from "react";

const initialState = {
    
};
  
  const ToastContext = createContext({
    ...initialState,
    success: ()=>{},
    warning: ()=>{},
    info: ()=>{},
    alert: ()=>{},
    error: ()=>{},
  });
  
  export const ToastProvider = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();
    
    const call = (msg, variant) => (Array.isArray(msg) ? msg : [msg]).map( m => enqueueSnackbar(m, {variant, anchorOrigin:{vertical: 'top', horizontal: 'center'}}) ) 

    const success = (msg) => call(msg, 'success') ;
    const warning = (msg) => call(msg, 'warning') ;
    const info    = (msg) => call(msg, 'info');   
    const alert   = (msg) => call(msg, 'default');
    const error   = (msg) => call(msg, 'error') ;  

    return (<ToastContext.Provider value={{success, warning, info, alert, error}}>        
            {children}        
    </ToastContext.Provider>)
  }

  export default ToastContext