import { Box, Flex, HStack, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import AddTask from './TaskView/AddTask'
import LogoutButton from '../Auth/Logout'
import { IoPersonSharp } from "react-icons/io5";

const Navbar = ({ fetchTask, spaceId }) => {
    return (
        <Flex justifyContent={'space-between'} alignItems={'center'} height={'64px'} px={4} bg={'rgb(4, 8, 34)'} color={'whitesmoke'}>
            <Box>
                <Heading size={'md'}>
                    Task Management
                </Heading>
            </Box>
            <HStack>
                <AddTask fetchTask={fetchTask} spaceId={spaceId} />
                <Menu>
                    <MenuButton
                        as={IconButton}
                        bg={'rgba(255, 255, 255, 0.2)'}
                        rounded={'full'}
                        colorScheme='whiteAlpha'
                        icon={<IoPersonSharp />}
                    />
                    <MenuList>
                        <MenuItem>
                            <LogoutButton />
                        </MenuItem>

                    </MenuList>
                </Menu>
            </HStack>

        </Flex>
    )
}

export default Navbar