import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import status from 'server/http-status';

export default function validate(schema) {
  const ajv = new Ajv({ allErrors: true });
  ajvErrors(ajv);
  addFormats(ajv);
  const validate = ajv.compile(schema);
  return async (req, res, next) => {
    const valid = validate(req.body);
    if (valid) {
      return await next();
    } else {
      const error = validate.errors[0];
      console.error('🔴 Validator', error);
      return res.status(status.BAD_REQUEST).json({
        error: true,
        message: `"${error.instancePath.substring(1)}" ${error.message}`,
      });
    }
  };
}
