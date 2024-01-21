import React from "react";
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
  Spinner
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { object, ref, string } from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { verifyForgotToken } from "../../../api/query/userQuery";
let resetValidationSchema = object({
  password: string()
    .min(6, "Password must hace atleast 6 characters")
    .required("Password is required"),
  repeatPassword: string()
    .oneOf([ref("password"), null], "Password must match")
    .required(" Repeat password is required"),
});
const ResetPassword = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { token } = useParams();
  const { isLoading, mutate } = useMutation({
    mutationKey: ["verify-forgot-token"],
    mutationFn:verifyForgotToken,
    enabled: !!token,
    onError: (error) => {
      toast({
        title: "SignUp error",
        description: "error.message",
        status: "error",
      });
    },
    onSettled: () => {
        navigate("/reset-success");
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
      <CustomCard>
        <Text textStyle="h1" mt={4} fontWeight="medium">
          Reset Password
        </Text>
        <Text textStyle="p2" color="black.60" mt={4}>
          Enter your new password.
        </Text>
        <Formik
          initialValues={{
            password: "",
            repeatPassword: "",
          }}
          onSubmit={(values) => {
            console.log(values);
            mutate({token,password:values.password})
          }}
          validationSchema={resetValidationSchema}
        >
          {() => (
            <Form>
              <Stack spacing={6} mt={8}>
                <Field name="password">
                  {({ field, meta }) => (
                    <FormControl isInvalid={!!(meta.error && meta.touched)}>
                      <FormLabel htmlFor="password"> New Password</FormLabel>
                      <Input
                        {...field}
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="repeatPassword">
                  {({ field, meta }) => (
                    <FormControl isInvalid={!!(meta.error && meta.touched)}>
                      <FormLabel htmlFor="repeatPassword">
                        Repeat New Password
                      </FormLabel>
                      <Input
                        {...field}
                        type="password"
                        name="repeatPassword"
                        placeholder="Repeat Password"
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

export default ResetPassword;
