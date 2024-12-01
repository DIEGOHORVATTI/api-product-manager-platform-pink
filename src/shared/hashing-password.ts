export const hashPassword = async (password: string) => {
  return Bun.password.hash(password, {
    algorithm: 'argon2id',
    memoryCost: 65536, // 64MB
    timeCost: 2
  })
}
