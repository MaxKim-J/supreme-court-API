import { ErrorSafety } from './return'
import { Instance } from './instance'

declare global {
  interface Precedent {
    name:string,
    content:string,
    url:string,
    type:string,
    success?:boolean
  }
  interface PrecedentInstance extends Instance, Precedent {}
  export interface Mutation<T = any> extends ErrorSafety<T> {}
}
