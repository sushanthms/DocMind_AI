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

    return(

       <div className="max-w-4xl mx-auto px-6 py-8">

            <h1 className="text-3xl font-bold text-blue-700">
                  DocMind AI Chat
            </h1>

            <p className="text-gray-600 mt-2 mb-8">
                Manage, analyze, and ask questions about your documents
            </p>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Select Document
                </h2>

                <select
                    value={selectedFile}
                    onChange={e => setSelectedFile(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3
                               focus:outline-none focus:border-blue-500"
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

            <div className="flex flex-wrap gap-3 mt-6">

                <button
                    onClick={groupDocuments}
                    className="bg-blue-600 text-white px-5 py-3 rounded-lg
                               hover:bg-blue-700"
                >
                    🗂️ Group Documents
                </button>

                <button
                    onClick={findDuplicates}
                    className="bg-red-600 text-white px-5 py-3 rounded-lg
                               hover:bg-red-700"
                >
                    🔍 Find Duplicates
                </button>


            <button
                    onClick={findSimilarDocuments}
                    className="bg-green-600 text-white px-5 py-3 rounded-lg
                               hover:bg-green-700"
                >
                    🔎 Find Similar Documents
                </button>

            </div>

            {
                Object.keys(groups).length > 0 && (

                    <div className="bg-white border border-gray-200
                                    rounded-xl p-6 shadow-sm mt-6">

                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            🗂️ Document Groups
                        </h2>

                        {
                            Object.entries(groups).map(
                                ([groupName, files]) => (

                                    <div
                                        key={groupName}
                                        className="mb-5"
                                    >

                                        <h3 className="font-semibold text-blue-700 mb-2">
                                            {groupName}
                                        </h3>

                                        <ul className="space-y-2">

                                            {
                                                files.map(
                                                    (file, index) => (

                                                        <li
                                                            key={index}
                                                            className="bg-gray-50
                                                                       border border-gray-200
                                                                       rounded-lg p-3
                                                                       text-gray-700"
                                                        >
                                                            📄 {file}
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
                                    rounded-xl p-6 shadow-sm mt-6">

                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            🔍 Duplicate Documents
                        </h2>

                        <ul className="space-y-2">

                            {
                                duplicates.map(
                                    (duplicate, index) => (

                                        <li
                                            key={index}
                                            className="bg-red-50 border border-red-100
                                                       rounded-lg p-3 text-gray-700"
                                        >
                                            📄 {duplicate.filename}

                                            {" — "}

                                            Similarity: {
                                                duplicate.similarity.toFixed(2)
                                            }

                                        </li>

                                    )
                                )
                            }

                        </ul>

                    </div>

                )
            }

            {
                similarDocuments.length > 0 && (

                    <div className="bg-white border border-gray-200
                                    rounded-xl p-6 shadow-sm mt-6">

                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            🔎 Similar Documents
                        </h2>

                        <ul className="space-y-2">

                            {
                                similarDocuments.map(
                                    (document, index) => (

                                        <li
                                            key={index}
                                            className="bg-green-50 border border-green-100
                                                       rounded-lg p-3 text-gray-700"
                                        >
                                            📄 {document.filename}

                                            {" — "}

                                            Similarity: {
                                                document.similarity.toFixed(2)
                                            }

                                        </li>

                                    )
                                )
                            }

                        </ul>

                    </div>

                )
            }

            <div className="bg-white border border-gray-200
                            rounded-xl p-6 shadow-sm mt-6">

                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    💬 Ask Your Documents
                </h2>

                <div className="flex gap-3">

                    <input
                        value={question}
                        onChange={e => setQuestion(e.target.value)}
                        placeholder="What are the projects of Sushanth?"
                        className="flex-1 border border-gray-300 rounded-lg
                                   px-4 py-3 focus:outline-none
                                   focus:border-blue-500"
                    />

                    <button
                        onClick={sendQuestion}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg
                                   hover:bg-blue-700"
                    >
                        Ask
                    </button>

                </div>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                    Answer
                </h2>

                <p className="text-gray-700 leading-7 whitespace-pre-line">
                    {answer}
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                    Sources
                </h2>

                <ul className="space-y-2">

                    {
                        sources.map((source, index) => (

                            <li
                                key={index}
                                className="bg-blue-50 border border-blue-100
                                           rounded-lg p-3 text-gray-700"
                            >
                                📄 {source}
                            </li>

                        ))
                    }

                </ul>

            </div>

        </div>
    );

}

export default Chat;