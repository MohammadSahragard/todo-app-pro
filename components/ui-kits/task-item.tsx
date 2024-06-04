'use client';

// public
import { useState } from 'react';
import { useDispatch } from 'react-redux';

//* components
import Divider from '../ui/texts/divider';
import AddToImportantBtn from '../ui/buttons/add-to-important-btn';
import Icon from '../ui/texts/icon';
import Subtitle from '../ui/texts/subtitle';
import Title from '../ui/texts/title';
import CheckTaskBtn from '../ui/buttons/check-task-btn';

//* functions
import {
    checkDueDate,
    getLocalDateString,
    toggleTaskDetailsSidebar,
} from '@/helper/functions/functions';
import TaskItemOptions from './task-item-options';

const TaskItem = ({ taskData }: { taskData: any }) => {
    const dispatch = useDispatch();
    // state and variables
    const [isOpenOptions, setIsOpenOptions] = useState(false);
    const completedStyles = 'line-through text-primary-200 break-all';
    const completedTask = taskData?.task_completion
        ? completedStyles
        : 'break-all';
    const haveSubDetails =
        taskData?.task_due_date ||
        taskData?.subtasks?.length ||
        taskData?.task_list?.list_title;
    const isDueDatePassed = taskData?.task_due_date
        ? checkDueDate(taskData?.task_due_date)
            ? 'text-xs text-danger'
            : 'text-xs'
        : 'text-xs';

    // functions
    const openOptions = (event: any) => {
        event.preventDefault();
        setIsOpenOptions(!isOpenOptions);
    };
    const closeOptionsMenu = () => setIsOpenOptions(false);

    return (
        <TaskItemOptions
            neededId={taskData?._id}
            isCompleted={taskData?.task_completion}
            isImportant={taskData?.is_in_important}
            isOpenOptions={isOpenOptions}
            closeOptionsMenu={closeOptionsMenu}
        >
            <button
                className='task-item'
                type='button'
                onClick={() => toggleTaskDetailsSidebar(dispatch, taskData)}
                onContextMenu={(event: any) => openOptions(event)}
            >
                <section>
                    <CheckTaskBtn
                        isCompleted={taskData?.task_completion}
                        taskId={taskData?._id}
                    />
                </section>

                <div className='task-content'>
                    <div className='flex items-center px-2 overflow-x-hidden'>
                        <Title
                            title={taskData?.task_title}
                            additionalClasses={completedTask}
                        />
                    </div>
                    {/* sub detail section */}
                    {haveSubDetails ? (
                        <div className='task-sub-detail'>
                            {taskData?.task_due_date ? (
                                <>
                                    <Subtitle
                                        additionalClasses={isDueDatePassed}
                                    >
                                        <Icon
                                            iconName='calendar-days'
                                            size='sm'
                                            color={
                                                checkDueDate(
                                                    taskData?.task_due_date
                                                )
                                                    ? 'text-danger'
                                                    : ''
                                            }
                                        />{' '}
                                        <span>
                                            {getLocalDateString(
                                                new Date(
                                                    taskData?.task_due_date
                                                )
                                            )}
                                        </span>
                                    </Subtitle>
                                </>
                            ) : null}

                            {taskData?.subtasks?.length ? (
                                <>
                                    <div className='hidden sm:block'>
                                        <Divider orientation='vertical' />
                                    </div>
                                    <Subtitle additionalClasses='text-xs flex gap-px'>
                                        <div className='subtask-counter'>
                                            {taskData?.subtasks?.length > 9
                                                ? '+9'
                                                : taskData?.subtasks?.length}
                                        </div>
                                        <span>Subtasks</span>
                                    </Subtitle>
                                </>
                            ) : null}
                            {taskData?.task_list?.list_title ? (
                                <>
                                    <div className='hidden sm:block'>
                                        <Divider orientation='vertical' />
                                    </div>
                                    <Subtitle additionalClasses='text-xs capitalize'>
                                        <Icon
                                            iconName='square'
                                            size='sm'
                                            style='fas'
                                            forceColor={
                                                taskData?.task_list?.list_color
                                            }
                                        />{' '}
                                        <span>
                                            {taskData?.task_list?.list_title}
                                        </span>
                                    </Subtitle>
                                </>
                            ) : null}
                        </div>
                    ) : null}
                </div>

                <section>
                    <AddToImportantBtn
                        isImportant={taskData?.is_in_important}
                        taskId={taskData?._id}
                    />
                </section>
            </button>
        </TaskItemOptions>
    );
};

export default TaskItem;
