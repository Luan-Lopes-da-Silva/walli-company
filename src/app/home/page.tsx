'use client'

import Image from 'next/image'
import style from './home.module.scss'
import emailSvg from '../../../public/assets/mail_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import phoneSvg from '../../../public/assets/call_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import hourSvg from '../../../public/assets/schedule_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import propertyImg from '../../../public/assets/tierra-mallorca-rgJ1J8SDEAY-unsplash (1) 1.svg'
import propertyImg2 from '../../../public/assets/creditoImobiliario 1.svg'
import { useEffect, useState,useRef } from 'react'
import Link from 'next/link'
import { Financement } from '@/utils/types'

export default function Home(){
    useEffect(()=>{
        window.document.title = 'Home'   
    })

    const [search,setSearch] = useState('')
    const refLoading = useRef<HTMLDivElement>(null)
    const refContainer = useRef<HTMLDivElement>(null)

    async function searchProcess(){
        const findInDb = await fetch(`https://walli-processdb.onrender.com/process/${search}`)
        const converseDb:Financement[]= await findInDb.json()
        const findProcess = converseDb.filter(p=>p.protocol === search)
        console.log(findInDb.status)
        if(search === ''){
            alert('Digite um numero de protocolo')
           }else if(findProcess.length>0 && findInDb.status==200 && refLoading.current && refContainer.current){
            refLoading.current.style.display = 'block'
            refContainer.current.style.filter = 'brightness(0.4)'
            setTimeout(() => {
                window.location.href = `/meuprocesso/${findProcess[0].protocol}`
            }, 2000);
           }else{
            alert('Protocolo não encontrado')
        }
    }

    return(            
            <div className={style.box}>
                <div className={style.container} ref={refContainer}>
                <header className={style.header}>
                    <nav>
                    <h1>LOGO</h1>
                        <ul>
                            <Link href={'/home'}><li>Inicio</li></Link>
                            <Link href={'/sobre'}><li>Sobre</li></Link>
                            <Link href={'/contato'}><li>Contate-nos</li></Link>
                        </ul>
                        <Link href={'/simular'}><button>simular</button></Link>
                    </nav>
                </header>

                <div className={style.input}>
                <input 
                type="text" 
                value={search}
                onChange={(ev)=>setSearch(ev.currentTarget.value)}
                placeholder='Busque o seu processo'
                />
                <span onClick={searchProcess}></span>
                </div>

                <main>
               <div className={style.presentation}>
                    <div className={style.textPresentation}>
                    <h2>Inovação financeira para o seu imóvel dos sonhos</h2>
                    <h3>Transformando o Financiamento Imobiliário com Tecnologia de Ponta</h3>
                    <p>Somos uma fintech dedicada a revolucionar o mercado de financiamento imobiliário através da inovação tecnológica. Nosso objetivo é simplificar e agilizar o processo de obtenção de crédito para compra de imóveis, oferecendo soluções personalizadas que atendem às necessidades individuais de cada cliente. Combinamos expertise financeira com o poder da tecnologia para proporcionar uma experiência transparente, eficiente e acessível, garantindo que cada pessoa possa realizar o sonho de adquirir sua própria casa de forma descomplicada e segura.</p>
                    <Link href={'/simular'}><button>simular</button></Link>
                    </div>
               </div>

               <div className={style.modalitys}>
                    <div>
                        <h2>Financiamento imobiliario</h2>
                        <Image
                            width={300}
                            height={300}
                            alt='House image'
                            src={propertyImg}
                        />
                        <p>Financiamento imobiliário é uma modalidade de crédito destinada à aquisição de imóveis, permitindo que os compradores adquiram uma propriedade sem a necessidade de pagar o valor total à vista. O valor financiado é pago em parcelas mensais ao longo de um período que pode variar de 20 a 30 anos, ou até mais, dependendo das condições do contrato.</p>

                        <div className={style.benefitsContainer}>    
                            <div>
                                <h3>Prós</h3>
                                <article className={style.benefits}>
                                    <span>Acesso Facilitado à Propriedade: Permite a compra de imóveis mesmo sem dispor de todo o capital.</span>
                                    <span>Valorização do Imóvel: O imóvel tende a valorizar com o tempo, podendo representar um bom investimento.</span>
                                    <span>Melhoria na Qualidade de Vida: Facilita a mudança para imóveis melhores ou maiores.</span>
                                    <span>Previsibilidade Financeira: Com parcelas fixas, facilita o planejamento financeiro.</span>
                                    <span>Uso do FGTS: Pode ser utilizado para abater parcelas ou reduzir o valor financiado.</span>
                                    <span>Construção de Patrimônio: Ao quitar o financiamento, o imóvel se torna um bem próprio.</span>
                                    <span>Incentivos Governamentais: Programas habitacionais oferecem condições especiais, como juros reduzidos.</span>
                                </article>
                            </div>

                            <div>
                                <h3>Contras</h3>
                                <article className={style.negatives}>
                                    <span>Endividamento a Longo Prazo: Compromete a renda por um longo período.</span>
                                    <span>Taxas de Juros Elevadas: Aumentam significativamente o valor final pago.</span>
                                    <span>Risco de Desvalorização: O imóvel pode desvalorizar em crises econômicas</span>
                                    <span>Custos Adicionais: Incluem seguros, taxas de administração, escritura e registro.</span>
                                    <span>Penalidades por Atraso: Atrasos podem acarretar multas e até a perda do imóvel.</span>
                                    <span>Falta de Flexibilidade: Dificuldade em renegociar condições em caso de dificuldades financeiras.</span>
                                    <span>Comprometimento da Capacidade de Crédito: Limita a obtenção de novos empréstimos enquanto o financiamento não é quitado.</span>
                                </article>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2>Crédito com garantia de imovel</h2>
                        <Image
                        width={300}
                        height={300}
                        src={propertyImg2}
                        alt='Crédito com garantia de imovel foto'
                        className={style.secondImage}
                        />

                    <p>O crédito com garantia de imóvel, também conhecido como home equity, é um tipo de empréstimo onde o tomador usa um imóvel quitado ou financiado como garantia para obter crédito. Esse tipo de financiamento permite acesso a valores mais altos e prazos mais longos, com taxas de juros geralmente mais baixas comparadas a outras modalidades de crédito pessoal. Os recursos obtidos podem ser utilizados para diversas finalidades, como reforma de imóveis, investimentos, educação, quitação de dívidas e outros projetos pessoais ou empresariais. Caso o tomador não consiga cumprir com as obrigações de pagamento, o imóvel pode ser tomado pela instituição financeira para quitar a dívida.</p>

                    <div className={style.benefitsContainer}>    
                        <div>
                            <h3>Prós</h3>
                            <article className={style.benefits}>
                                <span>Geralmente, as taxas de juros são mais baixas em comparação com outros tipos de crédito pessoal.</span>
                                <span>Oferece prazos de pagamento mais longos, possibilitando parcelas menores e mais acessíveis.</span>
                                <span>Permite obter empréstimos de valores mais altos, já que o imóvel serve como garantia.</span>
                                <span>O dinheiro obtido pode ser usado para diversas finalidades, como quitar dívidas, investir em negócios, reformas, etc.</span>
                                <span>Pode ajudar na consolidação de dívidas com juros mais altos, reduzindo o custo total da dívida.</span>
                                <span>Em alguns casos, é possível refinanciar o crédito para obter melhores condições ao longo do tempo.</span>
                            </article>
                        </div>

                        <div>
                            <h3>Contras</h3>
                            <article className={style.negatives}>
                                <span>Em caso de inadimplência, o imóvel pode ser tomado pelo banco como pagamento da dívida.</span>
                                <span>A dívida pode durar muitos anos, comprometendo a renda por um longo período.</span>
                                <span>Inclui custos de avaliação do imóvel, registro em cartório e seguros obrigatórios.</span>
                                <span>O processo de aprovação pode ser mais demorado e burocrático devido à necessidade de avaliação e registro do imóvel.</span>
                                <span>Inadimplência pode afetar negativamente a pontuação de crédito e dificultar a obtenção de novos financiamentos.</span>
                                <span>Se o valor do imóvel diminuir, pode haver dificuldades em renegociar ou refinanciar o crédito.</span>
                                <span>O imóvel fica alienado ao banco, limitando sua venda ou uso como garantia em outras operações até a quitação do crédito.</span>
                            </article>
                        </div>
                    </div>
                    </div>

                    
               </div>

               <footer className={style.footer}>
               <h1>LOGO</h1>
                    <div className={style.footerContainer}>
                    <div className={style.infos}>
                    <div className={style.infoContainer}>
                        <Image
                        width={24}
                        height={24}
                        alt='email icon'
                        src={emailSvg}
                        />
                        <span>kaiques.goncalves@gmail.com</span>
                    </div>
                    
                    <div className={style.infoContainer}>
                        <Image
                        width={24}
                        height={24}
                        alt='phone icon'
                        src={phoneSvg}
                        />
                        <span>(11) 95045-3953</span>
                    </div>
                    
                    <div className={style.infoContainer}>
                        <Image
                        width={24}
                        height={24}
                        alt='schedule icon'
                        src={hourSvg}
                        />
                        <span>Segunda a Sexta 8:00 as 17:00 Sábado 8:00 as 12:00</span>
                    </div>
                </div>

                <div className={style.socialMedias}>
                    <Link href={'https://www.facebook.com/profile.php?id=61562086139122'} target='_blank'>
                        <div>
                        </div>
                    </Link>
                    
                    <Link href={'https://www.instagram.com/wallifinance/?next=%2F'} target='_blank'>
                        <div>
                        </div>
                    </Link>

                    <Link href={'https://x.com/wallifinance'} target='_blank'>
                        <div>
                        </div>
                    </Link>

                    <Link href={'https://contate.me/testewall'} target='_blank'>
                        <div>
                        </div>
                    </Link>                
                </div>
                    </div>

               </footer>
                </main>
            </div>

            <div className={style.loading} ref={refLoading}>
                <p>Carregando</p>
                <div className={style.ldsRoller} ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
    )
}