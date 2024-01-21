import React, { useRef } from "react";
import CustomCard from "../../../components/CustomCard";
import {
  Box,
  Button,
  Center,
  Icon,
  Text,
  Stack,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { sendForgotMail } from "../../../api/query/userQuery";
import { useMutation } from "react-query";

const ForgotPassword = () => {
    const forgotValidationSchema = object({
      email: string().email("Email is Invalid").required("Email is Required"),
    });
  const toast = useToast();
  const navigate = useNavigate();
  const emailRef=useRef("");
  const { isLoading, isSuccess, mutate } = useMutation({
    mutationKey: ["forgot-email"],
    mutationFn: sendForgotMail,
    onSettled: (data) => {
      console.log(data);
      navigate(`/forgot-success/${emailRef.current}`);
    },
    onError: (error) => {
      toast({
        title: "forgot Error",
        description: error.message,
        status: "error",
      });
    },
  });

  return (
    <Center minH="100vh">
      <CustomCard>
        <Link to="/signin">
          <Icon as={AiOutlineArrowLeft} boxSize={6} />
        </Link>
        <Text textStyle="h1" mt={4} fontWeight="medium">
          Forgot Password
        </Text>
        <Text textStyle="p2" color="black.60" mt={4}>
          Enter your email address for which account you want to reset your
          password.
        </Text>
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={(values) => {
            console.log(values);
            emailRef.current=values.email;
            mutate({ email: values.email });
          }}
          validationSchema={forgotValidationSchema}
        >
          {() => (
            <Form>
              <Stack spacing={6} mt={8}>
                <Field name="email">
                  {({ field, meta }) => (
                    <FormControl isInvalid={!!(meta.error && meta.touched)}>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        {...field}
                        type="email"
                        name="email"
                        placeholder="name@email.com"
                      />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Box>
                  <Button type="submit" w="full">
                    Reset Password
                  </Button>
                </Box>
              </Stack>
            </Form>
          )}
        </Formik>
      </CustomCard>
    </Center>
  );
};

export default ForgotPassword;
