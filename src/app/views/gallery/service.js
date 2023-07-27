import { post } from "app/utils/utils";

export const add  = (item)    => post('img/add', item);
export const list = (filter) => post('img/list', filter);
export const remove = (key) => post('img/remove', key);
export const requestUpload = () => post('/img/requestUpload',{})