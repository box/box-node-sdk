import { serializeSignRequestSignerInputEmailValidation } from './signRequestSignerInputEmailValidation';
import { deserializeSignRequestSignerInputEmailValidation } from './signRequestSignerInputEmailValidation';
import { serializeSignRequestSignerInputCustomValidation } from './signRequestSignerInputCustomValidation';
import { deserializeSignRequestSignerInputCustomValidation } from './signRequestSignerInputCustomValidation';
import { serializeSignRequestSignerInputZipValidation } from './signRequestSignerInputZipValidation';
import { deserializeSignRequestSignerInputZipValidation } from './signRequestSignerInputZipValidation';
import { serializeSignRequestSignerInputZip4Validation } from './signRequestSignerInputZip4Validation';
import { deserializeSignRequestSignerInputZip4Validation } from './signRequestSignerInputZip4Validation';
import { serializeSignRequestSignerInputSsnValidation } from './signRequestSignerInputSsnValidation';
import { deserializeSignRequestSignerInputSsnValidation } from './signRequestSignerInputSsnValidation';
import { serializeSignRequestSignerInputNumberWithPeriodValidation } from './signRequestSignerInputNumberWithPeriodValidation';
import { deserializeSignRequestSignerInputNumberWithPeriodValidation } from './signRequestSignerInputNumberWithPeriodValidation';
import { serializeSignRequestSignerInputNumberWithCommaValidation } from './signRequestSignerInputNumberWithCommaValidation';
import { deserializeSignRequestSignerInputNumberWithCommaValidation } from './signRequestSignerInputNumberWithCommaValidation';
import { serializeSignRequestSignerInputDateIsoValidation } from './signRequestSignerInputDateIsoValidation';
import { deserializeSignRequestSignerInputDateIsoValidation } from './signRequestSignerInputDateIsoValidation';
import { serializeSignRequestSignerInputDateUsValidation } from './signRequestSignerInputDateUsValidation';
import { deserializeSignRequestSignerInputDateUsValidation } from './signRequestSignerInputDateUsValidation';
import { serializeSignRequestSignerInputDateEuValidation } from './signRequestSignerInputDateEuValidation';
import { deserializeSignRequestSignerInputDateEuValidation } from './signRequestSignerInputDateEuValidation';
import { serializeSignRequestSignerInputDateAsiaValidation } from './signRequestSignerInputDateAsiaValidation';
import { deserializeSignRequestSignerInputDateAsiaValidation } from './signRequestSignerInputDateAsiaValidation';
import { SignRequestSignerInputEmailValidation } from './signRequestSignerInputEmailValidation';
import { SignRequestSignerInputCustomValidation } from './signRequestSignerInputCustomValidation';
import { SignRequestSignerInputZipValidation } from './signRequestSignerInputZipValidation';
import { SignRequestSignerInputZip4Validation } from './signRequestSignerInputZip4Validation';
import { SignRequestSignerInputSsnValidation } from './signRequestSignerInputSsnValidation';
import { SignRequestSignerInputNumberWithPeriodValidation } from './signRequestSignerInputNumberWithPeriodValidation';
import { SignRequestSignerInputNumberWithCommaValidation } from './signRequestSignerInputNumberWithCommaValidation';
import { SignRequestSignerInputDateIsoValidation } from './signRequestSignerInputDateIsoValidation';
import { SignRequestSignerInputDateUsValidation } from './signRequestSignerInputDateUsValidation';
import { SignRequestSignerInputDateEuValidation } from './signRequestSignerInputDateEuValidation';
import { SignRequestSignerInputDateAsiaValidation } from './signRequestSignerInputDateAsiaValidation';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type SignRequestSignerInputValidation =
  | SignRequestSignerInputEmailValidation
  | SignRequestSignerInputCustomValidation
  | SignRequestSignerInputZipValidation
  | SignRequestSignerInputZip4Validation
  | SignRequestSignerInputSsnValidation
  | SignRequestSignerInputNumberWithPeriodValidation
  | SignRequestSignerInputNumberWithCommaValidation
  | SignRequestSignerInputDateIsoValidation
  | SignRequestSignerInputDateUsValidation
  | SignRequestSignerInputDateEuValidation
  | SignRequestSignerInputDateAsiaValidation;
export function serializeSignRequestSignerInputValidation(
  val: any,
): SerializedData {
  try {
    if (val.validationType == void 0) {
      throw new BoxSdkError({
        message:
          'Expecting "validationType" of type "SignRequestSignerInputEmailValidation" to be defined',
      });
    }
    return serializeSignRequestSignerInputEmailValidation(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    if (val.validationType == void 0) {
      throw new BoxSdkError({
        message:
          'Expecting "validationType" of type "SignRequestSignerInputCustomValidation" to be defined',
      });
    }
    if (!(val.customRegex == void 0) && !sdIsString(val.customRegex)) {
      throw new BoxSdkError({
        message:
          'Expecting string for "customRegex" of type "SignRequestSignerInputCustomValidation"',
      });
    }
    if (
      !(val.customErrorMessage == void 0) &&
      !sdIsString(val.customErrorMessage)
    ) {
      throw new BoxSdkError({
        message:
          'Expecting string for "customErrorMessage" of type "SignRequestSignerInputCustomValidation"',
      });
    }
    return serializeSignRequestSignerInputCustomValidation(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    if (val.validationType == void 0) {
      throw new BoxSdkError({
        message:
          'Expecting "validationType" of type "SignRequestSignerInputZipValidation" to be defined',
      });
    }
    return serializeSignRequestSignerInputZipValidation(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    if (val.validationType == void 0) {
      throw new BoxSdkError({
        message:
          'Expecting "validationType" of type "SignRequestSignerInputZip4Validation" to be defined',
      });
    }
    return serializeSignRequestSignerInputZip4Validation(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    if (val.validationType == void 0) {
      throw new BoxSdkError({
        message:
          'Expecting "validationType" of type "SignRequestSignerInputSsnValidation" to be defined',
      });
    }
    return serializeSignRequestSignerInputSsnValidation(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return serializeSignRequestSignerInputNumberWithPeriodValidation(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return serializeSignRequestSignerInputNumberWithCommaValidation(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return serializeSignRequestSignerInputDateIsoValidation(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return serializeSignRequestSignerInputDateUsValidation(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return serializeSignRequestSignerInputDateEuValidation(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return serializeSignRequestSignerInputDateAsiaValidation(val);
  } catch (error) {
    void 0;
  } finally {
  }
  throw new BoxSdkError({
    message: "Can't serialize SignRequestSignerInputValidation",
  });
}
export function deserializeSignRequestSignerInputValidation(
  val: SerializedData,
): SignRequestSignerInputValidation {
  try {
    return deserializeSignRequestSignerInputEmailValidation(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return deserializeSignRequestSignerInputCustomValidation(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return deserializeSignRequestSignerInputZipValidation(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return deserializeSignRequestSignerInputZip4Validation(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return deserializeSignRequestSignerInputSsnValidation(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return deserializeSignRequestSignerInputNumberWithPeriodValidation(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return deserializeSignRequestSignerInputNumberWithCommaValidation(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return deserializeSignRequestSignerInputDateIsoValidation(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return deserializeSignRequestSignerInputDateUsValidation(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return deserializeSignRequestSignerInputDateEuValidation(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return deserializeSignRequestSignerInputDateAsiaValidation(val);
  } catch (error) {
    void 0;
  } finally {
  }
  throw new BoxSdkError({
    message: "Can't deserialize SignRequestSignerInputValidation",
  });
}
