#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { NestAppStack } from "../lib/nestAppStack";

const app = new cdk.App();

new NestAppStack(app, "NestAppStack");