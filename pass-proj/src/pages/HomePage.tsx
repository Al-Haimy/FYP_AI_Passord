import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
} from '@chakra-ui/react';
import React from 'react'

const HomePage = () => {
  return (
    <Container maxW={'5xl'}>
    <Stack
      textAlign={'center'}
      align={'center'}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}>
      <Heading
        fontWeight={600}
        fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
        lineHeight={'110%'}>
        Meeting scheduling{' '}
        <Text as={'span'} color={'orange.400'}>
          made easy
        </Text>
      </Heading>
      <Text color={'gray.500'} maxW={'3xl'}>
        Never miss a meeting. Never be late for one too. Keep track of your
        meetings and receive smart reminders in appropriate times. Read your
        smart “Daily Agenda” every morning.
      </Text>
      <Stack spacing={6} direction={'row'}>
        <Button
          rounded={'full'}
          px={6}
          colorScheme={'orange'}
          bg={'orange.400'}
          _hover={{ bg: 'orange.500' }}>
          Get started
        </Button>
        <Button rounded={'full'} px={6}>
          Learn more
        </Button>
      </Stack>
      <Flex w={'full'}>
        <Illustration
          height={{ sm: '24rem', lg: '28rem' }}
          mt={{ base: 12, sm: 16 }}
        />
      </Flex>
    </Stack>
  </Container>
);
}

export const Illustration = (props: IconProps) => {
return (
  <Icon
    width="100%"
    viewBox="0 0 702 448"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>

    <defs>
      <linearGradient
        id="paint0_linear"
        x1="190.265"
        y1="345.577"
        x2="527.144"
        y2="147.032"
        gradientUnits="userSpaceOnUse">
        <stop stopColor="#B8D8D5" />
        <stop offset="0.42" stopColor="#CEE0DA" />
        <stop offset="1" stopColor="#FFF0E6" />
      </linearGradient>
      <linearGradient
        id="paint1_linear"
        x1="79.5502"
        y1="106.847"
        x2="-86.7512"
        y2="315.127"
        gradientUnits="userSpaceOnUse">
        <stop stopColor="#B8D8D5" />
        <stop offset="0.47" stopColor="#CCDFDA" />
        <stop offset="1" stopColor="#FFF0E6" />
      </linearGradient>
      <linearGradient
        id="paint2_linear"
        x1="568.572"
        y1="150.967"
        x2="671.263"
        y2="250.917"
        gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFBF2F" />
        <stop offset="1" stopColor="#FD9500" />
      </linearGradient>
      <linearGradient
        id="paint3_linear"
        x1="638.8"
        y1="337.91"
        x2="471.34"
        y2="225.092"
        gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFBF2F" />
        <stop offset="0.48" stopColor="#FEB422" />
        <stop offset="1" stopColor="#FD9500" />
      </linearGradient>
    </defs>
  </Icon>
  )
}

export default HomePage