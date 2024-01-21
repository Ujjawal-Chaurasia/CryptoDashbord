import { Card } from '@chakra-ui/react'
import React from 'react'


const CustomCard = ({children,  showCard=false,...props}) => {
  return (
    <Card
    bg={{
        base:showCard?"white":"transparent",
        md:'white',
    }}
    p={{
        base:showCard?"4":"0",
        md:"6",
    }} 
    borderRadius={{
        base:showCard?"1rem":"none",
        md:"1rem",
    }}
    boxShadow={{
        base:showCard?"md":"none",
        md:"lg",
    }}
    w="456px"
    {...props}
    >
        {children}
    </Card>
  )
}

export default CustomCard