import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { AccountCircle } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosClient from '../utils/axiosClient';
import { KEY_ACCESS_TOKEN, setItem } from '../utils/localStorageManager';

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    
    async function handleSubmit(e) {
        e.preventDefault();
        console.log('asd')
        try {
            console.log('123')
            const response = await axiosClient.post('/auth/login', {
                email,
                password
            });
            console.log(response)

            if (response.status === 'ok' && response.statusCode === 200) {
                const accessToken = response.result.accessToken;
                setItem(KEY_ACCESS_TOKEN, accessToken);
                navigate('/');
                // console.log('Access token set:', accessToken);
            } else {
                console.error('Login failed:', response.error);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <Card className="w-full sm:w-96 md:w-96 lg:w-96">
                <Container maxWidth="sm" className="text-center">
                    <div className="">
                        <AccountCircle className="mt-7" sx={{ fontSize: 40 }} />
                        <h1 className="text-3xl font-bold p-5">Sign In Now</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col py-5 gap-y-8">
                            <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                            <TextField label="Password" fullWidth type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="my-4">
                            <Button type="submit" variant="contained" fullWidth>
                                LOGIN
                            </Button>
                        </div>
                    </form>
                    <div className="mb-5">Forget Password</div>
                    <div className="mb-1">
                        Don't have an account?{' '}
                        <Link className="text-blue-500 underline" to="/signup">
                            Signup
                        </Link>
                    </div>
                </Container>
            </Card>
        </div>
    );
}


