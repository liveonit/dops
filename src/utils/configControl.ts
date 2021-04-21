/* eslint-disable quotes */
// eslint-disable-next-line unicorn/filename-case
import AWS, {Config} from 'aws-sdk'
import color from 'chalk'
import {storage} from '..'

interface Credential {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
}

const updateConfigManual = ({accessKeyId, secretAccessKey, region}: Credential): Promise<Config> => {
  const actualConfig = {
    accessKeyId: accessKeyId || 'noConnect',
    secretAccessKey: secretAccessKey || 'noConnect',
    region: region || 'noRegion',
  }
  return new Promise((resolve, reject) => {
    const sts = new AWS.STS(actualConfig)
    sts.getCallerIdentity((err: any) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(color.red('Unable to connect to aws'))
        reject(err)
      }
      resolve(new AWS.Config(actualConfig))
    })
  })
}

const updateConfig = async () => {
  const selProf = storage.getItem('selectedProfile')
  const profiles = storage.getItem('aws_profiles') || {}
  if (profiles === {} || selProf === undefined) {
    // eslint-disable-next-line no-console
    console.log(color.yellow('Before using that command you must configure an aws profile'))
  }
  const actualConfig = profiles[selProf] || {}
  try {
    return await updateConfigManual(actualConfig)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Antes de usar este comando")
  }
}

export const getConfig = updateConfig
