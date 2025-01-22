import styled from "styled-components";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <ToggleButton onClick={toggleTheme}>{isDark ? "🌞" : "🌙"}</ToggleButton>
  );
};

const ToggleButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: 50%;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
  }
`;

export default ThemeToggle;
