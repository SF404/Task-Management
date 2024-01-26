import {
    Box,
    Button,
    Center,
    DarkMode,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    useToast,
} from "@chakra-ui/react";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { signup } from "../services/api";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';


const Signup = () => {
    const toast = useToast();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleInput = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            console.log(userData)
            const response = await signup(userData);
            console.log(response)
            navigate('/login')

            toast({
                title: "",
                description: response.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });

        } catch (error) {
            console.error("Login failed:", error);

            toast({
                title: "Signup Failed",
                description: error.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Center w={"full"} h={"100vh"} bg={"gray.100"}>
            <Box
                width={"400px"}
                bg={"white"}
                p={8}
                rounded={16}
                boxShadow={"0 0 12px rgba(0,0,0,0.1)"}
                border="1px"
                borderColor="blue.500"
            >
                <Heading textAlign={"center"} fontWeight={'semibold'} mb={6} size={"lg"} color={"blue.600"}>
                    CREATE ACCOUNT
                </Heading>
                <form onSubmit={handleSignup}>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <InputGroup size={"lg"}>
                            <Input
                                type="text"
                                name="name"
                                rounded={"full"}
                                focusBorderColor="blue.600"
                                border="1px"
                                borderColor="blue.700"
                                onChange={handleInput}
                            />
                            <InputLeftElement>
                                <Icon as={FaEnvelope} color="blue.600" />
                            </InputLeftElement>
                        </InputGroup>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Email address</FormLabel>
                        <InputGroup size={"lg"}>
                            <Input
                                type="email"
                                name="email"
                                rounded={"full"}
                                focusBorderColor="blue.600"
                                border="1px"
                                borderColor="blue.700"
                                onChange={handleInput}
                            />
                            <InputLeftElement>
                                <Icon as={FaEnvelope} color="blue.600" />
                            </InputLeftElement>
                        </InputGroup>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup size={"lg"}>
                            <Input
                                type="password"
                                name="password"
                                rounded={"full"}
                                focusBorderColor="blue.600"
                                border="1px"
                                borderColor="blue.700"
                                onChange={handleInput}
                            />
                            <InputLeftElement>
                                <Icon as={FaLock} color="blue.600" />
                            </InputLeftElement>
                        </InputGroup>
                    </FormControl>
                    <Box textAlign={"center"} mt={6}>
                        <DarkMode>
                            <Button
                                type="submit"
                                size={"lg"}
                                colorScheme="blue"
                                rounded={"full"}
                                boxShadow="md"
                                _hover={{ bg: "blue.600" }}
                            >
                                Sign Up
                            </Button>
                        </DarkMode>
                    </Box>
                    <Box textAlign={"center"} w={'full'} my={4}>
                        <Text as={Link} to={'/login'} >Login</Text>
                    </Box>
                </form>
            </Box>
        </Center>
    );
};

export default Signup;
