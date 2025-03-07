import { Financement, ProtocolPage } from "@/utils/types";
import style from './status.module.scss'
import Link from "next/link";
import Image from "next/image";
import errorImg from '@/../public/assets/undraw_page-not-found_6wni.svg'
import fileSvg from '@/../public/assets/folder_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import searchSvg from '@/../public/assets/manage_search_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import engineerSvg from '@/../public/assets/engineering_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import gavelSvg from '@/../public/assets/gavel_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import emissionSvg from '@/../public/assets/assignment_turned_in_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'

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
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL2}`
    try {
    const getProcess = await fetch(`${apiUrl}/process`)
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
                  <div className={style.firstStep}>
                    <div>
                    <Image
                    width={42}
                    height={42}
                    alt="Search svg"
                    src={searchSvg}
                    />
                    </div>
                    <p>Pesquisa e simulação</p>
                    <span></span>
                  </div>

                  <div className={style.secondStep}>
                    <div>
                    <Image
                    width={42}
                    height={42}
                    alt="File svg"
                    src={fileSvg}
                    />
                    </div>
                    <p>Pasta</p>
                    <span></span>
                  </div>

                  <div className={style.thirdStep}>
                    <div>
                    <Image
                    width={42}
                    height={42}
                    alt="Engineer svg"
                    src={engineerSvg}
                    />
                    </div>
                    <p>Engenharia</p>
                    <span></span>
                  </div>

                  <div className={style.fourthStep}>
                    <div>
                    <Image
                    width={42}
                    height={42}
                    alt="Gavel svg"
                    src={gavelSvg}
                    />
                    </div>
                    <p>Juridico</p>
                    <span></span>
                  </div>

                  <div className={style.fifthStep}>
                   <div>
                   <Image
                    width={42}
                    height={42}
                    alt="Emission svg"
                    src={emissionSvg}
                    />
                   </div>
                    <p>Emissão</p>
                  </div>
              </div>
          </section>
        )}
      </div>
    </main>
      )}
    </>
  )
}
