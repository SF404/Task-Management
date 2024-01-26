import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Box, Button, DarkMode, useDisclosure } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

const LogoutButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate();


    const handleLogout = () => {
        Cookies.remove('authToken');
        navigate('/login');
    };

    return (<>
        <Box textAlign={'center'}>
            <DarkMode>
                <Button onClick={onOpen} colorScheme='purple' rounded={'full'}>
                    Logout
                </Button>
            </DarkMode>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Logout Confirmation</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure you want to logout?
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='gray' rounded={'full'} shadow={'md'} mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='red' rounded={'full'} shadow={'md'} onClick={handleLogout}>Confirm</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
    );
};

export default LogoutButton;
