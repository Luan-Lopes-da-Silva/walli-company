'use client'

import Link from 'next/link'
import style from './sobre.module.scss'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import svgTech from '@/../public/assets/computer.svg'
import { Financement } from '@/utils/types'
import closeImg from '@/../public/assets/close_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import menuImg from '@/../public/assets/menu_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'


export default function Sobre(){
    useEffect(()=>{
        window.document.title = 'Sobre'   
    })

    const refSpan = useRef<HTMLSpanElement>(null)
    const refLoading = useRef<HTMLDivElement>(null)
    const refContainer = useRef<HTMLDivElement>(null)
    const refError = useRef<HTMLDivElement>(null)
    const [search, setSearch] = useState('')
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

    function closeErrorMsg(){
        if(refError.current && refContainer.current){
            refError.current.style.display = 'none'
            refContainer.current.style.filter = 'brightness(1)'
        }
    }

    return(
        <div className={style.container}>
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

            <div className={style.content} ref={refContainer}>
            <Link href={'/simular'}><button className={style.button}>Simular</button></Link>
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
                <div className={style.input}>
                <input 
                type="text" 
                placeholder='Pesquise pelo seu protocolo ...'
                value={search}
                onChange={(ev)=>setSearch(ev.currentTarget.value)}
                onFocus={()=>{
                    if (refSpan.current) {
                        refSpan.current.style.marginLeft = '-30px'
                    }
                }}
                onBlur={()=>{
                    if (refSpan.current) {
                        refSpan.current.style.marginLeft = '0px'
                    }
                }}
                />
                <span ref={refSpan} onClick={searchProcess}></span>
                </div>
                
                </div>
                        <Link href={'/simular'}><button>simular</button></Link>
                    </nav>

                 
                </header>

            <main className={style.contentContainer} ref={refContent}>
                <div className={style.presentation}>
                    <span>Nome da empresa</span>
                    <p>Transformando o Mercado Imobiliário com Automação e Transparência</p>
                    <p>A [Nome da Empresa] tem como missão transformar a experiência de financiamento imobiliário e crédito com garantia de imóvel por meio de soluções inovadoras e automatizadas. Nosso objetivo é oferecer aos nossos clientes um processo mais rápido, seguro e transparente, com condições financeiras personalizadas e acessíveis, sempre com o suporte de uma plataforma digital intuitiva.</p>
                </div>

                <div className={style.coreContainer}>
                    <span>Nossos pilares</span>
                    
                    <div className={style.flex}>
                    <div>
                        <p>Técnologia e inovação</p>
                        <Image
                        width={50}
                        height={50}
                        alt='Computer image'
                        src={svgTech}
                        />
                        <p>ANome da Empresautiliza tecnologia de ponta para automatizar todo o processo de financiamento e crédito com garantia de imóvel, oferecendo soluções rápidas, precisas e personalizadas.</p>
                    </div>
                    <div>
                        <p>Técnologia e inovação</p>
                        <Image
                        width={50}
                        height={50}
                        alt='Computer image'
                        src={svgTech}
                        />
                        <p>A [Nome da Empresa] utiliza tecnologia de ponta para automatizar todo o processo de financiamento e crédito com garantia de imóvel, oferecendo soluções rápidas, precisas e personalizadas.</p>
                    </div>
                    <div>
                        <p>Técnologia e inovação</p>
                        <Image
                        width={50}
                        height={50}
                        alt='Computer image'
                        src={svgTech}
                        />
                        <p>A [Nome da Empresa] utiliza tecnologia de ponta para automatizar todo o processo de financiamento e crédito com garantia de imóvel, oferecendo soluções rápidas, precisas e personalizadas.</p>
                    </div>
                    </div>
                </div>
            </main>

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
        </div>

        </div>    
        
    )
}