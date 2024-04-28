import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ChatPage() {
    return <div>
        <Chat/>
        <Messages/>
        <AddMessage/>
    </div>
}

function Chat() {
    return <div>Chat</div>
}

function Messages() {
    return <div>Messages</div>
}

function AddMessage() {
    const formik = useFormik({
        initialValues: {
            message: ""
        },
        validationSchema: Yup.object().shape({
            message: Yup.string().trim().required()
        }),
        onSubmit: values => {
            console.log(values)
            values.message = "";
        }
    })

    return <form onSubmit={formik.handleSubmit}>
        <div className="flex">
            <TextArea className="w-[80px]" autoSize={true}/>
            <Button>Send</Button>
        </div>
    </form>
}
