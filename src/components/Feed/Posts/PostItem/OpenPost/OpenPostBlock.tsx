import { Modal, ModalContent } from "@nextui-org/react";
import { FC } from "react";

type Props = {
    setOpenPost: (openMode: boolean) => void
}

const OpenPostBlock: FC<Props> = (props) => {
    return <Modal>
        <ModalContent>
            <div>DEBIL</div>
        </ModalContent>
    </Modal>
}

export default OpenPostBlock;