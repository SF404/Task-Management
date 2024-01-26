import { Box, DarkMode, Flex, HStack, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import MarkDone from './MarkDone';
import DeleteTask from './DeleteTask';
import EditTask from './EditTask';

const TaskView = ({ tasks, fetchTask }) => {

  return (
    <Box w={'full'} overflowY={'auto'} bg={'#e6e6e9'}>
      <SimpleGrid columns={[1, 2, 2, 2, 3]} gap={4} p={4} w={'full'}>
        {tasks.map((item, index) => (
          <Box
            key={index}
            bg={'white'}
            w={'full'}
            boxShadow={'0 0 6px rgba(0,0,0,0.1)'}
            borderLeft={'5px solid #718096'}
            minH={'100px'}
            p={4}
          >
            <Flex alignItems={'flex-start'}>
              <Box w={'full'}>
                <Text rounded={'full'} color={item.status ? 'green' : 'red'} mt={-2}>{item.status ? "COMPLETED" : "PENDING"}</Text>
                <Heading size={'md'}>{item.title}</Heading>

                <Text>{item.description}</Text>
                <Text mt={2} fontWeight={'semibold'} fontSize={'14px'}>Deadline</Text>
                <Text fontSize={'14px'} opacity={0.8} letterSpacing={'1px'}>{new Date(item.deadline).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}</Text>
                <HStack mt={4} mb={1} spacing={1}>
                  <DarkMode>
                    <MarkDone taskId={item._id} fetchTask={fetchTask} status={item.status} />
                    <EditTask taskId={item._id} fetchTask={fetchTask} task={item} />
                    <DeleteTask taskId={item._id} fetchTask={fetchTask} />
                  </DarkMode>

                </HStack>
              </Box>
            </Flex>
          </Box>
        ))}
        <Box></Box>
      </SimpleGrid>
    </Box>
  );
};

export default TaskView;
