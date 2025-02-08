import {renderToStream} from '@react-pdf/renderer'
import { PDFTemplate } from '@/app/components/PDFTemplate/PDFTemplate/PDFTemplate'

export async function generatePdfStream(imobilleValue:number,financementValue:number,parcels:number,amortization:string) {
    return renderToStream(
        <PDFTemplate 
        financementValue={financementValue} 
        imobilleValue={imobilleValue}
        parcels={parcels}
        amortization={amortization}
        />)
}