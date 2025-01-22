import { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError("");
      setSuccess("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Lütfen bir dosya seçin");
      return;
    }

    if (password !== "112233") {
      setError("Geçersiz şifre");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Dosya yükleme başarısız");
      }

      setSuccess("Dosya başarıyla yüklendi");
      setFile(null);
      setPassword("");
    } catch {
      setError("Dosya yüklenirken bir hata oluştu");
    }
  };

  return (
    <UploadContainer>
      <UploadForm onSubmit={handleSubmit}>
        <FileInput
          type="file"
          onChange={handleFileChange}
          accept="image/*,application/pdf"
        />
        <PasswordInput
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <UploadButton type="submit">Yükle</UploadButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </UploadForm>
    </UploadContainer>
  );
};

const UploadContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.large};
`;

const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const FileInput = styled.input`
  padding: ${({ theme }) => theme.spacing.medium};
  border: 2px dashed ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  cursor: pointer;
`;

const PasswordInput = styled.input`
  padding: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
  font-size: 1rem;
`;

const UploadButton = styled.button`
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
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

const SuccessMessage = styled.p`
  color: green;
  margin-top: ${({ theme }) => theme.spacing.small};
`;

export default FileUpload;
