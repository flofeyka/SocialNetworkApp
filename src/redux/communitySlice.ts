import {CommunitiesType, communityType} from "../types/types";
import {createSlice} from "@reduxjs/toolkit";

const communitySlice = createSlice({
    name: "community",
    initialState: {
        Communities: [] as CommunitiesType[]
    } as communityType,
    reducers: {
        setCommunities: (state, action) => {
            state.Communities = action.payload;
        },
        setFollow: (state, action) => {
            const {isFollowed, id} = action.payload
            state.Communities.forEach(item => {
                if(item.id === id) {
                    item.isFollowed = isFollowed
                }
            })
        }
    }
})

export const {setCommunities, setFollow} = communitySlice.actions;

export default communitySlice.reducer;