import AWS from 'aws-sdk';
import Vorpal from 'vorpal';
export declare const getConfig: (program: Vorpal) => Promise<AWS.Config | undefined>;
