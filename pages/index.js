import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  SimpleGrid,
  Button,
  List,
  ListItem,
  useColorModeValue,
  Text,
  Badge,
  AspectRatio
} from '@chakra-ui/react'
import { ChevronRightIcon, EmailIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { GridItem } from '../components/grid-item'
import { IoLogoTwitter, IoLogoInstagram, IoLogoGithub } from 'react-icons/io5'
import thumbYouTube from '../public/images/links/youtube.png'
import thumbInkdrop from '../public/images/works/inkdrop_eyecatch.png'
import Image from 'next/image'

// Sample posts data structure
// In a real implementation, this would come from:
// - An API endpoint via getServerSideProps
// - Markdown files fetched dynamically
// - A headless CMS (Contentful, Sanity, etc.)
// Post fields: image, url, title, description, tags, category, date
const samplePosts = [
  {
    id: 1,
    title: 'AI and Virtual Reality in Education',
    description: 'Exploring how emerging technologies are transforming classroom learning experiences and student engagement.',
    image: '/images/works/styly_eyecatch.png',
    url: '/posts/ai-vr-education',
    date: '2024-01-15',
    category: 'Research',
    tags: ['AI', 'VR', 'Education']
  },
  {
    id: 2,
    title: 'Experiential Learning in Business',
    description: 'Connecting theoretical knowledge with practical industry applications through innovative teaching methods.',
    image: '/images/works/inkdrop_eyecatch.png',
    url: '/posts/experiential-learning',
    date: '2023-12-20',
    category: 'Teaching',
    tags: ['Business', 'Pedagogy', 'Innovation']
  },
  {
    id: 3,
    title: 'Decision Making and Technology',
    description: 'Investigating the intersection of cognitive science and digital tools in modern decision-making processes.',
    image: '/images/works/walknote_eyecatch.png',
    url: '/posts/decision-making-tech',
    date: '2023-11-10',
    category: 'Research',
    tags: ['Cognitive Science', 'Technology', 'Psychology']
  },
  {
    id: 4,
    title: 'Student Engagement Strategies',
    description: 'Practical approaches to foster active participation and meaningful learning in higher education.',
    image: '/images/works/modetokyo_eyecatch.png',
    url: '/posts/student-engagement',
    date: '2023-10-05',
    category: 'Teaching',
    tags: ['Education', 'Engagement', 'Best Practices']
  }
]

const Home = ({ posts = samplePosts }) => {
  // Featured post (hero) - first post if available
  const featuredPost = posts.length > 0 ? posts[0] : null
  // Remaining posts for grid
  const remainingPosts = posts.length > 1 ? posts.slice(1) : []
  
  // Color mode values - must be called at the top level
  const heroBg = useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')
  const cardBg = useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')
  const textColor = useColorModeValue('gray.600', 'gray.400')
  const dateColor = useColorModeValue('gray.500', 'gray.400')
  const infoBg = useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')

  return (
  <Layout>
    {/* Featured Hero Section - displays the first post as a featured hero */}
    {featuredPost && (
      <Box mb={10}>
        <Container maxW="container.xl">
          <Box
            position="relative"
            borderRadius="lg"
            overflow="hidden"
            bg={heroBg}
            css={{ backdropFilter: 'blur(10px)' }}
          >
            <AspectRatio ratio={21 / 9} maxH="400px">
              <Box position="relative">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bg="blackAlpha.600"
                />
              </Box>
            </AspectRatio>
            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              p={8}
              color="white"
            >
              <Badge colorScheme="teal" mb={2}>
                {featuredPost.category}
              </Badge>
              <Text fontSize="sm" mb={2} opacity={0.9}>
                {new Date(featuredPost.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
              <Heading as="h2" size="xl" mb={3}>
                {featuredPost.title}
              </Heading>
              <Text fontSize="lg" mb={4} opacity={0.95}>
                {featuredPost.description}
              </Text>
              <Button
                as={NextLink}
                href={featuredPost.url}
                colorScheme="teal"
                size="lg"
                rightIcon={<ChevronRightIcon />}
              >
                Read Now
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    )}

    {/* Posts Grid Section - displays remaining posts in a grid layout */}
    {remainingPosts.length > 0 && (
      <Container maxW="container.xl" mb={10}>
        <Heading as="h3" fontSize={24} mb={6}>
          Recent Posts
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} gap={6}>
          {remainingPosts.map(post => (
            <Box
              key={post.id}
              borderRadius="lg"
              overflow="hidden"
              bg={cardBg}
              transition="transform 0.2s"
              _hover={{ transform: 'translateY(-4px)' }}
            >
              <Link as={NextLink} href={post.url} style={{ textDecoration: 'none' }}>
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </AspectRatio>
                <Box p={4}>
                  <Badge colorScheme="teal" mb={2}>
                    {post.category}
                  </Badge>
                  <Text fontSize="xs" mb={2} color={dateColor}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Text>
                  <Heading as="h4" size="md" mb={2}>
                    {post.title}
                  </Heading>
                  <Text fontSize="sm" noOfLines={3} color={textColor}>
                    {post.description}
                  </Text>
                  <Box mt={3}>
                    {post.tags.map(tag => (
                      <Badge key={tag} mr={2} mb={2} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </Box>
                </Box>
              </Link>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    )}

    <Container>
      <Box
        borderRadius="lg"
        mb={6}
        p={3}
        textAlign="center"
        bg={infoBg}
        css={{ backdropFilter: 'blur(10px)' }}
      >
        Hello, I&apos;m an researcher & teacher in the U.S.!
      </Box>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Hongxiao Yu
          </Heading>
          <p>Researcher / Teacher / Traveler</p>
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          textAlign="center"
        >
          <Box
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            w="100px"
            h="100px"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          >
            <Image
              src="/images/profile.jpg"
              alt="Profile image"
              width="100"
              height="100"
            />
          </Box>
        </Box>
      </Box>

      <Section delay={0.0}>
        <Heading as="h3" variant="section-title">
          Work
        </Heading>
        <Paragraph>
          I&apos;m a{' '}
          <Link as={NextLink} href="https://www.luther.edu/faculty/hongxiao-yu" passHref scroll={false}>
            professor
          </Link>
          {' '}and{' '}
          <Link as={NextLink} href="https://scholar.google.com/citations?hl=en&user=r6G7LEQAAAAJ" passHref scroll={false}>
            scholar
          </Link>{' '}
          who loves connecting classroom learning with real-world business. With experience in AI, VR, and industry projects, I I am passionate about creating experiential learning for students and exploring how technology shapes the way people think, decide, and act.
        </Paragraph>
        <Box align="center" my={4}>
          <Button
            as={NextLink}
            href="/works"
            scroll={false}
            rightIcon={<ChevronRightIcon />}
            colorScheme="teal"
          >
            My portfolio
          </Button>
        </Box>
      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
         </Heading>
        <BioSection>
          <BioYear>Present</BioYear>
          Assistant Professor, Luther College, Decorah IA, U.S.A.
        </BioSection>
        <BioSection>
          <BioYear>2020</BioYear>
          Instructor, University of South Carolina, Columbia SC, U.S.A.
        </BioSection>
        <BioSection>
          <BioYear>2016</BioYear>
          NBA Reporter, Golden State Warriors, Tencent Inc., Oakland CA, U.S.A.
        </BioSection>
        <BioSection>
          <BioYear>2015</BioYear>
          Business Development Manager, Tencent Inc., Beijing, China
        </BioSection>
        <BioSection>
          <BioYear>2012</BioYear>
          Assistant Director of Media, Total Sports Asia Inc., Beijing, China
        </BioSection>
        <BioSection>
          <BioYear>2009</BioYear>
          Activity Coordinator, Tuopu Inc., Wuhan, China
        </BioSection>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          I ♥
        </Heading>
        <Paragraph>
          Art, Music,{' '}
          <Link href="https://illust.odoruinu.net/" target="_blank">
            Travel
          </Link>
          , Cook,{' '}
          <Link href="https://500px.com/p/craftzdog" target="_blank">
            Photography
          </Link>
          , Dance
        </Paragraph>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          On the web
        </Heading>
        <List>
          <ListItem>
            <Link href="https://github.com/craftzdog" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoGithub />}
              >
                @craftzdog
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://twitter.com/inkdrop_app" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoTwitter />}
              >
                @inkdrop_app (English)
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://twitter.com/craftzdog" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoTwitter />}
              >
                @craftzdog (日本語)
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://instagram.com/craftzdog" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoInstagram />}
              >
                @craftzdog
              </Button>
            </Link>
          </ListItem>
        </List>

        <SimpleGrid columns={[1, 2, 2]} gap={6}>
          <GridItem
            href="https://www.youtube.com/devaslife"
            title="Dev as Life"
            thumbnail={thumbYouTube}
          >
            My YouTube channel (&gt;200k subs)
          </GridItem>
          <GridItem
            href="https://www.inkdrop.app/"
            title="Inkdrop"
            thumbnail={thumbInkdrop}
          >
            A Markdown note-taking app
          </GridItem>
        </SimpleGrid>

        <Heading as="h3" variant="section-title">
          Newsletter
        </Heading>
        <p>
          Join me on a behind-the-scenes coding journey. Weekly updates on
          projects, tutorials, and videos
        </p>

        <Box align="center" my={4}>
          <Button
            as={NextLink}
            href="https://www.devas.life/"
            scroll={false}
            leftIcon={<EmailIcon />}
            colorScheme="teal"
          >
            Sign up my newsletter here
          </Button>
        </Box>
      </Section>
    </Container>
  </Layout>
)}

export default Home
export { getServerSideProps } from '../components/chakra'
