import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "../contexts/ThemeContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <LeftSection>
          <Logo href="/">Veli Deniz Ayhan</Logo>
        </LeftSection>

        <RightSection>
          <MenuButton onClick={toggleMenu}>
            <span>☰</span>
          </MenuButton>

          <Nav isOpen={isMenuOpen}>
            <NavLink href="/" active={router.pathname === "/"}>
              Ana Sayfa
            </NavLink>
            <NavLink href="/blog" active={router.pathname === "/blog"}>
              Blog
            </NavLink>
            <NavLink href="/hakkimda" active={router.pathname === "/hakkimda"}>
              Hakkımda
            </NavLink>
            <NavLink href="/iletisim" active={router.pathname === "/iletisim"}>
              İletişim
            </NavLink>
          </Nav>

          <ThemeToggle
            onClick={toggleTheme}
            title={isDark ? "Açık Tema" : "Koyu Tema"}
          >
            {isDark ? "🌞" : "🌙"}
          </ThemeToggle>
        </RightSection>
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: background-color 0.3s ease;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

const Nav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.large};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.background};
    padding: ${({ theme }) => theme.spacing.medium};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(Link)<{ active: boolean }>`
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  font-weight: ${({ active }) => (active ? "600" : "400")};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ThemeToggle = styled.button`
  background: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  margin-left: ${({ theme }) => theme.spacing.medium};
  z-index: 1001;

  &:hover {
    transform: scale(1.1);
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: ${({ theme }) => theme.colors.background};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

export default Header;
