import { ErrorSafety } from './return'

declare global {
  interface Mutation<T = any> extends ErrorSafety<T> {}
}
