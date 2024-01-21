import React from 'react'
import CustomCard from '../../../components/CustomCard'
import { Box, Button, Center, Icon, Text, VStack } from '@chakra-ui/react'
import {BsPatchCheckFill}  from "react-icons/bs"
import { Link } from 'react-router-dom'
const ResetPasswordSuccess = () => {
  return (
    <Center minH="100vh">
    <CustomCard 
        p={{
          base:"4",
          md:"10",
      }} 
      showCard={true}
    >
        <VStack spacing={6}>
            <Icon as={BsPatchCheckFill} boxSize={12} color="green"/>
            <Text textStyle="h4" fontWeight="medium" color="p.black">
               Password Reset Done
            </Text>
            <Text textAlign="center" textStyle="p2" color="black.60">
              Now You Can Access Your Account.
            </Text>
            <Box w="full">
              <Link to="/signin">
             <Button w="full">Sign In</Button>
              </Link>
            </Box>
        </VStack>
    </CustomCard>
    </Center>
  )
}

export default ResetPasswordSuccess