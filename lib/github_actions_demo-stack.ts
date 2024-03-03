import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Notifications from 'aws-cdk-lib/aws-s3-notifications'
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

export class GithubActionsDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)
    const bucket = new s3.Bucket(this, 'SampleBucket', {
      versioned: false,
    });

    const queue = new sqs.Queue(this, 'SampleQueue');

    bucket.addEventNotification(s3.EventType.OBJECT_CREATED, new s3Notifications.SqsDestination(queue));
  }
}
