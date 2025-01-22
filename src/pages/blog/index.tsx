import styled from "styled-components";
import MainLayout from "../../layouts/MainLayout";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export async function getStaticProps() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        posts: [],
      },
    };
  }

  return {
    props: {
      posts: posts || [],
    },
    revalidate: 60,
  };
}

interface BlogPageProps {
  posts: Post[];
}

const BlogPage = ({ posts }: BlogPageProps) => {
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  return (
    <MainLayout>
      <Container>
        <Title>Blog Yazılarım</Title>
        <Description>
          Yazılım geliştirme deneyimlerimi ve öğrendiklerimi paylaştığım
          yazılar.
        </Description>

        <FilterSection>
          <FilterButton
            active={sortOrder === "desc"}
            onClick={() => setSortOrder("desc")}
          >
            En Yeni
          </FilterButton>
          <FilterButton
            active={sortOrder === "asc"}
            onClick={() => setSortOrder("asc")}
          >
            En Eski
          </FilterButton>
        </FilterSection>

        <PostGrid>
          {sortedPosts.map((post) => (
            <PostCard key={post.id}>
              {post.image_url && (
                <PostImage src={post.image_url} alt={post.title} />
              )}
              <PostContent>
                <PostTitle>{post.title}</PostTitle>
                <PostDate>
                  {new Date(post.created_at).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </PostDate>
                <PostExcerpt>
                  {post.content.length > 150
                    ? post.content.substring(0, 150) + "..."
                    : post.content}
                </PostExcerpt>
                <PostLink href={`/blog/${post.id}`}>Devamını Oku →</PostLink>
              </PostContent>
            </PostCard>
          ))}
        </PostGrid>
      </Container>
    </MainLayout>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.large};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  font-family: ${({ theme }) => theme.fonts.heading};
  text-align: center;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
  opacity: 0.95;
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const PostCard = styled.article`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};

  &:hover {
    transform: translateY(-4px);
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PostContent = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
`;

const PostTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.spacing.small};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const PostDate = styled.time`
  display: block;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 0.9rem;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const PostExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  opacity: 0.95;
`;

const PostLink = styled(Link)`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 600;
  display: inline-block;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const FilterButton = styled.button<{ active: boolean }>`
  background: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.background};
  color: ${({ theme, active }) =>
    active ? theme.colors.background : theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }
`;

export default BlogPage;
