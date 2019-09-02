import Vorpal from 'vorpal'
import { dokcerFunction, Method } from './'
const dockerStop = async (args: any) => {
  dokcerFunction(args, Method.stop);
};

module.exports = (program: Vorpal) => program
  .command("docker stop", "Delete all elements of an indicated element type")
  .option("-a, --all", "Remove all containers, images, volumes and network")
  .option("-i, --images", "Remove all images")
  .option("-n, --networks", "Remove all networks")
  .option("-v, --volumes", "Remove all volumes")
  .option("-c, --containers", "Remove all containers")
  .option("-f, --forced", "Remove forced")
  .action(dockerStop);


