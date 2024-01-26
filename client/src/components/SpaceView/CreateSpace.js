import { Button, ButtonGroup, DarkMode, Flex, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { createSpace } from '../../services/api'
import { MdOutlinePostAdd } from "react-icons/md";


const CreateSpace = ({ fetchSpaces }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [spaceData, setSpaceData] = useState({ name: '' })
    const handleChange = (e) => {
        setSpaceData({ name: e.target.value })
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const response = await createSpace(spaceData);
            console.log(response)
            setSpaceData({ name: '' })
            fetchSpaces();
            onClose()
        } catch (error) {
            console.error('Error fetching spaces:', error);
        }
    }
    return (
        <Popover isOpen={isOpen} onClose={onClose} trapFocus={false}>
            <Flex justifyContent={'center'} p={4} mt={2}>
                <DarkMode>
                    <PopoverTrigger>

                        <Button rightIcon={<MdOutlinePostAdd />} boxShadow={'md'} size={'sm'} rounded={'full'} colorScheme='messenger' onClick={onOpen}>Add Space</Button>
                    </PopoverTrigger>
                </DarkMode>
            </Flex>
            <PopoverContent mx={8}>
                <PopoverHeader pt={4} color={'black'}>
                    Create Space
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <form onSubmit={handleCreate}>

                    <PopoverBody>
                        <Input onChange={handleChange} value={spaceData.name} placeholder='Enter Space name...' color={'blue.800'}></Input>
                    </PopoverBody>
                    <PopoverFooter
                        border='0'
                        display='flex'
                        alignItems='center'
                        justifyContent='right'
                        pb={4}
                    >
                        <ButtonGroup size='sm'>
                            <Button type='submit' colorScheme='telegram' rounded={'full'}>Save</Button>
                        </ButtonGroup>
                    </PopoverFooter>
                </form>

            </PopoverContent>
        </Popover>
    )
}

export default CreateSpace