import {Mutation, Query} from '../../utils/request' 
export const ListarFabricantes = (nome) =>
    Query(`query Fabricantes($nome:String) {
        fabricantes(Nome: $nome) {
        Id
        Modelos {
          Id
          Nome
        }
        Nome
      }
      }`, { nome }).then( ({fabricantes}) => fabricantes );
    
export const IncluirVeiculo = ({IdFabricante, IdModelo, Placa, Cor, Chassis}) => 
  Mutation(`mutation Mutation($itm: VeiculoInput) {
    addVeiculo(itm: $itm)
  }`, {itm: { IdFabricante, IdModelo, Placa, Cor, Chassis }})

