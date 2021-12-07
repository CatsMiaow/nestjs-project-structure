import { BadRequestException, Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import type { DescribeInstancesResult, DescribeInstanceStatusResult, ReservationList, InstanceStatusList } from 'aws-sdk/clients/ec2';

import { Ec2Service } from '../providers';

/**
 * AWS EC2 Instance
 */
@Controller('instance')
export class InstanceController {
  constructor(private instance: Ec2Service) {}

  @Get('list')
  public async list(): Promise<ReservationList> {
    const result: DescribeInstancesResult = await this.instance.describeInstances();

    if (!result.Reservations) {
      throw new NotFoundException('NotFoundReservations');
    }

    return result.Reservations;
  }

  @Post('status')
  public async status(@Body('ids') ids: string[]): Promise<InstanceStatusList> {
    if (!ids || !Array.isArray(ids)) {
      throw new BadRequestException('InvalidParameter');
    }

    const result: DescribeInstanceStatusResult = await this.instance.describeInstanceStatus(ids);
    if (!result.InstanceStatuses) {
      throw new NotFoundException('NotFoundInstanceStatuses');
    }

    return result.InstanceStatuses;
  }
}
