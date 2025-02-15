export const getEnvVariable = (name: string): string => {
  const variable = process.env[name];

  if (!variable) {
    throw new Error(`Environment variable ${name} is not defined`);
  }

  return variable;
};

export const envValues = {
  apiBaseUrl: getEnvVariable('REACT_APP_API_URL'),
};
