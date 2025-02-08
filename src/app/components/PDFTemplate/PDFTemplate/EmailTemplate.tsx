import { Html, Head, Body, Container, Heading, Text } from '@react-email/components';

export async function WelcomeEmail(){
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Heading>Bem-vindo</Heading>
          <Text>Obrigado por se inscrever.</Text>
        </Container>
      </Body>
    </Html>
  );
};
