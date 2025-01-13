'use client'

import Link from 'next/link'
import style from './contato.module.scss'
import Image from 'next/image'
import emailSvg from '../../../public/assets/email-icon.svg'
import phoneSvg from '../../../public/assets/phone-icon.svg'
import wppSvg from '../../../public/assets/wpp-icon1.svg'
import { useEffect, useRef } from 'react'

export default function Contate(){
    useEffect(()=>{
        window.document.title = 'Contate-nos'   
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
                        <Link href={'/simular'}><button>Simular</button></Link>
                    </nav>

                    <div className={style.input}>
                        <input 
                        type="text" 
                        placeholder='Pesquise pelo seu protocolo ...'
                        onFocus={()=>{
                            if(refSpan.current){
                                refSpan.current.style.marginLeft = '-30px'
                            }
                        }}
                        onBlur={()=>{
                            if(refSpan.current){
                                refSpan.current.style.marginLeft = '0px'
                            }
                        }}
                        />
                        <span ref={refSpan}></span>
                    </div>
            </header>

            <main>
                <span>Contate-nos</span>

                <form>
                    <label htmlFor="name">Nome</label>
                    <input 
                    type="text" 
                    placeholder='Seu nome'
                    />
                    <label htmlFor="email">Email</label>
                    <input 
                    type="text" 
                    placeholder='Seu email'
                    />
                    <label htmlFor="about">Assunto</label>
                    <input 
                    type="text" 
                    placeholder='Assunto da mensagem'
                    />
                    <label htmlFor="message">Mensagem</label>
                    <textarea 
                    placeholder='Deixe aqui sua mensagem'></textarea>
                    <button>Enviar</button>
                </form>
            </main>
        </div>
    )
}