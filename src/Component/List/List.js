import React, { useState } from 'react';
import { Flex, Box, Text, Input, Button, Container, Center } from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function List() {
    const [inputValue, setInputValue] = useState("");
    const [tasks, setTasks] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [done, setDone] = useState([]);
    const [taskId, setTaskId] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const sourceId = result.source.droppableId;
        const destinationId = result.destination.droppableId;

        if (sourceId === destinationId) {
            // Reorder tasks within the same box
            const updatedTasks = reorderList(result.source.index, result.destination.index, getList(sourceId));
            updateList(sourceId, updatedTasks);
        } else {
            // Move task to a different box
            const sourceList = getList(sourceId);
            const destinationList = getList(destinationId);
            const [task] = sourceList.splice(result.source.index, 1);
            destinationList.splice(result.destination.index, 0, task);

            updateList(sourceId, sourceList);
            updateList(destinationId, destinationList);
        }
    };

    const getList = (droppableId) => {
        switch (droppableId) {
            case "tasks":
                return tasks;
            case "inProgress":
                return inProgress;
            case "done":
                return done;
            default:
                return [];
        }
    };

    const updateList = (droppableId, list) => {
        switch (droppableId) {
            case "tasks":
                setTasks(list);
                break;
            case "inProgress":
                setInProgress(list);
                break;
            case "done":
                setDone(list);
                break;
            default:
                break;
        }
    };

    const reorderList = (startIndex, endIndex, list) => {
        const updatedList = Array.from(list);
        const [task] = updatedList.splice(startIndex, 1);
        updatedList.splice(endIndex, 0, task);
        return updatedList;
    };

    const addTask = () => {
        if (inputValue.trim() !== "") {
            const newTask = {
                id: taskId,
                value: inputValue
            };

            setTasks([...tasks, newTask]);
            setTaskId(taskId + 1);
            setInputValue("");
            console.log("Task added:", newTask);
        }
    };
    const handleRemoveTask = (taskId, listId) => {
        const updatedList = getList(listId).filter((task) => task.id !== taskId);
        updateList(listId, updatedList);
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Filter suggestions based on the search query
        const filteredSuggestions = tasks.filter((task) =>
            task.value.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    const handleSelectSuggestion = (suggestion) => {
        setInputValue(suggestion.value);
        setSuggestions([]); // Clear suggestions
    };



    return (
        <>
            <Flex style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                <Box flex='1'>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Input placeholder='Add todo task...' size='md' style={{ width: '30%' }} onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
                        <Button colorScheme='teal' size='md' style={{ marginLeft: 10 }} onClick={addTask}>
                            Add
                        </Button>
                    </div>
                </Box>
            </Flex>
            <Flex style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                <Box flex='1'>
                    <Input
                        placeholder='Search tasks...'
                        size='md'
                        style={{ width: '30%' }}
                        onChange={handleSearch}
                        value={searchQuery}
                    />
                    {searchQuery && suggestions.length > 0 ? (
                        <>
                            {
                                suggestions.map((suggestion) => (
                                    <Box
                                        style={{ width: '30%', marginLeft: '35%' }}
                                        key={suggestion.id}
                                        onClick={() => handleSelectSuggestion(suggestion)}
                                        cursor="pointer"
                                        backgroundColor="white"
                                        _hover={{ backgroundColor: 'gray.100' }}
                                        padding={2}
                                        borderRadius={4}
                                        marginBottom={2}
                                    >
                                        {suggestion.value}
                                    </Box>
                                ))
                            }
                        </>
                    ) : null}
                </Box>
            </Flex>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Flex style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                    <Droppable droppableId="tasks">
                        {(provided) => (
                            <Box flex='1' style={{ margin: '3%', borderRadius: 10 }} bg='#EBE8E2' ref={provided.innerRef} {...provided.droppableProps}>
                                <Container style={{ marginBottom: 20, fontSize: 20 }}>All Tasks</Container>
                                {tasks.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <Center bg='#fff' h='100px' color='black' style={{ borderRadius: 5, width: '80%', marginLeft: '10%', marginBottom: '3%', height: 50, display: 'flex', justifyContent: 'space-evenly' }}>
                                                    {task.value}
                                                    <Button
                                                        colorScheme="red"
                                                        size="sm"
                                                        onClick={() => handleRemoveTask(task.id, "tasks")}
                                                        style={{ marginLeft: "10px" }}
                                                    >
                                                        -
                                                    </Button>
                                                </Center>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Box>
                        )}
                    </Droppable>
                    <Droppable droppableId="inProgress">
                        {(provided) => (
                            <Box flex='1' style={{ margin: '3%', borderRadius: 10 }} bg='#EBE8E2' size='150px' ref={provided.innerRef} {...provided.droppableProps}>
                                <Container style={{ marginBottom: 20, fontSize: 20 }}>In Progress</Container>
                                {inProgress.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <Center bg='#fff' h='100px' color='black' style={{ borderRadius: 5, width: '80%', marginLeft: '10%', marginBottom: '3%', height: 50, display: 'flex', justifyContent: 'space-evenly' }}>
                                                    {task.value}

                                                </Center>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Box>
                        )}
                    </Droppable>
                    <Droppable droppableId="done">
                        {(provided) => (
                            <Box flex='1' bg='#EBE8E2' style={{ margin: '3%', borderRadius: 10 }} ref={provided.innerRef} {...provided.droppableProps}>
                                <Container style={{ marginBottom: 20, fontSize: 20 }}>Paused</Container>
                                {done.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <Center bg='#fff' h='100px' color='black' style={{ borderRadius: 5, width: '80%', marginLeft: '10%', marginBottom: '3%', height: 50, display: 'flex', justifyContent: 'space-evenly' }}>
                                                    {task.value}

                                                </Center>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Box>
                        )}
                    </Droppable>
                </Flex>
            </DragDropContext>
        </>
    )
}
