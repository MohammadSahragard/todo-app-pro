// public
import { MouseEventHandler, ReactNode, TransitionStartFunction } from 'react';

//* children
export type children = { children: React.ReactNode };

//*------ specials (components and ...)
// ui components
export type TitleTypes = {
    title: string;
    additionalClasses?: string;
};

export type SubtitleTypes = {
    subtitle?: string;
    additionalClasses?: string;
    children?: React.ReactNode;
};

export type HeadingTypes = {
    heading: string;
    additionalClasses?: string;
};

export type IconTypes = {
    style?: 'fas' | 'far' | 'fad';
    iconName: string;
    color?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    forceColor?: string;
};

export type BackForwardRoute = {
    route: 'back' | 'forward';
};

export type PassVisibilityTypes = {
    visibility: boolean;
    setVisibility: Function;
};

// ui kits components
export type MenuItemTypes = {
    href: string;
    label: string;
    iconName: string;
};

export type TaskListTypes = {
    id: string;
    userEmail: string;
    href: string;
    label: string;
    listColor: string;
};

export type TaskReminderTypes = {
    time: {
        hour: number;
        minute: number;
    };
    date: Date | undefined;
    isTrueReminder: boolean;
};

export type TaskItemTypes = {
    todoText: string;
    isCompleted?: boolean;
    isImportant?: boolean;
    todoSubDetail?: boolean;
};

//* redux slices
export type SubtaskOptionsTypes = {
    neededId: string;
    userEmail: string;
    neededTitle?: string;
    isImportant?: boolean;
    isCompleted: boolean;
    isOpenOptions: boolean;
    closeOptionsMenu: (isOpen: boolean) => void;
    checkHandler: MouseEventHandler;
    children: ReactNode;
};

export type ListItemOptionsTypes = Pick<
    SubtaskOptionsTypes,
    | 'neededId'
    | 'neededTitle'
    | 'userEmail'
    | 'closeOptionsMenu'
    | 'isOpenOptions'
    | 'children'
>;

export type TaskOptionsTypes = Pick<
    SubtaskOptionsTypes,
    | 'neededId'
    | 'isCompleted'
    | 'isImportant'
    | 'isOpenOptions'
    | 'closeOptionsMenu'
    | 'children'
>;

type TaskSubtask = {
    subtaskTitle: string;
    subtaskIsCompleted: boolean;
};
export type TaskContent = {
    taskTitle: string;
    taskDescription: string;
    taskList: {
        list_title: string;
        list_color: string;
    };
    taskDate: Date | null;
    taskReminder: {
        time: {
            hour: number;
            minute: number;
        };
        date: Date | null;
        isTrueReminder: boolean;
    };
    taskSubtasks: TaskSubtask[];
};

// signup submit
export type SignupSubmitTypes = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

// login submit
export type LoginSubmitTypes = {
    email: string;
    password: string;
};

// types for isUserLoggedIn function
export type IsUserLoggedInTypes = {
    condition: boolean;
    pathname: string;
    router: any;
};

// types for add task list
export type AddTaskListTypes = {
    email: string;
    listTitle: string;
    listColor: string;
};

// types for selected task for details sidebar
export type selectedTaskTypes = {
    _id: string;
    email: string;
    task_title: string;
    task_description: string;
    task_due_date: Date | null;
    task_list: {
        list_title: string;
        list_color: string;
    };
    task_reminder_date: {
        time: {
            hour: number;
            minute: number;
        };
        date: Date | null;
        isTrueReminder: boolean;
    };
    subtasks: {
        subtask_title: string;
        subtask_completion: boolean;
    }[];
    task_complete: boolean;
    is_in_important: boolean;
    createdAt: Date | null;
};

// types for notes data
export type NoteData = {
    _id: string;
    note_title: string;
    note_content: string;
    note_color: string;
};
export type NoteTypes = Pick<
    NoteData,
    'note_title' | 'note_content' | 'note_color'
>;

// context menu slice
export type ItemDataTypes = {
    id: string;
    listTitle?: string
    isCompleted?: boolean;
    isImportant?: boolean;
    checkHandler?: MouseEventHandler;
    onOpen?: () => void;
    completionTransition?: TransitionStartFunction;
    importantTransition?: TransitionStartFunction;
};
export type MenuPositionTypes = {
    x: number;
    y: number;
    XAxisSide: 'left' | 'right';
    YAxisSide: 'top' | 'bottom';
};
export type ContextMenuTypes = {
    menuName: 'tasks' | 'lists' | 'subtasks';
    itemData: ItemDataTypes;
    isShownMenu: boolean;
    menuPosition: MenuPositionTypes;
};
