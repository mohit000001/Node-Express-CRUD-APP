import { ValidationResponse } from "../Types"

const ValidateAddOpt = (data: any) : ValidationResponse => {
  if(!data.id || !data.name || !data.age || !data.class || !data.section) {
      return {
          status: false,
          message: "One of required feild data (id, name, age, class, section) is missing. errorCode #01"
      }
  }
  return {
      status: true
  }
}

const ValidateEditOpt = (data: any) : ValidationResponse => {
    if(!data.query.id || !data.data.name || !data.data.age || !data.data.class || !data.data.section) {
        return {
            status: false,
            message: "One of required feild data (id, name, age, class, section) is missing. errorCode #01"
        }
    }
    return {
        status: true
    }
  }


  const ValidateDeleteOpt = (data: any) : ValidationResponse => {
    if(!data.id) {
        return {
            status: false,
            message: "ID is missing. errorCode #01"
        }
    }
    return {
        status: true
    }
  }

export {ValidateAddOpt, ValidateEditOpt, ValidateDeleteOpt}