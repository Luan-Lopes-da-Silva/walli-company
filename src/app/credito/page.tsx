'use client'
import Link from 'next/link'
import style from './credito.module.scss'
import homeSvg from '@/../public/assets/homeSvg.svg'
import lowTaxsSvg from '@/../public/assets/lowTaxs.svg'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Financement } from '@/utils/types'
import closeImg from '@/../public/assets/close_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import menuImg from '@/../public/assets/menu_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'


export default function Credito(){
    useEffect(()=>{
        document.title = 'Crédito com garantia'
    })

    const refSpan = useRef<HTMLSpanElement>(null)
    const refLoading = useRef<HTMLDivElement>(null)
    const refContainer = useRef<HTMLDivElement>(null)
    const refError = useRef<HTMLDivElement>(null)
    const [search,setSearch] = useState('')
    const refMenuContainer = useRef<HTMLDivElement>(null)
    const refMenu = useRef<HTMLUListElement>(null)
    const [count,setCount] = useState(0)
    const refContent = useRef<HTMLElement>(null)

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
        <>
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
                        onChange={(ev)=>setSearch(ev.currentTarget.value)}
                        value={search}
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
                </header>
                <main ref={refContent} className={style.contentContainer}>
                    <span>Crédito com garantia de imóvel</span>
                    <p>O financiamento com garantia de imóvel, também conhecido como crédito com garantia de imóvel ou empréstimo com penhor imobiliário, é uma modalidade de crédito onde o tomador oferece um imóvel como garantia para obter um empréstimo. O valor do crédito geralmente é maior do que outras modalidades, pois a garantia oferece segurança ao banco ou instituição financeira.</p>
                
                    <div className={style.pros}>
                        <span>Vantagens</span>
                        <div className={style.prosContainer}>
                            <div>
                                <p>Taxas de juros menor</p>
                                <Image
                                width={32}
                                height={32}
                                alt='Low taxs icon'
                                src={lowTaxsSvg}
                                />
                                <p>Como o risco para o credor é reduzido, as taxas de juros são geralmente mais acessíveis em comparação a outras formas de crédito.</p>
                            </div>
                        </div>
                    </div>

                    <div className={style.contras}>
                        <span>Desvantagens</span>
                        <div className={style.contrasContainer}>
                            <div>
                                <p>Restrição ao imóvel</p>
                                <Image
                                width={32}
                                height={32}
                                alt='Home svg'
                                src={homeSvg}
                                />
                                <p>Durante a vigência do financiamento, o imóvel fica vinculado à dívida e não pode ser vendido sem a quitação da mesma.</p>
                            </div>
                        </div>
                    </div>

                    <div className={style.doubts}>
                        <span>Duvidas</span>
                    </div>
                </main>
                </div>
            </div>
        </>
    )
}