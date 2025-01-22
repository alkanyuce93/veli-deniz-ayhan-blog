import styled from "styled-components";
import MainLayout from "../../layouts/MainLayout";
import { createClient } from "@supabase/supabase-js";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";

interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string;
  author_id: string;
  created_at: string;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: posts } = await supabase.from("posts").select("id");

  const paths =
    posts?.map((post) => ({
      params: { slug: post.id },
    })) || [];

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", params?.slug)
    .single();

  if (error || !post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

interface BlogPostProps {
  post: Post;
}

const BlogPost = ({ post }: BlogPostProps) => {
  const excerpt =
    post.content.length > 150
      ? post.content.substring(0, 150) + "..."
      : post.content;

  return (
    <MainLayout>
      <Head>
        <title>{post.title} - Veli Deniz Ayhan Blog</title>
        <meta name="description" content={excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={excerpt} />
        {post.image_url && (
          <meta property="og:image" content={post.image_url} />
        )}
      </Head>

      <ArticleContainer>
        {post.image_url && <CoverImage src={post.image_url} alt={post.title} />}

        <ArticleHeader>
          <Title>{post.title}</Title>
          <PublishDate>
            {new Date(post.created_at).toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </PublishDate>
        </ArticleHeader>

        <Content dangerouslySetInnerHTML={{ __html: post.content }} />
      </ArticleContainer>
    </MainLayout>
  );
};

const ArticleContainer = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.large};
`;

const CoverImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const ArticleHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const PublishDate = styled.time`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 1.1rem;
`;

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;

  h2 {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.primary};
    margin: ${({ theme }) => theme.spacing.large} 0
      ${({ theme }) => theme.spacing.medium};
  }

  h3 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
    margin: ${({ theme }) => theme.spacing.large} 0
      ${({ theme }) => theme.spacing.medium};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.medium};
  }

  ul,
  ol {
    margin: ${({ theme }) => theme.spacing.medium} 0;
    padding-left: ${({ theme }) => theme.spacing.large};
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.small};
  }

  blockquote {
    margin: ${({ theme }) => theme.spacing.large} 0;
    padding: ${({ theme }) => theme.spacing.medium};
    border-left: 4px solid ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.lightGray};
    font-style: italic;
  }

  code {
    background-color: ${({ theme }) => theme.colors.lightGray};
    padding: 2px 4px;
    border-radius: 4px;
    font-family: monospace;
  }

  pre {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    padding: ${({ theme }) => theme.spacing.medium};
    border-radius: 8px;
    overflow-x: auto;
    margin: ${({ theme }) => theme.spacing.medium} 0;

    code {
      background-color: transparent;
      color: inherit;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: ${({ theme }) => theme.spacing.medium} 0;
  }

  a {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: underline;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export default BlogPost;
