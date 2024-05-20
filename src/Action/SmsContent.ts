import { log } from 'rms-lib'

export async function smsContent(site_name: string, token: number ): Promise<string> {
  try {
    return `Dear RMS User,\nFor site: ${site_name}.\nTicket has been assigned with token number: ${token}`
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong from rms-save-ticket !!')
  }
}
