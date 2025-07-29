import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const defaultState = {
        id : "",
        name : "anonymous",
        imageURL : "/empty.png"
    }

export const userSlice = createSlice({
    name: "user",
    initialState: defaultState,
    reducers: {

        updateName : (state,action : PayloadAction<string>) => {
            state.name = action.payload
        }
    }
})


export const {updateName} = userSlice.actions
export const selectUser = (state: RootState) => state.user
export default userSlice.reducer