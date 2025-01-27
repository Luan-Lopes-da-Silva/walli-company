import style from './pdftemplate.module.scss'
import {PdfProps} from '@/utils/pdfProps'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },

    container: {
      width:'100%',
      height:'100%',
      backgroundColor:'#868686',
      padding:'60px 20px'
    },
    summary:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        flexWrap:'wrap',
        gap:'24px'
    },

    section:{
        display:'flex',
        gap:'62px'
    },
    table: {
        margin:'20px 0px',
    },
    firstTrDiv:{
        padding: '16px',
        width: '300px',
        backgroundColor:'#D3D664',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection:'row'
    },
    secondTrDiv:{
        marginTop: '-2px',
        padding: '16px',
        width: '300px',
        backgroundColor: '#028DA5',
        display: 'flex',
        justifyContent: 'space-between',
        textAlign: 'center',
        flexDirection:'row'
    },

    tableAmortization:{
        marginTop:60
    },
    thText:{
        fontSize:12
    },
    thTextAlternative:{
        fontSize:12,
        width:80,
        textAlign:"center"
    },
    firstTrDivAlternative:{
        padding: '16px',
        width: '100%',
        backgroundColor:'#D3D664',
        display: 'flex',
        justifyContent: 'center',
        flexDirection:'row'
    },
    secondTrDivAlternative:{
        padding: '16px',
        width: '100%',
        backgroundColor:'#028DA5',
        display: 'flex',
        justifyContent: 'center',
        flexDirection:'row'
    },
    firstTrDivAmortization:{
        padding: '16px',
        width: '100%',
        backgroundColor:'#D3D664',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection:'row'
    },
    secondTrDivAmortization:{
        padding: '16px',
        width: '100%',
        backgroundColor:'#028DA5',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection:'row'
    },
    
  });

