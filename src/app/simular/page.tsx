'use client'
import style from './simular.module.scss'
import {  useForm } from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import {useEffect, useRef, useState } from 'react'
import forwardSvg from '@/../public/assets/Vector.svg'
import backSvg from '@/../public/assets/Vector-1.svg'
import backActiveSvg from '@/../public/assets/Vector2.svg'
import Image from 'next/image'
import Link from 'next/link';
import { Financement } from '@/utils/types';
import closeImg from '@/../public/assets/close_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import menuImg from '@/../public/assets/menu_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'



const createFinancementSchema = z.object({
    type: z.string().min(1,'O tipo é obrigatório.'),
    imobilleValue:z.string().min(1,'O valor de imovel é obrigatório.'),
    financedValue:z.string().min(1,'O valor de financiamento é obrigatório.'),
    parcelnumber:z.string().min(1,'O numero de parcelas é no minimo 1 e no maximo 420'),
    amortization:z.string().min(1,"Voce pode optar pela tabela SAC ou PRICE")
})

const createPersonalDatasSchema = z.object({
    name: z.string().min(1,'O nome é obrigatório.'),
    email:z.string().min(1,'O valor email é obrigatório.').email('Formato de email invalido.'),
    phone:z.string().min(1,'O telefone é obrigatório.'),
    birthday:z.string().min(1,'A sua data de nascimento é obrigatório')
})

export type firstFormData={
    name:string,
    email:string,
    phone:string,
    birthday:string
}

export type secondFormData={
    type: string,
    imobilleValue: string,
    financedValue: string,
    parcelnumber:string,
    amortization:string
}


const undefinedForm = {
    name : '',
    email : '',
    phone : '',
    birthday:''
}

const undefinedSecondForm = {
    type: '',
    imobilleValue : '',
    financedValue : '',
    parcelnumber: '',
    amortization:''
}



