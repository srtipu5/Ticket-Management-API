import { log, SiteModel } from 'rms-lib'

export async function findSiteName(uid: number | undefined): Promise<string | null> {
  try {
    if(!uid) return null
    const site_details = await SiteModel.find({
      where: {
        uid,
      },
    })

    if (site_details.length) return site_details[0].name

    return null
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong from rms-save-ticket !!')
  }
}
