import FriendsReducer, { Follow } from "../friendsSlice";
import {FriendsType} from "../../types/types";
import { followAPI } from "../../API/api";
jest.mock("../../API/api");

const state : any = {
    users: [
        {
            id: 1,
            name: "test name 1",
            status: null,
            photos: {
                small: null,
                large: null
            },
            followed: false

        }

    ],
    SearchMessageText: "",
    pageSize: 50,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

test("", async () => {

    const dispatchMock = jest.fn();
    const thunk = Follow(1);

    // await thunk(dispatchMock);

    expect(thunk).toBeCalledTimes(3)

})

