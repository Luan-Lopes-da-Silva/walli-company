/* eslint-disable @typescript-eslint/no-require-imports */
import { PdfProps } from '@/utils/pdfProps';
import { TableProps } from '@/utils/tableProps';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    width: '100%',
  },

  container: {
    width: '100%',
    backgroundColor: '#868686',
    height:'100%',
    padding: '12px',
  },

  rowSummary: {
    width: '100%',
    flexDirection: 'row',
    gap: 24,
    justifyContent: 'center',
    marginBottom: 60,
  },

  summary: {
    flexDirection: 'column',
  },

  headerDiv: {
    width: 397,
    height: 100,
    backgroundColor: '#028DA6',
    justifyContent: 'center',
    textAlign: 'center',
  },

  headerTitle: {
    fontSize: 46,
    color: '#FFF',
  },

  rowHeaders: {
    flexDirection: 'row',
    minWidth:300,
    height: 70,
    padding: 20,
    backgroundColor: '#D3D664',
    alignItems:"center",
  },

  rowHeadersAlt: {
    flexDirection: 'row',
    height: 70,
    width:350,
    padding: 20,
    backgroundColor: '#D3D664',
    alignItems:"center",
  },

  headerSubTitles: {
    fontSize: 16,
    color: '#000',
    width: '33%',
    textAlign: 'center',
  },
  headerSubTitlesData:{
    fontSize: 16,
    color: '#000',
    width: '33%',
    textAlign: 'center',
  },
  headerSubTitlesData2:{
    fontSize: 16,
    color: '#000',
    width: '100%',
    textAlign: 'center',
  },
  headerSubTitlesDataAlt:{
    fontSize: 16,
    color: '#000',
    width: '50%',
    textAlign: 'center',
  },
  headerSubTitlesAlt: {
    fontSize: 16,
    color: '#000',
    width: '50%',
    textAlign: 'center',
  },
  headerSubTitlesAlt2: {
    fontSize: 16,
    color: '#000',
    width: '100%',
    textAlign: 'center',
  },

  rowDatas: {
    minWidth:300,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#028DA6',
    padding: 20,
    alignItems:'center'
  },
  rowDatasAlt: {
    width:350,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#028DA6',
    padding: 20,
    alignItems:'center'
  },

  titleTable: {
    fontSize: 24,
    textAlign: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    color: '#FFF',
  },

  rowHeaderTable: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#D3D664',
    alignItems:'center',
    padding:12
  },

  rowDiv2: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#028DA6',
    padding: 12,
  },

  rowTd: {
    fontSize: 14,
    color: '#FFF',
    width: '12%', // Define largura para um melhor alinhamento
    textAlign: 'center',
  },

  rowTh: {
    fontSize: 14,
    color: '#FFF',
    width: '12%',
    textAlign: 'center',
  },

  pageBreak: {
    marginTop: '20px',
  },
});

