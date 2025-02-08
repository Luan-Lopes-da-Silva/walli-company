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

<<<<<<< HEAD


export function PDFTemplate({ financementValue, imobilleValue, parcels,amortization}: PdfProps) {
  let formatDate = ''
  const itemsPerPage = 20
  const itemsArray:TableProps[] = []
  const today = new Date() 
  const month = today.getMonth()
  const day = today.getDate()
  const year = today.getFullYear()
  const taxYearSac = 11.90
  const taxMonthInSac = taxYearSac/100
  const efetiveTaxMonthSac = Math.pow(1+taxMonthInSac,1/12)-1
  const efetiveTaxMonthSacPercent = efetiveTaxMonthSac*100

  
  if(day<10){
     formatDate =`0${day}/0${month+1}/${year}`
  }else{
    formatDate =`${day}/0${month+1}/${year}`
  }


  const calculateAmortization = ()=>{
    
    const amortizationMonthInSac = financementValue/parcels
    let dueBalanceIteration = financementValue

      if(amortization === "PRICE"){
        for(let i=0; i<parcels; i++){
          const createNewItem:TableProps={
            amortization:0,
            Dfi: '',
            Mip: '',
            Tsa: '',
            dueBalance:0,
            parcel: i,
            parcelValue: 0,
            taxs:0
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
=======
  export function PDFTemplate({ financementValue, imobilleValue, parcels, amortization }: PdfProps) {
    const itemsPerPage = 20;
    const finalArray: number[] = [];
    const dueBalanceArray: string[] = [];
    const taxArray: string[] = [];
    const parcelArray: string[] = [];
    const monthTaxArray: number[] = [];
    const parcelArrayPrice: string[] = [];
    const monthTaxArrayPrice: number[] = [];
    const amortizationPriceArray: number[] = [];
    const balancePrice: any[] = [];
    
    const taxYear = 0.1190;
    const taxMonth = Math.pow(1 + taxYear, 1 / 12) - 1;
  
    let startDueBalance = financementValue;
    let reduceDueBalance = financementValue;
    const monthAmortization = financementValue / parcels;
  
    // Calcular para SAC e PRICE
    const calculateAmortization = () => {
      // Calcular SAC
      if (amortization === 'SAC') {
        for (let i = 0; i < parcels; i++) {
          const monthTax = startDueBalance * taxMonth;
          monthTaxArray.push(monthTax);
  
          const formatedMonthTax = monthTax.toString().slice(0, 6);
          taxArray.push(`${Number(formatedMonthTax)}`);
  
          const monthParcel = (monthTax + monthAmortization).toString().slice(0, 6);
          parcelArray.push(formatToCustomDecimal(`${monthParcel}`));
  
          reduceDueBalance -= monthAmortization;
          dueBalanceArray.push(`${reduceDueBalance}`);
  
          finalArray.push(monthAmortization + monthTax);
          startDueBalance -= monthAmortization;
        }
      }
  
      // Calcular PRICE
      if (amortization === 'PRICE') {
        const monthTaxPrice = (1 + 11.90 / 100) ** (1 / 12) - 1; // Taxa de juros mensal
    
        // Calculando a parcela fixa utilizando a fórmula da Tabela Price
        const monthParcelPrice = (financementValue * ((monthTaxPrice * Math.pow(1 + monthTaxPrice, parcels)) / (Math.pow(1 + monthTaxPrice, parcels) - 1)));
    
        // Inicializando variáveis
        let startDueBalance = financementValue;
        let reduceDueBalance = financementValue;
    
        for (let i = 0; i < parcels; i++) {
            // Calcular juros do mês
            const monthTax = startDueBalance * monthTaxPrice;
            monthTaxArrayPrice.push(monthTax);
    
            // Formatando o valor dos juros mensais
            const formatedMonthTax = monthTax.toString().slice(0, 6);
            taxArray.push(`${Number(formatedMonthTax)}`);
    
            // Calcular a amortização do mês (parte da parcela que reduz o saldo devedor)
            const amortizationMonthPrice = monthParcelPrice - monthTax;
            amortizationPriceArray.push(amortizationMonthPrice);
    
            // Adicionar a parcela no array (valor total da parcela, juros + amortização)
            parcelArrayPrice.push(formatToCustomDecimal(`${monthParcelPrice.toFixed(2)}`));
    
            // Atualizar o saldo devedor
            reduceDueBalance -= amortizationMonthPrice;
            dueBalanceArray.push(`${reduceDueBalance.toFixed(2)}`);
    
            // Atualizando o saldo devedor
            balancePrice.push(reduceDueBalance.toFixed(2));
    
            // Adicionar o valor da parcela no final
            finalArray.push(monthParcelPrice);
    
            // Atualiza o saldo devedor inicial para o próximo mês
            startDueBalance -= amortizationMonthPrice;
        }
    }
    
    };
  
    calculateAmortization();
  
    const pages = Array.from({ length: Math.ceil(parcels / itemsPerPage) }, (_, pageIndex) => {
      const start = pageIndex * itemsPerPage;
      const end = Math.min(start + itemsPerPage, parcels);
  
      return (
        <View key={pageIndex}>
          {dueBalanceArray.slice(start, end).map((balance, index) => (
            <View key={index} style={styles.secondTrDivAmortization}>
              <Text style={styles.thText}>{start + index + 1}</Text>
              <Text style={styles.thText}>R$ {formatToCustomDecimal(`${monthAmortization.toString().slice(0, 6)}`)}</Text>
              <Text style={styles.thText}>R$ {formatToCustomDecimal(taxArray[start + index])}</Text>
              <Text style={styles.thText}>R$ 0,00</Text>
              <Text style={styles.thText}>R$ 0,00</Text>
              <Text style={styles.thText}>R$ 0,00</Text>
              <Text style={styles.thText}>R$ {parcelArray[start + index]}</Text>
              <Text style={styles.thText}>R$ {formatToCustomDecimal(`${balance.toString().slice(0, 8)}`)}</Text>
            </View>
          ))}
        </View>
      );
    });
  
    return (
      <Document>
        <Page size="A3" style={styles.page}>
          <View style={styles.container}>
            <View style={styles.summary}>
              <View style={styles.section}>
                <Text>Tabela de Parcelas</Text>
                <View style={styles.table}>
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
  
                  {amortization === 'PRICE' ? (
                    parcelArrayPrice.map((_, index) => {
                      const amortizationValue = amortizationPriceArray[index];
                      const taxValue = monthTaxArrayPrice[index];
                      const parcelValue = parcelArrayPrice[index];
                      const balanceValue = balancePrice[index];
  
                      return (
                        <View key={index} style={styles.secondTrDivAmortization}>
                          <Text style={styles.thText}>{index + 1}</Text>
                          <Text style={styles.thText}>{formatToCustomDecimal(`${amortizationValue.toString().slice(0,4)}`)}</Text>
                          <Text style={styles.thText}>{formatToCustomDecimal(`${taxValue.toString().slice(0,4)}`)}</Text>
                          <Text style={styles.thText}>R$ 0,00</Text>
                          <Text style={styles.thText}>R$ 0,00</Text>
                          <Text style={styles.thText}>R$ 0,00</Text>
                          <Text style={styles.thText}>{formatToCustomDecimal(`${parcelValue}`)}</Text>
                          <Text style={styles.thText}>{formatToCustomDecimal(`${balanceValue}`)}</Text>
                        </View>
                      );
                    })
                  ) : (
                    <View>{pages}</View>
                  )}
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
                <View>{pageItems}</View>
              </View>
            </View>
          </Page>
        ))}
      </Document>
    );
  }
  
>>>>>>> 34367448296a4099341b63754d0077b197586016
