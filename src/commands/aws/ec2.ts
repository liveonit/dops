import AWS from "aws-sdk"
import { DescribeInstancesResult, Instance, Reservation, InstanceState, DescribeRegionsResult } from "aws-sdk/clients/ec2";
import Table from "cli-table"
import YAML from "js-yaml"
import ora from "ora"
import Vorpal from 'vorpal'
import { getConfig } from "."

const spinner = ora("Loading unicorns");

module.exports = (program: Vorpal) => {
  program
    .command(
      "aws ec2 instance ls",
      "aws list ec2 instances for actual region"
    )
    .option(
      "-r, --region <region>",
      "aws list ec2 instances for specific region or all"
    )
    .option(
      "-f, --format <format>",
      "aws list ec2 instances in json or yaml format"
    )
    .action(async args => {
      const config: any = await getConfig(program);
      if (config !== undefined) {
        config["apiVersion"] = "2016-11-15";
        const params = { DryRun: false };
        let instances: Instance[] = [];
        const instanceWithRelevantProps: any = { instances: {} };
        if (args.options.region !== "all") {
          if (args.options.region !== undefined) {
            config['region'] = args.options.region
          }
          const ec2 = new AWS.EC2(config);
          const result: DescribeInstancesResult = await ec2.describeInstances(params).promise();
          if (result.Reservations !== undefined) {
            result.Reservations.forEach((res: Reservation) => {
              instances = [...instances, ...(res.Instances || [])];
            });
          }
          for (const inst of instances) {
            instanceWithRelevantProps["instances"][inst.InstanceId || "-"] = {
              id: inst.InstanceId || "-",
              name: inst.KeyName || "-",
              type: inst.InstanceType || "-",
              zone: config["region"] || "-",
              state: (inst.State as InstanceState).Name as string || "-",
              publicIp: inst.PublicIpAddress || "-",
              privateIp: inst.PrivateIpAddress || "-",
              publicDns: inst.PublicDnsName || "-",
              privateDns: inst.PrivateDnsName || "-",
              vpcID: inst.VpcId || "-",
              subnetId: inst.SubnetId || "-",
              sgIds: (inst.SecurityGroups || []).map(sg => sg.GroupId).join(",") || "-"
            }
          }
        }
        else { // region === "all"
          const ec2 = new AWS.EC2(config);
          const regionsResult: DescribeRegionsResult = await ec2.describeRegions().promise();
          await Promise.all(
            (regionsResult.Regions || []).map(
              async reg => {
                config["region"] = reg.RegionName;
                const ec2 = new AWS.EC2(config);
                const result: DescribeInstancesResult = await ec2.describeInstances(params).promise();
                if (result.Reservations !== undefined) {
                  result.Reservations.forEach((res: Reservation) => {
                    instances = [...instances, ...(res.Instances || [])]; // append new instances to total instances for always have that var
                    for (const inst of (res.Instances || [])) {
                      instanceWithRelevantProps["instances"][inst.InstanceId || "-"] = {
                        id: inst.InstanceId || "-",
                        name: inst.KeyName || "-",
                        type: inst.InstanceType || "-",
                        zone: reg.RegionName || "-",
                        state: (inst.State as InstanceState).Name as string || "-",
                        publicIp: inst.PublicIpAddress || "-",
                        privateIp: inst.PrivateIpAddress || "-",
                        publicDns: inst.PublicDnsName || "-",
                        privateDns: inst.PrivateDnsName || "-",
                        vpcID: inst.VpcId || "-",
                        subnetId: inst.SubnetId || "-",
                        sgIds: (inst.SecurityGroups || []).map(sg => sg.GroupId).join(",") || "-"
                      }
                    }
                  });
                }
              }
            ))
        }
        if (args.options.format === undefined) {
          const table = new Table(
            {
              head: ["Name", "ID", "Type", "Zone", "State", "VPC", "Subnet", "Security Groups"],
              colWidths: [15, 25, 10, 13, 10, 25, 30, 30]
            })

          table.push(...(Object.values(instanceWithRelevantProps["instances"]).map((inst: any) => {
            const { name, id, type, zone, state, vpcID, subnetId, sgIds } = inst;
            return Object.values({ name, id, type, zone, state, vpcID, subnetId, sgIds });
          }))
          );
          program.log(table.toString());

        } else if (args.options.format.toLowerCase() === "json") {
          console.dir(instanceWithRelevantProps, { depth: 4, colors: true });
        } else if (args.options.format.toLowerCase() === "yaml") {
          program.log(
            YAML.dump(instanceWithRelevantProps)
          );
        }
      }
    });
};
