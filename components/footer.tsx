import { Box, Container, Heading, Link, Text } from "@chakra-ui/layout";

export const Footer = () => {
  return (
    <Box as="footer" my="0" bg="#005393cc" py="2">
      <Container maxW="container.xl">
        <Box>
          <Box>
            <Heading size="lg" my="2" color="white">
              VikeLabs is based at the{" "}
              <Link href="https://www.uvic.ca" target="_blank">
                University of Victoria.
              </Link>
            </Heading>
            <Text color="white">
              We acknowledge with respect the Lək̓ʷəŋən peoples on whose
              traditional territory the University of Victoria stands, and the
              Songhees, Esquimalt and W̱SÁNEĆ peoples whose historical
              relationships with the land continue to this day.
            </Text>
          </Box>
        </Box>
        <Box my="2">
          <Text color="whiteAlpha.600">
            © {new Date().getFullYear()} VikeLabs - Victoria B.C. Canada
          </Text>
        </Box>
      </Container>
    </Box>
  );
};
