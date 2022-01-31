
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Deployment from "@aws-cdk/aws-s3-deployment";

export class OpenlayersBngScotlandStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const s3Bucket = new s3.Bucket(this, "my-static-website-bucket", {
      autoDeleteObjects: true,
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: "index.html",

      cors: [
        {
          allowedOrigins: ["*"],
          allowedMethods: [
            s3.HttpMethods.GET,
            s3.HttpMethods.POST,
            s3.HttpMethods.PUT,
            s3.HttpMethods.DELETE,
            s3.HttpMethods.HEAD,
          ],
        },
      ],
    });
    const deployment = new s3Deployment.BucketDeployment(
      this,
      "deployStaticWebsite",
      {
        sources: [s3Deployment.Source.asset("./website")],
        destinationBucket: s3Bucket,
      }
    );

    new cdk.CfnOutput(this, 'openlayers-map', {
      value: s3Bucket.urlForObject("index.html"),
      description: 'The url of the openlayers british nationa grid example map',
      exportName: 'openlayers-bng-27700',
    });
    
  }
}
