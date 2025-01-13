'use client'
import Link from 'next/link'
import style from './financiamento.module.scss'
import homeSvg from '@/../public/assets/homeSvg.svg'
import costSvg from '@/../public/assets/costSvg.svg'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

export default function Financiamento(){
    useEffect(()=>{
        document.title = 'Financiamento imobiliario'
    })

    const refSpan = useRef<HTMLSpanElement>(null)

    return(
        <>
            <div className={style.container}>
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
                                refSpan.current.style.marginLeft='-30px'
                            }
                        }}

                        onBlur={()=>{
                            if(refSpan.current){
                                refSpan.current.style.marginLeft='0px'
                            }
                        }}
                        />
                        <span ref={refSpan}></span>
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
        </>
    )
}