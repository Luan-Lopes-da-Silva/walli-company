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
  