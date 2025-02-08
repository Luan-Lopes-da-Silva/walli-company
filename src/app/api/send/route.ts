import { Resend } from 'resend';
import { render } from '@react-email/render';
import { NextResponse } from 'next/server';
import { emailGenerator } from '@/utils/emailGenerator';

const resend = new Resend('re_WX6catn2_2z8CzrixfNZCmhBWU4Z5DbWP');

export async function POST(req: Request) {
  const emailTemplate = await emailGenerator()
  try {
    const body = await req.json();
    const { to, name } = body;

    if (!to || !name) {
      return NextResponse.json({ error: 'Os campos "to" e "name" são obrigatórios.' }, { status: 400 });
    }

    const emailHtml = await render(emailTemplate);

    const data = await resend.emails.send({
      from: 'seunome@resend.dev',
      to,
      subject: 'Bem-vindo à nossa plataforma!',
      html: emailHtml,
    });

    return NextResponse.json({ message: 'E-mail enviado com sucesso!', data });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Erro ao enviar e-mail:', error);
    return NextResponse.json({ error: 'Erro ao enviar e-mail', details: error.message }, { status: 500 });
  }
}
