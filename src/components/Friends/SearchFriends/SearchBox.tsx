import { getUsers, setFilter } from '../../../redux/friendsSlice';
import { useAppDispatch } from '../../../redux/store';
import { Button, Input, Select, mapPropsVariants } from '@nextui-org/react';
import { useForm } from 'react-hook-form';

const SearchBoxFriends: React.FC<{filter: {term: string, friend: boolean | null}}> = ({filter}) => {
    const dispatch = useAppDispatch();
    const {register, handleSubmit} = useForm();
    const onSubmit = (data: any) => {
        dispatch(setFilter({term: data.searchResult, friend: data.type === null ? null : data.type === "true"? true : false}));
        dispatch(getUsers({ currentPage: 1, filter}));
    };
    return <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex mb-2'>
            <Input variant="bordered" classNames={{
                base: "mx-2 w-[425px]",
                input: "bg-white hover:bg-white border-white text-xl",
                inputWrapper: "bg-white",
                innerWrapper: "bg-white hover:bg-white border-white",
            }} {...register("searchResult")} radius="lg"/> 
            <Select className="w-[200px] mx-2" placeholder="Выберите тип" {...register("type")}>
                <option value="null">Все</option>
                <option value="true">Только друзья</option>
                <option value="false">Все, кроме друзей</option>
                </Select>
            <Button variant="bordered" className="font-semibold bg-white" type="submit">Найти</Button>
        </div>
    </form>
}

export default SearchBoxFriends;