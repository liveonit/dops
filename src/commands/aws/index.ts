import AWS, { Config } from 'aws-sdk'
import color from 'chalk'
import Vorpal from 'vorpal';
import { storage } from '../../'
import { program } from '../../'

interface Credential {
  accessKeyId: string,
  secretAccessKey: string,
  region: string
};

const updateConfigManual = ({ accessKeyId, secretAccessKey, region }: Credential): Promise<Config> => {
  let actualConfig = {
    accessKeyId: accessKeyId || "noConnect",
    secretAccessKey: secretAccessKey || "noConnect",
    region: region || "noRegion"
  };
  return new Promise((resolve, reject) => {
    let sts = new AWS.STS(actualConfig);
    sts.getCallerIdentity((err: any) => {
      if (err) {
        program.log(color.red("Unable to connect to aws"));
        reject(err);
      }
      resolve(new AWS.Config(actualConfig));
    });
  })
};

const updateConfig = async (program: Vorpal) => {
  let selProf = storage.getItem("selectedProfile");
  let profiles = storage.getItem("aws_profiles") || {};
  if (profiles === {} || selProf === undefined) {
    program.log(color.yellow("Before using that command you must configure an aws profile"));
  }
  const actualConfig = profiles[selProf] || {};
  try {
    return await updateConfigManual(actualConfig);
  } catch (err) {
    return undefined;
  }   
};

export const getConfig = updateConfig;
