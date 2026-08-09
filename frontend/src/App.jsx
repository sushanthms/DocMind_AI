import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Chat from "./components/Chat";
import Upload from "./components/Upload";

function App() {

    return (

        <BrowserRouter>

            <nav className="bg-blue-700 text-white px-6 py-4">

                <div className="max-w-4xl mx-auto flex items-center justify-between">

                    <Link
                        to="/"
                        className="text-xl font-bold"
                    >
                        📄 DocMind AI
                    </Link>


                    <div className="flex gap-6">

                        <Link
                            to="/"
                            className="hover:text-blue-200"
                        >
                            📤 Upload
                        </Link>

                        <Link
                            to="/chat"
                            className="hover:text-blue-200"
                        >
                            💬 Chat
                        </Link>

                    </div>

                </div>

            </nav>

            <Routes>

                <Route
                    path="/"
                    element={<Upload />}
                />

                <Route
                    path="/chat"
                    element={<Chat />}
                />

            </Routes>

        </BrowserRouter>

    );

}


export default App;