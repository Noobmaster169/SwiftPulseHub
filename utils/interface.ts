export interface TaskData {
    _id?        : string;
    taskName?   : string;
    description?: string;
    type?       : string;
    status?     : string;
    storyPoint? : string;
    assignedTo? : string;
    projectStage?: string; 
    priority?   : string;
    tags?       : string[];
    timeLog?    : Log[];
    isDeleted?  : boolean;
}

export interface SprintData {
    _id?: string;
    sprintName: string;
    startDate: Date;
    endDate: Date;
    status: string;
    tasks: string[];
}

export interface Log{
    timeLogged: number;
    member: string;
    message: string;
}