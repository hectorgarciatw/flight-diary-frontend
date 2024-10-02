export interface DiaryEntry {
    id: number;
    date: string;
    weather: string;
    visibility: string;
}

export type NonSensitiveDiaryEntry = Pick<DiaryEntry, "id" | "date" | "weather" | "visibility">;
