export interface TaskData {
    taskName?   : string;
    description?: string;
    type?       : string;
    status?     : string;
    storyPoint? : string;
    assignedTo? : string;
    projectStage?: string; 
    priority?   : string;
    tags?       : string[];
    isDeleted?  : boolean;
}

export interface SprintData {
    sprintName: string;
    startDate: Date;
    endDate: Date;
    status: string;
}