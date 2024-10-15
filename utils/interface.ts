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
    completedAt?: string;
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
    date: Date;
    member: string;
    message: string;
}

export interface UserData{
    _id?: string;
    name: string;
    email: string;
    hash: string;
}
    
export interface memberData {
    name: string;
    totalHours?: number;
    HoursPerDay?: number;
    email: string;
    workingHours?: Array<{ date: string; hours: number }>;
    assignedTasks?: string[];
}

export interface teamBoard {
    startDate: Date;
    endDate: Date;
    memberList: memberData[];
}