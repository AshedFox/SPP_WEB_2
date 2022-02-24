export interface TodoDto {
    id: string,
    name: string,
    description?: string,
    user: any,
    createdAt: Date,
    plannedTo?: Date,
    isCompleted: boolean

}
