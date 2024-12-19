'use client'
import Link from 'next/link'
import style from './simular.module.scss'
import {  useForm } from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import {useEffect, useRef, useState } from 'react'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


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

    const refFirstForm = useRef<HTMLFormElement>(null)
    const refPDF = useRef<HTMLDivElement>(null)
    const refSecondForm = useRef<HTMLFormElement>(null)
    const refFirstStep = useRef<HTMLDivElement>(null)
    const refSecondStep = useRef<HTMLDivElement>(null)
    const refSummary = useRef<HTMLDivElement>(null)
    const refModal = useRef<HTMLDivElement>(null)
    const refContainer = useRef<HTMLElement>(null)
    const refTable = useRef<HTMLTableElement>(null)
    const [houseValue,setHouseValue] = useState('')
    const [financementValue,setFinancementValue] = useState('')
    const [prohibitedValue,setProhibitedValue] = useState('')
    const [parcelNumber,setParcelNumber] = useState('')
    const [amortization,setAmortization] = useState('')

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

    async function openModal(){
        if(refModal.current && refContainer.current){
            refModal.current.style.display = 'block'
            refContainer.current.style.filter = 'blur(5px)'
            refModal.current.focus()
        }


        const converseImobileValue = firstFormDatas.imobilleValue.replace(/\D/g,"")
        const converseFinancedValue = firstFormDatas.financedValue.replace(/\D/g,"")
        const prohibitedValueConverse = Number(converseImobileValue) - Number(converseFinancedValue)
        const newProtocol = generateProtocol()

        const createNewProcess = await fetch('https://walli-processdb.onrender.com/process',{
            method: 'POST',
            body:JSON.stringify(
                {
                   clientname: secondFormDatas.name,
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

        setTimeout(() => {
            alert('Processo criado com sucesso')
        }, 1000);
        console.log(createNewProcess)
    }

    function closeModal(){
        if(refModal.current && refContainer.current){
            refModal.current.style.display = 'none'
            refContainer.current.style.filter = 'none'
        }
    }


    function onSubmit(data:firstFormData){
        if(refFirstForm.current && refSecondForm.current && refFirstStep && refSecondStep){
            refFirstForm.current.style.display = 'none'
            refSecondForm.current.style.display = 'block'

            const refFirstStepDiv = refFirstStep
            const firstSpan = refFirstStepDiv.current?.querySelector('span')
            const firstP = refFirstStepDiv.current?.querySelector('p')
            const refSecondStepDiv = refSecondStep
            const secondSpan = refSecondStepDiv.current?.querySelector('span')
            const secondP = refSecondStepDiv.current?.querySelector('p')

            if(firstSpan && secondSpan && firstP && secondP){
                firstSpan.style.borderColor = '#1A484E'
                firstSpan.style.color = '#1A484E'
                firstP.style.color = '#1A484E'
                secondSpan.style.borderColor = '#FFFFFF'
                secondSpan.style.color = '#FFFFFF'
                secondP.style.color = '#FFFFFF'
            }

            setFirstFormDatas(data)
        }

        console.log(parcelNumber)
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
      }

    


      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleInputChange = (event: { target: { name: any; value: any } }) => {
        const { name, value } = event.target;
      
        const formattedValue = formatToCustomDecimal(value);
        setValue(name, formattedValue, { shouldValidate: true });
      };
      
      async function onSubmitSecondForm(data:secondFormData){
        setSecondFormDatas(data)
        if(refSummary.current && refPDF.current && refTable.current){
            refPDF.current.style.display = 'block'
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
        if(refFirstForm.current && refSecondForm.current && refFirstStep && refSecondStep){
            refFirstForm.current.style.display = 'block'
            refSecondForm.current.style.display = 'none'

            const refFirstStepDiv = refFirstStep
            const firstSpan = refFirstStepDiv.current?.querySelector('span')
            const firstP = refFirstStepDiv.current?.querySelector('p')
            const refSecondStepDiv = refSecondStep
            const secondSpan = refSecondStepDiv.current?.querySelector('span')
            const secondP = refSecondStepDiv.current?.querySelector('p')

            if(firstSpan && secondSpan && firstP && secondP){
                firstSpan.style.borderColor = '#FFFFFF'
                firstSpan.style.color = '#FFFFFF'
                firstP.style.color = '#FFFFFF'
                secondSpan.style.borderColor = '#1A484E'
                secondSpan.style.color = '#1A484E'
                secondP.style.color = '#1A484E'
            }
        }
      }


    return(
        <div className={style.box}>
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
            </header>

            <section className={style.content}>
                <h1>Simule seu financiamento</h1>
                <h2>Encontre a melhor opção para realizar o sonho da casa própria em poucas minutos</h2>
                <div className={style.steps}>
                    <div ref={refFirstStep}>
                    <span>1</span>
                    <p>Dados de financiamento</p>
                    </div>

                    <div ref={refSecondStep}>
                    <span>2</span>
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
                    <div style={{width:"100%",height:400,padding:40,display:'flex',alignItems:'center',justifyContent:'space-between',backgroundColor:'#CCD360'}}>
                    <span style={{textTransform:'uppercase',color:'#393738',
                        padding:'62px 24px',fontSize:48,backgroundColor:'#0091A4',borderRadius:'50%',border:8,borderColor:'#393738'}}>
                        Logo
                    </span>
                    <h1 style={{width:300,textAlign:'center',textTransform:'uppercase'}}>Sua simulação chegou</h1>
                    </div>
                    <div style={{padding:40,backgroundColor:'#393738',width:'100%'}}>
                        <div style={{color:'#FFFFFF',fontSize:24,display:'grid',gridTemplateColumns:'repeat(2,300px)',gap:20}}>
                            <div>
                                <p>Valor do imovel</p>
                                <p style={{color:'#CCD360'}}>{houseValue}</p>
                            </div>
                            <div>
                                <p>Valor de entrada</p>
                                <p style={{color:'#CCD360'}}>{prohibitedValue}</p>
                            </div>
                            <div>
                                <p>Numero de parcelas</p>
                                <p style={{color:'#CCD360'}}>{parcelNumber}</p>
                            </div>
                            <div>
                                <p>Tipo de amortização</p>
                                <p style={{color:'#CCD360'}}>{amortization}</p>
                            </div>
                        </div>

                        <table style={{marginTop:60,borderTop:'2px solid #CCD360'}} ref={refTable}>
                            <tbody>
                                <tr style={{color:'#FFF'}}>
                                    <th style={{fontSize:24, borderRight:'2px solid #CCD360',padding:24,textAlign:'center',borderBottom:'2px solid #CCD360',borderLeft:'2px solid #CCD360',}}>Numero da parcela</th>
                                    <th style={{fontSize:24, borderRight:'2px solid #CCD360',padding:24,textAlign:'center',borderBottom:'2px solid #CCD360'}}>Valor da parcela</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

           
        </main>
        <div className={style.modal} ref={refModal}>
                <button onClick={closeModal}>
                
                </button>
                <h1>Aviso importante</h1>
                <p>Olá, informamos que o seu processo foi entregue a um de nossos consultores. Em breve, ele entrará em contato com você para dar continuidade ao atendimento. Agradecemos pela confiança em nossos serviços e estamos a disposição para qualquer dúvida.</p>
        </div>
        </div>

    )
}