import { Application } from "express";


import { loadBeekepersEndpoints } from "./beekepers";


export const loadApiEndpoints = (app: Application): void => {

  loadBeekepersEndpoints(app);
  
  //load trace enpoints


}