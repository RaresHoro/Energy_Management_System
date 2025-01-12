import axios from 'axios';

//const API_URL = 'http://localhost:8080/auth';

const login = async (name, password) => {
  try {
    const response = await axios.post('http://localhost:8080/auth/login', {
      name: name,
      password: password,
    });
    console.log("Login Response:", response); // Log the response
    return response;
  } catch (error) {
    console.error("Login Error:", error); // Log if there's an error
    throw error;
  }
};

export default { login };