export function PDFTemplate({financementValue,imobilleValue,parcels}:PdfProps){
    const items = []
    const finalArray:any[] = []
    const arrayDueBalance:any[] = []
    const now = new Date()
    const month = `${now.getMonth()}`
    let formatDate = ''
    if(month.length<2){
       formatDate = `${now.getDate()}/0${now.getMonth()+1}/${now.getFullYear()}`
    }else{
        formatDate = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`
    }

       


    for (let i=0;i<parcels;i++) {
        finalArray.push((financementValue/parcels))
    }

    const reduceDueBalance = finalArray.reduce((acc,cur)=>{
        arrayDueBalance.push(Number(acc).toFixed(2))
        return acc-cur
    },financementValue)


    for(let i=0;i<parcels;i++){
        items.push(
            <View key={i}>
                    <View style={styles.secondTrDivAmortization}>
                    <Text style={styles.thText}>{i}</Text>
                    <Text style={styles.thText}>R$ 0,00</Text>
                    <Text style={styles.thText}>R$ 0,00</Text>
                    <Text style={styles.thText}>R$ 0,00</Text>
                    <Text style={styles.thText}>R$ 0,00</Text>
                    <Text style={styles.thText}>R$ 0,00</Text>
                    <Text style={styles.thText}>R$ {(financementValue/parcels).toFixed(2)}</Text>
                    <Text style={styles.thText}>R$ {arrayDueBalance[i]}</Text>
                    </View>
            </View>
        )

        
    }
    return(
        <Document>
            <Page size={"A3"} style={styles.page}>
                <View style={styles.container}>
                <main className={style.container}>
            <View style={styles.summary}>
                    <View style={styles.section}>
                    <View style={styles.table}>
                    <View>
                        <View style={styles.firstTrDiv}>
                            <Text style={styles.thText}>Valor do imóvel</Text>
                            <Text style={styles.thText}>Valor da entrada</Text>
                            <Text style={styles.thText}>Valor financiado</Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.secondTrDiv}>
                            <Text style={styles.thText}>R$ {imobilleValue},00</Text>
                            <Text style={styles.thText}>R$ {imobilleValue-financementValue},00</Text>
                            <Text style={styles.thText}>R$ {financementValue},00</Text>
                        </View>
                    </View>
                </View>
                    </View>
                
                <View style={styles.section}>
                <View style={styles.table}>
                    <View>
                        <View style={styles.firstTrDiv}>
                            <Text style={styles.thText}>Despesas</Text>
                            <Text style={styles.thText}>Vistoria</Text>
                            <Text style={styles.thText}>IOF</Text>
                        </View>
                    </View>
                   
                    
                    <View>
                        <View style={styles.secondTrDiv}>
                            <Text style={styles.thText}>R$ 0,00</Text>
                            <Text style={styles.thText}>R$ 0,00</Text>
                            <Text style={styles.thText}>R$ 0,00</Text>
                        </View>
                    </View>
                </View>
                </View>

               <View style={styles.section}>
               <View style={styles.table}>
                        <View>
                            <View style={styles.firstTrDivAlternative}> 
                                <Text style={styles.thText}>Tipo de imóvel</Text>
                            </View>
                        </View>
                        
                        <View>
                            <View style={styles.secondTrDivAlternative}>
                                <Text style={styles.thText}>Residencial</Text>
                            </View>
                        </View>
                </View>
               </View>
                
            
                <View style={styles.section}>
                    
                <View style={styles.table}>
                            <View>
                                <View style={styles.firstTrDiv}>
                                    <Text style={styles.thTextAlternative}>Taxa juros (nominal juros a.a)</Text>
                                    <Text style={styles.thTextAlternative}>Taxa juros (efetiva a.a)</Text>
                                    <Text style={styles.thTextAlternative}>CET - Anual</Text>
                                </View>
                            </View>
                       
                            <View>
                                <View style={styles.secondTrDiv}>
                                    <Text style={styles.thText}>R$ 0,00</Text>
                                    <Text style={styles.thText}>R$ 0,00</Text>
                                    <Text style={styles.thText}>R$ 0,00</Text>
                                </View>
                            </View>
                    </View>
                </View>
                    
                 <View style={styles.section}>
                 <View style={styles.table}>
                        
                        <View>
                            <View style={styles.firstTrDiv}>
                                <Text style={styles.thText}>Renda informada</Text>
                                <Text style={styles.thTextAlternative}>Prazo (meses)</Text>
                                <Text style={styles.thText}>Sistema amortização</Text>
                            </View>
                        </View>
                        
                        <View>
                           <View style={styles.secondTrDiv}>
                                <Text style={styles.thText}>R$ 0,00</Text>
                                <Text style={styles.thText}>{parcels}</Text>
                                <Text style={styles.thText}>R$ 0,00</Text>
                           </View>
                        </View>
                </View>
                 </View>
                
                  <View style={styles.section}>
                  <View style={styles.table}>
                        <View>
                            <View style={styles.firstTrDiv}>
                                <Text style={styles.thText}>Seguradora</Text>
                                <Text style={styles.thText}>Data da simulação</Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.secondTrDiv}>
                                <Text style={styles.thText}>0,00</Text>
                                <Text style={styles.thText}>{formatDate}</Text>
                            </View>
                        </View>
                    </View>
                  </View>
                </View>
            

            
                <Text>Parcelas</Text>
                <View style={styles.section}>
                <View >
                    <View>
                        <View style={styles.firstTrDivAmortization}>
                            <Text style={styles.thText}>Parcela</Text>
                            <Text style={styles.thText}>Amortização</Text>
                            <Text style={styles.thText}>Juros</Text>
                            <Text style={styles.thText}>Seguro MIP</Text>
                            <Text style={styles.thText}>Seguro DFI</Text>
                            <Text style={styles.thText}>TSA</Text>
                            <Text style={styles.thText}>Valor parcela</Text>
                            <Text style={styles.thText}>Saldo devedor</Text>
                        </View>
                    </View>
                    <View>
                        {items}
                    </View>
                    
                </View>
                </View>
            
        </main>
                </View>
            </Page>
        </Document>
    )
}