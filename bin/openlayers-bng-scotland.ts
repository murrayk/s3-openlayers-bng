#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { OpenlayersBngScotlandStack } from '../lib/openlayers-bng-scotland-stack';

const app = new cdk.App();
new OpenlayersBngScotlandStack(app, 'OpenlayersBngScotlandStack', {
  env: {
    region: 'eu-west-2',
  },
});