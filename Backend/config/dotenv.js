import { config } from 'dotenv';

const configureDotenv = () => {
    const result = config();

    if (result.error) {
        console.error('Failed to load .env file:', result.error.message);
        process.exit(1); 
    }

    console.log('Environment variables loaded successfully');
};

export default configureDotenv;
