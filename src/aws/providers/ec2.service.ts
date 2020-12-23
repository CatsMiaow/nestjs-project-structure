import { Injectable } from '@nestjs/common';
import { EC2 } from 'aws-sdk';
import { DescribeInstancesResult, DescribeInstanceStatusResult, InstanceAttribute, InstanceAttributeName } from 'aws-sdk/clients/ec2';

import { AWSService } from '../aws.service';

/**
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html
 */
@Injectable()
export class EC2Service {
  private instance: EC2 = new EC2(this.aws.options);

  constructor(private aws: AWSService) {}

  public async describeInstances(): Promise<DescribeInstancesResult> {
    return this.instance.describeInstances({
      Filters: [
        // { Name: 'tag:Team', Values: ['test'] }
      ],
    }).promise();
  }

  public async describeInstanceAttribute(instanceId: string, attribute: InstanceAttributeName = 'userData'): Promise<InstanceAttribute> {
    return this.instance.describeInstanceAttribute({
      InstanceId: instanceId,
      Attribute: attribute,
    }).promise();
  }

  public async describeInstanceStatus(instanceIds: string[]): Promise<DescribeInstanceStatusResult> {
    return this.instance.describeInstanceStatus({
      InstanceIds: instanceIds,
    }).promise();
  }
}
