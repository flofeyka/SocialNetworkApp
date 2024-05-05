import {DialogsItemType, DialogsType, MessagesType} from "../types/types";

const SendMsgCreator: string = "dialogs/send-message";


let InitialState: DialogsType = {
    Dialogs: [
        {
            id: 1,
            userId: 1,
            name: "Winston Smith",
            usersImage: "https://i.ytimg.com/vi/2AM9KnjWy5E/maxresdefault.jpg",
            lastMessage: "War is peace",
            date: "14:44"
        },
        {
            id: 2,
            userId: 2,
            name: "Julia Dixon",
            usersImage: "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Julia.1984.webp",
            lastMessage: "I love you",
            date: "23:15"
        },
        {
            id: 3,
            userId: 3,
            name: "Emmanuel Goldstein",
            usersImage: "https://avatars.dzeninfra.ru/get-zen_doc/1875939/pub_604d21ed011181447b2644e6_604d47a4af41a36641ef1288/scale_1200",
            lastMessage: "The revolution will come",
            date: "01:15"
        }
    ] as Array<DialogsItemType>,
    Messages: [] as Array<MessagesType>,
}


const DialogsReducer = (state = InitialState, action: any) : DialogsType => {
    switch (action.type) {
        case SendMsgCreator:
            return {
                ...state, Messages: [...state.Messages, {
                    id: Object.keys(state.Messages).length + 1,
                    message: action.MessageText,
                    userId: action.userId,
                    fullName: action.fullName,
                    usersPhoto: action.usersPhoto,
                }],
            }
        default:
            return state;
    }

}


export const sendMessage = (MessageText: string, userId: number, fullName: string, usersPhoto: string | null) => ({type: SendMsgCreator, MessageText, userId, fullName, usersPhoto})

export default DialogsReducer;