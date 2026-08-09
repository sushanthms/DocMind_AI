import { useState } from "react"; // React Hook. store data and update it.
import axios from "axios"; // communicate with backend. used to make HTTP requests.

function Upload(){

    const [files,setFiles] = useState([]);// [] is empty array
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const uploadFiles = async()=>{

        const formData = new FormData();// Creates an empty form container.

        for(let file of files){
            formData.append("files", file);// "files" is the field name. Because FastAPI expects files: list[UploadFile]
        }

        const response = await axios.post( // sending a post request
            "http://127.0.0.1:8000/api/upload",// this is FastAPI endpoint
            formData
        );

        setUploadedFiles(response.data.files);

        alert(response.data.message);

    };

    return(

        <div className="max-w-4xl mx-auto px-6 py-8">

            <h1 className="text-3xl font-bold text-blue-700"> 📄 DocMind AI </h1>

            <p className="text-gray-600 mt-2 mb-8"> Upload your PDF documents </p>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"> <h2 className="text-xl font-semibold text-gray-800 mb-4"> Upload Documents </h2>

            <input
                type="file" accept=".pdf" multiple // multiple and accept are separate words but are attributes of input
                onChange={// e is event object. when files=[] changes(files are added) updates React state
                    e=>setFiles(e.target.files)// setFiles is react state above. const [files,setFiles] = useState([]);
                }
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 bg-gray-50"
            />
            { files.length > 0 && ( <p className="text-gray-600 mt-3"> {files.length} file(s) selected </p> ) }

             <button onClick={uploadFiles} className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700" > ⬆️ Upload </button>

             </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mt-6"> 
                <h2 className="text-xl font-semibold text-gray-800 mb-4"> Uploaded Files </h2>
                { 
                uploadedFiles.length === 0 ? (
                <p className="text-gray-500"> No documents uploaded yet. </p>
            ) : 
            ( 
            <ul className="space-y-2">
                { 
                uploadedFiles.map((file, index) => ( 
                <li key={index} className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-gray-700" >
                    📄 {file} 
                </li> 
            )) 
            } </ul> ) } 
            </div> 
        </div>
        ); 
    } 
                   
export default Upload;