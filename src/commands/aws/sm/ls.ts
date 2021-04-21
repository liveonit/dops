import { Command, flags } from '@oclif/command'
import * as YAML from 'js-yaml'
import { getConfig } from '../../../utils/configControl'
import AWS from 'aws-sdk'
import ora from 'ora'
import { ListSecretsResponse } from 'aws-sdk/clients/secretsmanager'
import { DescribeRegionsResult } from 'aws-sdk/clients/ec2'
const spinner = ora('Loading secrets')

export default class Ls extends Command {
  static description = 'List secrets'

  static flags = {
    help: flags.help({ char: 'h' }),
    region: flags.string({ char: 'r', description: 'aws list secrets for specific region or all region' }),
    format: flags.string({ char: 'f', description: 'return result in json or yaml format' }),
  }

  static args = []

  async run() {
    const { flags } = this.parse(Ls)
    try {
      const config: any = await getConfig()
      const allSecrets = []
      spinner.start()
      if (config !== undefined) {
        config.apiVersion = '2017-10-17'
        if (flags.region !== 'all') {
          if (flags.region !== undefined) {
            config.region = flags.region
          }
          const sm = new AWS.SecretsManager(config)
          const secrets: ListSecretsResponse = await sm.listSecrets().promise()
          if (secrets) allSecrets.push(secrets)
        } else { // region === "all"
          const ec2 = new AWS.EC2(config)
          const regionsResult: DescribeRegionsResult = await ec2.describeRegions().promise()
          await Promise.all(
            (regionsResult.Regions || []).map(
              async reg => {
                config.region = reg.RegionName
                const sm = new AWS.SecretsManager(config)
                const secrets: ListSecretsResponse = await sm.listSecrets().promise()
                if (secrets) allSecrets.push(secrets)
              }))
        }
      }
      spinner.succeed()
      if (flags.format === undefined || flags.format.toLowerCase() === 'json') {
        console.dir(allSecrets, { depth: 20, colors: true })
      } else if (flags.format.toLowerCase() === 'yaml') {
        console.log(
          YAML.dump(allSecrets)
        )
      }
    } catch (error) {
      this.error(error)
    }
  }
}
