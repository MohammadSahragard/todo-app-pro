'use client';

// public
import { useSelector, useDispatch } from 'react-redux';

//* components
import { Input } from '@nextui-org/react';

//* redux
import { setTaskTitle } from '@/redux/features/selectedTaskSlice';

const TaskDetailsTaskTitle = () => {
    const dispatch = useDispatch();
    // states and variables
    const taskTitle = useSelector(
        (state: any) => state.selectedTask.task_title
    );

    return (
        <Input
            value={taskTitle ?? null}
            placeholder='Task title'
            variant='bordered'
            radius='sm'
            classNames={{
                inputWrapper: 'shadow-none border-2 dark:border-opacity-40',
            }}
            onChange={({ target }) => dispatch(setTaskTitle(target.value))}
        />
    );
};

export default TaskDetailsTaskTitle;