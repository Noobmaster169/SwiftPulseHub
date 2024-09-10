export interface TaskData {
    taskName?   : string;
    description?: string;
    type?       : string;
    status?     : string;
    storyPoint? : string;
    assignedTo? : string;
    finishedBy? : string;
    priority?   : string;
    tags?       : string[];
    isDeleted?  : boolean
}