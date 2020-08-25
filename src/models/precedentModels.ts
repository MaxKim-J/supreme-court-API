import { DeepPartial } from 'typeorm'
import Precedent from '../models/entities/precedent'

class PrecedentModel {
  // get base/precedent
  getAll():Promise<Precedent[]> {
    return Precedent.find()
  }

  // get base/precedent/?type='civil'
  getPrecedentsByType(type:string):Promise<Precedent[]> {
    return Precedent.find({ where: { type } })
  }

  // post base/precedent
  async createPrecedent(precedent:DeepPartial<Precedent>):Promise<Mutation<Precedent>> {
    try {
      const result = await Precedent.create(precedent).save()
      return {
        success: true,
        result,
      }
    } catch (e) {
      return {
        success: false,
        error: e,
      }
    }
  }
  // createPrecedent(isUpdateTweet) {

  // }
}

export default PrecedentModel
