import styled from "styled-components";
import Link from "next/link";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <LayoutWrapper>
      <Header>
        <Nav>
          <Logo>
            <Link href="/">Veli Deniz Ayhan</Link>
          </Logo>
          <NavLinks>
            <Link href="/">Ana Sayfa</Link>
            <Link href="/hakkimda">Hakkımda</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/iletisim">İletişim</Link>
          </NavLinks>
        </Nav>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <p>
          &copy; {new Date().getFullYear()} Veli Deniz Ayhan. Tüm hakları
          saklıdır.
        </p>
      </Footer>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.medium};
  }
`;

const Logo = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;

  a {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.large};

  a {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.small};
    text-align: center;
  }
`;

const Main = styled.main`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.large};
  width: 100%;
`;

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.large};
  text-align: center;
`;

export default MainLayout;
