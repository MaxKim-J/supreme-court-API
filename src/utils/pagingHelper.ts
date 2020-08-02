import Precedent from '../models/entities/precedent'

const sliceByPage = (target:Precedent[], pageNum:number) => {
  const start = (pageNum - 1) * 5
  const end = start + 4
  return [...target].slice(start, end)
}

export default sliceByPage
