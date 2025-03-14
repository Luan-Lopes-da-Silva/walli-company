'use client'

import { useRef, useState } from "react"
import style from './test.module.scss'
import {maskitoTransform} from '@maskito/core'
import {maskitoNumberOptionsGenerator} from '@maskito/kit'

export default function TestPrice(){
    const [financementValue,setFinancementValue] = useState('')
    const [imobilleValue,setImobilleValue] = useState('')
    const [parcelsValue,setParcelsValue] = useState('')
    const refPdf = useRef<HTMLDivElement>(null)

    const maskitoOptions = maskitoNumberOptionsGenerator({
        thousandSeparator:'.'
    })

    function calcularTabelaPrice(valorFinanciado:number, taxaJurosAnual:number, prazo:number) {
        const taxaJurosMensal = (taxaJurosAnual / 100) / 12;
        const numeroParcelas = prazo;
        
        const parcela = valorFinanciado * (taxaJurosMensal * Math.pow(1 + taxaJurosMensal, numeroParcelas)) / 
                        (Math.pow(1 + taxaJurosMensal, numeroParcelas) - 1);
    
        let saldoDevedor = valorFinanciado;
        const tabela = [];
    
        for (let i = 1; i <= numeroParcelas; i++) {
            const juros = saldoDevedor * taxaJurosMensal;
            const amortizacao = parcela - juros;
            saldoDevedor -= amortizacao;
    
            tabela.push({
                parcela: i,
                valorParcela:parcela.toFixed(3),
                juros: juros.toFixed(3),
                amortizacao: amortizacao.toFixed(3),
                saldoDevedor: saldoDevedor.toFixed(5)
            });
        }
    
        return tabela;
    }
        
    
    function createPDF(){
        const taxValue = 11.90
        const fixFinancementValue = financementValue.replace(',','')
        console.log(fixFinancementValue)
        const financiamento = calcularTabelaPrice(Number(fixFinancementValue), taxValue, Number(parcelsValue)); 
        if(refPdf.current){
            for(let i=0; i<Number(parcelsValue);i++){
                const tr = document.createElement('tr')
                const tdParcel = document.createElement('td')
                tdParcel.innerText = `${i}`
                const tdParcelValue = document.createElement('td')
                tdParcelValue.innerText = `${financiamento[i].valorParcela}`
                const tdTaxValue = document.createElement('td')
                tdTaxValue.innerText = `${financiamento[i].juros}`
                const tdAmortizationValue = document.createElement('td')
                tdAmortizationValue.innerText = `${financiamento[i].amortizacao}`
                const tdDueBalance = document.createElement('td')
                tdDueBalance.innerText = `${financiamento[i].saldoDevedor}`

                tr.append(tdParcel,tdParcelValue,tdTaxValue,tdAmortizationValue,tdDueBalance)
                refPdf.current.append(tr)
            }
        }
    }


    return(
        <>
        <label htmlFor="">Valor do imovel</label>
        <input 
        type="text" 
        value={imobilleValue}
        onChange={(ev)=>setImobilleValue(maskitoTransform(ev.currentTarget.value,maskitoOptions))}
        />
        <label htmlFor="">Valor de financiamento</label>
        <input 
        type="text" 
        value={financementValue}
        onChange={(ev)=>setFinancementValue(maskitoTransform(ev.currentTarget.value,maskitoOptions))}
        />
        <label htmlFor="">Parcelas</label>
        <input 
        type="text" 
        value={parcelsValue}
        onChange={(ev)=>setParcelsValue(ev.currentTarget.value)}
        />
        <button onClick={createPDF}>Simular</button>

        <div className={style.container}>
            <table>
                <tr>
                    <th>
                            <td>Numero da parcela</td>
                            <td>Valor da parcela</td>
                            <td>Juros</td>
                            <td>Amortização</td>
                            <td>Saldo devedor</td>
                    </th>
                </tr>

                <div ref={refPdf} className={style.refInsert}>

                </div>
            </table>
        </div>
        </>
    )
}