import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';
import winston from 'winston';

const baseDir = `${process.cwd()}/src`;
const container = new ContainerBuilder(false, baseDir);
container.logger = winston;

const loader = new YamlFileLoader(container);
const env = process.env.NODE_ENV || 'development';

loader.load(`${__dirname}/application_${env}.yaml`);

export default container;
