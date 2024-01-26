import { Button, DarkMode, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { createTaskInSpace } from '../../services/api';

const AddTask = ({ spaceId, fetchTask }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        deadline: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(taskData)
        try {
            const response = await createTaskInSpace(spaceId, taskData)
            console.log(response)
            onClose()
            fetchTask();
            toast({
                title: 'Task Added',
                description: "Task added successfully",
                status: 'success',
                duration: 9000,
                isClosable: true,
                variant: 'left-accent',
                position: 'bottom-left'
            })
            setTaskData(
                {
                    title: '',
                    description: '',
                    deadline: ''
                }
            )
        } catch (error) {
            console.log(error)
            toast({
                title: '',
                description: error.data.message,
                status: 'warning',
                duration: 9000,
                isClosable: true,
                variant: 'left-accent',
                position: 'bottom-left'
            })
        }
    };

    return (
        <>
            {
                spaceId && <Button onClick={onOpen} colorScheme='whiteAlpha' rounded={'full'} bg={'rgba(255,255,255,0.2)'}>Add Task</Button>
            }


            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Task</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormControl mb={4}>
                                <FormLabel>Title</FormLabel>
                                <Input
                                    type="text"
                                    value={taskData.title}
                                    onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                                    placeholder="Enter task title"
                                    required
                                />
                            </FormControl>

                            <FormControl mb={4}>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    value={taskData.description}
                                    onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                                    placeholder="Enter task description"
                                    required
                                />
                            </FormControl>

                            <FormControl mb={4}>
                                <FormLabel>Task Deadline</FormLabel>
                                <Input
                                    type="datetime-local"
                                    value={taskData.deadline}
                                    onChange={(e) => setTaskData({ ...taskData, deadline: e.target.value })}
                                />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <DarkMode>
                                <Button colorScheme="messenger" type="submit">
                                    Add Task
                                </Button>
                            </DarkMode>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddTask