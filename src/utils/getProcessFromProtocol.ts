import { Financement } from './types';


export async function getProcessFromProtocol(protocol:string) {
    const datas = await fetch(`https://walli-processdb.onrender.com/process/${protocol}`)
    const converseProcess:Financement[] = await datas.json()
    return converseProcess
}