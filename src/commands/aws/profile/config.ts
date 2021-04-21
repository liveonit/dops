import { Command, flags } from '@oclif/command'
import color from 'chalk'
import { storage } from '../../..'

import cli from 'cli-ux'

export default class Config extends Command {
  static description = 'Create new profile'

  static flags = {
    help: flags.help({ char: 'h' }),
    region: flags.string({ char: 'r', description: 'aws list ec2 instances for specific region or all' }),
    format: flags.string({ char: 'f', description: 'aws list ec2 instances in json or yaml format' }),
  }

  static args = [{ name: 'profile_name' }]

  async run() {
    const { args } = this.parse(Config)
    try {
      const profiles = storage.getItem('aws_profiles') || {}
      let keyIdChunk = ''
      let secretAccessKeyChunk = ''
      const actualConfig = profiles[args.profile] || undefined
      if (actualConfig !== undefined) {
        console.log(color.cyan('Update aws profile: '))
        if (actualConfig.accessKeyId !== undefined) {
          keyIdChunk = actualConfig.accessKeyId.slice(-5)
        }
        if (actualConfig.secretAccessKey !== undefined) {
          secretAccessKeyChunk = actualConfig.secretAccessKey.slice(-5)
        }
      } else {
        this.log(color.cyan('Create new aws profile: '))
      }
      const accessKeyId = (await cli.prompt('AWS Access Key ID' + (actualConfig ? `[*********${keyIdChunk}]: ` : ': '),
        { type: 'mask' })) || actualConfig.accessKeyId
      const secretAccessKey = (await cli.prompt(
        'AWS Secret Access Key' + (actualConfig ? `[*********${secretAccessKeyChunk}]: ` : ': '),
        { type: 'mask' })) || actualConfig.secretAccessKey
      const region = (await cli.prompt(
        'Default region name' + (actualConfig ? `[${actualConfig.region}]: ` : ': '),
        { type: 'hide' })) || actualConfig.region
      profiles[args.profile] = { accessKeyId, secretAccessKey, region }
      storage.setItem('aws_profiles', profiles)
    } catch (error) {
      this.error(error)
    }
  }
}
