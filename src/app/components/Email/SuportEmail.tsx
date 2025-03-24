import {
    Body,
    Container,
    Head,
    Html,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
  interface SuportProps{
    name:string,
    messageEmail:string
  }
  
  export const SuportEmail = ({name,messageEmail}:SuportProps) => (
    <Html>
      <Head />
  
      <Body style={main}>
        <Container>
          <div style={container}>
              <Container style={logo}>
                  <Text style={text}>Logo</Text>
              </Container>
  
              <Container>
                    <Text style = {title}>Nome do cliente/parceiro : {name}</Text>
                    <Text style={textContent}>
                        {messageEmail}
                    </Text>
              </Container>
          </div>
        </Container>
      </Body>
    </Html>
  );
  
  export default SuportEmail;
  
  const main = {
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    backgroundColor: '#ffffff',
  };
  
  const container = {
    width:'800px',
    height:'100%',
    backgroundColor:'#D3D664',
    padding:'20px'
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
    color:'#000'
  }
  
 
