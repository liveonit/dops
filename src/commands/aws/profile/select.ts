import { Command } from '@oclif/command'

import { storage } from '../../..'

import * as inquirer from 'inquirer'

export default class Config extends Command {
  static description = 'Select aws profile'

  static flags = {}

  static args = []

  async run() {
    try {
      const questions = [
        {
          name: 'selectedProfile',
          type: 'list',
          message: 'Select profile: ',
          choices: Object.entries(
            storage.getItem('aws_profiles') || {}
          ).map(dato => dato[0]),
        },
      ]
      const response: any = await inquirer.prompt(questions)
      storage.setItem('selectedProfile', response.selectedProfile)
    } catch (error) {
      this.error(error)
    }
  }
}
