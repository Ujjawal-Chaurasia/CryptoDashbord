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
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { object, string, number, date, ref } from "yup";
import CustomCard from "../../../components/CustomCard";
import { signupUser } from "../../../api/query/userQuery";
import { useMutation } from "react-query";
import { useRef, useState } from "react";
let signupValidationSchema = object({
  name: string().required("Name is Required"),
  surname: string().required("Surname is Required"),
  email: string().email("Email is Invalid").required("Email is Required"),
  password: string()
    .min(6, "Password must hace atleast 6 characters")
    .required("Password is required"),
  repeatPassword: string()
    .oneOf([ref("password"), null], "Password must match")
    .required(" Repeat password is required"),
});
const Signup = () => {
  const [email, setEmail] = useState("");
  const emailref = useRef("");
  const navigate = useNavigate();
  const toast = useToast();
  const { mutate, isLoading, error, isError } = useMutation({
    mutationKey: ["signup"],
    mutationFn: signupUser,
    onSuccess: (data) => {
      if (emailref.current != "") {
        navigate(`/register-email-verify/${emailref.current}`);
      }
    },
    onError: (error) => {
      toast({
        title: "Signup Error",
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
              Create a free account by filling data below.
            </Text>
          </Flex>
          <Formik
            initialValues={{
              name: "",
              surname: "",
              email: "",
              password: "",
              repeatPassword: "",
            }}
            onSubmit={(values) => {
              setEmail(values.email); //there is a problem
              emailref.current = values.email;
              console.log(values);
              mutate({
                firstName: values.name,
                lastName: values.surname,
                email: values.email,
                password: values.password,
              });
            }}
            validationSchema={signupValidationSchema}
          >
            {() => (
              <Form>
                <Stack spacing={6} mt={10}>
                  <Flex gap={4}>
                    <Field name="name">
                      {({ field, meta }) => (
                        <FormControl isInvalid={!!(meta.error && meta.touched)}>
                          <FormLabel htmlFor="name">Name</FormLabel>
                          <Input {...field} name="name" placeholder="James" />
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="surname">
                      {({ field, meta }) => (
                        <FormControl isInvalid={!!(meta.error && meta.touched)}>
                          <FormLabel htmlFor="surname">Surname</FormLabel>
                          <Input
                            {...field}
                            name="surname"
                            placeholder="Aurther"
                          />
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
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
                  <Field name="repeatPassword">
                    {({ field, meta }) => (
                      <FormControl isInvalid={!!(meta.error && meta.touched)}>
                        <FormLabel htmlFor="repeatPassword">
                          Repeat Password
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
                  <Checkbox>
                    <Text textStyle="p3">
                      I agree with{" "}
                      <Text as="span" color="p.purple">
                        Terms & Conditions.
                      </Text>
                    </Text>
                  </Checkbox>
                  <Button
                    isLoading={isLoading}
                    type="submit"
                    borderRadius={4}
                    fontSize="sm"
                    px="4"
                    py="10px"
                    bg="black.20"
                    color="black.60"
                  >
                    Create Account
                  </Button>
                  <Text textStyle="p3" color="black.60" textAlign="center">
                    Already have an account?
                    <Link to="/signin">
                      <Text as="span" color="p.purple">
                        Log In
                      </Text>
                    </Link>
                  </Text>
                </Stack>
              </Form>
            )}
          </Formik>
        </CustomCard>
      </Center>
    </Container>
  );
};

export default Signup;
