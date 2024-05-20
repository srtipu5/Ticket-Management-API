import { log, UserModel, AccessUserModel } from 'rms-lib'

export async function findUserPhone(uid: number | undefined): Promise<string | null> {
  try {
    if(!uid) return null
    const user_details = await UserModel.find({
      where: {
        uid,
      },
    })

    if (user_details.length) return user_details[0].phone

    const access_user_details = await AccessUserModel.find({
      where: {
        uid,
      },
    })

    if (access_user_details.length) return access_user_details[0].phone

    return null
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong from rms-save-ticket !!')
  }
}
