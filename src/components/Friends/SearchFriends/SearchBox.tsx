import { getUsers } from '../../../redux/FriendsReducer';
import { useAppDispatch } from '../../../redux/ReduxStore';
import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';

const SearchBoxFriends: React.FC = () => {
    const dispatch = useAppDispatch();
    const {register, handleSubmit} = useForm();
    const onSubmit = (data: any) => {
        dispatch(getUsers({term: data.searchResult}));
    };
    return <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex mb-2'>
            <Input variant="bordered" classNames={{
                base: "mx-2 w-[425px]",
                input: "bg-white hover:bg-white border-white text-xl",
                inputWrapper: "bg-white",
                innerWrapper: "bg-white hover:bg-white border-white",
            }} {...register("searchResult")} radius="lg"/> <Button variant="bordered" className="font-semibold bg-white" type="submit">Найти</Button>
        </div>
    </form>
}

export default SearchBoxFriends;