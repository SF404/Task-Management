import { Button, useToast } from '@chakra-ui/react'
import React from 'react'
import { deleteTaskInSpace } from '../../services/api';

const DeleteTask = ({ taskId, fetchTask }) => {
    const toast = useToast();
    const handleDelete = async () => {
        console.log(taskId)
        try {
            const response = await deleteTaskInSpace(taskId);
            console.log(response)
            fetchTask();
            toast({
                title: 'Task Deleted',
                description: response.title + " deleted successfully",
                status: 'info',
                duration: 9000,
                isClosable: true,
                variant: 'left-accent',
                position: 'bottom-left'
            })
        } catch (error) {
            console.error('Error deleting task:', error);
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
            <Button size={'sm'} colorScheme='facebook' onClick={handleDelete}>Delete</Button>
        </>
    )
}

export default DeleteTask;
