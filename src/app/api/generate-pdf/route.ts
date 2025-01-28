import { NextResponse ,NextRequest} from "next/server";
import { generatePdfStream } from "@/utils/pdfStream";

export async function GET(request:NextRequest) {
    try {
      const imobillevalue = request.nextUrl.searchParams.get('imobillevalue')
      const financementvalue = request.nextUrl.searchParams.get('financementvalue')
      const parcels = request.nextUrl.searchParams.get('parcels')
      const expanses = request.nextUrl.searchParams.get('expanse')
      const amortization = request.nextUrl.searchParams.get('amortization')
        const pdfStream = await generatePdfStream(Number(imobillevalue),Number(financementvalue),Number(parcels),Number(expanses),`${amortization}`)
        
        const headers = new Headers({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=my-document.pdf',
          });
      
          const chunks: Uint8Array[] = [];
          for await (const chunk of pdfStream) {
            // Ensure the chunk is an ArrayBuffer or ArrayLike<number>
            if (typeof chunk === 'string') {
              const encoder = new TextEncoder();
              chunks.push(new Uint8Array(encoder.encode(chunk)));
            } else {
              chunks.push(new Uint8Array(chunk));
            }
          }
      
          const pdfBuffer = new Uint8Array(chunks.reduce((acc, chunk) => {
            acc.push(...chunk);
            return acc;
          }, [] as number[]));
      
          const response = new NextResponse(pdfBuffer, { headers });
          return response;
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
    return NextResponse.json({ error: 'Erro ao gerar PDF' }, { status: 500 });
    }
}