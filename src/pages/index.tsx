import styled from "styled-components";
import MainLayout from "../layouts/MainLayout";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { useTheme } from "../contexts/ThemeContext";

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
    .order("created_at", { ascending: false })
    .limit(3); // Son 3 yazıyı göster

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

interface HomeProps {
  posts: Post[];
}

const Home = ({ posts }: HomeProps) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Container>
      <ThemeToggleSection>
        <ThemeText>Tema Seçin</ThemeText>
        <ThemeButton
          onClick={toggleTheme}
          title={isDark ? "Açık Tema" : "Koyu Tema"}
        >
          {isDark ? "🌞" : "🌙"}
        </ThemeButton>
      </ThemeToggleSection>

      <MainLayout>
        <Hero>
          <HeroContent>
            <Title>Veli Deniz Ayhan</Title>
            <Subtitle>Yazılım Geliştirici & Blog Yazarı</Subtitle>
            <Description>
              Merhaba! Ben Veli Deniz. Yazılım geliştirme ve teknoloji üzerine
              deneyimlerimi paylaştığım kişisel bloguma hoş geldiniz.
            </Description>
            <CTAButton href="/blog">Blog Yazılarım</CTAButton>
          </HeroContent>
        </Hero>

        <FeaturedSection>
          <SectionTitle>Son Yazılarım</SectionTitle>
          <PostGrid>
            {posts?.map((post) => (
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
          {posts.length > 0 && (
            <ViewAllButton href="/blog">Tüm Yazıları Gör →</ViewAllButton>
          )}
        </FeaturedSection>
      </MainLayout>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.large};
`;

const ThemeToggleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.large} 0;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const ThemeText = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const ThemeButton = styled.button`
  background: ${({ theme }) => theme.colors.background};
  border: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 2rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }
`;

const Hero = styled.section`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  color: white;
  padding: ${({ theme }) => theme.spacing.xlarge} 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.medium};
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.medium};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  opacity: 0.9;
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  padding: ${({ theme }) => `${theme.spacing.medium} ${theme.spacing.large}`};
  border-radius: 4px;
  font-weight: 600;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    color: white;
  }
`;

const FeaturedSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xlarge} 0;
  text-align: center;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
  padding: 0 ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
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
  text-align: left;
`;

const PostTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.small};
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const PostDate = styled.time`
  display: block;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 0.9rem;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const PostExcerpt = styled.p`
  color: ${({ theme }) =>
    theme.isDark ? theme.colors.text : theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  line-height: 1.6;
  font-size: 1rem;
  opacity: 0.95;
  font-weight: ${({ theme }) => (theme.isDark ? "400" : "400")};
`;

const PostLink = styled(Link)`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ViewAllButton = styled(Link)`
  display: inline-block;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: ${({ theme }) => theme.spacing.large};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default Home;
