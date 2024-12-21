import { Financement, ProtocolPage } from "@/utils/types";
import style from './status.module.scss'
import Link from "next/link";
import Image from "next/image";
import errorImg from '../../../../public/assets/undraw_page-not-found_6wni.svg'


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

    console.log(getProcess.status)
   

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
  

  return (
    <>
      {getDatas.clientname==''?(
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
        
        <h1>{getDatas?.clientname}</h1>
          {getDatas.consultantname==''?(
             <section className={style.consultant}>
              <h2>Dados do consultor</h2>
             <p>No momento seu processo não foi repassado para nenhum consultor aguarde e seu processo sera iniciado.</p>
             </section>
          ):(
          <section className={style.consultant}>
            <h2>Dados do consultor</h2>
              <ul>
                <li>Nome: {getDatas?.consultantname}</li>
                <li>Email: {getDatas?.consultantemail}</li>
                <li>Telefone: {getDatas?.consultantphone}</li>
              </ul>
          </section>
          )}
          
        <section className={style.imobille}>
          <h2>Dados do imóvel</h2>
          <ul>
            <li>Valor do imóvel: R$ {getDatas?.valueimobille}</li>
            <li>Valor de entrada: R$ {getDatas?.prohibitedvalue}</li>
            <li>Valor de financiamento: R$ {getDatas?.financementvalue}</li>
            <li>Número de parcelas: {getDatas?.numberparcels}</li>
          </ul>
        </section>
        {getDatas.consultantname==''?(
          <section className={style.status}>
            <h2>Status</h2>
            <p>Aguardando aceite de um consultor para dar inicio.</p>
          </section>
        ):(
          <section className={style.status}>
            <h2>Status</h2>
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
