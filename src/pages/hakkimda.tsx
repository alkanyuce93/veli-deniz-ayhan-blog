import styled from "styled-components";
import MainLayout from "../layouts/MainLayout";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Blog Sitesi",
    description:
      "Next.js, TypeScript ve Supabase kullanarak geliştirdiğim kişisel blog sitesi.",
    url: "https://github.com/velidenizayhan/blog",
    tech: ["Next.js", "TypeScript", "Supabase", "Styled Components"],
  },
  {
    id: 2,
    title: "E-shopping-MERN",
    description: "MERN stack ile geliştirilmiş e-ticaret uygulaması",
    url: "https://github.com/Denizayhan04/E-shopping-MERN",
    tech: ["MongoDB", "Express.js", "React", "Node.js"],
  },
  {
    id: 3,
    title: "nextjs-ecommerce",
    description: "Next.js ile geliştirilmiş modern e-ticaret projesi",
    url: "https://github.com/Denizayhan04/nextjs-ecommerce",
    tech: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    id: 4,
    title: "Instagram-react",
    description: "React ile geliştirilmiş Instagram klonu",
    url: "https://github.com/Denizayhan04/Instagram-react",
    tech: ["React", "Firebase", "Tailwind CSS"],
  },
  {
    id: 5,
    title: "weather-forecast-turkish",
    description: "Türkçe hava durumu tahmin uygulaması",
    url: "https://github.com/Denizayhan04/weather-forecast-turkish",
    tech: ["React", "OpenWeather API", "CSS"],
  },
];

const AboutPage = () => {
  return (
    <MainLayout>
      <Container>
        <Section>
          <Title>Hakkımda</Title>
          <Description>
            Merhaba! Ben Veli Deniz Ayhan. Yazılım geliştirme konusunda tutkulu
            bir geliştiriciyim. Modern web teknolojileri ile çalışmayı ve yeni
            şeyler öğrenmeyi seviyorum.
          </Description>
        </Section>

        <Section>
          <Title>Projelerim</Title>
          <ProjectGrid>
            {projects.map((project) => (
              <ProjectCard key={project.id}>
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  {project.tech && (
                    <TechStack>
                      {project.tech.map((tech, index) => (
                        <TechTag key={index}>{tech}</TechTag>
                      ))}
                    </TechStack>
                  )}
                  <ProjectLink
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub&apos;da İncele →
                  </ProjectLink>
                </ProjectContent>
              </ProjectCard>
            ))}
          </ProjectGrid>
        </Section>

        <Section>
          <Title>Bağlantılar</Title>
          <SocialLinks>
            <SocialLink
              href="https://github.com/velidenizayhan"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </SocialLink>
            <SocialLink
              href="https://linkedin.com/in/velidenizayhan"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </SocialLink>
          </SocialLinks>
        </Section>
      </Container>
    </MainLayout>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.large};
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  font-size: 1.1rem;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  opacity: 0.95;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const ProjectCard = styled.article`
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

const ProjectContent = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
`;

const ProjectTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.spacing.small};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  opacity: 0.95;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const TechTag = styled.span`
  background: ${({ theme }) => `${theme.colors.primary}15`};
  color: ${({ theme }) => theme.colors.primary};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const ProjectLink = styled(Link)`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 600;
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.small};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const SocialLink = styled(Link)`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 600;
  font-size: 1.1rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default AboutPage;
