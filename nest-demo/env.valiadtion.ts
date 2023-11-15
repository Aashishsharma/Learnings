import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

// enum Environment {
//   Development = 'development',
//   Production = 'production',
//   Test = 'test',
//   Provision = 'provision',
// }

// this should be the structure of of the config objct
class EnvironmentVariables {
  @IsString()
  NODE_ENV: string;

  @IsNumber()
  PORT: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(
    // plainToInstance transform the input config object into an instance of the EnvironmentVariables
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true }, // option allows for implicit type conversion during the transformation.
  );
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  }); // validate the validatedConfig against the validation rules defined in the EnvironmentVariables class.

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
