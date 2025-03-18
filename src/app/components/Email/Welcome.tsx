import {
  Body,
  Container,
  Head,
  Html,
  Text,
} from '@react-email/components';
import * as React from 'react';

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

  interface WelcomeProps{
    clientName:string
  }

export const WelcomeEmail = ({clientName}:WelcomeProps) => (
  <Html>
    <Head />

    <Body style={main}>
      <Container style={container}>
            <Container style={logo}>
                <Text style={text}>Logo</Text>
            </Container>

            <Container style={welcomeContainer}>
              <Text style={title}>

              Prezado(a) {clientName},

              </Text>
                <Text>
                Seja bem-vindo(a) à nossa plataforma! Agradecemos por confiar em nossos serviços.
                Informamos que o seu processo foi registrado com sucesso em nosso sistema e agora está aguardando o aceite de um de nossos consultores. 
                O prazo para o consultor aceitar o processo é de até [inserir tempo estimado, ex: 48 horas úteis].
                Seu número de protocolo é: [Número do Protocolo]. Este número pode ser utilizado para acompanhar o andamento do seu processo 
                em nossa plataforma ou em futuras comunicações com nossa equipe.
                </Text>
            </Container>

            <Container style={welcomeContainer}>
                <Text style={title}>Próximos passos</Text>
                <Text style={textContent}>
                Após o aceite do consultor, o processo dará continuidade, e para facilitar essa etapa, solicitamos que prepare os seguintes documentos:
                </Text>
                <Text>
                  <ul style={list}>
                    <div style={documents}>
                        <ul>
                        <h1 style={title}>Imovel</h1>
                          <li>RG + CPF</li>
                          <li>Certidão de casamento ou nascimento</li>
                          <li>Comprovante de endereço</li>
                        </ul>
                    </div>
                    <div style={documents}>
                      <ul>
                        <h1 style={title}>Vendedor</h1>
                        <li>RG + CPF</li>
                        <li>Certidão de casamento ou nascimento</li>
                        <li>Comprovante de endereço</li>
                      </ul>
                    </div>
                    <div style={documents}>
                      <ul>
                        <h1 style={title}>Comprador</h1>
                        <li>RG + CPF</li>
                        <li>Certidão de casamento ou nascimento</li>
                        <li>Comprovante de endereço</li>
                      </ul>
                    </div>
                  </ul>
             
                </Text>
                <Text style={textContent}></Text>
            </Container>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: '#ffffff',
};

const container = {
  width:'800px',
  height:'100%',
  backgroundColor:'#D3D664'
};

const logo = {
    backgroundColor:'#028DA5',
    width:'100px',
    height:'100px',
    padding:'20px',
    borderRadius:'50%',
    margin:'12px',
    display:'grid',
    placeItems:'center',
    justifyContent:'center',
    alignItems:'center'
}

const text = {
  width:'100%',
  TextAlign:'center',
  padding:'0px 7px',
  color:'#000'
}

const textContent = {
fontSize:'14px',
fontWeight:'light',
color:'#000'
}

const title = {
marginBottom:"4px",
fontSize:'20px',
fontWeight:'bold',
width:'100%',
color:'#000',
display:'block'
}

const welcomeContainer = {
    marginTop:'20px',
    width:'300px'
}

const list = {
  padding:'0px 12px',
  display:'flex',
  gap:'12px',
}

const documents = {
  display:'flex',
  gap:'8px'
}
