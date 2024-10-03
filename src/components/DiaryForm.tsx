import React, { useState } from "react";
import { Weather, Visibility, NewDiaryEntry } from "../types";

interface AddDiaryFormProps {
    onAddDiary: (newDiary: NewDiaryEntry) => void;
}

const AddDiaryForm: React.FC<AddDiaryFormProps> = ({ onAddDiary }) => {
    const [date, setDate] = useState("");
    const [weather, setWeather] = useState<Weather>(Weather.Sunny);
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
    const [comment, setComment] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newDiary: NewDiaryEntry = {
            date,
            weather,
            visibility,
            comment,
        };
        onAddDiary(newDiary);
        setDate("");
        setWeather(Weather.Sunny);
        setVisibility(Visibility.Great);
        setComment("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div>
                <label>Weather</label>
                <select value={weather} onChange={(e) => setWeather(e.target.value as Weather)}>
                    {Object.values(Weather).map((w) => (
                        <option key={w} value={w}>
                            {w}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Visibility</label>
                <select value={visibility} onChange={(e) => setVisibility(e.target.value as Visibility)}>
                    {Object.values(Visibility).map((v) => (
                        <option key={v} value={v}>
                            {v}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Comment</label>
                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} required />
            </div>
            <button type="submit">Add</button>
        </form>
    );
};

export default AddDiaryForm;
