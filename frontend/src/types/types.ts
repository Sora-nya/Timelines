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
  