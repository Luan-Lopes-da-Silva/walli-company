'use client'
import style from './simular.module.scss'
import {  useForm } from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import {useEffect, useRef, useState } from 'react'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import forwardSvg from '@/../public/assets/Vector.svg'
import backSvg from '@/../public/assets/Vector-1.svg'
import backActiveSvg from '@/../public/assets/Vector2.svg'
import Image from 'next/image'
import Link from 'next/link';
import { Financement } from '@/utils/types';
import closeImg from '@/../public/assets/close_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'


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
    type: string,
    imobilleValue: string,
    financedValue: string,
    parcelnumber:string,
    amortization:string
}

export type secondFormData={
    name:string,
    email:string,
    phone:string,
    birthday:string
}


const undefinedForm = {
    type: '',
    imobilleValue : '',
    financedValue : '',
    parcelnumber: '',
    amortization:''
}

const undefinedSecondForm = {
    name : '',
    email : '',
    phone : '',
    birthday:''
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

    
    const [firstFormDatas,setFirstFormDatas] = useState<firstFormData>(undefinedForm)
    const [secondFormDatas,setSecondFormDatas] = useState<secondFormData>(undefinedSecondForm)

    const { 
        register: registerFirst,
        handleSubmit: handleFirst,
        setValue,
        formState: { errors:errorsFirst }
    } = useForm<firstFormData>({resolver:zodResolver(createFinancementSchema)})


    const { 
        register: registerSecond,
        handleSubmit: handleSecond,
        formState: { errors:errorsSecond }
    } = useForm<secondFormData>({resolver:zodResolver(createPersonalDatasSchema)})

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

    function backStepModal(){
        setCount(0)
        if(refFirstStepCircle.current && refSecondStepCircle.current && refText.current && refBackStepImg.current && refNextStepImg.current ){
            refFirstStepCircle.current.style.backgroundColor = '#0091A4'
            refSecondStepCircle.current.style.backgroundColor = 'transparent'
            refText.current.innerText = 'Obrigado por escolher a [nome da empresa] como sua parceira no processo de financiamento imobiliário! Estamos comprometidos em ajudá-lo a realizar o sonho da casa própria, oferecendo um atendimento personalizado e soluções que atendam às suas necessidades. Se precisar de qualquer suporte ou informação adicional, não hesite em entrar em contato conosco. Juntos, faremos desse momento uma conquista memorável!.'
            refNextStepImg.current.addEventListener('click', nextStep)
            refBackStepImg.current.src = backSvg.src
        }
    }

    async function openModal(){
        const converseImobileValue = firstFormDatas.imobilleValue.replace(/\D/g,"")
        const converseFinancedValue = firstFormDatas.financedValue.replace(/\D/g,"")
        const prohibitedValueConverse = Number(converseImobileValue) - Number(converseFinancedValue)
        const newProtocol = generateProtocol()
        setProtocol(newProtocol)

        if(refFirstStepCircle.current){
            refFirstStepCircle.current.style.backgroundColor = '#0091A4'  
        }

        const createNewProcess = await fetch('https://walli-processdb.onrender.com/process',{
            method: 'POST',
            body:JSON.stringify(
                {
                   clientname: secondFormDatas.name.replace(/^[A-Z\s]+$/, (match)=> match.toLowerCase().replace(/\b\w/g,(char)=>char.toUpperCase())),
                   clientbirthday: secondFormDatas.birthday,
                   clientemail:secondFormDatas.email,
                   clientphone: secondFormDatas.phone,
                   consultantname: '',
                   consultantemail: '',
                   consultantphone: '',
                   numberparcels: firstFormDatas.parcelnumber,
                   amortization: firstFormDatas.amortization,
                   protocol: newProtocol,
                   createdat: `${new Date()}`,
                   statusprocess: 'Sem consultor',
                   financementvalue: firstFormDatas.financedValue,
                   prohibitedvalue: `${prohibitedValueConverse}`,
                   valueimobille: firstFormDatas.imobilleValue, 
                }
            ),
            headers:{
                "Content-Type": "application/json"
            }   
        })
        
        if(refLoading.current && refModal.current){
            if(createNewProcess.status!==201){
                refLoading.current.style.display = 'block'
            }else{
                refLoading.current.style.display = 'none'
                refModal.current.style.display = 'block'
                refModal.current.focus()
            }
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
        if(refLoading.current && refContainer.current){
            refLoading.current.style.display='block'
            refContainer.current.style.filter='brightness(40%)'
        }
        try {
            if(refPDF.current){
                const element = refPDF.current
                
                const canvas = await html2canvas(element,{scale:1})
                const imgData = canvas.toDataURL("image/jpeg", 1)
    
               const pdf = new jsPDF("p", "mm", "a4")
               
               const pdfWidth = pdf.internal.pageSize.getWidth()
               console.log(pdfWidth)
               const imgWidth = pdfWidth
               const pageHeight = 297
               const imgHeight = (canvas.height * imgWidth) / canvas.width
    
               let position = 0
    
               pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight)
                if(imgHeight>pageHeight){
                    let heightLeft = imgHeight - pageHeight
                    while(heightLeft>0){
                        position = heightLeft - imgHeight
                        pdf.addPage()
                        pdf.addImage(imgData, "JPEG",0, position, imgWidth, imgHeight)
                        heightLeft -= pageHeight
                    }
                }
                pdf.save("simulation.pdf")
            }
        } catch (error) {
            console.log(error)
        }finally{
            if(refLoading.current && refContainer.current){
                refLoading.current.style.display='none'
                refContainer.current.style.filter='brightness(100%)'
            }
        }
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
            setHouseValue(firstFormDatas.imobilleValue)
            setFinancementValue(firstFormDatas.financedValue)
            setParcelNumber(firstFormDatas.parcelnumber)
            setAmortization(firstFormDatas.amortization)
            const formatFinanceValue = firstFormDatas.financedValue.replace(/\D/g, "")
            const formatImobilleValue = firstFormDatas.imobilleValue.replace(/\D/g, "")
            const prohibited = Number(formatFinanceValue)-Number(formatImobilleValue)
            setProhibitedValue(formatToCustomDecimal(`${prohibited}`))    
            const parcelValue = `${Number(formatFinanceValue)/Number(firstFormDatas.parcelnumber)}`
            for(let i=0; i<Number(firstFormDatas.parcelnumber);i++){
                const rowParcelNumber = document.createElement('tr')
                const createTd = document.createElement('td')
                const parcelValueTd = document.createElement('td')
                createTd.style.textAlign ='center'
                createTd.style.fontSize='24px'
                createTd.style.padding='24px'
                createTd.style.color='#FFF'
                createTd.style.borderBottom = '2px solid #CCD360'
                createTd.style.borderLeft = '2px solid #CCD360'
                createTd.style.borderRight = '2px solid #CCD360'
                createTd.innerText = `${i}`
                parcelValueTd.style.textAlign ='center'
                parcelValueTd.style.fontSize='24px'
                parcelValueTd.style.padding='24px'
                parcelValueTd.style.color='#FFF'
                parcelValueTd.style.borderBottom = '2px solid #CCD360'
                parcelValueTd.style.borderRight = '2px solid #CCD360'
                parcelValueTd.innerText = `${formatToCustomDecimal(parcelValue)}`
                rowParcelNumber.append(createTd,parcelValueTd)
                refTable.current.append(rowParcelNumber)
            }
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
            
            <section className={style.content}>
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

                <form className={style.firstForm} onSubmit={handleFirst((ev)=>onSubmit(ev))} ref={refFirstForm}>
                    <label htmlFor="">Tipo de financiamento desejado</label>
                    {errorsFirst.type && <span>{errorsFirst.type.message}</span>}
                    <select {...registerFirst("type")}>
                        <option value="">Selecione um metodo de financiamento</option>
                        <option value="Financiamento imobililiario">Financiamento imobiliario</option>
                        <option value="Crédito com garantia">Crédito com garantia de imovel</option>
                    </select>
                    <label htmlFor="imobilleValue">Valor do imovel desejado</label>
                    {errorsFirst.imobilleValue && <span>{errorsFirst.imobilleValue.message}</span>}
                    <input type="text"  {...registerFirst("imobilleValue")} onChange={handleInputChange} name='imobilleValue'/>
                    <label htmlFor="financedValue">Valor a ser financiado</label>
                    {errorsFirst.financedValue && <span>{errorsFirst.financedValue.message}</span>}
                    <input type="text" {...registerFirst("financedValue")} onChange={handleInputChange} name='financedValue'/>
                    <label htmlFor='parcelnumber'>Numero de parcelas</label>
                    {errorsFirst.parcelnumber && <span>{errorsFirst.parcelnumber.message}</span>}
                    <input type="text" {...registerFirst("parcelnumber")} name='parcelnumber'/>
                    <label htmlFor=''>Amortização</label>
                    {errorsFirst.amortization && <span>{errorsFirst.amortization.message}</span>}
                    <input type="text" {...registerFirst("amortization")}/>
                    <div>
                        <button disabled>Voltar</button>
                        <button>Avançar</button>
                    </div>
                </form>

                <form className={style.secondForm} onSubmit={handleSecond(onSubmitSecondForm)} ref={refSecondForm}>
                    <label htmlFor="name">Nome</label>
                    {errorsSecond.name && <span>{errorsSecond.name.message}</span>}
                    <input type="text" {...registerSecond("name")}/>
                    <label htmlFor="email">Email</label>
                    {errorsSecond.email && <span>{errorsSecond.email.message}</span>}
                    <input type="text" {...registerSecond(("email"))}/>
                    <label htmlFor="">Telefone</label>
                    {errorsSecond.phone && <span>{errorsSecond.phone.message}</span>}
                    <input type="text" {...registerSecond("phone")} />
                    <label htmlFor="">Data de nascimento</label>
                    {errorsSecond.birthday && <span>{errorsSecond.birthday.message}</span>}
                    <input type="text" {...registerSecond("birthday")} />
                    <div>
                        <button onClick={(ev)=>{
                            ev.preventDefault()
                            backStep()
                            }}>Voltar</button>
                        <button>Avançar</button>
                    </div>
                </form>

              

                <article className={style.summary} ref={refSummary}>
                    <button onClick={openModal}>Dar inicio a processo de financiamento</button>
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
        <div className={style.modal} ref={refModal}>
                     <p ref={refText}>Obrigado por escolher a [nome da empresa] como sua parceira no processo de financiamento imobiliário! Estamos comprometidos em ajudá-lo a realizar o sonho da casa própria, oferecendo um atendimento personalizado e soluções que atendam às suas necessidades. Se precisar de qualquer suporte ou informação adicional, não hesite em entrar em contato conosco. Juntos, faremos desse momento uma conquista memorável!</p>
                   <div>
                     <Image
                    width={60}
                    height={60}
                    alt='Back svg'
                    src={backSvg}
                    className={style.backStep}
                    onClick={backStepModal}
                    ref={refBackStepImg}
                    />
                    <Image
                    width={60}
                    height={60}
                    alt='Forward svg'
                    src={forwardSvg}
                    className={style.forwardStep}
                    onClick={nextStep}
                    ref={refNextStepImg}
                    />
                   </div>

                    <div className={style.steps}>
                        <div className={style.step} ref={refFirstStepCircle}></div>
                        <div className={style.step} ref={refSecondStepCircle}></div>
                    </div>
        </div>

        <div className={style.loading} ref={refLoading}>
            <p>Baixando a sua simulação</p>
            <div className={style.ldsRoller} ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        </div>

    )
}