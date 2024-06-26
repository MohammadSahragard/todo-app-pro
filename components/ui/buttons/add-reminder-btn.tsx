'use client';

// Public
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Components
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@nextui-org/react';
import Icon from '../texts/icon';
import Subtitle from '../texts/subtitle';
import DateTimePicker from '@/components/ui-kits/date-time-picker';

//* Functions
import {
    laterTime,
    getDate,
    getDayOfWeek,
    zeroBeforeSingle,
    dateToLocalDateString,
} from '@/helper/functions/functions';

//* Redux
import {
    setTaskReminder,
    setShowReminder,
} from '@/redux/features/task-data/taskDataSlice';
import TooltipElement from '../texts/tooltip-element';

//* Types
type saveReminderType = {
    hour: number;
    minute: number;
    date: Date;
};

const AddReminderBtn = () => {
    const dispatch = useAppDispatch();
    // States and variables
    const taskReminder = useAppSelector(
        (state) => state.taskData.task_reminder_date
    );
    const [isOpenPicker, setIsOpenPicker] = useState(false);

    // Functions
    const saveReminder = ({ hour, minute, date }: saveReminderType) => {
        dispatch(
            setTaskReminder({
                time: {
                    hour: hour,
                    minute: minute,
                },
                date: date,
                isTrueReminder: true,
            })
        );
    };

    return (
        <Dropdown
            className='bg-primary-100'
            isOpen={isOpenPicker}
            onOpenChange={() => setIsOpenPicker(!isOpenPicker)}
        >
            {/* The dropdown trigger */}
            <TooltipElement title='Add reminder'>
                <div>
                    <DropdownTrigger>
                        <Button
                            variant='light'
                            className='text-start leading-none'
                            radius='sm'
                            startContent={
                                <Icon
                                    iconName='alarm-clock'
                                    color={
                                        taskReminder.isTrueReminder
                                            ? 'text-foreground'
                                            : ''
                                    }
                                />
                            }
                            isIconOnly={
                                taskReminder.isTrueReminder ? false : true
                            }
                        >
                            {taskReminder.isTrueReminder ? (
                                <section>
                                    <span>
                                        {zeroBeforeSingle(
                                            taskReminder.time.hour
                                        )}
                                        :
                                        {zeroBeforeSingle(
                                            taskReminder.time.minute
                                        )}
                                    </span>
                                    <Subtitle
                                        subtitle={dateToLocalDateString(
                                            taskReminder.date
                                        )}
                                        additionalClasses='text-xs'
                                    />
                                </section>
                            ) : null}
                        </Button>
                    </DropdownTrigger>
                </div>
            </TooltipElement>

            {/* The dropdown menu */}
            <DropdownMenu
                variant='flat'
                selectionMode='single'
            >
                {/* The default options */}
                <DropdownItem
                    startContent={<Icon iconName='calendar-day' />}
                    endContent={
                        <Subtitle subtitle={`Later ${laterTime()}:00`} />
                    }
                    key='today'
                    onClick={() =>
                        saveReminder({
                            hour: laterTime(),
                            minute: 0,
                            date: getDate().today,
                        })
                    }
                >
                    Today
                </DropdownItem>
                <DropdownItem
                    startContent={<Icon iconName='calendar-arrow-down' />}
                    endContent={
                        <Subtitle
                            subtitle={`${getDayOfWeek().tomorrow}, 09:00`}
                        />
                    }
                    key='tomorrow'
                    onClick={() =>
                        saveReminder({
                            hour: 9,
                            minute: 0,
                            date: getDate().tomorrow,
                        })
                    }
                >
                    Tomorrow
                </DropdownItem>
                <DropdownItem
                    startContent={<Icon iconName='calendar-week' />}
                    endContent={<Subtitle subtitle='Saturday, 09:00' />}
                    key='next-week'
                    onClick={() =>
                        saveReminder({
                            hour: 9,
                            minute: 0,
                            date: getDate().nextWeek,
                        })
                    }
                    showDivider
                >
                    Next Week
                </DropdownItem>

                {/* Optional selection option (calendar and time popover) */}
                <DropdownItem
                    startContent={<Icon iconName='calendar-day' />}
                    isReadOnly
                >
                    <Popover>
                        <PopoverTrigger>Pick a date & time</PopoverTrigger>
                        <PopoverContent className='p-0 bg-background'>
                            <DateTimePicker taskReminder={taskReminder} />
                            <Button
                                size='sm'
                                className='m-2 bg-foreground text-background self-end'
                                onClick={() => {
                                    dispatch(setShowReminder(true));
                                    setIsOpenPicker(false);
                                }}
                            >
                                Save
                            </Button>
                        </PopoverContent>
                    </Popover>
                </DropdownItem>
                <DropdownItem
                    startContent={
                        <Icon
                            iconName='trash'
                            color='text-danger'
                        />
                    }
                    className={
                        taskReminder.isTrueReminder ? 'text-danger' : 'hidden'
                    }
                    onClick={() => dispatch(setShowReminder(false))}
                    color='danger'
                >
                    Remove due date
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default AddReminderBtn;
