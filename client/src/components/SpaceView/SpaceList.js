import { Box, Button, DarkMode, Flex, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ImBooks } from "react-icons/im";
import { getAllSpaces, } from '../../services/api';
import CreateSpace from './CreateSpace';
import DeleteSpace from './DeleteSpace';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeSpace, setActiveSpace }) => {
    const [spaces, setSpaces] = useState([]);
    const navigate = useNavigate();

    const fetchSpaces = async () => {
        try {
            const spacesData = await getAllSpaces();
            setSpaces(spacesData);
        } catch (error) {
            console.error('Error fetching spaces:', error);
            navigate('/login')
        }
    };

    useEffect(() => {
        fetchSpaces();
    }, []);

    return (
        <Box bg={'rgb(29, 33, 56)'} minW={'300px'} maxW={'300px'} height={'full'} overflow={'auto'} boxShadow={'0 0 6px rgba(0,0,0,0.1)'} color={'white'}>
            <Text p={4} opacity={0.8} fontSize={'14px'} letterSpacing={'1px'}>ALL SPACES</Text>
            <Stack pr={4} spacing={0}>
                <DarkMode>
                    {
                        spaces.map((item, index) => (
                            <Button key={index} roundedLeft={0} roundedRight={'full'} colorScheme='facebook' color={'white'}
                                bg={activeSpace === item._id ? 'var(--chakra-colors-facebook-300)' : 'transparent'} justifyContent={'left'}
                                leftIcon={<ImBooks />}
                                onClick={() => setActiveSpace(item._id)}
                            >
                                <Flex justifyContent={'space-between'} w={'full'} alignItems={'center'}>
                                    <Text>
                                        {item.name}
                                    </Text>
                                    <DeleteSpace spaceID={item._id} fetchSpaces={fetchSpaces} />
                                </Flex>
                            </Button>
                        ))
                    }
                </DarkMode>
            </Stack>
            <CreateSpace fetchSpaces={fetchSpaces} />
            <Box h={'100px'}></Box>
        </Box>
    )
}

export default Sidebar