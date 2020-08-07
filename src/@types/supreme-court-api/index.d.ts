import { Precedent } from './precedent'

declare global {
  interface Precedent {
    name:string,
    content:string,
    url:string,
    type:string,
  }
  export interface PrecedentInstance extends Precedent {
    id:number,
    createdAt:Date,
    updatedAt:Date,
  }
}
