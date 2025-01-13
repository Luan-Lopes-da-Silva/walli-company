'use client'
import Link from 'next/link'
import style from './credito.module.scss'
import homeSvg from '@/../public/assets/homeSvg.svg'
import lowTaxsSvg from '@/../public/assets/lowTaxs.svg'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

export default function Credito(){
    useEffect(()=>{
        document.title = 'Crédito com garantia'
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
                </header>
                <main>
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
        </>
    )
}