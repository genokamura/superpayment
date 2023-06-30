import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';

export class SuperpaymentStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, 'superpayment-api', {
      restApiName: 'Superpayment Service',
      description: 'This service serves payment information.',
      // allow from any origin
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
      },
    });

    const paymentInfoLambda = new lambda.NodejsFunction(this, 'payment-info', {
      timeout: cdk.Duration.seconds(1),
    });
    const executeLambda = new lambda.NodejsFunction(this, 'execute', {
      timeout: cdk.Duration.seconds(1),
    });

    const paymentinfo = api.root.addResource('payment-info');
    const execute = api.root.addResource('execute');
    paymentinfo.addMethod('POST', new apigateway.LambdaIntegration(paymentInfoLambda));
    execute.addMethod('POST', new apigateway.LambdaIntegration(executeLambda));
  }
}
