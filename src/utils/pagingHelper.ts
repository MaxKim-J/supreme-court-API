const sliceByPage = (target:PrecedentInstance[], pageNum:number) => {
  const start = (pageNum - 1) * 5
  const end = start + 5
  return [...target].slice(start, end)
}

export default sliceByPage
