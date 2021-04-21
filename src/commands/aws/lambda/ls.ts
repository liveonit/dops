import { Command, flags } from '@oclif/command'
import * as YAML from 'js-yaml'
import { getConfig } from '../../../utils/configControl'
import AWS from 'aws-sdk'
import ora from 'ora'
const spinner = ora('Loading instances')

export default class Ls extends Command {
  static description = 'List lambda functions'

  static flags = {
    help: flags.help({ char: 'h' }),
    region: flags.string({ char: 'r', description: 'aws list lambda functions for specific region or default region' }),
    format: flags.string({ char: 'f', description: 'return result in json or yaml format' }),
  }

  static args = []

  async run() {
    const { flags } = this.parse(Ls)
    try {
      const config: any = await getConfig()
      if (config !== undefined) {
        config.apiVersion = '2015-03-31'
        let lambda
        const region = flags.region
        if (!region) {
          lambda = new AWS.Lambda(config)
        } else {
          config.region = region
          lambda = new AWS.Lambda(config)
        }
        const result = await lambda
        .listFunctions({
          MaxItems: 10000,
        })
        .promise()
        spinner.succeed()
        if (flags.format === undefined || flags.format.toLowerCase() === 'json') {
          console.dir(result, { depth: 20, colors: true })
        } else if (flags.format.toLowerCase() === 'yaml') {
          console.log(
            YAML.dump(result)
          )
        }
      }
    } catch (error) {
      this.error(error)
    }
  }
}
