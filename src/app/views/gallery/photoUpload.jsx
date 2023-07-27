import { CloudUpload, PhotoCamera } from "@mui/icons-material";
import useToast from "app/hooks/useToast";
import axios from "axios";
import { useState } from "react";

const { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Button, IconButton, DialogActions, CircularProgress } = require("@mui/material");
const { requestUpload, add } = require("./service");

const PhotoUpload = ({OnUploaded}) => {
    const {success, error} = useToast();

    const initialState = {open: false, wait: false, loading:false, title: '', id: '', uploaded: false, };
    const [state, setState] = useState(initialState);

    const handleClose = () => setState(initialState);
    
    const handleSave = async() => {
        try{
            setState({...state, loading: true})
            const itm = { IdPicture: state.id, Title: state.title}
            await add([itm])
            success('Nova imagem adicionada a galeria!');
            OnUploaded?.(itm)
            handleClose();  
        }
        catch(ex)
        {
            setState({...state, loading: false});
            error('Falha ao salvar a imagem na galeria')
        }
    }

    const handleText = (evt) => setState({...state, title: evt.target.value})
    
    const handleUpload = (arqs) => {
        if(arqs.length>0)
        {
            setState({...state, wait: true, open:true, loading: true});
            requestUpload()
                .then(v=>{
                    fetch(v.url, {
                        method: 'PUT',
                        body: arqs[0],
                        headers: { 'Content-Type': 'application/octet-stream' }
                    })
                    .then( r =>  setState({...state, id: v.id, wait: true, open:true, uploaded:true, loading:false}))
                    .catch( e => {
                        error('Falha no upload do arquivo')
                        handleClose();
                    });
                })
                .catch(e => {
                    error('Falha ao obter as credenciais de envio')
                    handleClose();
                });
        }
    }
    
    return (
        <>
            <IconButton color="warm" disabled={state.wait} aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={(evt)=>handleUpload(evt.target.files)} />
                <CloudUpload />
            </IconButton>
            <Dialog open={state.open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Escolha um título para a imagem</DialogTitle>

                <DialogContent>
                <DialogContentText>
                    Caso não queira continuar, basta cancelar a operação 
                </DialogContentText>

                <TextField
                    fullWidth
                    autoFocus
                    margin="dense"
                    label="Título"
                    value={state.title}
                    onChange={handleText}
                />
                </DialogContent>
                {
                    state.loading ?
                    (<DialogActions><CircularProgress color="inherit" size={20} /></DialogActions>) : 
                    (<DialogActions>                                    
                        <Button variant="outlined" color="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
        
                        <Button onClick={handleSave} color="primary">
                            Salvar
                        </Button>
                     </DialogActions>) 
                }
                
            </Dialog>
        </>
    )
}

export default PhotoUpload;