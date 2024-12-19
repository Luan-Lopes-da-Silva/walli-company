'use client'
import { Financement } from "@/utils/types";
import { useEffect, useRef, useState } from "react";
import style from './status.module.scss'
import Link from "next/link";
import Image from "next/image";
import loadingSvg from '@/app/public/assets/Spinner@1x-1.0s-200px-200px (1).svg'
import vistorySvg from '@/app/public/assets/check_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import assignPapersSvg from '@/app/public/assets/documents-papers-svgrepo-com.svg'




// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MeuProcesso({ params }:any) {
  const [clientName,setClientName] = useState('')
  const [consultantName,setConsultantName] = useState('')
  const [consultantEmail,setConsultantEmail] = useState('')
  const [consultantPhone,setConsultantPhone] = useState('')
  const [imobille,setImobille] = useState('')
  const [prohibited,setProhibited] = useState('')
  const [financementValue,setFinancementValue] = useState('')
  const [parcelNumbers,setParcelNumbers] = useState('')
  

  const refEmAndamento = useRef<HTMLSpanElement>(null)
  const refEmVistoria = useRef<HTMLSpanElement>(null)
  const refAssinatura = useRef<HTMLDivElement>(null)
  const refContainerEmAndamento = useRef<HTMLDivElement>(null)
  const refContainerEmVistoria = useRef<HTMLDivElement>(null)
  const containerStatus = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.title = 'Seu processo'
  
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
      setClientName(searchProcess[0].clientname)
      setConsultantName(searchProcess[0].consultantname)
      setConsultantEmail(searchProcess[0].consultantemail)
      setConsultantPhone(searchProcess[0].consultantphone)
      setImobille(`${formatToCustomDecimal(searchProcess[0].valueimobille)}`)
      setFinancementValue(`${formatToCustomDecimal(searchProcess[0].financementvalue)}`)
      setProhibited(`${formatToCustomDecimal(searchProcess[0].prohibitedvalue)}`)
      setParcelNumbers(`${searchProcess[0].numberparcels}`)
  
      if (refEmAndamento.current && refEmVistoria.current && refAssinatura.current && refContainerEmAndamento.current && refContainerEmVistoria.current && containerStatus.current) {
        if(searchProcess[0].statusprocess === 'Sem consultor'){
          containerStatus.current.style.display = 'none'
        }
        else if (searchProcess[0].statusprocess === 'Em andamento') {
          refEmAndamento.current.style.backgroundColor = '#386641'
        } else if (searchProcess[0].statusprocess === 'Vistoria') {
          refEmAndamento.current.style.backgroundColor = '#386641'
          refContainerEmAndamento.current.style.backgroundColor = '#386641'
        }else {
          refEmAndamento.current.style.backgroundColor = '#386641'
          refEmVistoria.current.style.backgroundColor = '#386641'
          refContainerEmAndamento.current.style.backgroundColor = '#386641'
          refContainerEmVistoria.current.style.backgroundColor = '#386641'
        }
      }
      } catch (error) {
        console.log(error)
      }
    }
  
    getInfos()
   
  })
  
  if(clientName===''){
    return(
      <h1>Usuario não encontrado</h1>
    )
  }

  return (
    <>
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
        <h1>Olá {clientName}</h1>
        <section className={style.consultant}>
          <h2>Dados do consultor</h2>
          <ul>
            <li>Nome: {consultantName}</li>
            <li>Email: {consultantEmail}</li>
            <li>Telefone: {consultantPhone}</li>
          </ul>
        </section>
        <section className={style.imobille}>
          <h2>Dados do imóvel</h2>
          <ul>
            <li>Valor do imóvel: R$ {imobille}</li>
            <li>Valor de entrada: R$ {prohibited}</li>
            <li>Valor de financiamento: R$ {financementValue}</li>
            <li>Número de parcelas: {parcelNumbers}</li>
          </ul>
        </section>
        <section className={style.status}>
          <h2>Status</h2>
          <div className={style.statusContainer} ref={containerStatus}>
            <div>
              <span ref={refEmAndamento}></span>
              <p>Em andamento</p>
              <div ref={refContainerEmAndamento}>
                <Image width={120} height={120} alt="Em andamento" src={loadingSvg} />
              </div>
            </div>

            <div>
              <span ref={refEmVistoria}></span>
              <p>Em vistoria</p>
              <div ref={refContainerEmVistoria}>
                <Image width={120} height={120} alt="Em vistoria" src={vistorySvg} />
              </div>
            </div>

            <div>
              <p>Assinatura de documentos</p>
              <div ref={refAssinatura}>
                <Image width={120} height={120} alt="Assinatura de documentos" src={assignPapersSvg} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
    </>
  )
}
