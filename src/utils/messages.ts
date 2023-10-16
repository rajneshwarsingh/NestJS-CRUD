//status code
export const statusCode = {
  success: 200,
  createdSuccess: 201,
  badRequest: 400,
  serverError: 501,
  internalServerError: 500,
  forbidden: 203,
  notFound: 404,
  notAllowed: 205,
  failed: 401,
  emailOrUserExists: 207,
  wrongPassword: 208,
  accountDeactivated: 209,
  authTokenRequired: 499,
  unauthorized: 403,
};

// success messages
export const successMessages = {
  login: 'Login successfully.',
  create: (value: string) => {
    return `${value} created successfully.`;
  },
  fetch: (value: string) => {
    return `${value} fetched successfully.`;
  },
  update: (value: string) => {
    return `${value} updated successfully.`;
  },
  delete: (value: string) => {
    return `${value} deleted successfully.`;
  },
};

//error messages
export const errorMessages = {
  somethingWentWrong: 'Something went wrong.',
  internalServerError: 'Internal server error.',
  tokenRequired: 'Auth token is required.',
  tokenExpired: 'Session expired, please login again.',
  validationError: 'Validation error.',
  unauthorizedUser: 'Unauthorized user.',
  invalidLogin: 'Invalid login request. Please check and try again.',
  notExist: (value: string) => {
    return `${value} not exist.`;
  },
  alreadyExists: (value: string) => {
    return `${value} already exist.`;
  },
  errorLog: (functionName: string, controllerName: string, payload: any, err: any) => {
    return `Function Name: ${functionName}; Controller Name: ${controllerName}; Payload: ${JSON.stringify(payload)}; Error: ${err}`;
  },
};
