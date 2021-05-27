import { Token, TOKEN_PROGRAM_ID, u64 } from '@solana/spl-token'
import { Account, Connection, PublicKey, SYSVAR_RENT_PUBKEY, Transaction } from '@solana/web3.js'
import assert from 'assert'

// Pubkey -> H7URR1ne1XUmA4jt2uGs3s3cq9jY7icNhELwJDj66MJt
export const predefinedAccount = new Account([
  79, 134, 56, 242, 212, 29, 172, 166, 210, 60, 44, 90, 246, 106, 225, 168, 252, 195, 220, 29, 189,
  47, 162, 224, 121, 90, 1, 48, 190, 75, 176, 196, 239, 99, 123, 10, 14, 36, 181, 154, 226, 14, 74,
  215, 0, 109, 110, 191, 246, 143, 255, 178, 220, 41, 198, 73, 77, 31, 58, 9, 89, 35, 64, 181
])

interface ICreateToken {
  connection: Connection
  payer: Account
  mintAuthority: PublicKey
  decimals?: number
}
export const createToken = async ({
  connection,
  payer,
  mintAuthority,
  decimals = 6
}: ICreateToken) => {
  const token = await Token.createMint(
    connection,
    payer,
    mintAuthority,
    null,
    decimals,
    TOKEN_PROGRAM_ID
  )
  return token
}

export async function assertThrowsAsync(fn: Promise<any>, regExp?) {
  let f = () => {}
  try {
    await fn
  } catch (e) {
    f = () => {
      throw e
    }
  } finally {
    assert.throws(f, regExp)
  }
}
