export type Financement={
    clientname:string,
    clientbirthday:string,
    clientemail:string,
    clientphone:string,
    consultantname:string,
    consultantemail:string,
    consultantphone:string,
    numberparcels:string,
    amortization:string,
    protocol: string,
    createdat:string,
    statusprocess:string,
    financementvalue:string,
    prohibitedvalue:string,
    valueimobille:string
}

export interface Params{
    params:{
        protocol:string
    }
}
