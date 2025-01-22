import { useState, FormEvent } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import MainLayout from "../../layouts/MainLayout";

const AdminPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password === "112233") {
      router.push("/admin/blog");
    } else {
      setError("Geçersiz şifre");
    }
  };

  return (
    <MainLayout>
      <AdminContainer>
        <h1>Admin Paneli</h1>
        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Şifre</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin şifresini girin"
            />
          </FormGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <SubmitButton type="submit">Giriş Yap</SubmitButton>
        </LoginForm>
      </AdminContainer>
    </MainLayout>
  );
};

const AdminContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.large};
  text-align: center;

  h1 {
    margin-bottom: ${({ theme }) => theme.spacing.xlarge};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
  text-align: left;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SubmitButton = styled.button`
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: ${({ theme }) => theme.spacing.small};
`;

export default AdminPage;
