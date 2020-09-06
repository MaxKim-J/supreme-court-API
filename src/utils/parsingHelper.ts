// todo br로 split
// todo split한 배열 글자수에 맞게 스플릿
// 그걸 다 담은 배열 리턴

const parsingPrecedentContent = (
  content:string,
):string[] => content.split('<br>').filter((line:string) => line)

export default parsingPrecedentContent
