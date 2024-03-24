export interface login {
    username: string
    password: string
    adminPosition: boolean
}

export const enum userRoleState {
    UNDETERMINED = "UNDETERMINED",
    ADMIN = "ADMIN",
    STANDARD = "STANDARD"
}

export interface userRole{ 
    roleState: userRoleState;
}

export interface icon {  
    iconName: string;  
    value: number;  
}  

export interface serviceRequest {
    requestID: string
    request: string
    duedate: string
    priority: number
    photo: string
}

export interface ServiceRequestSlice {
    requestLists: serviceRequest[]
}

export interface imagePreview {
    requestID: string
    photo: string
}
