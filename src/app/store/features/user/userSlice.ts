import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";



export const userSlice = createSlice({
    name: "user",
    initialState: {
        // data that use want to get in every page
        id : "uid0001",
        name : "mikkucn",
        imageURL : "/somepath.png"
    },
    reducers: {

        // function to update the data
        updateName : (state,action : PayloadAction<string>) => {
            state.name = action.payload
        }
    }
})


export const {updateName} = userSlice.actions
export const selectUser = (state: RootState) => state.user
export default userSlice.reducer