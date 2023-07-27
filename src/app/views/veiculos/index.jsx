import { Fragment } from 'react';
import { Card, Grid, styled, ListItem, ListItemAvatar, ListItemText, Avatar, List, Divider } from "@mui/material";
import Veiculo from './veiculo';
import Multa from './multa';
import { useEffect } from 'react';
import { useState } from 'react';
import { ListarFabricantes } from './service';


const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const H4 = styled('h4')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginBottom: '16px',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));


const GridVeiculo = () => {
  const [fabricantes, setFabricantes] = useState([])

  useEffect(() => {
    (async () => {
      setFabricantes(await ListarFabricantes(''))
    })();

  }, [])

  const veiculos = [
    { Placa: 'LLB1020', Fabricante: { Id: 'abc123', Nome: 'Volkswagen' }, Modelo: { Nome: 'Polo' }, Cor: 'PRATA', Multas: [{}, {}] },
    { Placa: 'ABC1F34', Fabricante: { Id: 'abc123', Nome: 'Nissan' }, Modelo: { Nome: 'Kicks' }, Cor: 'AZUL', Multas: [] },
    { Placa: 'XPT0F22', Fabricante: { Id: 'abc123', Nome: 'Jeep' }, Modelo: { Nome: 'Compass' }, Cor: 'PRETO', Multas: [] }
  ]

  const Item = ({ Fabricante, Modelo, Cor, Placa, Separator }) => (<>
    <ListItem secondaryAction={<Multa Placa={Placa}></Multa>}>
      <ListItemAvatar>
        <Avatar src={`/assets/images/brands/${Fabricante.toLowerCase()}.png`} />
      </ListItemAvatar>
      <ListItemText primary={`${Modelo} - ${Cor}`} secondary={Placa} />
    </ListItem>
    {Separator && <Divider />}
  </>)

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Title>Meus veículos</Title>
                  <SubTitle>{veiculos.length}</SubTitle>
                </Grid>
                <Grid item>
                  <Veiculo fabricantes={fabricantes} />
                </Grid>
              </Grid>

            </Card>
            <List sx={{ px: 3, py: 2, mb: 3, width: '100%', bgcolor: 'background.paper' }}>
              {
                veiculos.map((v, idx) => (<Item key={v.Placa}
                  Fabricante={v.Fabricante.Nome}
                  Modelo={v.Modelo.Nome}
                  Placa={v.Placa}
                  Cor={v.Cor}
                  Separator={idx === veiculos.length - 1}
                />))
              }
            </List>

          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default GridVeiculo;
