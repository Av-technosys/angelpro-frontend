import React, { useEffect, useState } from "react";
import {
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  SimpleGrid,
  useColorModeValue,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import { useForm } from "@formspree/react";
import Deposit from "./Deposite";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import TransactionComponent from "./TransactionComponetn";
import UserProfile from "./UserProfile";
import { axiosClient } from "../utils/axiosClient";
import ExchangePage from "./Exchange";
import { useSelector } from "react-redux";

const clearAllCookies = () => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
};
const Sell = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    clearAllCookies();
    alert("User successfully logged out!");
    navigate("/");
  };

  const [showModal, setShowModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [state] = useForm("mrbzgkjq");

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showModal]);

  return (
    <div id="sell">
      <Container
        className="bg-[#222222]"
        as={SimpleGrid}
        maxW={"10xl"}
        spacing={{ base: 10, lg: 32 }}
        p={0}
      >
        <Stack direction={{ base: "column", md: "row" }}>
          <Flex p={8} flex={1} align={"center"} justify={"center"} bg="#222222">
            <Stack spacing={6} w={"full"} maxW={"lg"}>
              <Stack direction={"row"}>
                <Text
                  textTransform={"uppercase"}
                  color={"orange.200"}
                  fontWeight={600}
                  fontSize={"sm"}
                  bg={useColorModeValue("orange.500", "orange.900")}
                  p={2}
                  alignSelf={"flex-start"}
                  rounded={"md"}
                >
                  +32K Trades
                </Text>
                <Text
                  textTransform={"uppercase"}
                  fontWeight={600}
                  fontSize={"sm"}
                  bg="#0a0a0a"
                  p={2}
                  alignSelf={"flex-start"}
                  rounded={"md"}
                >
                  ⭐ ⭐ ⭐ ⭐ ⭐
                </Text>
              </Stack>

              <Heading fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}>
                <Text
                  as={"span"}
                  position={"relative"}
                  _after={{
                    content: "''",
                    width: "full",
                    height: useBreakpointValue({ base: "20%", md: "30%" }),
                    position: "absolute",
                    bottom: 1,
                    left: 0,
                    bg: "#fe5823",
                    zIndex: -1,
                  }}
                  color="white"
                >
                  AngelPro.Online
                </Text>
                <br />{" "}
                <Text color={"#fe5823"} as={"span"}>
                  Trade USDT
                </Text>{" "}
              </Heading>
              <Text fontSize={{ base: "3xl", lg: "2xl" }} color="#bebebe">
                Angel pro is the #1 place to buy and sell USDT which is free,
                and safe with 24/7 support.
              </Text>
              <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                <Button
                  size="lg"
                  w={{ base: "full", md: "100%" }}
                  bg={"#fe5823"}
                  color={"white"}
                >
                  Price
                </Button>
                <Button
                  size="lg"
                  w={{ base: "full", md: "100%" }}
                  variant="outline"
                  color="white"
                  hover={{ color: "black" }}
                >
                  Contact Us
                </Button>
                <Button
                  as={"a"}
                  w={{ base: "full", md: "100%" }}
                  fontSize={"sm"}
                  size="lg"
                  fontWeight={600}
                  href={"#"}
                  color={"white"}
                  bg={"red"}
                  _hover={{
                    bg: "black",
                  }}
                  onClick={() => {
                    logOut();
                    navigate("/login");
                  }}
                >
                  Log Out
                </Button>
              </Stack>
            </Stack>
          </Flex>
          <Flex className="bg-[#222222]" flex={1}>
            <Stack
              p={{ base: 4, sm: 6, md: 8 }}
              spacing={{ base: 8 }}
              flex="1"
              width="100%"
            >
              <Stack spacing={2} align="center">
                <Heading
                  className="text-neutral-100"
                  lineHeight={1.1}
                  fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                >
                  Sell&nbsp;
                  <Text
                    as={"span"}
                    bgGradient="linear(to-r, #fe5823, #fe5823)"
                    bgClip="text"
                  >
                    USDT
                  </Text>
                </Heading>
              </Stack>
              <ExchangePage />
              <p className="text-xs text-yellow-600 bg-yellow-100 p-2 rounded-md border border-yellow-300 mt-4">
                ⚠ For the safety of your funds, please note that the recharge
                address for each order is different. Please double-check
                carefully to avoid the risk of irretrievable funds.
              </p>
            </Stack>
          </Flex>
        </Stack>
      </Container>
      {showModal && <Deposit onClose={() => setShowModal(false)} />}
      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
    </div>
  );
};

export default Sell;
