import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, styled, TextField } from '@mui/material';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: 'center',
}));

const ContentBox = styled(Box)(({ theme }) => ({
  padding: 32,
  background: theme.palette.background.default,
}));

const SetPasswordRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    margin: '1rem',
    borderRadius: 12,
  },
}));

const SetPassword = ({ email, nome }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { change } = useAuth();

  const initialValues = {
    Atual: '',
    Senha: ''
  };

  // form field validation schema
  const validationSchema = Yup.object().shape({
    Atual: Yup.string().required('Senha atual é obrigatória'),
    Senha: Yup.string().required('Nova senha é obrigatória')
  });


  const handleFormSubmit = async (values) => {
    setLoading(true)
    try {
      await change({ user: email, oldPassword: values.Atual, newPassword: values.Senha })
      navigate("/")
    }
    finally { setLoading(false) }
  };

  return (
    <SetPasswordRoot>
      <Card className="card">
        <Grid container>
          <Grid item xs={12}>
            <JustifyBox p={4}>
              <img width="300" src="/assets/images/illustrations/dreamer.svg" alt="" />
            </JustifyBox>

            <ContentBox>
              <h3>Bem vindo, {nome}</h3>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}>
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>

                    <TextField
                      type="password"
                      name="Atual"
                      size="small"
                      label="Senha atual"
                      value={values.Atual}
                      variant="outlined"
                      onChange={handleChange}
                      helperText={touched.Atual && errors.Atual}
                      error={Boolean(errors.Atual && touched.Atual)}
                      sx={{ mb: 3, width: '100%' }}
                    />

                    <TextField
                      type="password"
                      name="Senha"
                      size="small"
                      label="Nova senha"
                      value={values.Senha}
                      variant="outlined"
                      onChange={handleChange}
                      helperText={touched.Senha && errors.Senha}
                      error={Boolean(errors.Senha && touched.Senha)}
                      sx={{ mb: 3, width: '100%' }}
                    />


                    <LoadingButton
                      type="submit"
                      fullWidth
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ mb: 2, mt: 3 }}
                    >
                      Alterar Senha
                    </LoadingButton>
                    {!email && (
                      <Button
                        disabled={loading}
                        fullWidth
                        color="primary"
                        variant="outlined"
                        onClick={() => navigate(-1)}
                        sx={{ mt: 2 }}>
                        Voltar
                      </Button>
                    )}

                  </form>)}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </SetPasswordRoot>
  );
};

export default SetPassword;
