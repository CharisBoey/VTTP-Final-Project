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
    completeddate: string
    priority: number
    photo: string
    fixedphoto: string
    locationaddress: string
    adminname: string
    contractorname: string
}

export interface ServiceRequestSlice {
    requestLists: serviceRequest[]
}

export interface updateServiceRequest {
    requestID: string
    completeddate: string
    fixedphoto: string
    contractorname: string
}

export interface imagePreview {
    requestID: string
    photo: string
}

export interface PlaceSearchResult {
    address: string;
    location?: google.maps.LatLng;
    imageUrl?: string;
    iconUrl?: string;
    name?: string;
}

// export interface searchQuery {
//     search: string
// }

