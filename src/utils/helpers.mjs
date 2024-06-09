import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = (plain, hashed) => {
  // Returns true or false
  return bcrypt.compareSync(plain, hashed);
};
