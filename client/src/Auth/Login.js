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
import { login } from "../services/api";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const toast = useToast();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const handleInput = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            console.log(userData)
            const response = await login(userData);
            const token = response.token;
            console.log("Login successful! Token:", token);
            Cookies.set("authToken", token, { expires: 1, secure: true });
            navigate('/')
            toast({
                title: "Login Successful",
                description: "Welcome back!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Login failed:", error);
            toast({
                title: "Login Failed",
                description: "Invalid email or password. Please try again.",
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
                borderColor="purple.300"
            >
                <Heading textAlign={"center"} fontWeight={'semibold'} mb={6} size={"lg"} color={"purple.700"}>
                    USER LOGIN
                </Heading>
                <form onSubmit={handleLogin}>
                    <FormControl>
                        <FormLabel>Email address</FormLabel>
                        <InputGroup size={"lg"}>
                            <Input
                                type="email"
                                name="email"
                                rounded={"full"}
                                focusBorderColor="purple.700"
                                border="1px"
                                borderColor="purple.300"
                                onChange={handleInput}
                            />
                            <InputLeftElement>
                                <Icon as={FaEnvelope} color="purple.500" />
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
                                focusBorderColor="purple.700"
                                border="1px"
                                borderColor="purple.300"
                                onChange={handleInput}
                            />
                            <InputLeftElement>
                                <Icon as={FaLock} color="purple.500" />
                            </InputLeftElement>
                        </InputGroup>
                    </FormControl>
                    <Box textAlign={"center"} mt={6}>
                        <DarkMode>
                            <Button
                                type="submit"
                                size={"lg"}
                                colorScheme="purple"
                                rounded={"full"}
                                boxShadow="md"
                                _hover={{ bg: "purple.500" }}
                            >
                                Login
                            </Button>
                        </DarkMode>
                    </Box>
                    <Box textAlign={"center"} w={'full'} my={4}>
                        <Text textAlign={'center'} as={Link} to={'/signup'} >Sign Up</Text>
                    </Box>
                </form>
            </Box>
        </Center>
    );
};

export default Login;
