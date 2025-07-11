"use client";

import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChatIcon, MinusIcon, UnlockIcon } from "@chakra-ui/icons";

const FeatureStack = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

const Feature = () => {
  return (
    <div id="featureStacks">
      <Container maxW={"5xl"} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Text
              textTransform={"uppercase"}
              color={"orange.400"}
              fontWeight={600}
              fontSize={"sm"}
              bg={useColorModeValue("orange.50", "orange.900")}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              Our Features
            </Text>
            <Heading>Free, secure, 24/7 support.</Heading>
            <Text color={"gray.500"} fontSize={"lg"}>
              Trade with confidence on our crypto sell platform, where you can
              enjoy zero fees and the highest level of security. Experience
              round-the-clock support from our dedicated team, ensuring a
              seamless and safe trading experience anytime, anywhere.
            </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.100", "gray.700")}
                />
              }
            >
              <FeatureStack
                icon={<Icon as={ChatIcon} color={"yellow.500"} w={5} h={5} />}
                iconBg={useColorModeValue("yellow.100", "yellow.900")}
                text={"24/7 Support"}
              />
              <FeatureStack
                icon={<Icon as={MinusIcon} color={"green.500"} w={5} h={5} />}
                iconBg={useColorModeValue("green.100", "green.900")}
                text={"Free Transaction"}
              />
              <FeatureStack
                icon={<Icon as={UnlockIcon} color={"purple.500"} w={5} h={5} />}
                iconBg={useColorModeValue("purple.100", "purple.900")}
                text={"Secure & Safe"}
              />
            </Stack>
          </Stack>
          <Flex>
            <Image
              rounded={"md"}
              alt={"feature image"}
              src={
                "https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              }
              objectFit={"cover"}
            />
          </Flex>
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default Feature;
