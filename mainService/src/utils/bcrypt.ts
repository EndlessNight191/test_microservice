import bcrypt from 'bcrypt'

export const coded = async string => {
  return bcrypt.hashSync(string, 8);
}

export const decoded = async (string, passwordHash) => {
  return bcrypt.compareSync(string, passwordHash);
}
