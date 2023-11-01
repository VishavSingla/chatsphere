import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axiosClient from '../utils/axiosClient'; // Make sure to import axiosClient

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const result = await axiosClient.post('/auth/signup', {
                name,
                email,
                password
            });
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <Card className="w-full sm:w-96 md:w-96 lg:w-96">
                <Container maxWidth="sm" className="text-center">
                    <div className="">
                        <AccountCircle className="mt-7" sx={{ fontSize: 40 }} />
                        <h1 className="text-3xl font-bold p-5">Sign Up Now</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col py-5 gap-y-8">
                            <TextField
                                label="Name"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                label="Email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="my-4">
                            <Button type="submit" variant="contained" fullWidth>
                                Create Account
                            </Button>
                        </div>
                    </form>
                    <div className="mb-5">
                        Already have an account? <Link className="text-blue-500 underline" to="/login">Login</Link>
                    </div>
                </Container>
            </Card>
        </div>
    );
}
