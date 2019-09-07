import Vorpal from 'vorpal'
import { execute } from '../../utils'
module.exports = (program: Vorpal) => program.command("sys restart", "System restart").action(async () => {
  await execute("shutdown -r now");
});