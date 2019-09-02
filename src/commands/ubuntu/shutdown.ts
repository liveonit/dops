import Vorpal from 'vorpal'
import { execute } from '../../utils'
module.exports = (program: Vorpal) => program.command("sys down", "System shutdown").action(async () => { 
  await execute("shutdown -r now")
});