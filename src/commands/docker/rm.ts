import Vorpal from 'vorpal'
import { dokcerFunction, Method } from './'

const dockerRm = async (args: any) => {
  if (args.options.all) {
    dokcerFunction(args, Method.rmc);
    dokcerFunction(args, Method.rmn);
    dokcerFunction(args, Method.rmv);
    dokcerFunction(args, Method.rmi);
  } else {
    if (args.options.images) {
      dokcerFunction(args, Method.rmi);
    }
    if (args.options.networks) {
      dokcerFunction(args, Method.rmn);
    }
    if (args.options.volumes) {
      dokcerFunction(args, Method.rmv);
    }
    if (args.options.containers) {
      dokcerFunction(args, Method.rmc);
    }
  }
};

module.exports = (program: Vorpal) => program
  .command("docker rm", "Delete all elements of an indicated element type")
  .option("-a, --all", "Remove all containers, images, volumes and network")
  .option("-i, --images", "Remove all images")
  .option("-n, --networks", "Remove all networks")
  .option("-v, --volumes", "Remove all volumes")
  .option("-c, --containers", "Remove all containers")
  .option("-f, --forced", "Remove forced")
  .action(dockerRm);