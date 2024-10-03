import React, { useEffect, useState } from "react";
import AddDiaryForm from "./DiaryForm";
import { DiaryEntry, NewDiaryEntry } from "../types";

const DiaryList: React.FC = () => {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Obtener las entradas de diarios
    useEffect(() => {
        fetch("http://localhost:3000/api/diaries")
            .then((response) => response.json())
            .then((data) => setDiaries(data))
            .catch((error) => console.error("Error fetching diaries:", error));
    }, []);

    // Función para añadir un nuevo diario
    const addDiary = (newDiary: NewDiaryEntry) => {
        setErrorMessage(null);
        fetch("http://localhost:3000/api/diaries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newDiary),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        throw new Error(text);
                    });
                }
                return response.json();
            })
            .then((addedDiary) => {
                setDiaries([...diaries, addedDiary]);
            })
            .catch((error) => {
                console.error("Error adding diary:", error);
                setErrorMessage(error.message);
            });
    };

    return (
        <div>
            <h2>Diary List</h2>
            <AddDiaryForm onAddDiary={addDiary} />

            {errorMessage && <p style={{ color: "red" }}>Error: {errorMessage}</p>}

            <ul>
                {diaries.map((diary) => (
                    <li key={diary.id}>
                        <p>
                            <strong>{diary.date}</strong> - Weather: {diary.weather}, Visibility: {diary.visibility}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DiaryList;
