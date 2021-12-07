import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { ConfigurationOptions } from 'aws-sdk/lib/config-base';

/**
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/
 */
@Injectable()
export class AwsService {
  public options: ConfigurationOptions;

  constructor(public config: ConfigService) {
    this.options = {
      accessKeyId: config.get('aws.access_key_id'),
      secretAccessKey: config.get('aws.secret_access_key'),
      region: config.get('aws.region'),
    };
  }
}
