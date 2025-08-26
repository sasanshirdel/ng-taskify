export type Status = "OPEN" | "IN-PROGRESS" | "DONE";

export interface Task {
    id: string,
    title: string
    des: string
    status: Status
}