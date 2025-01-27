'use client'

import {PDFTemplate} from '@/app/components/PDFTemplate/PDFTemplate'

export default function TestComponents(){
    function handleDownload(){
        window.open(`/api/generate-pdf?imobillevalue=1500&financementvalue=600&parcels=10`, '_blank')
    }
    return(
        <button onClick={handleDownload}>Baixar PDF</button>
    )
}