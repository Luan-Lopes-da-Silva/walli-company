'use client'

import Link from 'next/link'
import style from './sobre.module.scss'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import svgTech from '@/../public/assets/computer.svg'

export default function Sobre(){
    useEffect(()=>{
        window.document.title = 'Sobre'   
    })

    const refSpan = useRef<HTMLSpanElement>(null)

    return(
        <div className={style.container}>
            <Link href={'/simular'}><button className={style.button}>Simular</button></Link>
            <header className={style.header}>
                    <nav>
                    <h1>LOGO</h1>
                        <ul>
                            <Link href={'/home'}><li>Inicio</li></Link>
                            <Link href={'/sobre'}><li>Sobre</li></Link>
                            <Link href={'/contato'}><li>Contate-nos</li></Link>
                        </ul>
                        <div className={style.input}>
                <div className={style.input}>
                <input 
                type="text" 
                placeholder='Pesquise pelo seu protocolo ...'
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

                <span ref={refSpan}></span>
                </div>
                
                </div>
                        <Link href={'/simular'}><button>simular</button></Link>
                    </nav>

                 
                </header>

            <main className={style.contentContainer}>
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
    )
}