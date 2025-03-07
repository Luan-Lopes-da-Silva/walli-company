'use client'

export default function TestComponents(){
    function testAmortizationSAC(){        
        window.open(`/api/generate-pdf?imobillevalue=${50000000}&financementvalue=${40000000}&parcels=${320}&amortization=${"PRICE"}`, '_blank')
    }
    return(
        <button onClick={testAmortizationSAC}>Baixar PDF</button>
    )
}