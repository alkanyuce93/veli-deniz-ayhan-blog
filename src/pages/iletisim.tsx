import styled from "styled-components";
import MainLayout from "../layouts/MainLayout";

const ContactPage = () => {
  return (
    <MainLayout>
      <ContactContainer>
        <Title>İletişim</Title>
        <Description>
          Benimle iletişime geçmek veya projelerim hakkında soru sormak için
          aşağıdaki kanalları kullanabilirsiniz.
        </Description>

        <ContactGrid>
          <ContactCard>
            <ContactTitle>GitHub</ContactTitle>
            <ContactLink href="https://github.com/Denizayhan04" target="_blank">
              github.com/Denizayhan04
            </ContactLink>
          </ContactCard>

          <ContactCard>
            <ContactTitle>LinkedIn</ContactTitle>
            <ContactLink
              href="https://www.linkedin.com/in/denizayhan04/"
              target="_blank"
            >
              linkedin.com/in/denizayhan04
            </ContactLink>
          </ContactCard>

          <ContactCard>
            <ContactTitle>E-posta</ContactTitle>
            <ContactLink href="mailto:velidenizayhan@gmail.com">
              velidenizayhan@gmail.com
            </ContactLink>
          </ContactCard>
        </ContactGrid>

        <Note>
          * Sosyal medya üzerinden mesaj gönderebilir veya e-posta ile iletişime
          geçebilirsiniz. En kısa sürede dönüş yapmaya çalışacağım.
        </Note>
      </ContactContainer>
    </MainLayout>
  );
};

const ContactContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xlarge}
    ${({ theme }) => theme.spacing.medium};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
  text-align: center;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
`;

const ContactCard = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ContactTitle = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ContactLink = styled.a`
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Note = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.darkGray};
  text-align: center;
  font-style: italic;
`;

export default ContactPage;
