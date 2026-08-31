import { createSlice } from "@reduxjs/toolkit";

const seatLockTime = createSlice({
    name: "seatLockTime",
    initialState: null,
    reducers: {
        setLockTime: () => {
            return Date.now() + 10 * 60 * 1000
        },
        resetLockTime: () => {
            return null
        }
    }
})

export const { setLockTime, resetLockTime } = seatLockTime.actions;
export default seatLockTime.reducer