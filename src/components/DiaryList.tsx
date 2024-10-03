// src/components/DiaryList.tsx
import React, { useEffect, useState } from "react";
import AddDiaryForm from "./DiaryForm";
import { DiaryEntry, NewDiaryEntry } from "../types";

const DiaryList: React.FC = () => {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

    // Obtener las entradas de diarios
    useEffect(() => {
        fetch("http://localhost:3000/api/diaries")
            .then((response) => response.json())
            .then((data) => setDiaries(data))
            .catch((error) => console.error("Error fetching diaries:", error));
    }, []);

    // Función para añadir un nuevo diario
    const addDiary = (newDiary: NewDiaryEntry) => {
        fetch("http://localhost:3000/api/diaries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newDiary),
        })
            .then((response) => response.json())
            .then((addedDiary) => {
                setDiaries([...diaries, addedDiary]); // Añadir la nueva entrada a la lista
            })
            .catch((error) => console.error("Error adding diary:", error));
    };

    return (
        <div>
            <h2>Add new entry</h2>
            <AddDiaryForm onAddDiary={addDiary} />
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
