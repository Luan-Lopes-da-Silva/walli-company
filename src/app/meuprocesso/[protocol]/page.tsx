import { Financement, ProtocolPage } from "@/utils/types";
import style from './status.module.scss'
import Link from "next/link";
import Image from "next/image";
import errorImg from '../../../../public/assets/undraw_page-not-found_6wni.svg'
import {Metadata} from 'next'

export const metadata:Metadata={
  title: 'Detalhes do seu processo',
  description: 'Detalhes do processo de financiamento, dados para contato com consultor e status.'
}



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function MeuProcesso({ params }:any) {
  const formatToCustomDecimal = (value: string) => {
    const cleanValue = value.replace(/[^\d]/g, "");
    if (!cleanValue) return "";
    const numericValue = parseFloat(cleanValue) / 100;
    const formattedValue = numericValue
      .toFixed(2)
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
  
    return formattedValue;
  };

  async function getInfos() {
    try {
    const getProcess = await fetch('https://walli-processdb.onrender.com/process')
    const converseProcess:Financement[] = await getProcess.json()
    const searchProcess = converseProcess.filter(p=>(p.protocol === params.protocol))

    const newProtocol:ProtocolPage = {
      clientname: searchProcess[0].clientname,
      consultantemail: searchProcess[0].consultantemail,
      consultantname: searchProcess[0].consultantname,
      consultantphone: searchProcess[0].consultantphone,
      financementvalue:formatToCustomDecimal(searchProcess[0].financementvalue),
      numberparcels: searchProcess[0].numberparcels,
      prohibitedvalue: formatToCustomDecimal(searchProcess[0].prohibitedvalue),
      valueimobille: formatToCustomDecimal(searchProcess[0].valueimobille),
    }
    return newProtocol
    }catch (error) {
      console.log(error)
      const newProtocol:ProtocolPage = {
        clientname: '',
        consultantemail: '',
        consultantname: '',
        consultantphone: '',
        financementvalue:'',
        numberparcels: '',
        prohibitedvalue: '',
        valueimobille: '',
      }
      return newProtocol
    }
  }

  const getDatas = await getInfos()
  console.log(getDatas)
  

  return (
    <>
      {getDatas.clientname==''?(
        <main className={style.main} style={{height:'100vh'}}>
        <Link href={'/simular'}><button className={style.button}>Simular</button></Link>
        
          <div className={style.container}>
            <div className={style.errorContainer}>
              <Image
                width={600}
                height={500}
                alt="Data not found"
                src={errorImg}

              />
                <p>Dados não encontrados por favor verificar o numero de protocolo ou mande um email para nosso suporte.</p>
            </div>
            
          </div>
        </main>
      ):(
        <main className={style.main}>
    <Link href={'/simular'}><button className={style.button}>Simular</button></Link>
    <header className={style.header}>
                    <nav>
                    <h1>LOGO</h1>
                        <ul>
                            <Link href={'/home'}><li>Inicio</li></Link>
                            <Link href={'/sobre'}><li>Sobre</li></Link>
                            <Link href={'/contato'}><li>Contate-nos</li></Link>
                        </ul>
                        <Link href={'/simular'}><button>simular</button></Link>
                    </nav>
      </header>
      <div className={style.container}>  
        <p className={style.client}>{getDatas?.clientname}</p>
          {getDatas.consultantname==''?(
             <section className={style.consultant}>
              <span>Dados do consultor</span>
             <p>No momento seu processo não foi repassado para nenhum consultor aguarde e seu processo sera iniciado.</p>
             </section>
          ):(
          <section className={style.consultant}>
            <span>Dados do consultor</span>
              <ul>
                <li>Nome: {getDatas?.consultantname}</li>
                <li>Email: {getDatas?.consultantemail}</li>
                <li>Telefone: {getDatas?.consultantphone}</li>
              </ul>
          </section>
          )}
          
        <section className={style.imobille}>
          <span>Dados do imóvel</span>
          <ul>
            <li>Valor do imóvel: R$ {getDatas?.valueimobille}</li>
            <li>Valor de entrada: R$ {getDatas?.prohibitedvalue}</li>
            <li>Valor de financiamento: R$ {getDatas?.financementvalue}</li>
            <li>Número de parcelas: {getDatas?.numberparcels}</li>
          </ul>
        </section>
        {getDatas.consultantname==''?(
          <section className={style.status}>
            <span>Status</span>
            <p>Aguardando aceite de um consultor para dar inicio.</p>
          </section>
        ):(
          <section className={style.status}>
            <span>Status</span>
              <div className={style.statusContainer}>

              </div>
          </section>
        )}
      </div>
    </main>
      )}
    </>
  )
}
