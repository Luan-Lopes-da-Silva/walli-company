'use client'
import Link from 'next/link'
import style from './financiamento.module.scss'
import homeSvg from '@/../public/assets/homeSvg.svg'
import costSvg from '@/../public/assets/costSvg.svg'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import closeImg from '@/../public/assets/close_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import { Financement } from '@/utils/types'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'


export default function Financiamento(){
    useEffect(()=>{
        document.title = 'Financiamento imobiliario'
    })

    const refSpan = useRef<HTMLSpanElement>(null)
    const refContainer = useRef<HTMLDivElement>(null)
    const refError = useRef<HTMLDivElement>(null)
    const refLoading = useRef<HTMLDivElement>(null)
    
    const [search,setSearch] = useState('')
   

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

    return(
        <div className={style.box}>
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

            <div className={style.container} ref={refContainer}>
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
                                refSpan.current.style.marginLeft='-30px'
                            }
                        }}

                        onBlur={()=>{
                            if(refSpan.current){
                                refSpan.current.style.marginLeft='0px'
                            }
                        }}
                        />
                        <span ref={refSpan} onClick={searchProcess}></span>
                    </div>
                </header>
                <main>
                    <span>Financiamento imobiliario</span>
                    <p>O financiamento imobiliário é uma forma de crédito voltada para a compra de um imóvel. Ele é comumente oferecido por bancos e financeiras, sendo uma das opções mais populares para quem deseja adquirir um imóvel residencial ou comercial.</p>
                
                    <div className={style.pros}>
                        <span>Vantagens</span>
                        <div className={style.prosContainer}>
                            <div>
                                <p>Acesso facilitado a casa própria</p>
                                <Image
                                width={32}
                                height={32}
                                alt='Home svg'
                                src={homeSvg}
                                />
                                <p>Permite a aquisição de um imóvel sem a necessidade de pagar o valor total à vista, o que torna a compra mais acessível para muitas pessoas.</p>
                            </div>
                        </div>
                    </div>

                    <div className={style.contras}>
                        <span>Desvantagens</span>
                        <div className={style.contrasContainer}>
                            <div>
                                <p>Custo total elevado</p>
                                <Image
                                width={32}
                                height={32}
                                alt='Cost svg'
                                src={costSvg}
                                />
                                <p>O custo total do financiamento pode ser significativamente mais alto do que o preço inicial do imóvel, devido aos juros pagos ao longo dos anos.</p>
                            </div>
                        </div>
                    </div>

                    <div className={style.doubts}>
                        <span>Duvidas</span>
                    </div>
                </main>
            </div>
        </div>
    )
}