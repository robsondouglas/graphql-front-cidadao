import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/pt-br';

import { Card, Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import useToast from 'app/hooks/useToast';
import { Formik } from 'formik';
import { SnackbarProvider } from 'notistack';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(JustifyBox)(() => ({
  height: '100%',
  padding: '32px',
  background: 'rgba(0, 0, 0, 0.01)'
}));

const JWTRegister = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center'
  }
}));

// inital login credentials
const initialValues = {
  Nome: '',
  CNH: '',
  Nascimento: '',
  Email: '',
  Sexo: '',
  remember: true
};

const currDate = new Date(Date.now())
currDate.setFullYear(currDate.getFullYear() - 18)

// form field validation schema
const validationSchema = Yup.object().shape({
  Nome: Yup.string().required('Nome é obrigatório'),
  Nascimento: Yup.date().required('Nascimento é obrigatório').max(currDate, 'Deve ter mais de 18 anos'),
  CNH: Yup.string().required('CNH é obrigatória'),
  Sexo: Yup.string().required('Sexo é obrigatório'),
  Email: Yup.string().email('Endereço de email inválido').required('Email é obrigatório')
});

const InnerJwtRegister = () => {
  const theme = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();

  const handleFormSubmit = async (values) => {
    setLoading(true);

    try {
      await register({ ...values, Nascimento: values.Nascimento.valueOf() });
      success('Cadastro realizado com sucesso!');
      navigate('/');
      setLoading(false);
    }
    catch (e) {
      const msgs = {
        "UsernameExistsException": "O usuário informado já está cadastrado",
        "InvalidPasswordException": "A senha informada não atende aos critérios de segurança"
      }

      error(msgs[e.code] || 'Ocorreu um erro ao registrar o usuário');
      setLoading(false);
    }
  };

  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <img
                width="100%"
                alt="Register"
                src="/assets/images/illustrations/posting_photo.svg"
              />
            </ContentBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Box p={4} height="100%">
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}>
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="Nome"
                      label="Nome"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.Nome}
                      onChange={handleChange}
                      helperText={touched.Nome && errors.Nome}
                      error={Boolean(errors.Nome && touched.Nome)}
                      sx={{ mb: 3 }}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
                      <DatePicker
                        fullWidth
                        name="Nascimento"
                        label="Nascimento"
                        onChange={(value) => setFieldValue('Nascimento', value.$d)}
                        value={values.Nascimento}
                        size="small"
                        slotProps={{
                          textField: {
                            size: 'small',
                            variant: 'outlined',
                            helperText: touched.Nascimento && errors.Nascimento,
                            error: Boolean(errors.Nascimento && touched.Nascimento)
                          }
                        }}
                        sx={{ width: '100%' }}
                      />
                    </LocalizationProvider>
                    <FormControl component="fieldset" error={Boolean(errors.Sexo && touched.Sexo)} sx={{ border: Boolean(errors.Sexo && touched.Sexo) ? "solid #f00 1px" : "solid #888 1px", width: "100%", marginTop: 1, marginBottom: 2, padding: 1 }}>
                      <FormLabel component="legend">Sexo</FormLabel>
                      <RadioGroup row onChange={(event) => setFieldValue("Sexo", event.currentTarget.value)}>
                        <FormControlLabel value="masculino" control={<Radio />} label="Masculino" />
                        <FormControlLabel value="feminino" control={<Radio />} label="Feminino" />
                      </RadioGroup>
                      <FormHelperText>{touched.Sexo && errors.Sexo}</FormHelperText>

                    </FormControl>


                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="CNH"
                      label="CNH"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.CNH}
                      onChange={handleChange}
                      helperText={touched.CNH && errors.CNH}
                      error={Boolean(errors.CNH && touched.CNH)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="Email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.Email}
                      onChange={handleChange}
                      helperText={touched.Email && errors.Email}
                      error={Boolean(errors.Email && touched.Email)}
                      sx={{ mb: 3 }}
                    />

                    <FlexBox gap={1} alignItems="center">
                      <Checkbox
                        size="small"
                        name="remember"
                        onChange={handleChange}
                        checked={values.remember}
                        sx={{ padding: 0 }}
                      />

                      <Paragraph fontSize={13}>
                        Li e aceito os termos e condições de serviço
                      </Paragraph>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ mb: 2, mt: 3 }}
                    >
                      Registre-se
                    </LoadingButton>

                    <Paragraph>
                      Já está cadastrado?
                      <NavLink
                        to="/session/signin"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                      >
                        Login
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </JWTRegister>
  );
};


const JwtRegister = () => (<SnackbarProvider maxSnack={3}><InnerJwtRegister /></SnackbarProvider>)

export default JwtRegister;
