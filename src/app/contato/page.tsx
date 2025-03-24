'use client'

import Link from 'next/link'
import style from './contato.module.scss'
import { startTransition, useEffect, useRef, useState } from 'react'
import { Financement } from '@/utils/types'
import closeImg from '@/../public/assets/close_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import Image from 'next/image'
import menuImg from '@/../public/assets/menu_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import ReactDOMServer from 'react-dom/server';
import { useForm } from 'react-hook-form'
import SuportEmail from '../components/Email/SuportEmail'

const createContactSchema = z.object({
    name: z.string().min(1,'O nome é obrigatório'),
    email:z.string().email('Tipo de email invalido').min(1,'O email é obrigatório'),
    subject:z.string().min(1,'O assunto do email é obrigatório'),
    messageEmail:z.string().min(1,'A mensagem do email é obrigatório')
})


export type contacType = {
    name:string,
    email:string,
    subject:string,
    messageEmail:string
}

export default function Contate(){
    useEffect(()=>{
        window.document.title = 'Contate-nos'   
    })

    const { 
           register,
           handleSubmit,
           formState: { errors}
       } = useForm<contacType>({resolver:zodResolver(createContactSchema)})


      

    const refSpan = useRef<HTMLSpanElement>(null)
    const refContentContainer = useRef<HTMLDivElement>(null)
    const refError = useRef<HTMLDivElement>(null)
    const refLoading = useRef<HTMLDivElement>(null)
    const [search,setSearch] = useState('')
    const refMenuContainer = useRef<HTMLDivElement>(null)
    const refMenu = useRef<HTMLUListElement>(null)
    const [count,setCount] = useState(0)
    const refContent = useRef<HTMLElement>(null)

    async function searchProcess(){
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL2}`
        const findInDb = await fetch(`${apiUrl}/process/${search}`)
        const converseDb:Financement[]= await findInDb.json()
        const findProcess = converseDb.filter(p=>p.protocol === search)
        if(findProcess.length<1 && refContentContainer.current && refLoading.current ){
                refLoading.current.style.display ='block'
                refContentContainer.current.style.filter = 'brightness(0.4)'
                
                setTimeout(() => {
                    if(refError.current && refLoading.current ){
                        refLoading.current.style.display = 'none'
                        refError.current.style.display = 'block'
                    }
                }, 2000);
            
           }else if(findProcess.length>0 && findInDb.status==200 && refLoading.current && refContentContainer.current){
            refLoading.current.style.display = 'block'
            refContentContainer.current.style.filter = 'brightness(0.4)'
            setTimeout(() => {
                window.location.href = `/meuprocesso/${findProcess[0].protocol}`
            }, 2000);
           }else{
            alert('Digite um numero de protocolo')    
        }
    }

    function closeErrorMsg(){
        if(refError.current && refContentContainer.current){
            refError.current.style.display = 'none'
            refContentContainer.current.style.filter = 'brightness(1)'
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


    async function sendEmail(data:contacType) {
        const url = process.env.NEXT_PUBLIC_API_URL4
        console.log('Enviando email...');
        
        startTransition(async () => {
          try {
            const response = await fetch(`${url}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                to: 'lopesluan431@gmail.com',
                name: data.name,
                subject: data.subject,
                templateHtml: ReactDOMServer.renderToStaticMarkup(<SuportEmail messageEmail={data.messageEmail} name={data.name}/>),
              }),
            });
            
            console.log(response.status)

             // eslint-disable-next-line no-explicit-any
            const dataResponse:any = await response.json();
            
            console.log(dataResponse)
            alert('Email enviado com sucesso aguarde o nosso time de suporte entrar em contato')
          } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
          }
        });
    }


    return(
        <div className={style.box}>
            <Link href={'/simular'}><button className={style.button}>Simular</button></Link>
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
            
            <div ref={refContentContainer} className={style.contentContainer}>
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
                        <span ref={refSpan} onClick={searchProcess}></span>
                    </div>
            </header>

            <main ref={refContent}>
                <span>Contate-nos</span>

                <form onSubmit={handleSubmit(sendEmail)}>
                    <label htmlFor="name">Nome</label>
                    {errors.name && <span className={style.errors}>{errors.name.message}</span>}
                    <input 
                    type="text" 
                    placeholder='Seu nome'
                    {...register("name")}
                    />
                    <label htmlFor="email">Email</label>
                    {errors.email && <span className={style.errors}>{errors.email.message}</span>}
                    <input 
                    type="text" 
                    placeholder='Seu email'
                    {...register("email")}
                    />
                    <label htmlFor="about">Assunto</label>
                    {errors.subject && <span className={style.errors}>{errors.subject.message}</span>}
                    <input 
                    type="text" 
                    placeholder='Assunto da mensagem'
                    {...register("subject")}
                    />
                    <label htmlFor="message">Mensagem</label>
                    {errors.messageEmail && <span className={style.errors}>{errors.messageEmail.message}</span>}
                    <textarea
                    placeholder='Deixe aqui sua mensagem'
                    {...register("messageEmail")}
                    ></textarea>
                    <button>Enviar</button>
                </form>
            </main>
            </div>
        </div>
    )
}