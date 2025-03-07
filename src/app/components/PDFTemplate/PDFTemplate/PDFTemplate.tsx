import { formatToCustomDecimal } from '@/utils/formatToDecimal';
import { PdfProps } from '@/utils/pdfProps'
import { TableProps } from '@/utils/tableProps';
import { Page, Text, View, Document, StyleSheet ,Font} from '@react-pdf/renderer'

Font.register({
  family: 'Title',
  src: 'public/fonts/Diamonds-Regular.otf'
})

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
        fontSize:12,
        fontFamily:'Title'
    },
    thTextAlternative:{
        fontSize:12,
        width:80,
        textAlign:"center",
        margin:'auto auto',
        fontFamily:'Title'
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
    },
    tableParcels:{
      marginTop:200
    },
    thTitle:{
      fontFamily:'Title',
      fontSize:40,
      width:'100%',
      textAlign:'center',
      color: '#FFF'
    }
    
  });



export function PDFTemplate({ financementValue, imobilleValue, parcels,amortization}: PdfProps) {
  let formatDate = ''
  const itemsPerPage = 20
  const itemsArray:TableProps[] = []
  const today = new Date() 
  const month = today.getMonth()
  const day = today.getDate()
  const year = today.getFullYear()
  const taxYearSac = 11.90
  const taxMonthInSac = Math.pow(1 + taxYearSac / 100, 1 / 12) - 1
  const efetiveTaxMonthSac = Math.pow(1+taxMonthInSac,1/12)-1
  const efetiveTaxMonthSacPercent = efetiveTaxMonthSac*100
  const parcelInPrice = financementValue * (efetiveTaxMonthSac * Math.pow(1 + efetiveTaxMonthSac, parcels)) /(Math.pow(1 + efetiveTaxMonthSac, parcels) - 1);

  function calcularParcelaPrice(valorFinanciado, taxaAnual, numeroParcelas) {
    // Converter taxa anual para decimal
    let taxaAnualDecimal = taxaAnual / 100;
    
    // Converter taxa anual para taxa mensal efetiva
    let taxaMensal = Math.pow(1 + taxaAnualDecimal, 1 / 12) - 1;

    // Calcular parcela utilizando a fórmula da Tabela Price
    let parcela = valorFinanciado * (taxaMensal * Math.pow(1 + taxaMensal, numeroParcelas)) / 
                  (Math.pow(1 + taxaMensal, numeroParcelas) - 1);

    return parcela.toFixed(2); // Retorna o valor arredondado para 2 casas decimais
}

  
  if(day<10){
     formatDate =`0${day}/0${month+1}/${year}`
  }else{
    formatDate =`${day}/0${month+1}/${year}`
  }


  const calculateAmortization = ()=>{
    const amortizationMonthInSac = financementValue/parcels
    let dueBalanceIteration = financementValue

      if(amortization == "PRICE"){
        const parcelPrice = calcularParcelaPrice(financementValue,taxYearSac,parcels)
        const taxs = dueBalanceIteration*taxMonthInSac
        const amortizationInPrice = parcelInPrice-taxs

        const firstItem:TableProps={
          amortization:0.00,
          Dfi: 'R$ 0,00',
          Mip: 'R$ 0,00',
          Tsa: 'R$ 0,00',
          dueBalance:financementValue,
          parcel: 0,
          parcelValue: 0,
          taxs:0.00
        }
        itemsArray.push(firstItem)


        for(let i=1; i<parcels; i++){
        dueBalanceIteration-=Number(amortizationInPrice)
          const createNewItem:TableProps={
            amortization:Number(amortizationInPrice),
            Dfi: `R$ 0,00`,
            Mip: '',
            Tsa: '',
            dueBalance:dueBalanceIteration,
            parcel: i,
            parcelValue:Number(parcelPrice),
            taxs:Number(taxs)
          }
        itemsArray.push(createNewItem)
        }





      }else{
        const firstItem:TableProps={
          amortization:0.00,
          Dfi: 'R$ 0,00',
          Mip: 'R$ 0,00',
          Tsa: 'R$ 0,00',
          dueBalance:financementValue,
          parcel: 0,
          parcelValue: 75.22,
          taxs:0.00
        }
        itemsArray.push(firstItem)
        

        for(let i=1; i<parcels; i++){
          const taxs = dueBalanceIteration* taxMonthInSac
          const parcelValue = Number(amortizationMonthInSac.toFixed(2).slice(0,5)) + taxs

          const createNewItem:TableProps={
            amortization:amortizationMonthInSac,
            Dfi: 'R$ 0,00',
            Mip: 'R$ 0,00',
            Tsa: 'R$ 0,00',
            dueBalance:dueBalanceIteration-amortizationMonthInSac,
            parcel: i,
            parcelValue,
            taxs
          }
          itemsArray.push(createNewItem)
          dueBalanceIteration-=amortizationMonthInSac
        }
      }
  }

  calculateAmortization()
 
  const pages = Array.from(
    {length: Math.ceil(parcels/itemsPerPage)},
    (_,pageIndex)=>{
      const start = pageIndex * itemsPerPage
      const end = Math.min(start+ itemsPerPage)

      return (
        <Page key={pageIndex} style={styles.page} size="A3">
          <View style={styles.container} key={pageIndex}>
            <Text>Parcelas</Text>
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
            {itemsArray.slice(start,end).map((item,index) => (
              <View key={index} style={styles.secondTrDivAmortization}>
                <Text style={styles.thText}>{item.parcel}</Text>
                <Text style={styles.thText}>{formatToCustomDecimal(`${item.amortization}`)}</Text>
                <Text style={styles.thText}>{formatToCustomDecimal(`${item.taxs}0`)}</Text>
                <Text style={styles.thText}>{item.Mip}</Text>
                <Text style={styles.thText}>{item.Dfi}</Text>
                <Text style={styles.thText}>{item.Tsa}</Text>
                <Text style={styles.thText}>{formatToCustomDecimal(`${item.parcelValue}0`)}</Text>
                <Text style={styles.thText}>{formatToCustomDecimal(`${item.dueBalance}`)}</Text>
              </View>
            ))}
          </View>
        </Page>
      );
    }
  );

  return (
    <Document>
      <Page style={styles.container} size="A3" >
        <View style={styles.column}>
          <View>
            <View style={styles.secondTrDiv}>
              <Text style={styles.thTitle}>Valores</Text>
            </View>
            <View style={styles.firstTrDiv}>
                <Text style={styles.thText}>Valor do imóvel</Text>
                <Text style={styles.thText}>Valor da entrada</Text>
                <Text style={styles.thText}>Valor financiado</Text>
            </View>
            <View style={styles.secondTrDiv}>
                <Text style={styles.thText}>{formatToCustomDecimal(`${imobilleValue}`)}</Text>
                <Text style={styles.thText}>{formatToCustomDecimal(`${imobilleValue-financementValue}`)}</Text>
                <Text style={styles.thText}>{formatToCustomDecimal(`${financementValue}`)}</Text>
            </View>
          </View>

          <View>
            <View style={styles.secondTrDiv}>
              <Text style={styles.thTextAlternative}>Taxas</Text>
            </View>
            <View style={styles.firstTrDiv}>
                <Text style={styles.thTextAlternative}>Taxa juros (nominal juros a.a)</Text>
                <Text style={styles.thTextAlternative}>Taxa juros (efetiva a.a)</Text>
                <Text style={styles.thTextAlternative}>CET - Anual</Text>
            </View>
            <View style={styles.secondTrDiv}>
                <Text style={styles.thText}>{taxYearSac}0%</Text>
                <Text style={styles.thText}>{efetiveTaxMonthSacPercent.toFixed(2)}%</Text>
                <Text style={styles.thText}>R$ 0,00</Text>
            </View>
          </View>
        </View>

        <View style={styles.column}>
          <View style={styles.table}>
            <View style={styles.firstTrDiv}>
                <Text style={styles.thText}>Despesas</Text>
                <Text style={styles.thText}>Vistoria</Text>
                <Text style={styles.thText}>IOF</Text>
            </View>
            <View style={styles.secondTrDiv}>
                <Text style={styles.thText}>R$ 0,00</Text>
                <Text style={styles.thText}>R$ 0,00</Text>
                <Text style={styles.thText}>R$ 0,00</Text>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.firstTrDiv}>
                <Text style={styles.thTextAlternative}>Renda informada</Text>
                <Text style={styles.thTextAlternative}>Prazo (meses)</Text>
                <Text style={styles.thTextAlternative}>Sistema amortização</Text>
            </View>
            <View style={styles.secondTrDiv}>
                <Text style={styles.thText}>R$ 0,00</Text>
                <Text style={styles.thText}>{parcels}</Text>
                <Text style={styles.thText}>{amortization}</Text>
            </View>
          </View>
        </View>

       <View style={styles.column}>
        <View>
           <View style={styles.firstTrDiv}>
               <Text style={styles.thText}>Tipo de imovel</Text>

           </View>
           <View style={styles.secondTrDiv}>
               <Text style={styles.thText}>Não informado</Text>
           </View>
         </View>

         <View>
           <View style={styles.firstTrDiv}>
               <Text style={styles.thText}>Seguradora</Text>
               <Text style={styles.thText}>Data da simulação</Text>
           </View>
           <View style={styles.secondTrDiv}>
               <Text style={styles.thText}>Não informado</Text>
               <Text style={styles.thText}>{`${formatDate}`}</Text>
           </View>
        </View>
       </View>
      </Page>
      {pages}
    </Document>
  );
}
