const { ConsoleSpanExporter } =  require('@opentelemetry/sdk-trace-base');

const  { NodeSDK }  = require('@opentelemetry/sdk-node');
 const { Resource } = require('@opentelemetry/resources');
 const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
 const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

const traceExporter = new ConsoleSpanExporter();
const otelSDK = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'node-sample-project',
  }),
  traceExporter,
  // spanProcessor: new BatchSpanProcessor(new JaegerExporter()),
  instrumentations: [getNodeAutoInstrumentations()],

});
module.exports  =  otelSDK;
