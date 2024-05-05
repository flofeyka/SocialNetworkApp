import DialogsReducer, {sendMessage} from "../dialogsSlice";
import {DialogsType} from "../../types/types";

const state: DialogsType = {
    Dialogs: [],
    Messages: [],
}


it("Message should be send", async () => {
    const action = sendMessage("WAR IS PEACE", 1, "Winston Smith", null);

    const newState = DialogsReducer(state, action);

    expect(newState.Messages[0]).toStrictEqual({
        id: 1,
        message: "WAR IS PEACE",
        userId: 1,
        fullName: "Winston Smith",
        usersPhoto: null,
    });
});

