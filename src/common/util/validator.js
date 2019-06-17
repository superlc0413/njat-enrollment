const phoneRegs = [
  /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/,
  /^1[34578]\d{9}$/,
  /^1\d{10}$/
]

const idCardRegs = [
  /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|30|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/
]

export const validateName = str => str !== ""

export const validatePhone = (str, i = 0) => {
  if (phoneRegs[i]) return phoneRegs[i].test(str)
  else return false
}

export const validateAge = age => {
  age = parseInt(age)
  return age > 1 && age < 120
}

export const validateIdCard = (str, i = 0) => {
  if (idCardRegs[i]) return idCardRegs[i].test(str)
  else return false
}

export const validataHeight = height => {
  height = parseInt(height)
  return height > 0 && height < 250
}

export default {
  name: validateName,
  phone: validatePhone,
  age: validateAge,
  card: validateIdCard
}
