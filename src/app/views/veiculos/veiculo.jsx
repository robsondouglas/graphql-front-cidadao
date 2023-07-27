import { useState } from "react";
import { Dialog, DialogContent, TextField, Button, DialogActions, CircularProgress, Grid, Autocomplete, Chip, AppBar, Toolbar, IconButton } from "@mui/material";
import { AddCircle, Close } from "@mui/icons-material";
import useToast from "app/hooks/useToast";
import * as Yup from 'yup';
import { Field, Formik } from "formik";
import { H3 } from "app/components/Typography";
import { IncluirVeiculo } from "./service";

const Veiculo = ({ fabricantes, OnAdded }) => {
    const { success, error } = useToast();
    let formikRef = null;
    const initialValues = {
        fabricante: null,
        modelo: null,
        placa: '',
        cor: '',
        chassis: ''
    }


    const validationSchema = Yup.object().shape({
        fabricante: Yup.object().shape({ value: Yup.string(), label: Yup.string() }).required('Selecione o fabricante'),
        modelo: Yup.object().shape({ value: Yup.string(), label: Yup.string() }).required('Selecione o modelo'),
        placa: Yup.string().required('Preencha a placa').matches(/^[A-Z]{3}[0-9][0-9|A-Z][0-9]{2}$/, 'Formato Brasil/Mercossul'),
        cor: Yup.string().required('Preencha a cor'),
        chassis: Yup.string().required('Preencha o chassis com 12 caracteres').length(12, 'Deve possuir 12 caracteres')
    });


    const initialState = { open: false, loading: false };
    const [state, setState] = useState(initialState);

    const handleClose = () => setState(initialState);


    const handleSave = async (itm) => {
        try {
            setState({ ...state, loading: true })
            const res = await IncluirVeiculo({
                IdFabricante: itm.fabricante.value,
                IdModelo: itm.modelo.value,
                Placa: itm.placa,
                Cor: itm.cor,
                Chassis: itm.chassis
            });

            success('Veículo cadastrado com sucesso');
            handleClose();
        }
        catch (ex) {
            setState({ ...state, loading: false });
            ex.map(({ message }) => error(message))
        }
    }

    const handleOpen = () => setState({ ...state, open: true })

    return (
        <>
            <Chip color="primary" aria-label="Incluir veículo" onClick={handleOpen} icon={<AddCircle />} label="Incluir" />
            <Dialog open={state.open} aria-labelledby="form-dialog-title" onClose={handleClose}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <H3 sx={{ flex: 1 }}>Informe os dados do veículo</H3>
                        <IconButton color="inherit" onClick={handleClose} aria-label="Close">
                            <Close />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <DialogContent>
                    <Formik
                        innerRef={p => formikRef = p}
                        onSubmit={handleSave}
                        initialValues={initialValues}
                        validationSchema={validationSchema}>
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                            <form onSubmit={handleSubmit}>
                                <Grid direction="column" container spacing={3} pt={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            name="fabricante"
                                            component={Autocomplete}
                                            options={fabricantes?.map(m => ({ label: m.Nome, value: m.Id, Modelos: m.Modelos })) || []}
                                            isOptionEqualToValue={(a, b) => a?.Id === b?.Id}
                                            onChange={(_, itm) => setFieldValue('fabricante', itm)}
                                            onBlur={handleBlur}
                                            value={values.fabricante}
                                            renderInput={(params) => <TextField
                                                autoFocus
                                                helperText={errors.fabricante}
                                                error={Boolean(errors.fabricante)}
                                                {...params} label="Fabricante" />}
                                        />

                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name="modelo"
                                            component={Autocomplete}
                                            options={(values.fabricante?.Modelos || []).map(m => ({ label: m.Nome, value: m.Id }))}
                                            isOptionEqualToValue={(a, b) => a?.Id === b?.Id}
                                            onChange={(_, itm) => setFieldValue('modelo', itm)}
                                            onBlur={handleBlur}
                                            value={values.modelo}
                                            renderInput={(params) => <TextField
                                                helperText={errors.modelo}
                                                error={Boolean(errors.modelo)}
                                                {...params} label="Modelo" />}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Grid container spacing={3}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    id="placa"
                                                    name="placa"
                                                    fullWidth
                                                    margin="dense"
                                                    label="Placa"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.placa}
                                                    helperText={touched.placa && errors.placa}
                                                    error={Boolean(errors.placa && touched.placa)}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    id="cor"
                                                    name="cor"
                                                    fullWidth
                                                    margin="dense"
                                                    label="Cor"
                                                    value={values.cor}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    helperText={touched.cor && errors.cor}
                                                    error={Boolean(errors.cor && touched.cor)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="chassis"
                                                    name="chassis"
                                                    fullWidth
                                                    margin="dense"
                                                    label="Chassis"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.chassis}
                                                    helperText={touched.chassis && errors.chassis}
                                                    error={Boolean(errors.chassis && touched.chassis)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </DialogContent>
                {
                    state.loading ?
                        (<DialogActions><CircularProgress color="inherit" size={20} /></DialogActions>) :
                        (<DialogActions>
                            <Button variant="contained" color="secondary" onClick={handleClose}>
                                Cancelar
                            </Button>

                            <Button variant="contained" onClick={() => formikRef?.handleSubmit()} color="primary">
                                Salvar
                            </Button>
                        </DialogActions>)
                }

            </Dialog >
        </>
    )
}

export default Veiculo;