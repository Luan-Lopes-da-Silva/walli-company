'use client'

import Link from 'next/link'
import style from './contato.module.scss'
import { useEffect, useRef, useState } from 'react'
import { Financement } from '@/utils/types'

export default function Contate(){
    useEffect(()=>{
        window.document.title = 'Contate-nos'   
    })

    const refSpan = useRef<HTMLSpanElement>(null)
    const refContentContainer = useRef<HTMLDivElement>(null)
    const refLoading = useRef<HTMLDivElement>(null)
    const [search,setSearch] = useState('')

     async function getProcess() {
                    const findInDb = await fetch(`https://walli-processdb.onrender.com/process/${search}`)
                            const converseDb:Financement[]= await findInDb.json()
                            const findProcess = converseDb.filter(p=>p.protocol === search)
                            if(search === ''){
                                alert('Digite um numero de protocolo')
                               }else if(findProcess.length>0 && findInDb.status==200 && refLoading.current && refContentContainer.current){
                                refLoading.current.style.display = 'block'
                                refContentContainer.current.style.filter = 'brightness(0.4)'
                                setTimeout(() => {
                                    window.location.href = `/meuprocesso/${findProcess[0].protocol}`
                                }, 2000);
                               }else{
                                alert('Protocolo não encontrado')
                            }
    }


    return(
        <div className={style.box}>
            <Link href={'/simular'}><button className={style.button}>Simular</button></Link>
            <div className={style.loading} ref={refLoading}>
                <span></span>
                <p>Buscando seu numero de protocolo</p>
            </div>
            <div ref={refContentContainer} className={style.contentContainer}>
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
                        value={search}
                        onChange={(ev)=>setSearch(ev.currentTarget.value)}
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
                        <span ref={refSpan} onClick={getProcess}></span>
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
        </div>
    )
}