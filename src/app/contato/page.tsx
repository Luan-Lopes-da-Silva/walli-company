'use client'

import Link from 'next/link'
import style from './contato.module.scss'
import Image from 'next/image'
import emailSvg from '../../../public/assets/email-icon.svg'
import phoneSvg from '../../../public/assets/phone-icon.svg'
import wppSvg from '../../../public/assets/wpp-icon1.svg'
import { useEffect } from 'react'

export default function Contate(){
    useEffect(()=>{
        window.document.title = 'Contate-nos'   
    })

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
            </header>

            <main>
            <h1>Tem alguma duvida ou sugestão?</h1>
            <h3>Fale conosco</h3>

            <div className={style.form}>
                <form>
                    <label htmlFor="">Nome</label>
                    <input type="text"  placeholder='Seu nome'/>
                    <label htmlFor="">Email</label>
                    <input type="text"  placeholder='Seu email'/>
                    <label htmlFor="">Telefone</label>
                    <input type="text"  placeholder='Seu telefone'/>
                    <label htmlFor="">Assunto</label>
                    <input type="text"  placeholder='O assunto da mensagem'/>
                    <label htmlFor="">Mensagem</label>
                    <textarea placeholder='Deixe sua mensagem aqui'></textarea>
                    <button>Enviar mensagem</button>
                </form>

                <div className={style.infos}>
                    <h2>Deseja nos contatar por outros meios?</h2>
                    <div className={style.card}>
                    <div>
                        <Image
                        width={46}
                        height={46}
                        alt='email svg'
                        src={emailSvg}
                        />
                        <span>email@email.com</span>
                    </div>
                    <p>Para um atendimento mais detalhado e formal, você pode contar com nosso suporte via e-mail. Nossa equipe de atendimento está pronta para responder suas perguntas e auxiliar em todas as etapas do seu financiamento imobiliário. Envie suas dúvidas, solicitações ou documentos para nosso e-mail e garantimos uma resposta dentro de 24 horas úteis. Estamos disponíveis de segunda a sexta-feira, das 9h às 18h. Entre em contato conosco e tenha um atendimento personalizado e completo.</p>
                    </div>

                    <div className={style.card}>
                    <div>
                        <Image
                        src={phoneSvg}
                        width={46}
                        height={46}
                        alt='phone svg'
                        />
                        <span>(11)99999-9999</span>
                    </div>
                    <p>Se você prefere um atendimento mais direto e pessoal, nosso serviço de atendimento telefônico está à sua disposição. Ligue para nossa central de atendimento e converse diretamente com um de nossos especialistas em financiamento imobiliário. Estamos disponíveis de segunda a sexta-feira, das 8h às 18h. Garantimos um atendimento eficiente e atencioso para resolver suas dúvidas e agilizar seu processo de financiamento. Não hesite em nos ligar!</p>
                    </div>

                    <div className={style.card}>
                    <div>
                        <Image
                        src={wppSvg}
                        width={46}
                        height={46}
                        alt='phone svg'
                        />
                        <span>(11)99999-9999</span>
                    </div>
                    <p>Na nossa fintech de financiamento imobiliário, entendemos a importância de um atendimento ágil e prático. Por isso, disponibilizamos o atendimento via WhatsApp, onde você pode tirar suas dúvidas e acompanhar seu processo de financiamento de forma rápida e eficiente. Nosso time está disponível de segunda a sexta-feira, das 8h às 20h, e aos sábados, das 9h às 14h. Envie uma mensagem para o nosso número e um de nossos especialistas estará pronto para te ajudar!.</p>
                    </div>
                </div>
            </div>
            </main>
        </div>
    )
}