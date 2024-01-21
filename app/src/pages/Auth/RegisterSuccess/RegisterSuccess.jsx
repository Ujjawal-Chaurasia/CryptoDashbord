import React from "react";
import CustomCard from "../../../components/CustomCard";
import {
  Box,
  Button,
  Center,
  Icon,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { BsPatchCheckFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { verifyEmailAddressSignup } from "../../../api/query/userQuery";
const RegisterSuccess = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { token } = useParams();
  const { isSuccess, isLoading } = useQuery({
    queryKey: ["verify-email-token"],
    queryFn: () => verifyEmailAddressSignup({ token }),
    enabled: !!token,
    onError: (error) => {
      toast({
        title: "SignUp error",
        description: "error.message",
        status: "error",
      });
      navigate("/signup");
    },
  });
  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );
  }
  return (
    <Center minH="100vh">
      {isSuccess && (
        <CustomCard
          p={{
            base: "4",
            md: "10",
          }}
          showCard={true}
        >
          <VStack spacing={6}>
            <Icon as={BsPatchCheckFill} boxSize={12} color="green" />
            <Text textStyle="h4" fontWeight="medium" color="p.black">
              Successfully Registration
            </Text>
            <Text textAlign="center" textStyle="p2" color="black.60">
              Hurray! You have successfully created your account. Enter the app
              to explore all it’s features.
            </Text>
            <Box w="full">
              <Link to="/signin">
                <Button w="full">Enter the app</Button>
              </Link>
            </Box>
          </VStack>
        </CustomCard>
      )}
    </Center>
  );
};

export default RegisterSuccess;
