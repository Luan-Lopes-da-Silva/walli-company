import PDFTemplate from '@/app/components/PDFTemplate/PDFTemplate'

export default function TestComponents(){
    return(
        <><PDFTemplate financementValue={500} imobilleValue={750} prohibitedValue={750-500} parcels={120}/></>    
    )
}