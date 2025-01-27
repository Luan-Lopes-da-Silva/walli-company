import style from './pdftemplate.module.scss'
import {PdfProps} from '@/utils/pdfProps'


export default function PDFTEMPLATE({financementValue,imobilleValue,prohibitedValue,parcels}:PdfProps){
    const items = []

    for(let i=0;i<parcels;i++){
        items.push(
            <tr key={i}>
                <div>
                    <td>{i}</td>
                    <td>R$ 0,00</td>
                    <td>R$ 0,00</td>
                    <td>R$ 0,00</td>
                    <td>R$ 0,00</td>
                    <td>R$ 0,00</td>
                    <td>R$ {(financementValue/parcels).toFixed(2)}</td>
                    <td>R$ 0,00</td>
                </div>
            </tr>
        )
    }
    return(
        <main className={style.container}>
            <section className={style.summary}>
                <section>
                <table>
                    <tr>
                        <div>
                            <th>Valor do imóvel</th>
                            <th>Valor da entrada</th>
                            <th>Valor financiado</th>
                        </div>
                    </tr>
                    <tr>
                        <div>
                            <td>R$ {financementValue},00</td>
                            <td>R$ {imobilleValue},00</td>
                            <td>R$ {prohibitedValue},00</td>
                        </div>
                    </tr>
                </table>
                
                <table>
                    <tr>
                        <div>
                            <th>Despesas</th>
                            <th>Vistoria</th>
                            <th>IOF</th>
                        </div>
                    </tr>
                   
                    
                    <tr>
                        <div>
                            <td>R$ 0,00</td>
                            <td>R$ 0,00</td>
                            <td>R$ 0,00</td>
                        </div>
                    </tr>
                </table>
                <table>
                        <tr>
                            <div>
                                <th>Tipo de imóvel</th>
                            </div>
                        </tr>
                        
                        <tr>
                            <div>
                                <td>R$ 0,00</td>
                            </div>
                        </tr>
                </table>
                </section>
            
                <section>
                    <table>

                            <tr>
                                <div>
                                    <th>Taxa juros (nominal juros a.a)</th>
                                    <th>Taxa juros (efetiva a.a)</th>
                                    <th>CET - Anual</th>
                                </div>
                            </tr>
                       
                            <tr>
                                <div>
                                    <td>R$ 0,00</td>
                                    <td>R$ 0,00</td>
                                    <td>R$ 0,00</td>
                                </div>
                            </tr>
                    </table>
                    
                    <table>
                        
                            <tr>
                                <div>
                                    <th>Renda informada</th>
                                    <th>Prazo (meses)</th>
                                    <th>Sistema amortização</th>
                                </div>
                            </tr>
                            
                            <tr>
                               <div>
                                    <td>R$ 0,00</td>
                                    <td>R$ 0,00</td>
                                    <td>R$ 0,00</td>
                               </div>
                            </tr>
                    </table>
                
                    <table>
                        <tr>
                            <div>
                                <th>Seguradora</th>
                                <th>Data da simulação</th>
                            </div>
                        </tr>
                        <tr>
                            <div>
                                <td>0,00</td>
                                <td>0,00</td>
                            </div>
                        </tr>
                    </table>
                </section>
            </section>
            <section className={style.tableAmortization}>
                <h1>Parcelas</h1>
                <table>
                    <tr>
                        <div>
                            <td>Parcela</td>
                            <td>Amortização</td>
                            <td>Juros</td>
                            <td>Seguro MIP</td>
                            <td>Seguro DFI</td>
                            <td>TSA</td>
                            <td>Valor parcela</td>
                            <td>Saldo devedor</td>
                        </div>
                    </tr>
                    {items}
                </table>
            </section>
        </main>
    )
}