import style from './pdftemplate.module.scss'

export default function PDFTEMPLATE(){
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
                            <td>R$ 0,00</td>
                            <td>R$ 0,00</td>
                            <td>R$ 0,00</td>
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
                        <div>
                            <tr>
                                <th>Taxa juros (nominal juros a.a)</th>
                                <th>Taxa juros (efetiva a.a)</th>
                                <th>CET - Anual</th>
                            </tr>
                        </div>
                        
                        <div>
                            <tr>
                                <td>R$ 0,00</td>
                                <td>R$ 0,00</td>
                                <td>R$ 0,00</td>
                            </tr>
                        </div>
                    </table>
                    
                    <table>
                        <div>
                            <tr>
                                <th>Renda informada</th>
                                <th>Prazo (meses)</th>
                                <th>Sistema amortização</th>
                            </tr>
                        </div>
                        <div>
                            <tr>
                                <td>R$ 0,00</td>
                                <td>R$ 0,00</td>
                                <td>R$ 0,00</td>
                            </tr>
                        </div>
                    </table>
                
                    <table>
                        <tr>
                            <th>Seguradora</th>
                            <th>Data da simulação</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </section>
            </section>
        </main>
    )
}