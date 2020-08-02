import Precedent from '../models/entities/precedent'

class PrecedentModel {
  // get base/precedent
  getAll():Promise<Precedent[]> {
    return Precedent.find()
  }

  // get base/precedent/?page=1
  getByPageNum(pageNum:number):Promise<Precedent[] | undefined> {
    const start = (pageNum - 1) * 5
    const end = start + 4
    return Precedent.find({ order: { createdAt: 'DESC' }, skip: start, take: end })
  }

  // get base/precedent/?id='n'
  getById(id:number):Promise<Precedent | undefined> {
    return Precedent.findOne({ where: { id } })
  }

  // get base/precedent/?type='civil'
  getPrecedentsByType(type:string):Promise<Precedent[] | undefined> {
    return Precedent.find({ where: { type } })
  }

  // post base/precedent
  // createPrecedent(isUpdateTweet) {

  // }
}

export default PrecedentModel
