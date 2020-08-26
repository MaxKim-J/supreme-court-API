import { BadRequest } from '../errors'

const validateIdNaN = (id:string) => {
  const numberId = parseInt(id as string, 10)
  if (Number.isNaN(numberId)) { throw new BadRequest('last query는 숫자만 가능합니다.') }
  return numberId
}

export default validateIdNaN
