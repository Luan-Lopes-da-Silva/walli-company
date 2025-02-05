import { formatToCustomDecimal } from '@/utils/formatToDecimal';
import { PdfProps } from '@/utils/pdfProps'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

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
        textAlign:"center",
        margin:'auto auto'
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

    column:{
        display:'flex',
        gap:40,
        flexDirection:'row'
    }
    
  });

  export function PDFTemplate({ financementValue, imobilleValue, parcels ,expanse,amortization}: PdfProps) {
    const itemsPerPage = 20
    const finalArray: number[] = []
    const dueBalanceArray: string[] = []
    const taxArray: string[] = []
    const now = new Date()
    const formatDate = `${now.getDate()}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`
    const parcelArray:string[] = []
    const monthTaxArray:number[] = []

    const taxYear = 0.1190
    const taxMonth =  Math.pow(1+taxYear,1/12)-1
  
    let startDueBalance = financementValue 
    let reduceDueBalance = financementValue 
  
    const monthAmortization = financementValue / parcels
  
  
    for (let i = 0; i < parcels; i++) {
      const monthTax = startDueBalance * taxMonth
      monthTaxArray.push(monthTax)
  
      const formatedMonthTax = monthTax.toString().slice(0,6)
      taxArray.push(`${Number(formatedMonthTax)}`)

      const monthParcel = (monthTax+monthAmortization).toString().slice(0,6)
      parcelArray.push(formatToCustomDecimal(`${monthParcel}`))
  
      reduceDueBalance -= monthAmortization
      dueBalanceArray.push(`${reduceDueBalance}`)
  
      finalArray.push(monthAmortization + monthTax)
      startDueBalance -= monthAmortization
    }
  
    const pages = Array.from({ length: Math.ceil(parcels / itemsPerPage) }, (_, pageIndex) => {
      const start = pageIndex * itemsPerPage
      const end = Math.min(start + itemsPerPage, parcels)
  
      return (
        <View key={pageIndex}>
          {dueBalanceArray.slice(start, end).map((balance, index) => (
            <View key={index} style={styles.secondTrDivAmortization}>
              <Text style={styles.thText}>{start + index + 1}</Text>
              <Text style={styles.thText}>R$ {formatToCustomDecimal(`${monthAmortization.toString().slice(0,6)}`)}</Text>
              <Text style={styles.thText}>R$ {formatToCustomDecimal(taxArray[start + index])}</Text>
              <Text style={styles.thText}>R$ 0,00</Text>
              <Text style={styles.thText}>R$ 0,00</Text>
              <Text style={styles.thText}>R$ 0,00</Text>
              <Text style={styles.thText}>R$ {parcelArray[start + index]}</Text>
              <Text style={styles.thText}>R$ {formatToCustomDecimal(`${balance.toString().slice(0,8)}`)}</Text>
            </View>
          ))}
        </View>
      )
    })
  
    return (
      <Document>
        <Page size="A3" style={styles.page}>
          <View style={styles.container}>
            <View style={styles.summary}>
              <View style={styles.section}>
                <View style={styles.table}>
                  <View style={styles.secondTrDivAlternative}>
                      <Text style={styles.thTextAlternative}>VALORES</Text>
                  </View>
                  <View>
                    <View style={styles.firstTrDiv}>
                      <Text style={styles.thText}>Valor do imóvel</Text>
                      <Text style={styles.thText}>Valor da entrada</Text>
                      <Text style={styles.thText}>Valor financiado</Text>
                      <Text>{taxMonth}</Text>
                    </View>
                  </View>
                  <View>
                    <View style={styles.secondTrDiv}>
                      <Text style={styles.thText}>R$ {formatToCustomDecimal(`${imobilleValue}`)}</Text>
                      <Text style={styles.thText}>R$ {formatToCustomDecimal(`${(imobilleValue - financementValue)}`)}</Text>
                      <Text style={styles.thText}>R$ {formatToCustomDecimal(`${financementValue}`)}</Text>
                    </View>
                  </View>
                </View>
              </View>
  
              <View style={styles.section}>
            <View style={styles.table}>
                  <View style={styles.secondTrDivAlternative}>
                      <Text style={styles.thTextAlternative}>TAXAS</Text>
                  </View>
                  <View>
                    <View style={styles.firstTrDiv}>
                      <Text style={styles.thTextAlternative}>Taxa juros (nominal juros a.a)</Text>
                      <Text style={styles.thTextAlternative}>Taxa juros (efetiva a.a)</Text>
                      <Text style={styles.thText}>CET - Anual</Text>
                      <Text>{taxMonth}</Text>
                    </View>
                  </View>
                  <View>
                    <View style={styles.secondTrDiv}>
                      <Text style={styles.thText}>R$ 11,90</Text>
                      <Text style={styles.thText}>R$ 00,00</Text>
                      <Text style={styles.thText}>R$ 00,00</Text>
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
                      <Text style={styles.thText}>R$ {formatToCustomDecimal(`${expanse}`)}</Text>
                      <Text style={styles.thText}>R$ 00,00</Text>
                      <Text style={styles.thText}>R$ 00,00</Text>
                    </View>
                  </View>
                </View>
            </View>
            <View style={styles.section}>
            <View style={styles.table}>
                  <View>
                    <View style={styles.firstTrDiv}>
                      <Text style={styles.thTextAlternative}>Renda minima</Text>
                      <Text style={styles.thTextAlternative}>Prazo(meses)</Text>
                      <Text style={styles.thTextAlternative}>Sistema amortização</Text>
                    </View>
                  </View>
                  <View>
                    <View style={styles.secondTrDiv}>
                      <Text style={styles.thText}>R$ 00,00</Text>
                      <Text style={styles.thText}>{parcels}</Text>
                      <Text style={styles.thText}>{amortization}</Text>
                    </View>
                  </View>
                </View>
            </View>
  
            <View style={styles.section}>
            <View style={styles.table}>
                  <View>
                    <View style={styles.firstTrDiv}>
                      <Text style={styles.thTextAlternative}>Tipo de imóvel</Text>
                    </View>
                  </View>
                  <View>
                    <View style={styles.secondTrDiv}>
                      <Text style={styles.thTextAlternative}>Residencial</Text>
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
                      <Text style={styles.thText}>Não informado</Text>
                      <Text style={styles.thText}>{formatDate}</Text>
                    </View>
                  </View>
                </View>
            </View>
            </View>
  
          </View>
        </Page>
  
        {pages.map((pageItems, pageIndex) => (
          <Page key={pageIndex} size="A3" style={styles.page}>
            <View style={styles.container}>
              <Text>Tabela de Parcelas</Text>
              <View style={styles.section}>
                <View>
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
                  {amortization=='PRICE'?(
                    <View>
                      <Text style={styles.thText}>Parcela</Text>
                      <Text style={styles.thText}>Amortização</Text>
                      <Text style={styles.thText}>Juros</Text>
                      <Text style={styles.thText}>Seguro MIP</Text>
                      <Text style={styles.thText}>Seguro DFI</Text>
                      <Text style={styles.thText}>TSA</Text>
                      <Text style={styles.thText}>Valor parcela</Text>
                      <Text style={styles.thText}>Saldo devedor</Text>
                    </View>
                  ):(
                    <View>{pageItems}</View>
                  )}
                </View>
              </View>
            </View>
          </Page>
        ))}
      </Document>
    )
  }