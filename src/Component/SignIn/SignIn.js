import React, { useState } from 'react';
import { Flex, Box, Input, Button, Center, Text } from '@chakra-ui/react';

export default function SignIn({ onAuthentication }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = () => {
        if (username.trim() === "" || password.trim() === "") {
            setError("Please fill in both username and password.");
        } else {
            onAuthentication(username, password); // Call the onAuthentication prop
        }
    };

    return (
        <>
            <Center style={{ marginTop: 20, display: 'flex', flexDirection: 'column' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Welcome to TODO App</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Username:Juhil</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Password:1</Text>
            </Center>
            <Flex style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                <Box flex='1'>
                    <div style={{ height: 350, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'column' }}>
                        <Input placeholder='Enter Username...' size='md' style={{ width: '30%' }} required value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Input placeholder='Enter Password...' size='md' style={{ width: '30%' }} required value={password} onChange={(e) => setPassword(e.target.value)} />
                        {error && <Text color="red">{error}</Text>}
                        <Button colorScheme='teal' size='md' style={{ marginLeft: 10 }} onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </Box>
            </Flex>
        </>
    );
}