export default function Simular(){
    useEffect(()=>{
        window.document.title = 'Simular'   
    })

    async function searchProcess(){
        const findInDb = await fetch(`https://walli-processdb.onrender.com/process/${search}`)
        const converseDb:Financement[]= await findInDb.json()
        const findProcess = converseDb.filter(p=>p.protocol === search)
        if(findProcess.length<1 && refContainer.current && refSearch.current ){
                refSearch.current.style.display ='block'
                refContainer.current.style.filter = 'brightness(0.4)'
                
                setTimeout(() => {
                    if(refError.current && refSearch.current ){
                        refSearch.current.style.display = 'none'
                        refError.current.style.display = 'block'
                    }
                }, 2000);
            
           }else if(findProcess.length>0 && findInDb.status==200 && refSearch.current && refContainer.current){
            refSearch.current.style.display = 'block'
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

    const refSearch = useRef<HTMLDivElement>(null)
    const refFirstForm = useRef<HTMLFormElement>(null)
    const refPDF = useRef<HTMLDivElement>(null)
    const refSecondForm = useRef<HTMLFormElement>(null)
    const refFirstStep = useRef<HTMLDivElement>(null)
    const refSecondStep = useRef<HTMLDivElement>(null)
    const refSummary = useRef<HTMLDivElement>(null)
    const refModal = useRef<HTMLDivElement>(null)
    const refLoading = useRef<HTMLDivElement>(null)
    const refContainer = useRef<HTMLElement>(null)
    const refTable = useRef<HTMLTableElement>(null)
    const [houseValue,setHouseValue] = useState('')
    const [financementValue,setFinancementValue] = useState('')
    const [prohibitedValue,setProhibitedValue] = useState('')
    const [parcelNumber,setParcelNumber] = useState('')
    const [amortization,setAmortization] = useState('')
    const refFirstStepCircle = useRef<HTMLDivElement>(null)
    const refSecondStepCircle = useRef<HTMLDivElement>(null)
    const refText = useRef<HTMLParagraphElement>(null)
    const [count,setCount] = useState(0)
    const refBackStepImg = useRef<HTMLImageElement>(null)
    const refNextStepImg = useRef<HTMLImageElement>(null)
    const [protocol,setProtocol] = useState('')
    const refSpan = useRef<HTMLSpanElement>(null)
    const [search,setSearch] = useState('') 
    const refError = useRef<HTMLDivElement>(null)
    const refMenuContainer = useRef<HTMLDivElement>(null)
    const refMenu = useRef<HTMLUListElement>(null)
    const [countMenu,setCountMenu] = useState(0)
    const refContent = useRef<HTMLElement>(null)

    
    const [firstFormDatas,setFirstFormDatas] = useState<firstFormData>(undefinedForm)
    const [secondFormDatas,setSecondFormDatas] = useState<secondFormData>(undefinedSecondForm)

    const { 
        register: registerFirst,
        handleSubmit: handleFirst,
        setValue,
        formState: { errors:errorsFirst }
    } = useForm<firstFormData>({resolver:zodResolver(createPersonalDatasSchema)})


    const { 
        register: registerSecond,
        handleSubmit: handleSecond,
        formState: { errors:errorsSecond }
    } = useForm<secondFormData>({resolver:zodResolver(createFinancementSchema)})

    const generatedProtocols = new Set();

    function generateProtocol() {
        let protocol;
        do {
          protocol = Math.random().toString(36).substring(2, 10).toUpperCase();
        } while (generatedProtocols.has(protocol));
        generatedProtocols.add(protocol);
      
        return protocol;
    }

    function nextStep(){
        setCount(1)
        console.log(count)
        if(refFirstStepCircle.current && refSecondStepCircle.current && refText.current && refNextStepImg.current && refBackStepImg.current){ 
            refText.current.innerText = `Durante o processo de financiamento, você receberá um número de protocolo exclusivo ${protocol}. Este número é muito importante, pois permite que você acompanhe o andamento do seu processo de maneira rápida e prática. Guarde com cuidado e informe-o sempre que entrar em contato conosco. Isso nos ajudará a localizar suas informações de forma ágil e garantir um atendimento ainda mais eficiente. Estamos à disposição para esclarecer quaisquer dúvidas ou oferecer o suporte necessário`
            refBackStepImg.current.src = backActiveSvg.src
        }
    }


    function onSubmit(data:firstFormData){
        if(refFirstForm.current && refSecondForm.current && refFirstStep.current && refSecondStep.current){
            refFirstForm.current.style.display = 'none'
            refSecondForm.current.style.display = 'block'
            const p = refFirstStep.current.querySelector('p')
            const span = refFirstStep.current.querySelector('span')
            const div = refFirstStep.current.querySelector('div')
            const secondP = refSecondStep.current.querySelector('p')
            const secondSpan = refSecondStep.current.querySelector('span')
            const secondDiv = refSecondStep.current.querySelector('div')
            
            if(p && span && div && secondP && secondSpan && secondDiv){
                div.style.borderColor = '#868686'
                p.style.color = '#868686'
                span.style.color = '#868686'

                secondDiv.style.borderColor = '#028DA5'
                secondP.style.color = '#028DA5'
                secondSpan.style.color = '#028DA5'
            }
            setFirstFormDatas(data)
        }
      }

      const formatToCustomDecimal = (value: string) => {
        const cleanValue = value.replace(/[^\d]/g, "");
        if (!cleanValue) return "";
        const numericValue = parseFloat(cleanValue) / 100;
        const formattedValue = numericValue
          .toFixed(2)
          .replace(".", ",")
          .replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
      
        return formattedValue;
      };

      async function createAndSavePDF(){
        const formatImobilleValue = houseValue.replace('.','')
        const formatImobilleValue2 = formatImobilleValue.replace(',','')
        const formatFinancementValue = financementValue.replace(',','')
        const formatFinancementValue2 = formatFinancementValue.replace('.','')
        const expanseValue = (5*Number(formatImobilleValue2))/100
        window.open(`/api/generate-pdf?imobillevalue=${formatImobilleValue2}&financementvalue=${formatFinancementValue2}&parcels=${Number(parcelNumber)}&expanse=${expanseValue}&amortization=${amortization}`, '_blank')
      }

      

    


      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleInputChange = (event: { target: { name: any; value: any } }) => {
        const { name, value } = event.target;
      
        const formattedValue = formatToCustomDecimal(value);
        setValue(name, formattedValue, { shouldValidate: true });
      };
      
      async function onSubmitSecondForm(data:secondFormData){
        setSecondFormDatas(data)
        if(refSummary.current && refTable.current){
            refSummary.current.style.display = 'block'
            setHouseValue(data.imobilleValue)
            setFinancementValue(data.financedValue)
            setParcelNumber(data.parcelnumber)
            setAmortization(data.amortization)
            const formatFinanceValue = data.financedValue.replace(/\D/g, "")
            const formatImobilleValue = data.imobilleValue.replace(/\D/g, "")
            const prohibited = Number(formatFinanceValue)-Number(formatImobilleValue)
            setProhibitedValue(formatToCustomDecimal(`${prohibited}`))    
        }
      }

      function backStep(){
        if(refFirstForm.current && refSecondForm.current && refFirstStep.current && refSecondStep.current){
            refFirstForm.current.style.display = 'block'
            refSecondForm.current.style.display = 'none'

            const button = refFirstForm.current.querySelector('button')
            const p = refFirstStep.current.querySelector('p')
            const span = refFirstStep.current.querySelector('span')
            const div = refFirstStep.current.querySelector('div')
            const secondP = refSecondStep.current.querySelector('p')
            const secondSpan = refSecondStep.current.querySelector('span')
            const secondDiv = refSecondStep.current.querySelector('div')
            
            if(p && span && div && secondP && secondSpan && secondDiv && button){
                button.disabled = true
                button.removeEventListener('click', backStep)
                div.style.borderColor = '#028DA5'
                p.style.color = '#028DA5'
                span.style.color = '#028DA5'

                secondDiv.style.borderColor = '#868686'
                secondP.style.color = '#868686'
                secondSpan.style.color = '#868686'
            }
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
        <div className={style.box}>
            <div className={style.searchLoading} ref={refSearch}>
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
        <main className={style.container} ref={refContainer}>
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
            
            <section className={style.content} ref={refContent}>
                <span>Simule seu financiamento</span>
                <span>Encontre a melhor opção para realizar o sonho da casa própria em poucas minutos</span>
                <div className={style.steps}>
                    <div ref={refFirstStep}>
                    <div className={style.circle}><span>1</span></div>
                    <p>Dados de financiamento</p>
                    </div>

                    <div ref={refSecondStep}>
                        <div className={style.circle}>
                        <span>2</span>
                        </div>
                    <p>Dados pessoais</p>
                    </div>
                </div>

                
                <form className={style.firstForm} onSubmit={handleFirst(onSubmit)} ref={refFirstForm}>
                    <label htmlFor="name">Nome</label>
                    {errorsFirst.name && <span>{errorsFirst.name.message}</span>}
                    <input type="text" {...registerFirst("name")}/>
                    <label htmlFor="">Data de nascimento</label>
                    {errorsFirst.birthday && <span>{errorsFirst.birthday.message}</span>}
                    <input type="text" {...registerFirst("birthday")} />
                    <label htmlFor="email">Email</label>
                    {errorsFirst.email && <span>{errorsFirst.email.message}</span>}
                    <input type="text" {...registerFirst(("email"))}/>
                    <label htmlFor="">Telefone</label>
                    {errorsFirst.phone && <span>{errorsFirst.phone.message}</span>}
                    <input type="text" {...registerFirst("phone")} />
                    
                    <div>
                        <button disabled={true}>Voltar</button>
                        <button onClick={nextStep}>Avançar</button>
                    </div>
                </form>

                <form className={style.secondForm} onSubmit={handleSecond((ev)=>onSubmitSecondForm(ev))} ref={refSecondForm}>
                    <label htmlFor="">Tipo de financiamento desejado</label>
                    {errorsSecond.type && <span>{errorsSecond.type.message}</span>}
                    <select {...registerSecond("type")}>
                        <option value="">Selecione um metodo de financiamento</option>
                        <option value="Financiamento imobililiario">Financiamento imobiliario</option>
                        <option value="Crédito com garantia">Crédito com garantia de imovel</option>
                    </select>
                    <label htmlFor="imobilleValue">Valor do imovel desejado</label>
                    {errorsSecond.imobilleValue && <span>{errorsSecond.imobilleValue.message}</span>}
                    <input type="text"  {...registerSecond("imobilleValue")} onChange={handleInputChange} name='imobilleValue'/>
                    <label htmlFor="financedValue">Valor a ser financiado</label>
                    {errorsSecond.financedValue && <span>{errorsSecond.financedValue.message}</span>}
                    <input type="text" {...registerSecond("financedValue")} onChange={handleInputChange} name='financedValue'/>
                    <label htmlFor='parcelnumber'>Numero de parcelas</label>
                    {errorsSecond.parcelnumber && <span>{errorsSecond.parcelnumber.message}</span>}
                    <input type="text" {...registerSecond("parcelnumber")} name='parcelnumber'/>
                    <label htmlFor=''>Amortização</label>
                    {errorsSecond.amortization && <span>{errorsSecond.amortization.message}</span>}
                    <input type="text" {...registerSecond("amortization")}/>
                    <div>
                        <button onClick={backStep}>Voltar</button>
                        <button>Avançar</button>
                    </div>
                </form>


              

                <article className={style.summary} ref={refSummary}>
                    <button>Dar inicio a processo de financiamento</button>
                    <h3>Resumo</h3>
                        <div className={style.infos}>
                         <p>Valor do imóvel: {houseValue}</p>
                         <p>Valor financiado: {financementValue}</p>
                         <p>Valor de entrada: {prohibitedValue}</p>
                         <p>Primeira parcela: </p>
                         <p>Ultima parcela: </p>
                        </div>
                    <button onClick={createAndSavePDF}>Receber simulação</button>
                </article>


                <div ref={refPDF} className={style.containerPDF}>
                    <div className={style.header}>
                    <span>
                        Logo
                    </span>
                    <h1>Sua simulação chegou</h1>
                    </div>
                    <div className={style.tableContainer}>
                        <div className={style.headerTable}>
                            <div>
                                <p>Valor do imovel</p>
                                <p>{houseValue}</p>
                            </div>
                            <div>
                                <p>Valor de entrada</p>
                                <p>{prohibitedValue}</p>
                            </div>
                            <div>
                                <p>Numero de parcelas</p>
                                <p>{parcelNumber}</p>
                            </div>
                            <div>
                                <p>Tipo de amortização</p>
                                <p>{amortization}</p>
                            </div>
                        </div>

                        <table ref={refTable}>
                            <tbody>
                                <tr style={{color:'#FFF'}}>
                                    <th>Numero da parcela</th>
                                    <th>Valor da parcela</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

           
        </main>

        <div className={style.loading} ref={refLoading}>
            <p>Baixando a sua simulação</p>
            <div className={style.ldsRoller} ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        </div>

    )
}