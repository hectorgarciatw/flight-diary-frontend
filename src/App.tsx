import React from "react";
import DiaryList from "./components/DiaryList";

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>Diary entries</h1>
            <DiaryList />
        </div>
    );
};

export default App;
