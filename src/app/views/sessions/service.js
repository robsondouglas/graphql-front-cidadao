import { Mutation, Query } from "app/utils/request";

export default {
    Register: async({
        CNH,
        Emails,
        Nascimento,
        Nome,
        Sexo,
        Status,
        Telefones
    }) => {
        return await Mutation(`mutation Mutation($itm: CidadaoInput) {
            addCidadao(itm: $itm)
        }`, {
            "itm": {
                CNH,
                Emails,
                Nascimento,
                Nome,
                Sexo,
                Status,
                Telefones
            }
        })
    }
}