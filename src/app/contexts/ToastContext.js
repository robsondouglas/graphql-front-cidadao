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
    
    const success = (msg) => enqueueSnackbar(msg, {variant: 'success', anchorOrigin:{vertical: 'top', horizontal: 'center'}});
    const warning = (msg) => enqueueSnackbar(msg, {variant: 'warning', anchorOrigin:{vertical: 'top', horizontal: 'center'}});
    const info    = (msg) => enqueueSnackbar(msg, {variant: 'info', anchorOrigin:{vertical: 'top', horizontal: 'center'}});
    const alert   = (msg) => enqueueSnackbar(msg, {variant: 'default', anchorOrigin:{vertical: 'top', horizontal: 'center'}});
    const error   = (msg) => enqueueSnackbar(msg, {variant: 'error', anchorOrigin:{vertical: 'top', horizontal: 'center'}});
      


    return (<ToastContext.Provider value={{success, warning, info, alert, error}}>        
            {children}        
    </ToastContext.Provider>)
  }

  export default ToastContext