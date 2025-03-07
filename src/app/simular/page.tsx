/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import style from './simular.module.scss'
import {  useForm } from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import {useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { Financement } from '@/utils/types';
import closeImg from '@/../public/assets/close_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import menuImg from '@/../public/assets/menu_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import { formatToCustomDecimal } from '@/utils/formatToDecimal';
import { createNewProtocol } from '@/utils/generateProtocol';



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

export type personalDataForm={
    name:string,
    email:string,
    phone:string,
    birthday:string
}

export type financeDataForm={
    type: string,
    imobilleValue: string,
    financedValue: string,
    parcelnumber:string,
    amortization:string
}


const undefinedPersonalForm = {
    name : '',
    email : '',
    phone : '',
    birthday:''
}

const undefinedFinanceForm = {
    type: '',
    imobilleValue : '',
    financedValue : '',
    parcelnumber: '',
    amortization:''
}

export default function Simular(){
    const [personalInfoData,setPersonalInfoData] = useState<personalDataForm>(undefinedPersonalForm)
    const [financeInfoData,setFinanceInfoData] = useState<financeDataForm>(undefinedFinanceForm)
    const [prohibitedValue,setProhibitedValue] = useState('')
    const [count,setCount] = useState(0)
    const [search,setSearch] = useState('') 
    const [protocol,setProtocol] = useState('')
    const refSearch = useRef<HTMLDivElement>(null)
    const refInforForm = useRef<HTMLFormElement>(null)
    const refFinanceForm = useRef<HTMLFormElement>(null)
    const refFirstStepContainer = useRef<HTMLDivElement>(null)
    const refSecondStepContainer = useRef<HTMLDivElement>(null)
    const refSummary = useRef<HTMLDivElement>(null)
    const refContainer = useRef<HTMLElement>(null)
    const refSpan = useRef<HTMLSpanElement>(null)
    const refError = useRef<HTMLDivElement>(null)
    const refMenuContainer = useRef<HTMLDivElement>(null)
    const refMenu = useRef<HTMLUListElement>(null)
    const refContent = useRef<HTMLElement>(null)
    const refSucefullMsg = useRef<HTMLDivElement>(null)

    const { 
        register: registerPersonalInfos,
        handleSubmit: handlePersonalForm,
        setValue,
        formState: { errors:errorsPersonalForm }
    } = useForm<personalDataForm>({resolver:zodResolver(createPersonalDatasSchema)})


    const { 
        register: registerFinanceInfos,
        handleSubmit: handleFinanceForm,
        formState: { errors:errorsFinanceForm }
    } = useForm<financeDataForm>({resolver:zodResolver(createFinancementSchema)})


    useEffect(()=>{
        window.document.title = 'Simular'   
    })

    async function searchProcess(){
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL2}`
        const findInDb = await fetch(`${apiUrl}/process/${search}`)
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

    async function showSucefullMsg(){
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL2}`
        const newProtocol = createNewProtocol()
        setProtocol(newProtocol)

        const createNewProcess = await fetch(`${apiUrl}/process`,{
            method: 'POST',
            body:JSON.stringify(
                {
                   clientname: personalInfoData.name.replace(/^[A-Z\s]+$/, (match)=> match.toLowerCase().replace(/\b\w/g,(char)=>char.toUpperCase())),
                   clientbirthday: personalInfoData.birthday,
                   clientemail:personalInfoData.email,
                   clientphone: personalInfoData.phone,
                   consultantname: 'Luan Lopes da Silva',
                   consultantemail: 'lopesluan18@outlook.com',
                   consultantphone: '11959113040',
                   numberparcels: financeInfoData.parcelnumber,
                   amortization: financeInfoData.amortization,
                   protocol: newProtocol,
                   createdat: `${new Date()}`,
                   statusprocess: 'Sem consultor',
                   financementvalue: financeInfoData.financedValue,
                   prohibitedvalue: `${(Number(financeInfoData.imobilleValue)-Number(financeInfoData.financedValue))}`,
                   valueimobille: financeInfoData.imobilleValue, 
                }
            ),
            headers:{
                "Content-Type": "application/json"
            }   
        })

        console.log(createNewProcess)
        
        setTimeout(() => {
            if(refSucefullMsg.current){
                refSucefullMsg.current.style.display = 'block'
            }
        }, 2000);
    }

    async function searchInDb(name:string,email:string) {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}`
        try {
            const clientInDb = await fetch(`${apiUrl}/clients`)
            const converseDb:any[] = await clientInDb.json()
            const findClient = converseDb.filter(client=>client.clientname === name)
            const findClientEmail = findClient.filter(clientEmail=> clientEmail.clientemail === email)
            return findClientEmail.length
        } catch (error) {
            console.error('Erro na busca', error)
        }
    }

    async function createPersonalInfos(data:personalDataForm){
        const filterInDb = await searchInDb(data.name,data.email)
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}`
        try {
                if(filterInDb!==undefined && filterInDb> 0){
                    console.log('Não inserir no banco')
                }else{
                    const createNewClientInDb = await fetch(`${apiUrl}/client`,{
                        method: 'POST',
                        body:JSON.stringify(
                            
                            
                            {
                               clientname: data.name,
                               clientbirthday: data.birthday,
                               clientemail:data.email,
                               clientphone: data.phone,
                            }
                        ),
                            headers:{
                            "Content-Type": "application/json"
                            }
                        }) 
                            console.log('Client criado com sucesso' , createNewClientInDb)
                }
            
            if(refInforForm.current && refFinanceForm.current && refFirstStepContainer.current && refSecondStepContainer.current){
                refInforForm.current.style.display = 'none'
                refFinanceForm.current.style.display = 'block'
                const p = refFirstStepContainer.current.querySelector('p')
                const span = refFirstStepContainer.current.querySelector('span')
                const div = refFirstStepContainer.current.querySelector('div')
                const secondP = refSecondStepContainer.current.querySelector('p')
                const secondSpan = refSecondStepContainer.current.querySelector('span')
                const secondDiv = refSecondStepContainer.current.querySelector('div')
                
                if(p && span && div && secondP && secondSpan && secondDiv){
                    div.style.borderColor = '#868686'
                    p.style.color = '#868686'
                    span.style.color = '#868686'
    
                    secondDiv.style.borderColor = '#028DA5'
                    secondP.style.color = '#028DA5'
                    secondSpan.style.color = '#028DA5'
                }
                setPersonalInfoData(data)
            }
        } catch (error) {
            console.error('Erro na criação do cliente', error)
        }
      }

      async function createAndSavePDF(){
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL3}`
        const formatImobilleValue = financeInfoData.imobilleValue.replace('.','')
        const formatImobilleValue2 = formatImobilleValue.replace(',','')
        const formatFinancementValue = financeInfoData.financedValue.replace(',','')
        const formatFinancementValue2 = formatFinancementValue.replace('.','')
        const expanseValue = (5*Number(formatImobilleValue2))/100
        window.open(`${apiUrl}?imobillevalue=${Number(financeInfoData.imobilleValue)}&financementvalue=${formatFinancementValue2}&parcels=${Number(financeInfoData.parcelnumber)}&expanse=${expanseValue}&amortization=${financeInfoData.amortization}`, '_blank')
      }


      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const changeInputFormat = (event: { target: { name: any; value: any } }) => {
        const { name, value } = event.target;
      
        const formattedValue = formatToCustomDecimal(value);
        setValue(name, formattedValue, { shouldValidate: true });
      };
      
      async function createFinanceInfos(data:financeDataForm){
        if(refSummary.current){
            refSummary.current.style.display = 'block'
            const prohibited = Number(data.imobilleValue)-Number(data.financedValue)
            setProhibitedValue(formatToCustomDecimal(`${prohibited}`))   
        }
        setFinanceInfoData(data)
      }

      function backStepForm(){
        if(refInforForm.current && refFinanceForm.current && refFirstStepContainer.current && refSecondStepContainer.current){
            refInforForm.current.style.display = 'block'
            refFinanceForm.current.style.display = 'none'

            const button = refInforForm.current.querySelector('button')
            const p = refFirstStepContainer.current.querySelector('p')
            const span = refFirstStepContainer.current.querySelector('span')
            const div = refFirstStepContainer.current.querySelector('div')
            const secondP = refSecondStepContainer.current.querySelector('p')
            const secondSpan = refSecondStepContainer.current.querySelector('span')
            const secondDiv = refSecondStepContainer.current.querySelector('div')
            
            if(p && span && div && secondP && secondSpan && secondDiv && button){
                button.disabled = true
                button.removeEventListener('click', backStepForm)
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

            <div style={{display:"none", position:"absolute", top:"50%"}} ref={refSucefullMsg}>
                <p>
                Parabens seu processo foi criado com sucesso, 
                agora fique atento a seu email e guarde seu numero de protocolo para que possa acompanha-lo.
                Protocolo {protocol}
                </p>
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
                    <div ref={refFirstStepContainer}>
                    <div className={style.circle}><span>1</span></div>
                    <p>Dados de financiamento</p>
                    </div>

                    <div ref={refSecondStepContainer}>
                        <div className={style.circle}>
                        <span>2</span>
                        </div>
                    <p>Dados pessoais</p>
                    </div>
                </div>

                
                <form className={style.firstForm} onSubmit={handlePersonalForm(createPersonalInfos)} ref={refInforForm}>
                    <label htmlFor="name">Nome</label>
                    {errorsPersonalForm.name && <span>{errorsPersonalForm.name.message}</span>}
                    <input type="text" {...registerPersonalInfos("name")}/>
                    <label htmlFor="">Data de nascimento</label>
                    {errorsPersonalForm.birthday && <span>{errorsPersonalForm.birthday.message}</span>}
                    <input type="text" {...registerPersonalInfos("birthday")} />
                    <label htmlFor="email">Email</label>
                    {errorsPersonalForm.email && <span>{errorsPersonalForm.email.message}</span>}
                    <input type="text" {...registerPersonalInfos(("email"))}/>
                    <label htmlFor="">Telefone</label>
                    {errorsPersonalForm.phone && <span>{errorsPersonalForm.phone.message}</span>}
                    <input type="text" {...registerPersonalInfos("phone")} />
                    
                    <div>
                        <button disabled={true}>Voltar</button>
                        <button>Avançar</button>
                    </div>
                </form>

                <form className={style.secondForm} onSubmit={handleFinanceForm(createFinanceInfos)} ref={refFinanceForm}>
                    <label htmlFor="">Tipo de financiamento desejado</label>
                    {errorsFinanceForm.type && <span>{errorsFinanceForm.type.message}</span>}
                    <select {...registerFinanceInfos("type")}>
                        <option value="">Selecione um metodo de financiamento</option>
                        <option value="Financiamento imobililiario">Financiamento imobiliario</option>
                        <option value="Crédito com garantia">Crédito com garantia de imovel</option>
                    </select>
                    <label htmlFor="imobilleValue">Valor do imovel desejado</label>
                    {errorsFinanceForm.imobilleValue && <span>{errorsFinanceForm.imobilleValue.message}</span>}
                    <input type="text"  {...registerFinanceInfos("imobilleValue")} onChange={ev=>formatToCustomDecimal(ev.currentTarget.value)} name='imobilleValue'/>
                    <label htmlFor="financedValue">Valor a ser financiado</label>
                    {errorsFinanceForm.financedValue && <span>{errorsFinanceForm.financedValue.message}</span>}
                    <input type="text" {...registerFinanceInfos("financedValue")} onChange={changeInputFormat} name='financedValue'/>
                    <label htmlFor='parcelnumber'>Numero de parcelas</label>
                    {errorsFinanceForm.parcelnumber && <span>{errorsFinanceForm.parcelnumber.message}</span>}
                    <input type="text" {...registerFinanceInfos("parcelnumber")} name='parcelnumber'/>
                    <label htmlFor=''>Amortização</label>
                    {errorsFinanceForm.amortization && <span>{errorsFinanceForm.amortization.message}</span>}
                    <input type="text" {...registerFinanceInfos("amortization")}/>
                    <div>
                        <button onClick={backStepForm}>Voltar</button>
                        <button>Avançar</button>
                    </div>
                </form>


              

                <article className={style.summary} ref={refSummary}>
                    <button onClick={showSucefullMsg}>Dar inicio a processo de financiamento</button>
                    <h3>Resumo</h3>
                        <div className={style.infos}>
                         <p>Valor do imóvel: {formatToCustomDecimal(financeInfoData.imobilleValue)}</p>
                         <p>Valor financiado: {formatToCustomDecimal(financeInfoData.financedValue)}</p>
                         <p>Valor de entrada: {prohibitedValue}</p>
                         <p>Primeira parcela: </p>
                         <p>Ultima parcela: </p>
                        </div>
                    <button onClick={createAndSavePDF}>Receber simulação</button>
                </article>
            </section>

           
        </main>
        </div>

    )
}