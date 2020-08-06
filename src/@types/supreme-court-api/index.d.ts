import { Precedent } from './precedent'

declare global {
  export interface Precedent {}
  export interface PrecedentInstance extends Precedent {
    id:number,
    createdAt:Date,
    updatedAt:Date,
  }
}
