import { DiaryEntry, NonSensitiveDiaryEntry } from "../types";

const API_URL = "http://localhost:3000/api/diaries";

export const fetchDiaries = async (): Promise<NonSensitiveDiaryEntry[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch diaries");
    }
    return response.json();
};
