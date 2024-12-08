import { Box, useColorModeValue } from "@chakra-ui/react";
import {
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/layout";
import { Contact, DiscordIcon, discordInvite } from "../components/contact";
import { BaseLayout as Layout } from "../layouts/base";
import { Metadata } from "../components/metadata";
import { Button, ButtonGroup } from "@chakra-ui/button";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { NextPage } from "next";
import vikeLabsPhoto from "../public/vikelabs.jpg";
import { FaDiscord } from "react-icons/fa";

const connect =
  "Network with like-minded, passionate other students and professionals within the industry. We're active in on Discord and GitHub.";
const learn =
  "Learn new skills and technologies through workshops and events. Work with peers to build projects and applications.";
const build =
  "Build projects and applications that you can add to your portfolio and resume. ";

export const Index: NextPage = () => {
  const sectionBg = useColorModeValue("gray.100", "gray.700");
  const discordIconColor = useColorModeValue("white", "black");
  const discordButtonBg = useColorModeValue("black", "gray.200");
  const discordButtonHoverBg = useColorModeValue("gray.800", "gray.300");
  const discordButtonTextColor = useColorModeValue("white", "black");

  return (
    <Layout>
      <Script
        src="https://analytics.eu.umami.is/script.js"
        data-website-id="f1ec35c0-1910-4ef4-8558-53b9871ac849"
      ></Script>
      <Metadata title="Home" />
      <Box
        bgGradient={useColorModeValue(
          "linear(to-l, #9bd4d2, #ffc6e3)", // Light mode gradient
          "linear(to-l, #9bafd9, #103783)"  // Dark mode gradient
        )}
      >
        <Container maxW="container.xl">
          <Grid
            templateColumns={[null, "repeat(1, 1fr)", "repeat(2, 1fr)"]}
            gap={15}
            py={["5", "10", "10"]}
          >
            <Flex direction="column" justifyContent="center">
              <Heading
                as="h1"
                fontSize={["4em", "5em", "6em"]}
                color={useColorModeValue("gray.700", "gray.200")}
                lineHeight={[1, 1, 1.15]}
              >
                Connect; Learn; Build;
              </Heading>
              <Text fontSize="1em" color={useColorModeValue("gray.700", "gray.200")} my="5">
                VikeLabs is a collective of students who learn to build, deploy,
                and test software apps. We are a community of student developers,
                designers, and entrepreneurs who are passionate about designing
                software solutions for students and the UVic campus community.
              </Text>
              <ButtonGroup>
                <Link href="/about" passHref>
                  <Button as="a" bg="blue.500" color="white" _hover={{ bg: "blue.600" }}>
                    Learn More
                  </Button>
                </Link>

                <Button
                  bg={discordButtonBg}
                  color={discordButtonTextColor}
                  leftIcon={<FaDiscord color={discordIconColor} />}
                  as="a"
                  href={discordInvite}
                  _hover={{ bg: discordButtonHoverBg }}
                >
                  Join Our Discord!
                </Button>
              </ButtonGroup>
            </Flex>
            <Flex
              direction="column"
              justifyContent="center"
              display={["none", "none", "flex"]}
            >
              <Image
                alt="three VikeLabs members"
                placeholder="blur"
                height={400}
                width={600}
                src={vikeLabsPhoto}
                style={{
                  borderRadius: "20px",
                }}
              />
            </Flex>
          </Grid>
        </Container>
      </Box>
      <Box as="section" py="7" bg={sectionBg}>
        <Container maxW="container.xl">
          <Center my="2">
            <Heading as="h2" size="2xl" my="4">
              How does this work?
            </Heading>
          </Center>
          <Box my="6">
            <Text>
              Each semester starts out with a call for ideas from our members
              during the VikeLabs Kick Off event. If any member is interested 
              in starting a project they can reach out to the VikeLabs admin 
              team, who will setup a Discord channel and GitHub project. 
              Projects can get new members by presenting at the Kick Off event, 
              posting on Discord, and new members reaching out to the project 
              lead. Active projects our listed on the VikeLabs website's
              <a href={"/projects"}> Project page </a>
              and updated once at the beginning of every term.
            </Text>
          </Box>
          <SimpleGrid columns={[1, 1, 3]} spacing={10} my="6">
            {[
              { title: "Connect", body: connect, color: "sectionBg" },
              { title: "Learn", body: learn, color: "sectionBg" },
              { title: "Build", body: build, color: "sectionBg" },
            ].map((item) => (
              <Box
                bg={useColorModeValue("white", "gray.800")}
                borderRadius="xl"
                p="5"
                key={item.title}
              >
                <Center>
                  <Heading as="h3" size="xl" color={item.color} my="3">
                    {item.title}
                  </Heading>
                </Center>
                <Text>{item.body}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      <Box as="section" py="2">
        <Container maxW="container.xl">
          <Contact
            discordButtonProps={{
              bg: discordButtonBg,
              color: discordButtonTextColor,
              leftIcon: <FaDiscord color={discordIconColor} />,
              _hover: { bg: discordButtonHoverBg },
            }}
          />
        </Container>
      </Box>
    </Layout>
  );
};

export default Index;
