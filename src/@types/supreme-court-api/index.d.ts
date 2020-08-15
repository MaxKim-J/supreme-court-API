import { ErrorSafety } from './return'
import { Instance } from './instance'

declare global {
  interface Precedent {
    name:string,
    content:string,
    url:string,
    type:string,
  }
  interface PrecedentInstance extends Instance, Precedent {}
  interface Mutation<T = any> extends ErrorSafety<T> {}
}
