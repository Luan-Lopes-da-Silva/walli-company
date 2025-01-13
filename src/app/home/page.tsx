'use client'

import Image from 'next/image'
import style from './home.module.scss'
import financementImg from '../../../public/assets/card-financement.svg'
import creditImg from '../../../public/assets/credit.svg'
import { useEffect, useState,useRef } from 'react'
import Link from 'next/link'
import { Financement } from '@/utils/types'

export default function Home(){
    useEffect(()=>{
        window.document.title = 'Home'   
    })

    const [search,setSearch] = useState('')
    const refLoading = useRef<HTMLDivElement>(null)
    const refContainer = useRef<HTMLDivElement>(null)
    const refSpan = useRef<HTMLSpanElement>(null)

    async function searchProcess(){
        const findInDb = await fetch(`https://walli-processdb.onrender.com/process/${search}`)
        const converseDb:Financement[]= await findInDb.json()
        const findProcess = converseDb.filter(p=>p.protocol === search)
        if(search === ''){
            alert('Digite um numero de protocolo')
           }else if(findProcess.length>0 && findInDb.status==200 && refLoading.current && refContainer.current){
            refLoading.current.style.display = 'block'
            refContainer.current.style.filter = 'brightness(0.4)'
            setTimeout(() => {
                window.location.href = `/meuprocesso/${findProcess[0].protocol}`
            }, 2000);
           }else{
            alert('Protocolo não encontrado')
        }
    }

    return(            
            <div className={style.box}>
                <div className={style.container} ref={refContainer}>
                  
                <header className={style.header}>
                    <nav>
                    <h1>LOGO</h1>
                        <ul>
                            <Link href={'/home'}><li>Inicio</li></Link>
                            <Link href={'/sobre'}><li>Sobre</li></Link>
                            <Link href={'/contato'}><li>Contate-nos</li></Link>
                        </ul>
                        <div className={style.input}>
                <input 
                type="text" 
                value={search}
                onChange={(ev)=>setSearch(ev.currentTarget.value)}
                placeholder='Pesquise pelo seu protocolo ...'
                onFocus={()=>{
                    if(refSpan.current){
                        refSpan.current.style.marginLeft = '-30px'
                    }
                }}
                onBlur={()=>{
                    if(refSpan.current){
                        refSpan.current.style.marginLeft = '0px'
                    }}
                }
                />
                <span onClick={searchProcess} ref={refSpan}></span>
                </div>
                        <Link href={'/simular'}><button>simular</button></Link>
                    </nav>

                 
                </header>

              
               
                <main>

               <div className={style.presentation}>
                    <div className={style.textPresentation}>
                    <span>Nome empresa</span>
                    <p>Nosso objetivo é  simplificar e agilizar o processo de obtenção de crédito para compra de  imóveis, oferecendo soluções personalizadas que atendem às necessidades  individuais de cada cliente. </p>
                    <Link href={'/simular'}><button>simular</button></Link>
                    </div>
               </div>

               <div className={style.benefits}>
                <span>Vantagens</span>
                 <ul>
                    <li>Agilidade no processo</li>
                    <li>Facilidade no acompanhamento</li>
                    <li>Maior precisão nas informações</li>
                    <li>Transparência</li>
                    <li>Atendimento 24/7</li>
                    <li>Redução de custos</li>
                    <li>Experiência personalizada</li>
                    <li>Acesso a simulações instantâneas</li>
                    <li>Menos burocracia</li>
                    <li>Segurança de dados</li>
                 </ul>
               </div>


               <div className={style.modalitys}>
                    <span>Tipos de financiamento</span>

                    <div className={style.types}>
                        <div>
                            <span>Financiamento imobiliario</span>
                            <Image
                            width={50}
                            height={50}
                            alt='Financiamento imobiliario foto'
                            src={financementImg}
                            />
                            <button><Link href={'/financiamento'}>Ver mais</Link></button>
                        </div>
                        
                        <div>
                            <span>Credito com garantia</span>
                            <Image
                            width={50}
                            height={50}
                            alt='Crédito com garantia de imóvel foto'
                            src={creditImg}
                            />
                            <button><Link href={'/credito'}>Ver mais</Link></button>
                        </div>
                    </div>

                    
               </div>

               <footer className={style.footer}>
               <span className={style.logo}>LOGO</span>
              

                <div className={style.infos}>
                    <div className={style.medias}>
                        <span>Redes Sociais</span>

                        <div className={style.containerMedias}>
                           <div></div>
                           <div></div>
                           <div></div>
                           <div></div>
                        </div>
                    </div>

                    <div className={style.rules}>
                        <span>Legislações</span>
                    </div>
                </div>

               </footer>
                </main>
            </div>

            <div className={style.loading} ref={refLoading}>
                <p>Buscando o seu protocolo...</p>
                <div className={style.ldsRoller} ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
            </div>
    )
}