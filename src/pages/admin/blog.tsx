import { useState, useEffect, FormEvent } from "react";
import styled from "styled-components";
import MainLayout from "../../layouts/MainLayout";
import { createClient } from "@supabase/supabase-js";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string;
  author_id: string;
  created_at: string;
}

const BlogAdminPage = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const { error } = await supabase.from("posts").insert([
        {
          title,
          content,
          image_url: imageUrl,
          author_id: "00000000-0000-0000-0000-000000000000", // Varsayılan yazar ID'si
        },
      ]);

      if (error) throw error;

      setStatus("success");
      setTitle("");
      setContent("");
      setImageUrl("");
      fetchPosts();
    } catch (error) {
      setStatus("error");
      console.error("Error creating post:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bu yazıyı silmek istediğinizden emin misiniz?")) {
      const { error } = await supabase.from("posts").delete().eq("id", id);

      if (!error) {
        fetchPosts();
      }
    }
  };

  return (
    <MainLayout>
      <AdminContainer>
        <Header>
          <h1>Blog Yazıları Yönetimi</h1>
          <BackButton onClick={() => router.push("/admin")}>
            ← Admin Paneline Dön
          </BackButton>
        </Header>

        <Section>
          <h2>Yeni Yazı Ekle</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Başlık</Label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Kapak Görseli URL</Label>
              <Input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>İçerik (Markdown)</Label>
              <MDEditor
                value={content}
                onChange={(value) => setContent(value || "")}
                preview="edit"
              />
            </FormGroup>

            <SubmitButton type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Kaydediliyor..." : "Kaydet"}
            </SubmitButton>

            {status === "success" && (
              <SuccessMessage>Yazı başarıyla kaydedildi!</SuccessMessage>
            )}
            {status === "error" && (
              <ErrorMessage>
                Yazı kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.
              </ErrorMessage>
            )}
          </Form>
        </Section>

        <Section>
          <h2>Mevcut Yazılar</h2>
          <PostList>
            {posts?.map((post) => (
              <PostItem key={post.id}>
                <PostTitle>{post.title}</PostTitle>
                <PostActions>
                  <ActionButton onClick={() => handleDelete(post.id)}>
                    Sil
                  </ActionButton>
                </PostActions>
              </PostItem>
            ))}
          </PostList>
        </Section>
      </AdminContainer>
    </MainLayout>
  );
};

const AdminContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.large};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};

  h1 {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const BackButton = styled.button`
  padding: ${({ theme }) => theme.spacing.medium};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};

  h2 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.large};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
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

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.p`
  color: green;
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.secondary + "20"};
  border-radius: 4px;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: red;
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: #ff000020;
  border-radius: 4px;
  text-align: center;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const PostItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
`;

const PostTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const PostActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
`;

const ActionButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export default BlogAdminPage;