export function PDFTemplate({ financementValue, imobilleValue, parcels, amortization }: PdfProps) {
  const arrayEachRowDiv = [];
  const expanses = (5 / 100) * imobilleValue;
  let dueBalance = financementValue;
  const amortizationInSac = financementValue / parcels;


  const currentDate = new Date()

  const currentDay = currentDate.getDate()<10?`0${currentDate.getDate()}`:currentDate.getDate()
  const currentMonth = currentDate.getMonth()<10?`0${currentDate.getMonth()+1}`:currentDate.getMonth()+1
  const currentYear = currentDate.getFullYear()
  const newDate = `${currentDay}/${currentMonth}/${currentYear}`


  function aplicarMascara(value:number,cutTarget:number) {
    const valorStr = value.toString().slice(0, cutTarget);
    
    // eslint-disable-next-line prefer-const
    let [parteInteira, parteDecimal] = valorStr.split('.');
    
    parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    if (parteDecimal) {
        return `${parteInteira},${parteDecimal}`;
    } else {
        return parteInteira;
    }
  }

  function tablePriceCalculate(financementValue:number, parcelNumber:number) {
    const taxMonth = 0.0094136514
    const numberOfParcels = parcelNumber;
    
    const parcelValue = financementValue * (taxMonth * Math.pow(1 + taxMonth, numberOfParcels)) / 
                    (Math.pow(1 + taxMonth, numberOfParcels) - 1);

    let dueBalanceValue = financementValue;
    const table:TableProps[] = [];

    for (let i = 1; i <= numberOfParcels; i++) {
        const tax = dueBalanceValue * taxMonth;
        const amortization = parcelValue - tax;
        dueBalanceValue -= amortization;

        table.push({
            parcel: i,
            parcelValue:parcelValue,
            taxs: tax,
            amortization: amortization,
            dueBalance: dueBalanceValue,
            Dfi: `0`,
            Mip:`0`,
            Tsa:`0`
        });
    }

    return table;
}

const priceTable = tablePriceCalculate(financementValue,parcels)

  for (let index = 0; index < parcels; index++) {
    const taxMonth = (dueBalance*0.0094136514)
    const createNewItem: TableProps = {
      amortization: amortizationInSac,
      Dfi: `0`,
      Mip: `0`,
      Tsa: `0`,
      dueBalance: dueBalance -= amortizationInSac,
      parcel: index + 1,
      taxs: taxMonth,
      parcelValue: amortizationInSac + taxMonth,
    };
    arrayEachRowDiv.push(createNewItem);
  }

  const chunkArray = (arr: TableProps[], chunkSize: number) => {
    const result: TableProps[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  const rowsPerPage = 40;
  const paginatedPriceTable = chunkArray(priceTable,rowsPerPage)
  const paginatedRows = chunkArray(arrayEachRowDiv, rowsPerPage);

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
                <Text style={styles.headerSubTitlesData}>R$ {aplicarMascara(imobilleValue,9)},00</Text>
                <Text style={styles.headerSubTitlesData}>R$ {aplicarMascara((imobilleValue - financementValue),9)},00</Text>
                <Text style={styles.headerSubTitlesData}>R$ {aplicarMascara(financementValue,9)},00</Text>
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
                <Text style={styles.headerSubTitlesData}>11.90 %</Text>
                <Text style={styles.headerSubTitlesData}>0.119</Text>
                <Text style={styles.headerSubTitlesData}>Olá</Text>
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
                <Text style={styles.headerSubTitlesData}>R$ {aplicarMascara(expanses,9)},00</Text>
                <Text style={styles.headerSubTitlesData}>Olá</Text>
                <Text style={styles.headerSubTitlesData}>Olá</Text>
              </View>
            </View>

            <View style={styles.summary}>
              <View style={styles.rowHeaders}>
                <Text style={styles.headerSubTitles}>Renda</Text>
                <Text style={styles.headerSubTitles}>Prazo</Text>
                <Text style={styles.headerSubTitles}>Sistema Amortização</Text>
              </View>
              <View style={styles.rowDatas}>
                <Text style={styles.headerSubTitlesData}>Olá</Text>
                <Text style={styles.headerSubTitlesData}>{parcels}</Text>
                <Text style={styles.headerSubTitlesData}>{amortization}</Text>
              </View>
            </View>
          </View>

          <View style={styles.rowSummary}>
            <View style={styles.summary}>
              <View style={styles.rowHeadersAlt}>
                <Text style={styles.headerSubTitlesAlt2}>Tipo imóvel</Text>
              </View>
              <View style={styles.rowDatasAlt}>
                <Text style={styles.headerSubTitlesData2}>Residencial</Text>
              </View>
            </View>

            <View style={styles.summary}>
              <View style={styles.rowHeadersAlt}>
                <Text style={styles.headerSubTitlesAlt}>Seguradora</Text>
                <Text style={styles.headerSubTitlesAlt}>Data da simulação</Text>
              </View>
              <View style={styles.rowDatasAlt}>
                <Text style={styles.headerSubTitlesDataAlt}>Olá</Text>
                <Text style={styles.headerSubTitlesDataAlt}>{newDate}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>

      {amortization=='PRICE'?(
        <>
          {paginatedPriceTable.map((priceTable,index)=>(
              <Page size="A3" style={styles.page} key={index}>
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
  
                {priceTable.map((item,index)=>(
                  <View style={styles.rowDiv2} key={index}>
                      <Text style={styles.rowTd}>{item.parcel}</Text>
                      <Text style={styles.rowTd}>R$ {aplicarMascara(item.amortization,6)}</Text>
                      <Text style={styles.rowTd}>R$ {aplicarMascara(item.taxs,7)}</Text>
                      <Text style={styles.rowTd}>R$ 0,00</Text>
                      <Text style={styles.rowTd}>R$ 0,00</Text>
                      <Text style={styles.rowTd}>R$ 0,00</Text>
                      <Text style={styles.rowTd}>R$ {aplicarMascara(item.parcelValue,7)}</Text>
                      <Text style={styles.rowTd}>R$ {aplicarMascara(item.dueBalance,9)}</Text>
                  </View>
                ))}
              </View>
          </Page>
          ))}
        </>
        
      ):(
        <>
          {paginatedRows.map((pageRows, index) => (
          <Page size="A3" style={styles.page} key={index}>
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
              {pageRows.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.rowDiv2}>
                  <Text style={styles.rowTd}>{item.parcel}</Text>
                  <Text style={styles.rowTd}>R$ {`${aplicarMascara(item.amortization,7)}`}</Text>
                  <Text style={styles.rowTd}>R$ {`${aplicarMascara(item.taxs,7)}`}</Text>
                  <Text style={styles.rowTd}>R$ {item.Mip}</Text>
                  <Text style={styles.rowTd}>R$ {item.Dfi}</Text>
                  <Text style={styles.rowTd}>R$ {item.Tsa}</Text>
                  <Text style={styles.rowTd}>R$ {`${aplicarMascara(item.parcelValue,7)}`}</Text>
                  <Text style={styles.rowTd}>R$ {`${aplicarMascara(item.dueBalance,9)}`}</Text>
                </View>
              ))}
            </View>
          </Page>
        ))}
        </>
      )}
    </Document>
  );
}
