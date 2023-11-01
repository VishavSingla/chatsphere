
// import { KEY_ACCESS_TOKEN, getItem, setItem, removeItem } from './localStorageManager';
// import axios from 'axios';

// const baseURL = process.env.REACT_APP_SERVER_BASE_URL; // Use the baseURL from environment variables

// const axiosClient = axios.create({
//     withCredentials: true,
//     baseURL: baseURL, // Set baseURL here
// })

// axiosClient.interceptors.request.use( 
//     (request) => {
//         const accessToken = getItem(KEY_ACCESS_TOKEN);
//         request.headers['Authorization'] = `Bearer ${accessToken}`;
//         return request;
//     }
// )

// axiosClient.interceptors.response.use(
//     async(response) => {
//         const data = response.data;
//         if(data.status === 'ok'){
//             return data;
//         }

//         const originalRequest = response.config;
//         const statusCode = data.statusCode;
//         const error = data.error;

//         // Replace the hardcoded URL with the baseURL
//         if(statusCode === 401 && originalRequest.url === `${baseURL}/auth/refresh`){
//             removeItem(KEY_ACCESS_TOKEN);
//             // Use navigation library to navigate to the login screen in React Native
//             // Example: navigation.navigate('Login');
//             return Promise.reject(error);
//         }

//         if(statusCode === 401 && !originalRequest._retry){
//             originalRequest._retry = true;
//             const refreshURL = `${baseURL}/auth/refresh`; // Construct the refresh URL
//             const refreshResponse = await axios.create({ withCredentials: true }).get(refreshURL);
//             console.log('response backend', refreshResponse);
//             if(refreshResponse.status === 'ok'){
//                 const accessToken = refreshResponse.result.accessToken;
//                 setItem(KEY_ACCESS_TOKEN, accessToken);
//                 originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
//                 return axios(originalRequest);
//             }
//         }
//         return Promise.reject(error)
//     }
// );
// export default axiosClient;


import { KEY_ACCESS_TOKEN, getItem,setItem } from './localStorageManager';
import axios from 'axios';

const baseURL = "http://localhost:4000";

const axiosClient = axios.create({
    withCredentials: true,
    baseURL: baseURL,
})

axiosClient.interceptors.request.use( 
    (request) => {
        const accessToken = getItem(KEY_ACCESS_TOKEN);
        request.headers['Authorization'] = `Bearer ${accessToken}`;
        return request;
    }
)

axiosClient.interceptors.response.use(
    async(response) => {
        const data = response.data;
        if(data.status === 'ok'){
            return data;
        }

        const originalRequest = response.config;
        const statusCode = data.statusCode;
        const error = data.error;

//when refresh token expires send user to login page
        
        if(statusCode === 401 && !originalRequest._retry){
            originalRequest._retry = true;

            const response = await axios.create({withCredentials:true,}).get('http://localhost:4000/auth/refresh');
            if(response.status === 'ok'){
                const accessToken = response.data.result.accessToken;
                setItem(KEY_ACCESS_TOKEN, accessToken);
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return axios(originalRequest);
            }else{
                removeItem(KEY_ACCESS_TOKEN);
                window.location.replace('/login', '_self');
                return Promise.reject(error);
            }
        }
        return Promise.reject(error)
    }
);
export default axiosClient;




