import { FC } from "react"

type Props = {
    CommunityName: string
    Description: string
    SubscribesValue: number
    CommunitiesPhoto: string
    id: number
    isFollowed: boolean
    setFollow: (id: number, isFollowed: boolean) => void
}

const CommunityItem: FC<Props> = (props) => {
    return <div>
        <span>
            {props.CommunityName}
        </span>
        <div>
            {props.Description}
        </div>
        <span>
            {props.SubscribesValue} подписчиков
        </span>
        <span>
            <img src={props.CommunitiesPhoto} alt=""/>
            <div>
                {!props.isFollowed ? <button onClick={() => {
                    props.setFollow(props.id, true)
                }}>
                    Подписаться
                </button> : <button onClick={() => {
                    props.setFollow(props.id, false)
                }}>Отписаться</button>}
            </div>
        </span>
    </div>
}

export default CommunityItem;