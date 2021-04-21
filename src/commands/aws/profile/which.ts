import { Command } from '@oclif/command'

import { storage } from '../../..'

import color from 'chalk'

export default class Config extends Command {
  static description = 'Get active profile'

  static flags = {
  }

  static args = []

  async run() {
    try {
      const selProf = storage.getItem('selectedProfile')
      selProf === null ?
        this.log(color.red('You do not have a selected profile')) :
        this.log(color.green(`Your selected profile is: ${selProf}`))
    } catch (error) {
      this.error(error)
    }
  }
}
