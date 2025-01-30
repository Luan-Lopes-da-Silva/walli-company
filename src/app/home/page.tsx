'use client'

import Image from 'next/image'
import style from './home.module.scss'
import financementImg from '../../../public/assets/card-financement.svg'
import creditImg from '../../../public/assets/credit.svg'
import { useEffect, useState,useRef } from 'react'
import Link from 'next/link'
import { Financement } from '@/utils/types'
import closeImg from '../../../public/assets/close_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import menuImg from '@/../public/assets/menu_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'

export default function Home(){
    useEffect(()=>{
        window.document.title = 'Home'   
    })

    const [search,setSearch] = useState('')
    const refLoading = useRef<HTMLDivElement>(null)
    const refError = useRef<HTMLDivElement>(null)
    const refContainer = useRef<HTMLDivElement>(null)
    const refSpan = useRef<HTMLSpanElement>(null)
    const refContent = useRef<HTMLElement>(null)
    const refMenu = useRef<HTMLUListElement>(null)
    const refMenuContainer = useRef<HTMLDivElement>(null)
    const [count,setCount] = useState(0)

    async function searchProcess(){
        const findInDb = await fetch(`https://walli-processdb.onrender.com/process/${search}`)
        const converseDb:Financement[]= await findInDb.json()
        const findProcess = converseDb.filter(p=>p.protocol === search)
        if(findProcess.length<1 && refContainer.current && refLoading.current ){
                refLoading.current.style.display ='block'
                refContainer.current.style.filter = 'brightness(0.4)'
                
                setTimeout(() => {
                    if(refError.current && refLoading.current ){
                        refLoading.current.style.display = 'none'
                        refError.current.style.display = 'block'
                    }
                }, 2000);
            
           }else if(findProcess.length>0 && findInDb.status==200 && refLoading.current && refContainer.current){
            refLoading.current.style.display = 'block'
            refContainer.current.style.filter = 'brightness(0.4)'
            setTimeout(() => {
                window.location.href = `/meuprocesso/${findProcess[0].protocol}`
            }, 2000);
           }else{
            alert('Digite um numero de protocolo')    
        }
    }

    function closeErrorMsg(){
        if(refError.current && refContainer.current){
            refError.current.style.display = 'none'
            refContainer.current.style.filter = 'brightness(1)'
        }
    }

    function showMenu(){
        setCount(prevCount=>prevCount+1)
        if(count%2==1 && refMenuContainer.current && refContent.current && refMenu.current){
            refMenuContainer.current.style.backgroundColor='#028DA5'
            refContent.current.style.filter='brightness(0.5)'
            refMenu.current.style.display='block'
        }else{
            if(refMenuContainer.current && refContent.current && refMenu.current ){
                refMenuContainer.current.style.backgroundColor='transparent'
                refContent.current.style.filter='brightness(1)'
                refMenu.current.style.display='none'
            }

        }
    }

    return(            
            <div className={style.box}>
                <div className={style.container} ref={refContainer}>
                  
                <header className={style.header}>
                    <nav>
                    <h1>LOGO</h1>

                    <div className={style.menu} ref={refMenuContainer}>
                                <Image
                                    width={24}
                                    height={24}
                                    alt='Menu icon'
                                    src={menuImg}
                                    onClick={showMenu}
                                />
                    </div>
                        <ul ref={refMenu}>
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

              
               
                <main ref={refContent}>

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
                    <span></span>
                    <p>Buscando seu numero de protocolo</p>
            </div>

            <div className={style.error} ref={refError}>
                <Image
                width={32}
                height={32}
                alt='Close svg'
                src={closeImg}
                onClick={closeErrorMsg}
                />
                <p>Protocolo não encontrado cheque o numero.</p>
            </div>
            </div>
    )
}