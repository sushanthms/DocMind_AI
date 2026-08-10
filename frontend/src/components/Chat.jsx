import {useState, useEffect} from "react";
import { askQuestion, getGroups, getDuplicates, getSimilarDocuments, getDocuments } from "../services/api";

function Chat(){

    const [question,setQuestion]=useState("");
    const [answer,setAnswer] = useState("");
    const [sources,setSources] = useState([]);
    const [groups, setGroups] = useState({});
    const [selectedFile, setSelectedFile] = useState("");
    const [duplicates, setDuplicates] = useState([]);
    const [similarDocuments, setSimilarDocuments] = useState([]);
    const [documents, setDocuments] = useState([]);

    useEffect(() => {

    const loadDocuments = async () => {

        const data = await getDocuments();

        setDocuments(data);

    };

    loadDocuments();

}, []);

    const sendQuestion = async()=>{

    const data = await askQuestion(question);

    setAnswer(data.answer);// it saves tge answer got from the backend

    setSources(data.sources);// it saves the sources got from the backend

    
};

const groupDocuments = async () => { // It asks the backend to group the uploaded documents. 
// not onClick={groupDocuments()} because you want React to call it when clicked, not immediately while rendering.
// setQuestion stores the question 
// onChange tells or gives signal that the button or question field is updated, means question is entered, input field's value has changed.
// question is passed as an argument to the askQuestion function.
// input filed receives the question and stores in setQuestion, setQuestion updates the question state with that text, the question is stored in variable called question.
// onChange detects changes means question is typed. when the button is clicked it calls sendQuestion function.
// value represents the text currently inside an input field. 

        const data = await getGroups();

        setGroups(data);
    };

const findDuplicates = async () => {

    if (!selectedFile) {
        alert("Please select a document");
        return;
    }

    const data = await getDuplicates(selectedFile);

    setDuplicates(data.duplicates);
};

const findSimilarDocuments = async () => {

    if (!selectedFile) {
        alert("Please enter a filename");
        return;
    }

    const data = await getSimilarDocuments(selectedFile);

    setSimilarDocuments(data);
};

    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-5xl mx-auto px-6 py-10">

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-2xl">📄</span>
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            DocMind AI
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage, analyze, and ask questions about your documents
                        </p>
                    </div>
                </div>
            </div>

            {/* Document Selection */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Select Document
                </h2>

                <p className="text-sm text-gray-500 mb-4">
                    Choose a document to work with
                </p>

                <select
                    value={selectedFile}
                    onChange={e => setSelectedFile(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3
                               bg-gray-50 text-gray-700
                               focus:outline-none focus:ring-2
                               focus:ring-blue-500 focus:border-transparent
                               transition"
                >
                    <option value="">
                        Select a document
                    </option>

                    {
                        documents.map((doc, index) => (

                            <option
                                key={index}
                                value={doc.filename}
                            >
                                {doc.filename}
                            </option>

                        ))
                    }

                </select>

            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">

                <button
                    onClick={groupDocuments}
                    className="group bg-blue-600 text-white px-5 py-3.5 rounded-xl
                               font-medium shadow-sm hover:bg-blue-700
                               hover:shadow-md transition-all duration-200"
                >
                    🗂️ Group Documents
                </button>

                <button
                    onClick={findDuplicates}
                    className="group bg-red-500 text-white px-5 py-3.5 rounded-xl
                               font-medium shadow-sm hover:bg-red-600
                               hover:shadow-md transition-all duration-200"
                >
                    🔍 Find Duplicates
                </button>

                <button
                    onClick={findSimilarDocuments}
                    className="group bg-emerald-600 text-white px-5 py-3.5 rounded-xl
                               font-medium shadow-sm hover:bg-emerald-700
                               hover:shadow-md transition-all duration-200"
                >
                    🔎 Find Similar
                </button>

            </div>

            {/* Document Groups */}
            {
                Object.keys(groups).length > 0 && (

                    <div className="bg-white border border-gray-200
                                    rounded-2xl p-6 shadow-sm mt-6">

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl
                                            flex items-center justify-center">
                                🗂️
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Document Groups
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Related documents grouped together
                                </p>
                            </div>
                        </div>

                        {
                            Object.entries(groups).map(
                                ([groupName, files]) => (

                                    <div
                                        key={groupName}
                                        className="mb-5 last:mb-0 border border-gray-200
                                                   rounded-xl overflow-hidden"
                                    >

                                        <div className="bg-blue-50 px-4 py-3
                                                        border-b border-blue-100">

                                            <h3 className="font-semibold text-blue-700">
                                                {groupName}
                                            </h3>

                                        </div>

                                        <ul className="p-3 space-y-2">

                                            {
                                                files.map(
                                                    (file, index) => (

                                                        <li
                                                            key={index}
                                                            className="flex items-center gap-3
                                                                       bg-gray-50 border border-gray-100
                                                                       rounded-lg p-3
                                                                       text-gray-700
                                                                       hover:bg-gray-100 transition"
                                                        >
                                                            <span>📄</span>

                                                            <span className="truncate">
                                                                {file}
                                                            </span>

                                                        </li>

                                                    )
                                                )
                                            }

                                        </ul>

                                    </div>

                                )
                            )
                        }

                    </div>

                )
            }

            {/* Duplicate Documents */}
            {
                duplicates.length > 0 && (

                    <div className="bg-white border border-gray-200
                                    rounded-2xl p-6 shadow-sm mt-6">

                        <div className="flex items-center gap-3 mb-5">

                            <div className="w-10 h-10 bg-red-100 rounded-xl
                                            flex items-center justify-center">
                                🔍
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Duplicate Documents
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Documents with high similarity
                                </p>
                            </div>

                        </div>

                        <ul className="space-y-3">

                            {
                                duplicates.map(
                                    (duplicate, index) => (

                                        <li
                                            key={index}
                                            className="flex items-center justify-between gap-4
                                                       bg-red-50 border border-red-100
                                                       rounded-xl p-4"
                                        >

                                            <div className="flex items-center gap-3 min-w-0">
                                                <span>📄</span>

                                                <span className="text-gray-700 truncate">
                                                    {duplicate.filename}
                                                </span>
                                            </div>

                                            <span className="shrink-0 bg-white
                                                             border border-red-200
                                                             text-red-600 text-sm
                                                             font-semibold px-3 py-1
                                                             rounded-full">

                                                {duplicate.similarity.toFixed(2)}

                                            </span>

                                        </li>

                                    )
                                )
                            }

                        </ul>

                    </div>

                )
            }

            {/* Similar Documents */}
            {
                similarDocuments.length > 0 && (

                    <div className="bg-white border border-gray-200
                                    rounded-2xl p-6 shadow-sm mt-6">

                        <div className="flex items-center gap-3 mb-5">

                            <div className="w-10 h-10 bg-emerald-100 rounded-xl
                                            flex items-center justify-center">
                                🔎
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Similar Documents
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Documents related to your selection
                                </p>
                            </div>

                        </div>

                        <ul className="space-y-3">

                            {
                                similarDocuments.map(
                                    (document, index) => (

                                        <li
                                            key={index}
                                            className="flex items-center justify-between gap-4
                                                       bg-emerald-50 border border-emerald-100
                                                       rounded-xl p-4"
                                        >

                                            <div className="flex items-center gap-3 min-w-0">
                                                <span>📄</span>

                                                <span className="text-gray-700 truncate">
                                                    {document.filename}
                                                </span>
                                            </div>

                                            <span className="shrink-0 bg-white
                                                             border border-emerald-200
                                                             text-emerald-600
                                                             text-sm font-semibold
                                                             px-3 py-1 rounded-full">

                                                {document.similarity.toFixed(2)}

                                            </span>

                                        </li>

                                    )
                                )
                            }

                        </ul>

                    </div>

                )
            }

            {/* Chat */}
            <div className="bg-white border border-gray-200
                            rounded-2xl p-6 shadow-sm mt-6">

                <div className="flex items-center gap-3 mb-6">

                    <div className="w-10 h-10 bg-indigo-100 rounded-xl
                                    flex items-center justify-center">
                        💬
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Ask Your Documents
                        </h2>

                        <p className="text-sm text-gray-500">
                            Ask questions and get answers from your uploaded documents
                        </p>
                    </div>

                </div>

                <div className="flex flex-col sm:flex-row gap-3">

                    <input
                        value={question}
                        onChange={e => setQuestion(e.target.value)}
                        placeholder="What are the projects of Sushanth?"
                        className="flex-1 border border-gray-300 rounded-xl
                                   px-4 py-3 bg-gray-50
                                   focus:outline-none focus:ring-2
                                   focus:ring-blue-500 focus:border-transparent
                                   transition"
                    />

                    <button
                        onClick={sendQuestion}
                        className="bg-blue-600 text-white px-7 py-3
                                   rounded-xl font-medium
                                   hover:bg-blue-700 shadow-sm
                                   hover:shadow-md transition"
                    >
                        Ask →
                    </button>

                </div>

                {/* Answer */}
                <div className="mt-7">

                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                        Answer
                    </h2>

                    <div className="bg-gray-50 border border-gray-200
                                    rounded-xl p-5 min-h-[80px]">

                        <p className="text-gray-700 leading-7 whitespace-pre-line">
                            {answer}
                        </p>

                    </div>

                </div>

                {/* Sources */}
                <div className="mt-7">

                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                        Sources
                    </h2>

                    <ul className="space-y-2">

                        {
                            sources.map((source, index) => (

                                <li
                                    key={index}
                                    className="flex items-center gap-3
                                               bg-blue-50 border border-blue-100
                                               rounded-xl p-3 text-gray-700"
                                >
                                    <span>📄</span>
                                    {source}
                                </li>

                            ))
                        }

                    </ul>

                </div>

            </div>

        </div>
    </div>
);
}

export default Chat;