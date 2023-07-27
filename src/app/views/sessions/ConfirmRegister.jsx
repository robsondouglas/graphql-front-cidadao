import { useState } from 'react';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useAuth from 'app/hooks/useAuth';

export default function ConfirmRegister({email, open, onConfirm, onError}) {
  const { confirmCode, ressendCode } = useAuth();

  const [state, setState] = useState({code: '', loading: false});

  const {code, loading} = state;

  const handleConfirm = async()=>{
    setState({...state, loading: true});
    try {
      await confirmCode(email, code);
      onConfirm?.();
    }
    catch (e) 
    { onError?.(); } 
    finally
    { setState({...state, loading: false});}   
  }

  const handleResend = async()=>{
    setState({...state, loading: true});
    try
    {await ressendCode(email);}
    catch(ex)
    { onError?.('Ocorreu um erro ao reenviar o código de segurança') }
    finally
    {setState({...state, loading: false});}     
  }

  

  
  return (
    <Box>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Confirmação de email</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {`Informe o código que foi enviado ao email cadastrado (${email}).`}
          </DialogContentText>

          <TextField
            fullWidth
            autoFocus
            id="name"
            type="number"
            margin="dense"
            label="Código de verificação"
            onChange={e => setState({...state, code: e.target.value})}
            value={code}
          />
        </DialogContent>

        <DialogActions>
        <Button disabled={loading} onClick={handleResend} color="secondary">
            Reenviar 
          </Button>
          <Button disabled={loading} onClick={handleConfirm} color="primary">
            Verificar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
