import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from 'http-status-codes'

abstract class RequestError extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(message)
  }
}

export class BadRequest extends RequestError {
  constructor(message: string = '유효하지 않은 요청입니다.') {
    super(message)
    this.statusCode = BAD_REQUEST
  }
}

export class NotFound extends RequestError {
  constructor(message: string = '리소스가 존재하지 않습니다.') {
    super(message)
    this.statusCode = NOT_FOUND
  }
}

export class InternalServerError extends RequestError {
  constructor(message: string = '서버 내부에서 에러가 발생했습니다.') {
    super(message)
    this.statusCode = INTERNAL_SERVER_ERROR
  }
}
