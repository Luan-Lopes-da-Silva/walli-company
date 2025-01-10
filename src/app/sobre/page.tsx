'use client'

import Link from 'next/link'
import style from './sobre.module.scss'
import { useEffect } from 'react'

export default function Sobre(){
    useEffect(()=>{
        window.document.title = 'Sobre'   
    })

    return(
        <div className={style.container}>
            <Link href={'/simular'}><button className={style.button}>Simular</button></Link>
            

            <main className={style.contentContainer}>
            <div className={style.history}>
                <h1>Nossa história</h1>
                <p>Em 2021, em uma pequena sala em São Paulo, um grupo de amigos de infância, apaixonados por tecnologia e finanças, se reuniram para discutir um problema que enfrentavam em comum: a dificuldade de acessar e entender os processos de financiamento imobiliário. Sabiam que muitas pessoas compartilhavam dessa mesma frustração, o que os levou a imaginar uma solução que pudesse revolucionar o setor. Desses encontros nasceu a [Nome da Empresa]. Combinando suas habilidades em tecnologia, análise de dados e finanças, eles criaram uma plataforma inovadora que simplificava todo o processo de financiamento imobiliário, tornando-o mais transparente e acessível para todos. Desde o início, a missão da empresa foi clara: transformar o mercado imobiliário, proporcionando às pessoas as ferramentas e informações necessárias para tomar decisões financeiras mais informadas e seguras. Em poucos meses, a plataforma ganhou tração, atraindo a atenção de investidores e parceiros estratégicos. A equipe expandiu, e a pequena sala em São Paulo deu lugar a um moderno escritório, cheio de energia e inovação. Hoje, a [Nome da Empresa] continua a crescer, impactando positivamente a vida de milhares de pessoas que buscam realizar o sonho da casa própria.</p>
            </div>

            <div className={style.mission}>
                <h1>Nossa missão</h1>
                <p>Na [Nome da Empresa], acreditamos que todos têm o direito de acessar o mercado imobiliário de maneira simples e eficiente. Nosso principal objetivo é descomplicar o financiamento imobiliário, proporcionando uma experiência digital intuitiva e transparente.</p>
                <span>Queremos:</span>
                <ul>
                    <li>1. Simplificar Processos: Tornar o financiamento imobiliário um processo descomplicado e acessível, utilizando tecnologia de ponta para eliminar burocracias desnecessárias.</li>
                    <li>2. Empoderar Usuários: Oferecer ferramentas e informações que permitam aos nossos clientes tomar decisões financeiras com confiança e segurança.</li>
                    <li>3.Promover a Transparência: Garantir que todos os aspectos do financiamento sejam claros e compreensíveis, sem surpresas ou custos ocultos.</li>
                    <li>4. Facilitar o Acesso: Democratizar o acesso ao financiamento imobiliário, permitindo que mais pessoas realizem o sonho da casa própria, independentemente de sua situação financeira inicial.</li>
                    <li>5. Inovar Constantemente: Manter um ambiente de inovação contínua, sempre buscando novas formas de melhorar e facilitar a jornada do financiamento imobiliário para nossos clientes.</li>
                </ul>
            </div>
            </main>
        </div>
    )
}