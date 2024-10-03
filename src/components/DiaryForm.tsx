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
                <div>
                    {Object.values(Weather).map((w) => (
                        <label key={w}>
                            <input type="radio" name="weather" value={w} checked={weather === w} onChange={() => setWeather(w)} />
                            {w}
                        </label>
                    ))}
                </div>
            </div>
            <div>
                <label>Visibility</label>
                <div>
                    {Object.values(Visibility).map((v) => (
                        <label key={v}>
                            <input type="radio" name="visibility" value={v} checked={visibility === v} onChange={() => setVisibility(v)} />
                            {v}
                        </label>
                    ))}
                </div>
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
