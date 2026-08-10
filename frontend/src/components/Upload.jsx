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

        const response = await axios.post(
    "https://docmind-ai-backend-mcto.onrender.com/api/upload",
    formData
);

        console.log("UPLOAD RESPONSE:", response.data);
        console.log("FILES FROM BACKEND:", response.data.files);

        setUploadedFiles(
        Array.from(files).map(file => file.name)
    );

        alert(response.data.message);

    };

    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">

        <div className="max-w-5xl mx-auto px-6 py-10">

            {/* Header */}
            <div className="mb-8">

                <div className="flex items-center gap-3">

                    <div className="w-12 h-12 bg-blue-600 rounded-2xl
                                    flex items-center justify-center shadow-lg">
                        <span className="text-2xl">📄</span>
                    </div>

                    <div>

                        <h1 className="text-3xl font-bold text-gray-900">
                            DocMind AI
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Upload and manage your PDF documents
                        </p>

                    </div>

                </div>

            </div>

            {/* Upload Section */}
            <div className="bg-white border border-gray-200
                            rounded-2xl p-6 shadow-sm">

                <div className="flex items-center gap-3 mb-5">

                    <div className="w-10 h-10 bg-blue-100 rounded-xl
                                    flex items-center justify-center">
                        ⬆️
                    </div>

                    <div>

                        <h2 className="text-xl font-semibold text-gray-900">
                            Upload Documents
                        </h2>

                        <p className="text-sm text-gray-500">
                            Select one or multiple PDF files
                        </p>

                    </div>

                </div>

                {/* File Input */}
                <div className="border-2 border-dashed border-gray-300
                                rounded-xl p-6 bg-gray-50
                                hover:border-blue-400 hover:bg-blue-50
                                transition">

                    <input
                        type="file"
                        accept=".pdf"
                        multiple
                        onChange={
                            e => setFiles(e.target.files)
                        }
                        className="w-full border border-gray-300
                                   rounded-lg p-3 text-gray-700
                                   bg-white cursor-pointer"
                    />

                    {
                        files.length > 0 && (

                            <div className="mt-4 bg-blue-50
                                            border border-blue-100
                                            rounded-lg p-3">

                                <p className="text-blue-700 font-medium">
                                    ✓ {files.length} file(s) selected
                                </p>

                            </div>

                        )
                    }

                </div>

                {/* Upload Button */}
                <button
                    onClick={uploadFiles}
                    className="mt-5 w-full sm:w-auto
                               bg-blue-600 text-white
                               px-7 py-3 rounded-xl
                               font-medium shadow-sm
                               hover:bg-blue-700
                               hover:shadow-md
                               transition"
                >
                    ⬆️ Upload Documents
                </button>

            </div>

            {/* Uploaded Files */}
            <div className="bg-white border border-gray-200
                            rounded-2xl p-6 shadow-sm mt-6">

                <div className="flex items-center gap-3 mb-5">

                    <div className="w-10 h-10 bg-indigo-100
                                    rounded-xl flex items-center justify-center">
                        📁
                    </div>

                    <div>

                        <h2 className="text-xl font-semibold text-gray-900">
                            Uploaded Files
                        </h2>

                        <p className="text-sm text-gray-500">
                            Your uploaded PDF documents
                        </p>

                    </div>

                </div>

                {
                    uploadedFiles.length === 0 ? (

                        <div className="text-center py-10
                                        bg-gray-50 border border-gray-200
                                        rounded-xl">

                            <div className="text-4xl mb-3">
                                📂
                            </div>

                            <p className="text-gray-500">
                                No documents uploaded yet.
                            </p>

                        </div>

                    ) : (

                        <ul className="space-y-3">

                            {
                                uploadedFiles.map((file, index) => (

                                    <li
                                        key={index}
                                        className="flex items-center gap-3
                                                   bg-blue-50
                                                   border border-blue-100
                                                   rounded-xl p-4
                                                   text-gray-700
                                                   hover:bg-blue-100
                                                   transition"
                                    >

                                        <div className="w-9 h-9 bg-white
                                                        rounded-lg
                                                        flex items-center
                                                        justify-center
                                                        shadow-sm">
                                            📄
                                        </div>

                                        <span className="truncate">
                                            {file}
                                        </span>

                                    </li>

                                ))
                            }

                        </ul>

                    )
                }

            </div>

        </div>

    </div>
);
}
export default Upload;