import axios from "axios";

const API = axios.create({
    baseURL: "https://docmind-ai-backend-mcto.onrender.com"
});

export const askQuestion = async(question)=>{

    const response = await API.get(
        "/api/chat",
        {
            params:{
                question: question
            }
        }
    );

    return response.data;
};

export const getGroups = async () => {

    const response = await API.get(
        "/api/groups"
    );

    return response.data;
};

export const getDuplicates = async (filename) => {

    const response = await API.get(
        `/api/duplicates/${encodeURIComponent(filename)}`
    );

    return response.data;
};

export const getSimilarDocuments = async (filename) => {

    const response = await API.get(
        `/api/recommend/${encodeURIComponent(filename)}`
    );

    return response.data;
};

export const getDocuments = async () => {

    const response = await API.get("/api/documents");

    return response.data;
};