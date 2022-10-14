
export type Beekeper = {
  id: string;
  fullname: string;
  activityStartDate: Date;
  location: string;
  infoCid: string;
};

export interface Trace {
  id: string,
  [key: string]: any;
}
