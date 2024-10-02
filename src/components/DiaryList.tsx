import React, { useEffect, useState } from "react";
import { fetchDiaries } from "../services/diaryService";
import { NonSensitiveDiaryEntry } from "../types";

const DiaryList: React.FC = () => {
    const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadDiaries = async () => {
            try {
                const fetchedDiaries = await fetchDiaries();
                setDiaries(fetchedDiaries);
            } catch (error) {
                setError(error.message);
            }
        };

        loadDiaries();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <ul>
                {diaries.map((diary) => (
                    <>
                        <h3>{diary.date}</h3>
                        <p>Visibility: {diary.visibility}</p>
                        <p>Weather: {diary.weather}</p>
                    </>
                ))}
            </ul>
        </div>
    );
};

export default DiaryList;
