import { Button, DarkMode, FormControl, FormLabel, Input, LightMode, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { updateTaskInSpace } from '../../services/api'

const EditTask = ({ taskId, fetchTask, task }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const formattedDeadline = task.deadline ? new Date(task.deadline).toISOString().slice(0, -8) : '';

    const [taskData, setTaskData] = useState({
        title: task.title,
        description: task.description,
        deadline: formattedDeadline
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(taskData)
        try {
            const response = await updateTaskInSpace(taskId, taskData)
            console.log(response)
            onClose()
            fetchTask();
            toast({
                title: 'Task Updated',
                description: "Task Updated Successfully",
                status: 'success',
                duration: 9000,
                isClosable: true,
                variant: 'left-accent',
                position: 'bottom-left'
            })
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
            <Button size={'sm'} colorScheme='facebook' onClick={onOpen}>Edit</Button>
            <LightMode>
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Task</ModalHeader>
                        <ModalCloseButton />
                        <form onSubmit={handleSubmit}>
                            <ModalBody>
                                <FormControl mb={4}>
                                    <FormLabel>Title Title</FormLabel>
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
                                    <Button colorScheme="messenger" type="submit" >
                                        Edit Task
                                    </Button>
                                </DarkMode>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>
            </LightMode>

        </>
    )
}

export default EditTask