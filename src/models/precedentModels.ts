import { DeepPartial } from 'typeorm'
import Precedent from '../models/entities/precedent'

class PrecedentModel {
  getAll():Promise<Precedent[]> {
    return Precedent.find()
  }

  getPrecedentsByType(type:string):Promise<Precedent[]> {
    return Precedent.find({ where: { type } })
  }

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
}

export default PrecedentModel
