import { getToken } from "auth";

const url = 'http://localhost:4000/';

const post = (svc, itm) => new Promise((resolve, reject)=>{
    fetch(`${url}${svc}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        method: "POST",
        body: JSON.stringify(itm)
    })
    .then( res => {
      res.json()
        .then( ({errors, data})  => {
          if((errors?.length || 0)>0)
          { reject(errors.map(m=>m.message)) }
          else
          { resolve(data)}
          
        })
        .catch(ex => { console.log('err', ex); resolve(undefined)})
    }  )
    .catch(ex=>reject(ex))
})

export const Query = (query, variables) => post('', { query, variables })
export const Mutation = (query, variables) => post('', { query, variables })

