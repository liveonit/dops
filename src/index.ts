import * as os from 'os'
import {Storage} from './utils'
const homedir = os.homedir()

process.env.AWS_SDK_LOAD_CONFIG = 'false'
export const storage = new Storage(`${homedir}/.dops`, 'dops.cfg')

if (storage.getItem('aws_profiles') === undefined) {
  storage.setItem(
    'aws_profiles',
    {
      noConnect: {
        accessKeyId: 'notConnect',
        secretAccessKey: 'notConnect',
        region: 'notConnect',
      },
    }
  )
  storage.setItem('selectedProfile', 'noConnect')
}

export {run} from '@oclif/command'
