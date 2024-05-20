import { log, UserModel, CompanyModel } from 'rms-lib'

export async function getCompanyUserUid(uid: number): Promise<number | null> {
  try {
    const user_details = await UserModel.find({
      where: {
        uid,
      },
    })

    if (user_details[0].company_id) {
      const company_details = await CompanyModel.find({
        where: {
          id: user_details[0].company_id,
        },
      })

      return company_details[0].user_uid
    }

    return null
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong from rms-save-ticket !!')
  }
}
