import { NextResponse, NextRequest } from "next/server";
import { generatePdfStream } from "@/utils/pdfStream";

export async function GET(request: NextRequest) {
  try {
    const imobillevalue = request.nextUrl.searchParams.get("imobillevalue");
    const financementvalue = request.nextUrl.searchParams.get("financementvalue");
    const parcels = request.nextUrl.searchParams.get("parcels");
    const amortization = request.nextUrl.searchParams.get("amortization");

    // Gera o stream do PDF
    const pdfStream = await generatePdfStream(
      Number(imobillevalue),
      Number(financementvalue),
      Number(parcels),
      amortization ?? ""
    );

    // Cabeçalhos da resposta
    const headers = new Headers({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=my-document.pdf",
    });

    const chunks: Uint8Array[] = [];
    for await (const chunk of pdfStream) {
      if(typeof chunk === "string"){
        const encoder = new TextEncoder()
        chunks.push(new Uint8Array(encoder.encode(chunk)))
      }else if(chunk instanceof ArrayBuffer){
        chunks.push(new Uint8Array(chunk))
      }else{
        chunks.push(new Uint8Array(chunk))
      }
    }

    const pdfBuffer = Buffer.concat(chunks);

    return new NextResponse(pdfBuffer, { headers });
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Erro ao gerar PDF' }, { status: 500 });
  }
}
