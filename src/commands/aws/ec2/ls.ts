import { Command, flags } from '@oclif/command'
import Table = require('cli-table')
import * as YAML from 'js-yaml'
import { DescribeInstancesResult, DescribeRegionsResult, Instance, InstanceState, Reservation } from 'aws-sdk/clients/ec2'
import ora from 'ora'
import { getConfig } from '../../../utils/configControl'
import AWS from 'aws-sdk'

const spinner = ora('Loading instances')

export default class Ls extends Command {
  static description = 'List ec2 instances'

  static flags = {
    help: flags.help({ char: 'h' }),
    region: flags.string({ char: 'r', description: 'aws list ec2 instances for specific region or all' }),
    format: flags.string({ char: 'f', description: 'aws list ec2 instances in json or yaml format' }),
  }

  static args = []

  async run() {
    const { flags } = this.parse(Ls)
    try {
      const config: any = await getConfig()
      if (config !== undefined) {
        config.apiVersion = '2016-11-15'
        const params = { DryRun: false }
        let instances: Instance[] = []
        const instanceWithRelevantProps: any = { instances: {} }
        spinner.start()
        if (flags.region !== 'all') {
          if (flags.region !== undefined) {
            config.region = flags.region
          }
          const ec2 = new AWS.EC2(config)
          const result: DescribeInstancesResult = await ec2.describeInstances(params).promise()
          if (result.Reservations !== undefined) {
            result.Reservations.forEach((res: Reservation) => {
              instances = [...instances, ...(res.Instances || [])]
            })
          }
          for (const inst of instances) {
            instanceWithRelevantProps.instances[inst.InstanceId || '-'] = {
              id: inst.InstanceId || '-',
              name: inst.KeyName || '-',
              type: inst.InstanceType || '-',
              publicIp: inst.PublicIpAddress || '-',
              publicDns: inst.PublicDnsName || '-',
              privateIp: inst.PrivateIpAddress || '-',
              privateDns: inst.PrivateDnsName || '-',
              vpcID: inst.VpcId || '-',
              sgIds: (inst.SecurityGroups || []).map(sg => sg.GroupId).join(',') || '-',
              subnetId: inst.SubnetId || '-',
              state: (inst.State as InstanceState).Name as string || '-',
              zone: config.region || '-',
            }
          }
        } else { // region === "all"
          const ec2 = new AWS.EC2(config)
          const regionsResult: DescribeRegionsResult = await ec2.describeRegions().promise()
          await Promise.all(
            (regionsResult.Regions || []).map(
              async reg => {
                config.region = reg.RegionName
                const ec2 = new AWS.EC2(config)
                const result: DescribeInstancesResult = await ec2.describeInstances(params).promise()
                if (result.Reservations !== undefined) {
                  result.Reservations.forEach((res: Reservation) => {
                    instances = [...instances, ...(res.Instances || [])] // append new instances to total instances for always have that var
                    for (const inst of (res.Instances || [])) {
                      instanceWithRelevantProps.instances[inst.InstanceId || '-'] = {
                        id: inst.InstanceId || '-',
                        name: inst.KeyName || '-',
                        type: inst.InstanceType || '-',
                        zone: reg.RegionName || '-',
                        state: (inst.State as InstanceState).Name as string || '-',
                        publicIp: inst.PublicIpAddress || '-',
                        privateIp: inst.PrivateIpAddress || '-',
                        publicDns: inst.PublicDnsName || '-',
                        privateDns: inst.PrivateDnsName || '-',
                        vpcID: inst.VpcId || '-',
                        subnetId: inst.SubnetId || '-',
                        sgIds: (inst.SecurityGroups || []).map(sg => sg.GroupId).join(',') || '-',
                      }
                    }
                  })
                }
              }
            ))
        }
        spinner.succeed()
        if (flags.format === undefined) {
          const table = new Table(
            {
              head: ['Name', 'ID', 'Type', 'Zone', 'State', 'VPC', 'Subnet', 'Security Groups'],
              colWidths: [15, 25, 10, 13, 10, 25, 30, 30],
            })

          table.push(...(Object.values(instanceWithRelevantProps.instances).map((inst: any) => {
            const { name, id, type, zone, state, vpcID, subnetId, sgIds } = inst
            return Object.values({ name, id, type, zone, state, vpcID, subnetId, sgIds })
          }))
          )
          console.log(table.toString())
        } else if (flags.format.toLowerCase() === 'json') {
          console.dir(instanceWithRelevantProps, { depth: 20, colors: true })
        } else if (flags.format.toLowerCase() === 'yaml') {
          console.log(
            YAML.dump(instanceWithRelevantProps)
          )
        }
      }
    } catch (error) {
      spinner.stop()
      console.log(error)
    }
  }
}
