import { Financement } from './types';

export async function getAllProcess(){
    const datas = await fetch('https://walli-processdb.onrender.com/process')
    const converseDB:Financement[] = await datas.json()
    return converseDB
}