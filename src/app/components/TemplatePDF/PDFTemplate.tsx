/* eslint-disable @typescript-eslint/no-require-imports */
import { PdfProps } from '@/utils/pdfProps'
import { TableProps } from '@/utils/tableProps';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';
import {maskitoTransform} from '@maskito/core'

import { Page, Text, View, Document, StyleSheet} from '@react-pdf/renderer'


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
    rowSummary:{
        width:'100%',
        flexDirection:'row',
        gap:24,
        justifyContent:'center',
        marginBottom:60,
    },
    summary:{
        flexDirection:'column',
    },
    headerDiv:{
        width:400,
        height:100,
        backgroundColor:'#028DA6',
        justifyContent:'center',
        textAlign:'center'
    },
    headerTitle:{
        fontSize:46,
        color:'#FFF'
    },
    rowHeaders:{
        flexDirection:'row',
        width:400,
        height:70,
        justifyContent:'space-between',
        padding:20,
        backgroundColor:'#D3D664'
    },
    headerSubTitles:{
        fontSize:16,
        color:'#000'
    },
    rowDatas:{
        width:400,
        height:70,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#028DA6',
        padding:20
    },
    titleTable:{
        fontSize:80,
        textAlign:'center',
        justifyContent:'center',
        marginBottom:20,
        color:'#FFF'
    },
    rowHeaderTable:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        marginBottom:12
    },
    rowDiv2:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        backgroundColor:'#D3D664'
    },
    rowNormalDiv:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        backgroundColor:'#028DA6'
    },
    rowTd:{
        fontSize:14,
        color: '#FFF',
        marginLeft:20,
        marginRight:45
    },
    rowTdNumber:{
        fontSize:14,
        color: '#FFF',
        marginLeft:15,
        marginRight:57
    },
    rowTdAmortization:{
        marginRight:60,
        fontSize:14,
        color:'#FFF'
    },
    rowAmortizationAlternative:{
        marginRight:20,
        fontSize:14,
        color:'#FFF'
    },
    rowTdTax:{
        fontSize:14,
        color: '#FFF',
        marginRight:5
    },
    rowTdTaxAlternative:{
        fontSize:14,
        color: '#FFF',
        marginRight:40
    },
    rowTdMipSecure:{
        fontSize:14,
        color: '#FFF',
        marginRight:50
    },
    rowTdMipSecureAlternative:{
        fontSize:14,
        color: '#FFF',
        marginRight:40
    },
    rowTdDfiSecure:{
        fontSize:14,
        color: '#FFF',
        marginRight:40
    },
    rowTdDfiAlternative:{
        fontSize:14,
        color: '#FFF',
        marginRight:70
    },
    rowTdParcel:{
        fontSize:14,
        color: '#FFF',
        marginLeft:10
    },
    rowTdParcelAlternative:{
        fontSize:14,
        color: '#FFF',
        marginLeft:180
    },
  
    rowTd3:{
        marginLeft:0,
        fontSize:14,
        color:'#FFF',
        backgroundColor:'#000'
    },
    rowTh:{
        fontSize:16,
        color:'#FFF'
    },
    rowTsa:{
        fontSize:14,
        color:'#FFF',
    },
    rowTsaAlternative:{
        fontSize:14,
        color:'#FFF',
    },
    rowTdBalance:{
        fontSize:14,
        color:'#FFF',
    },
    rowTdBalanceAlternative:{
        fontSize:14,
        color:'#FFF',
    }
  });

  function formatNumber(value:string) {
    value = value.replace(/[^\d.-]/g, '');

    let num = parseFloat(value);

    if (isNaN(num)) return '';

    return num.toLocaleString('pt-BR', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2  
    });
}

  export function PDFTemplate({ financementValue, imobilleValue, parcels, amortization }: PdfProps) {

     const maskitoOptions = maskitoNumberOptionsGenerator({
            thousandSeparator:'.'
     })
     
     
    const arrayEachRowDiv = []
    const expanses = (5/100)*imobilleValue
    let dueBalance = financementValue
    const amortizationInSac = financementValue/parcels
    for (let index = 0; index < parcels; index++) {
        const taxsMonth = (dueBalance*0.119).toString().slice(0,3)
        const createNewItem: TableProps={
            amortization: amortizationInSac,
            Dfi: `0`,
            Mip: `0`,
            Tsa: `0`,
            dueBalance:dueBalance-=amortizationInSac,
            parcel: index,
            taxs:Number(taxsMonth),
            parcelValue:amortizationInSac+Number(taxsMonth)
            
        }
    arrayEachRowDiv.push(createNewItem)    
    }
  
    return (
      <Document>
        <Page size="A3" style={styles.page}>
          <View style={styles.container}>
             <View style={styles.rowSummary}>
                <View style={styles.summary}>
                    <View style={styles.headerDiv}>
                        <Text style={styles.headerTitle}>VALORES</Text>
                    </View>
                    <View style={styles.rowHeaders}>
                        <Text style={styles.headerSubTitles}>Valor do imóvel</Text>
                        <Text style={styles.headerSubTitles}>Valor da entrada</Text>
                        <Text style={styles.headerSubTitles}>Valor financiado</Text>
                    </View>
                    <View style={styles.rowDatas}>
                        <Text style={styles.headerSubTitles}>{imobilleValue}</Text>
                        <Text style={styles.headerSubTitles}>{imobilleValue-financementValue}</Text>
                        <Text style={styles.headerSubTitles}>{financementValue}</Text>
                    </View>
                </View>

                <View style={styles.summary}>
                    <View style={styles.headerDiv}>
                        <Text style={styles.headerTitle}>TAXAS</Text>
                    </View>
                    <View style={styles.rowHeaders}>
                        <Text style={styles.headerSubTitles}>Taxa juros</Text>
                        <Text style={styles.headerSubTitles}>Taxa juros efetiva</Text>
                        <Text style={styles.headerSubTitles}>CET - ANUAL</Text>
                    </View>
                    <View style={styles.rowDatas}>
                        <Text style={styles.headerSubTitles}>Olá</Text>
                        <Text style={styles.headerSubTitles}>Olá</Text>
                        <Text style={styles.headerSubTitles}>Olá</Text>
                    </View>
                </View>
             </View>

             <View style={styles.rowSummary}>
                <View style={styles.summary}>
                    <View style={styles.rowHeaders}>
                        <Text style={styles.headerSubTitles}>Despesas</Text>
                        <Text style={styles.headerSubTitles}>Vistoria</Text>
                        <Text style={styles.headerSubTitles}>IOF</Text>
                    </View>
                    <View style={styles.rowDatas}>
                        <Text style={styles.headerSubTitles}>{expanses}</Text>
                        <Text style={styles.headerSubTitles}>Olá</Text>
                        <Text style={styles.headerSubTitles}>Olá</Text>
                    </View>
                </View>

                <View style={styles.summary}>
                    <View style={styles.rowHeaders}>
                        <Text style={styles.headerSubTitles}>Renda</Text>
                        <Text style={styles.headerSubTitles}>Prazo</Text>
                        <Text style={styles.headerSubTitles}>Sistema Amort</Text>
                    </View>
                    <View style={styles.rowDatas}>
                        <Text style={styles.headerSubTitles}>Olá</Text>
                        <Text style={styles.headerSubTitles}>{parcels}</Text>
                        <Text style={styles.headerSubTitles}>{amortization}</Text>
                    </View>
                </View>
             </View>

             <View style={styles.rowSummary}>
                <View style={styles.summary}>
                    <View style={styles.rowHeaders}>
                        <Text style={styles.headerSubTitles}>Tipo imóvel</Text>
                    </View>
                    <View style={styles.rowDatas}>
                        <Text style={styles.headerSubTitles}>Olá</Text>
                    </View>
                </View>

                <View style={styles.summary}>
                    <View style={styles.rowHeaders}>
                        <Text style={styles.headerSubTitles}>Seguradora</Text>
                        <Text style={styles.headerSubTitles}>Data da simulação</Text>
                    </View>
                    <View style={styles.rowDatas}>
                        <Text style={styles.headerSubTitles}>Olá</Text>
                        <Text style={styles.headerSubTitles}>Olá</Text>
                    </View>
                </View>
             </View>
          </View>
        </Page>

        <Page size="A3" style={styles.page}>
          <View style={styles.container}>
            <Text style={styles.titleTable}>Parcelas</Text>
                <View style={styles.rowHeaderTable}>
                    <Text style={styles.rowTh}>Parcela</Text>
                    <Text style={styles.rowTh}>Amortização</Text>
                    <Text style={styles.rowTh}>Juros</Text>
                    <Text style={styles.rowTh}>Seguro MIP</Text>
                    <Text style={styles.rowTh}>Seguro DFI</Text>
                    <Text style={styles.rowTh}>TSA</Text>
                    <Text style={styles.rowTh}>Valor parcela</Text>
                    <Text style={styles.rowTh}>Saldo devedor</Text>
                </View>
                {arrayEachRowDiv.map((item,index)=>(
                    <View key={index} style={styles.rowDiv2}>
                        {index>9?(
                            <View style={styles.rowDiv2}>
                                <Text style={styles.rowTdNumber}>{item.parcel}</Text>
                                <Text style={styles.rowTdAmortization}>R$ {`${formatNumber(item.amortization.toString())}`}</Text>
                                <Text style={styles.rowTdTaxAlternative}>R$ {`${formatNumber(item.taxs.toString())}`}</Text>
                                <Text style={styles.rowTdMipSecureAlternative}>R$ 0,00</Text>
                                <Text style={styles.rowTdDfiAlternative}>R$ 0,00</Text>
                                <Text style={styles.rowTsaAlternative}>R$ 0,00</Text>
                                <Text style={styles.rowTdParcelAlternative}>R$ {`${formatNumber(item.parcelValue.toString())}`}</Text>
                                <Text style={styles.rowTdBalanceAlternative}>R$ {`${formatNumber(item.dueBalance.toString())}`}</Text>
                            </View>
                        ):(
                            <View style={styles.rowDiv2}>
                                <Text style={styles.rowTd}>{item.parcel}</Text>
                                <Text style={styles.rowAmortizationAlternative}>R$ {`${formatNumber(item.amortization.toString())}`}</Text>
                                <Text style={styles.rowTdTax}>R$ {`${formatNumber(item.taxs.toString())}`}</Text>
                                <Text style={styles.rowTdMipSecure}>R$ 0,00</Text>
                                <Text style={styles.rowTdDfiSecure}>R$ 0,00</Text>
                                <Text style={styles.rowTsa}>R$ 0,00</Text>
                                <Text style={styles.rowTdParcel}>R$ {`${formatNumber(item.parcelValue.toString())}`}</Text>
                                <Text style={styles.rowTdBalance}>R$ {`${formatNumber(item.dueBalance.toString())}`}</Text>
                            </View>
                        )}
                    </View>
                ))}
          </View>
        </Page>
  
      </Document>
    );
  }
  