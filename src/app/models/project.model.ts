export class Project {

  constructor (
    public projectID?: number,
      public name?: string,
      public client?: string,
      public date_start?: Date,
      public date_end?: Date,
      public totalRows?: number,
  ) { }

}
