/* eslint-disable unicorn/filename-case */
import { Command } from '@oclif/command'

import color from 'chalk'

import AWS from 'aws-sdk'
import { getConfig } from '../../../utils/configControl'

export default class GetAccount extends Command {
  static description = 'Get aws account name or alias'

  static flags = {}

  static args = []

  async run() {
    try {
      const config: any = await getConfig()
      if (config !== undefined) {
        config.apiVersion = '2010-05-08'
        // Create the IAM service object
        const iam = new AWS.IAM(config)

        const result = await iam.listAccountAliases({ MaxItems: 10 }).promise()
        this.log(
          color.green(`Your actual account is: ${result.AccountAliases[0]}`)
        )
      }
    } catch (error) {
      this.error(error)
    }
  }
}
