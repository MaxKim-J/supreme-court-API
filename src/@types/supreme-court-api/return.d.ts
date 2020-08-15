export interface ErrorSafety<T> {
  success: boolean;
  error?: any;
  result?: T;
}
