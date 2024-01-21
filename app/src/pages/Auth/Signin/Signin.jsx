import {
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { object, string, number, date, ref } from "yup";
import CustomCard from "../../../components/CustomCard";
import { useMutation } from "react-query";
import { signinUser } from "../../../api/query/userQuery";
import useAuth from "../../../hooks/useAuth";
let signinValidationSchema = object({
  email: string().email("Email is Invalid").required("Email is Required"),
  password: string()
    .min(6, "Password must hace atleast 6 characters")
    .required("Password is required"),
});
const Signin = () => {
  const toast = useToast();
  const { login } = useAuth();
  const { mutate, isLoading, error, isError } = useMutation({
    mutationKey: ["signin"],
    mutationFn: signinUser,
    onSuccess: (data) => {
      const { token } = data;
      if (token) {
        login(token);
      }
    },
    onError: (error) => {
      toast({
        title: "Signin Error",
        description: error.message,
        status: "error",
      });
    },
  });
  return (
    <Container>
      <Center minH="100vh">
        <CustomCard>
          <Flex direction="column">
            <Text textStyle="h1" fontWeight="medium">
              Welcome to Crypto App
            </Text>
            <Text textStyle="p2" color="black.60" mt={4}>
              Enter your credentials to access the account.
            </Text>
          </Flex>
          <Formik
            initialValues={{
              email: "jhon@gmail.com",
              password: "123456",
            }}
            onSubmit={(values) => {
              mutate({
                email: values.email,
                password: values.password,
              });
              console.log(values);
            }}
            validationSchema={signinValidationSchema}
          >
            {() => (
              <Form>
                <Stack spacing={6} mt={10}>
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
                  <Field name="password">
                    {({ field, meta }) => (
                      <FormControl isInvalid={!!(meta.error && meta.touched)}>
                        <FormLabel htmlFor="password">Password</FormLabel>
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
                  <Flex justify="space-between" alignItems="center">
                    <Checkbox>
                      <Text textStyle="p3">Remember me</Text>
                    </Checkbox>
                    <Link to="/forgot-password">
                      <Text
                        as="span"
                        color="p.purple"
                        textStyle="p3"
                        fontWeight="medium"
                      >
                        Forgot Password?
                      </Text>
                    </Link>
                  </Flex>
                  <Box>
                    <Button
                      isLoading={isLoading}
                      type="submit"
                      w="full"
                      borderRadius={4}
                      fontSize="sm"
                      px="4"
                      py="10px"
                      bg="black.20"
                      color="black.60"
                    >
                      Log In
                    </Button>
                    <Link to="/signup">
                      <Button
                        type="submit"
                        mt={3}
                        w="full"
                        borderRadius={4}
                        fontSize="sm"
                        px="4"
                        py="10px"
                        bg="black.10"
                        color="black"
                      >
                        Create New Account
                      </Button>
                    </Link>
                  </Box>
                </Stack>
              </Form>
            )}
          </Formik>
        </CustomCard>
      </Center>
    </Container>
  );
};

export default Signin;
