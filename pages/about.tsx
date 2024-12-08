// about.tsx
import {
  Box,
  Flex,
  Grid,
  Container,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Supporters } from "../components/supporters";
import kickoff2021 from "../public/kickoff2021.jpg";
import { Metadata } from "../components/metadata";
import { Contact } from "../components/contact";
import { SimpleGrid } from "@chakra-ui/layout";
import { BaseLayout } from "../layouts/base";
import { Faq } from "../components/faq";
import { NextPage } from "next";
import Image from "next/image";

export const About: NextPage = () => {
  // Use color mode values
  const headingColor = useColorModeValue("gray.700", "gray.200");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const bgColor1 = useColorModeValue("#108091", "#1A365D");
  const bgColor2 = useColorModeValue("#f28022", "#5C2D91");

  return (
    <BaseLayout>
      <Metadata
        title="About"
        description="Learn more about VikeLabs, its mission, and its members."
      />
      <Box>
        <Container maxW="container.xl">
          <Grid
            templateColumns={[null, "repeat(1, 1fr)", "repeat(2, 1fr)"]}
            gap={15}
            py={["5", "7", "7"]}
          >
            <Flex direction="column" justifyContent="center">
              <Heading
                as="h1"
                fontSize={["4em", "5em", "6em"]}
                color={headingColor}
                lineHeight={[1, 1, 1.15]}
              >
                VIKELABS
              </Heading>
              <Text fontSize="1em" color={textColor} my="5">
                VikeLabs is a collective of students who learn to build, deploy,
                and test software apps. We are a community of student developers,
                designers, and entrepreneurs who are passionate about designing
                software solutions for students and the UVic campus community.
              </Text>
            </Flex>
            <Flex
              direction="column"
              justifyContent="center"
              display={["none", "none", "flex"]}
            >
              <Image
                alt="Three VikeLabs members"
                placeholder="blur"
                height={450}
                width={600}
                src={kickoff2021}
                style={{
                  borderRadius: "20px",
                }}
              />
            </Flex>
          </Grid>
        </Container>
      </Box>

      <Box py="10" bg={bgColor1} my="5">
        <Container maxW="container.xl">
          <SimpleGrid columns={[1, 1, 2]} spacing={10}>
            <Heading color="white">
              We're part of the University of Victoria Students' Society
            </Heading>
            <Text color="white">
              We get funding from the UVSS to run our events and workshops each
              semester. We also get access to the UVSS's resources like rooms
              and equipment. Special project grants are also available through
              the UVSS.
            </Text>
          </SimpleGrid>
        </Container>
      </Box>
      <Box py="10" bg={bgColor2} my="5">
        <Container maxW="container.xl">
          <SimpleGrid columns={[1, 1, 2]} spacing={10}>
            <Heading color="white">
              We're part of the UVic Engineering & Computer Science Students'
              Society
            </Heading>
            <Text color="white">
              We get funding from the UVic Engineering & Computer Science
              Students' Society to support our projects and events. Each year,
              we also get access to the Cinkant grant, which is a grant for
              special projects.
            </Text>
          </SimpleGrid>
        </Container>
      </Box>
      <Box py="10">
        <Container maxW="container.xl">
          <Heading mb="5">FAQ</Heading>
          <Faq />
          <Supporters />
          <Contact />
        </Container>
      </Box>
    </BaseLayout>
  );
};

export default About;