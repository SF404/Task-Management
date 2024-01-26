import { IconButton } from '@chakra-ui/react';
import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri';
import { deleteSpace } from '../../services/api';

const DeleteSpace = ({spaceID, fetchSpaces}) => {
    const handleDeleteSpace = async (spaceId) => {
        try {
            const response = await deleteSpace(spaceId);
            console.log('Space deleted successfully:', response);
            fetchSpaces();
        } catch (error) {
            console.error('Error deleting space:', error);
        }
    };
    return (
        <IconButton rounded={'full'} variant={'ghost'} color={'white'} icon={<RiDeleteBin6Line />} onClick={(e) => { e.stopPropagation(); handleDeleteSpace(spaceID) }} />

    )
}

export default DeleteSpace