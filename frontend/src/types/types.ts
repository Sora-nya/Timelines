export interface Note{
    id:number,
    content:string,
    title:string
}

export interface Timeline{
    id:number,
    notes: Note[],
    title: string
}

export interface UpdateNote{
    id:number,
    content:string,
    title:string
}
  
export interface CreateNote{
    content:string,
    title:string
}
