import color from 'chalk'
import ora from 'ora'
const spinner = ora("Loading unicorns");
import { program } from '../../'
import { execute, sleep } from '../../utils'
export enum Method { rmi, rmc, rmv, rmn, stop }

export const dokcerFunction = async (args: any, method: Method) => {
  if (!testIfDockerExist) {
    program.log(
      color.bold(
        color.red(
          "Dock is not installed, please install them before using these commands"
        )
      )
    );
    return;
  } else {
    let presentContinuousAction: string; 
    let  performedAction: string;
    let  performedActionWithouConjugation: string; 
    let  actionType: string; 
    let  elemType: string; 
    let  listCommand;
    let mainCommand: (image: any, forced: any) => string; 
    if (method === Method.stop) {
      presentContinuousAction = "Stoping";
      performedAction = "stoped";
      performedActionWithouConjugation = "stop";
      actionType = "stop";
    } else {
      presentContinuousAction = "Deleting";
      performedAction = "deleted";
      performedActionWithouConjugation = "delete";
      actionType = "rm";
    }

    switch (+method) {
      case Method.rmi:
        elemType = "image";
        listCommand = "docker image ls -q";
        mainCommand = (image: any, forced: any) =>
          `docker rmi ` + (forced ? "-f " : " ") + `${image}`;
        break;
      case Method.rmc:
        elemType = "conatainer";
        listCommand = "docker ps -q -f status=exited";
        mainCommand = (container: any, forced: any) =>
          `docker rm ` + (forced ? "-f " : " ") + `${container}`;
        break;
      case Method.rmn:
        elemType = "network";
        listCommand = "docker network ls -q";
        mainCommand = (network: any, forced: any) => `docker network rm ` + `${network}`;

        break;
      case Method.rmv:
        elemType = "volume";
        listCommand = "docker volume ls -q";
        mainCommand = (volume: any, forced: any) =>
          `docker volume rm ` + (forced ? "-f " : " ") + `${volume}`;
        break;
      case Method.stop:
        elemType = "container";
        listCommand = "docker ps -q";
        mainCommand = (container: any, forced: any) =>
          !forced
            ? `docker stop ${container}`
            : `sudo docker update --restart=no ${container} &&\
        docker stop ${container}`;
        break;
      default:
        program.log("Can't execute with this element");
        return;
    }

    const elementsList: string[] = (await execute(listCommand)).stdout
      .trim()
      .split(/ |\n/)
      .filter((elem: string) => elem !== "");
    if (elementsList.length === 0) {
      program.log(`There are no active ${elemType}s`);
      return;
    }
    if (args.options.forced) {
      elementsList.forEach(async (elem: any) => {
        spinner.start(`${presentContinuousAction} ${elemType} ${elem}`);
        const { code } = await execute(mainCommand(elem, true));
        code === 0
          ? spinner.succeed(
              color.green(`The ${elemType} ${elem} was ${performedAction}`)
            )
          : spinner.fail(
              color.red(
                `The ${elemType} ${elem} could not be ${performedAction}`
              )
            );
      });
    } else {
      elementsList.forEach(async (elem: any) => {
        spinner.start(`${presentContinuousAction} ${elem}`);
        const { code } = await execute(mainCommand(elem, false));
        code === 0
          ? spinner.succeed(color.green(`${elem} was ${performedAction}`))
          : spinner.fail(
              color.red(`The ${elem} could not be ${performedAction}`)
            );
      });
      spinner.start("Checking... \n");
      await sleep(100);
      (await execute(listCommand)).stdout.length === 0
        ? spinner.succeed(color.green(`All containers were ${performedAction}`))
        : spinner.fail(
            color.rgb(200, 185, 53)(
              `At least one ${elemType} did not ${performedActionWithouConjugation}
            or some container was restarted\nYou can try with `
            ) +
              color.rgb(31, 188, 193)(`mk dokcer ${actionType} `) +
              color.blue("[options]") +
              color.rgb(31, 188, 193)(" -f")
          );
    }
  }
};

const testIfDockerExist = async () =>
  (await execute("docker --help")).code === 0;
