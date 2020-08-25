export const precedentMockData = [
  {
    name: '판례제목',
    content: '판례내용',
    url: '유알엘',
    type: 'civil',
  },
  {
    name: '판례제목',
    content: '판례내용',
    url: '유알엘',
    type: 'criminal',
  },
  {
    name: '판례제목',
    content: '판례내용',
    url: '유알엘',
    type: 'civil',
  },
  {
    name: '판례제목',
    content: '판례내용',
    url: '유알엘',
    type: 'criminal',
  },
  {
    name: '판례제목',
    content: '판례내용',
    url: '유알엘',
    type: 'civil',
  },
]

export const newProperPrecedent = {
  name: '판례제목',
  content: '판례내용',
  url: '유알엘',
  type: '타입',
}

export const properTweetUpdateBody = {
  isTweetUpdate: true,
  precedents: [newProperPrecedent],
}
export const properNotTweetUpdateBody = {
  isTweetUpdate: false,
  precedents: [newProperPrecedent],
}

export const bodyWithoutPrecedents = {
  isTweetUpdate: false,
}

export const tweetMockData = []
