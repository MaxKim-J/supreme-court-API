import { ErrorSafety } from './return'
import { Instance } from './instance'

declare global {
  interface Precedent {
    name:string,
    content:string,
    url:string,
    type:string,
  }
  interface Tweet {
    content: string,
    uploadedAt: null | Date
  }

  interface PrecedentInstance extends Instance, Precedent {}
  interface TweetInstance extends Instance, Tweet {}

  interface Mutation<T = any> extends ErrorSafety<T> {}
}
