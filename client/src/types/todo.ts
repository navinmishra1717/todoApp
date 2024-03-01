export enum TodoStatus {
    UPCOMING = 'UPCOMING',
    DONE = 'DONE'
}

export interface ITodo {
    _id: string;
    name: string;
    description: string;
    status: TodoStatus;
    createdAt?: string;
    updatedAt?: string;
}

export interface ITodos {
    items: ITodo[];
    total: number;
}

export interface TodoProps {
    todo: ITodo;
}

export type ListApiDataType = {
    status: string;
    data: ITodos;
};

export type DeleteApiDataType = {
    status: string;
};

export type ApiDataType = {
    status: string;
    data: ITodo;
};

export interface AddTodoDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
}
