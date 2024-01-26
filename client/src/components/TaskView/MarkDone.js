import { Button } from '@chakra-ui/react'
import React from 'react'
import { markTaskAsDone } from '../../services/api';

const MarkDone = ({ taskId, fetchTask, status }) => {
    const handleMarkDone = async () => {
        try {
            await markTaskAsDone(taskId);
            fetchTask();
        } catch (error) {
            console.error('Error marking task as done:', error);
        }
    };

    return (
        <>
            <Button size={'sm'} colorScheme='facebook' onClick={handleMarkDone}>{status ? "Undone" : "Mark Done"}</Button>
        </>
    )
}

export default MarkDone