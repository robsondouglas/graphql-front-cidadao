import { Add, AttachMoney, Close, CloudUpload, MoneyOffSharp, MoneyRounded, MoneySharp, Payment, PaymentRounded, Payments, PaymentsRounded, PhotoCamera, Pix, RequestQuote } from "@mui/icons-material";
import { H3 } from "app/components/Typography";
import useToast from "app/hooks/useToast";
import axios from "axios";
import { useState } from "react";

const { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Button, IconButton, DialogActions, CircularProgress, Badge, List, ListItem, ListItemAvatar, ListItemText, Divider, Grid, Card, CardContent, Typography, CardActions, Chip, Box, AppBar, Toolbar } = require("@mui/material");

const Multa = ({ OnAdded, multasPendentes, multasQuitadas }) => {
    const { success, error } = useToast();
    const multas = [...multasPendentes, ...multasQuitadas]
    const initialState = { open: false, loading: false };
    const veiculoState = { Placa: '', Modelo: '', Fabricante: '', Ano: 2023, }
    const [state, setState] = useState(initialState);

    const handleClose = () => setState(initialState);

    const handleSave = async () => {
        try {
            setState({ ...state, loading: true })
            //
            success('Multa paga com sucesso');
            OnAdded?.({})
            handleClose();
        }
        catch (ex) {
            setState({ ...state, loading: false });
            error('Falha ao efetuar pagamento')
        }
    }

    const handleOpen = () => setState({ ...state, open: true })


    return (
        <>
            {multas.length == 0 ?
                (<></>) :
                (<IconButton edge="end" aria-label="comments" onClick={handleOpen}>
                    <Badge badgeContent={multasPendentes.length} color="error">
                        <RequestQuote color="action" />
                    </Badge>
                </IconButton>)
            }
            <Dialog open={state.open} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="md" scroll="paper" onClose={handleClose}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <H3 sx={{ flex: 1 }}>Débitos do veículo</H3>
                        <IconButton color="inherit" onClick={handleClose} aria-label="Close">
                            <Close />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <Grid container direction='row' spacing={4} justifyContent="center" >
                        {multas.map((m, idx) => (<Grid key={idx} item>
                            <Card sx={{ minWidth: 250, maxWidth: 250 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Multa
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        R$ {Number.parseFloat(m.Infracao.Valor).toLocaleString()}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {new Date(Number.parseFloat(m.DateAdd)).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2">
                                        {m.Descricao}
                                    </Typography>
                                </CardContent>
                                <CardActions >
                                    <Grid container justifyContent="center">
                                        <Grid item><Chip color="primary" size="small" aria-label="Realizar pagamento" onClick={() => { }} icon={<PaymentsRounded />} label="Pagamento" /></Grid>
                                    </Grid>
                                </CardActions>
                            </Card>
                        </Grid>))}
                    </Grid>
                </DialogContent>
                {
                    state.loading ?
                        (<DialogActions><CircularProgress color="inherit" size={20} /></DialogActions>) :
                        (<DialogActions>

                            <Button variant="contained" onClick={handleClose} color="secondary">
                                Retornar
                            </Button>
                        </DialogActions>)
                }

            </Dialog >
        </>
    )
}

export default Multa;