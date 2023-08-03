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
    
export const IncluirVeiculo = ({IdFabricante, IdModelo, Placa, Cor, Ano, Chassis}) => 
  Mutation(`mutation Mutation($itm: VeiculoInput) {
    addVeiculo(itm: $itm)
  }`, {itm: { IdFabricante, IdModelo, Placa, Cor, Ano, Chassis }})

export const ListarVeiculos = () => Query(`query Veiculos($idProprietario: String) {
  veiculos(IdProprietario: $idProprietario) {
    Ano
    Cor
    Modelo {
      Nome
    }
    Fabricante {
      Nome
    }
    Placa
    MultasQuitadas {
      Id
      Infracao {
        Nome
        Valor
      }
      DateAdd
      DatePay
    }
    MultasPendentes {
      Id
      Infracao {
        Nome
        Valor
      }
      DateAdd
    }
    Chassis
  }
}`, {idProprietario: null}).then( ({veiculos}) => veiculos );
