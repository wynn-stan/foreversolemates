'use client';

import { string, number, mixed, array, StringSchema, NumberSchema,MixedSchema } from 'yup'; // prettier-ignore
import { isValidPhoneNumber, isPossiblePhoneNumber} from "react-phone-number-input"; // prettier-ignore

/**
 * regex
 */
const urlRegex =
  /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w?[a-zA-Z-_%/@?]+)*([^/\w?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

const cardNumberRegex = /^[A-Z]{3}-(([0-9]{8,9}-)|([0-9]{7}--))[A-Za-z0-9]$/;

const registrationNumberRegex = /^[A-Za-z]{2}[0-9]{9}$/;
const taxNumberRegix = /^[A-Za-z][0-9]{10}$/;
const gpsRegex = /^[A-Z0-9]{2}-\d{3,4}-\d{3,4}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * validation object for string
 */
const requireString = (
  field: string,
  required = true,
  schema: StringSchema = string()
) => {
  schema = schema.trim();
  return required ? schema.required(`${field} is required`) : schema;
};

/**
 * validation object for number
 */
const requireNumber = (
  field: string,
  required = true,
  schema: NumberSchema = number()
) => {
  schema = schema.typeError('Only numbers allowed');
  return required ? schema.required(`${field} is required`) : schema;
};

/**
 * validation object for phone number
 */
const requirePhoneNumber = (
  field: string,
  required = true,
  schema: StringSchema = string()
) => {
  return schema.test('isValidPhone', `Enter a valid ${field}`, (value) =>
    value
      ? isValidPhoneNumber(value) && isPossiblePhoneNumber(value)
      : !required
  );
};

/**
 * validation object for conditions
 */
const requireWhen = (dependencyField: string, field: string) =>
  string().when(`${dependencyField}`, ([fld], schema) =>
    fld ? schema.required(`${field} is required`) : schema
  );

/**
 * validation object for test conditions
 */
const requireTest = (
  field: string,
  condition: (value: string | undefined) => boolean
) =>
  string().test('require', `${field} is required`, (value) => condition(value));

/**
 * validation object for email
 */
const requireEmail = (
  field: string,
  required = true,
  schema: StringSchema = string()
) => {
  schema = schema.matches(emailRegex, 'Enter a valid email address');
  return required ? schema.required(`${field} is required`) : schema;
};

/**
 * validation object for array
 */
const requireArray = (field: string, required = true, schema = array()) => {
  return required
    ? schema
        .min(1, 'At least 1 item is required')
        .required(`${field} is required`)
    : schema;
};

/**
 * validation object for ghana post gps
 */
const requireGPS = (
  field: string,
  required = true,
  schema: StringSchema = string()
) => {
  schema = schema.matches(gpsRegex, 'Enter a valid digital address');
  return required ? schema.required(`${field} is required`) : schema;
};

/**
 * validation object for file upload
 */
const requireFile = ({
  field,
  size = 5,
  type = [],
  schema = mixed(),
  required = true,
}: {
  field: string;
  size?: number;
  type?: string[];
  schema?: MixedSchema;
  required?: boolean;
}) => {
  const format: string[] = (() => {
    let format: string[] = [];

    if (type.includes('image')) {
      format = [
        ...format,
        ...['image/jpg', 'image/jpeg', 'image/png', 'image/webp'],
      ];
    }

    if (type.includes('pdf')) {
      format = [...format, 'application/pdf'];
    }

    if (type.includes('csv')) {
      format = [
        ...format,
        'text/csv',
        'text/x-csv',
        'application/vnd.ms-excel',
      ];
    }

    if (type.includes('docs')) {
      format = [
        ...format,
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
    }

    return format;
  })();

  return schema
    .test(
      'fileName',
      `${field} is required`,
      (value: any) => !!value?.name || !required
    )
    .test('fileSize', `${field} size is too large`, (value: any) => {
      return value?.size ? value.size <= size * 1000000 : !required;
    })
    .test('fileType', 'Unsupported file format', (value: any) =>
      value?.type
        ? format.length === 0
          ? true
          : format.includes(value?.type)
        : !required
    );
};

/**
 * password validation schema
 * @param {*} field
 * @param {*} required
 * @param {*} schema
 * @returns
 */
const requirePassword = (
  field: string,
  required = true,
  schema: StringSchema = string()
) => {
  schema = schema
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
      'Must contain a lower case and upper case letter and number'
    )
    .min(6, 'Password must be at least 6 characters');

  return required ? schema.required(`${field} is required`) : schema;
};

/**
 * Full name validator
 * @param {*} field
 * @param {*} required
 * @param {*} schema
 * @returns
 */
const requireFullName = (
  field: string,
  required = true,
  schema: StringSchema = string()
) => {
  schema = schema
    .test('name', 'Please enter a valid first name and last name', (value) => {
      const name = value?.trim()?.split(' ');
      if (name && name?.length <= 1) {
        return false;
      }

      return true;
    })
    .test('length', 'Name must have at least 3 characters', (value) => {
      const name = value?.trim()?.split(' ');

      if (name && name?.find((i) => i.length < 2)) {
        return false;
      }

      return true;
    });

  return required ? schema.required(`${field} is required`) : schema;
};

/**
 * OTP code validator
 * @param {*} field
 * @param {*} required
 * @param {*} schema
 * @param {*} length
 * @returns
 */
const requireOTP = (
  field: string,
  length = 4,
  required = true,
  schema: StringSchema = string()
) => {
  schema = schema
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(length, `Must be exactly ${length} digits`)
    .max(length, `Must be exactly ${length} digits`);

  return required ? schema.required(`${field} is required`) : schema;
};

const requireUrl = (
  field: string,
  required = true,
  schema: StringSchema = string()
) => {
  schema = schema.matches(urlRegex, 'Enter a valid url');
  return required ? schema.required(`${field} is required`) : schema;
};

const requireGhanaCardNumber = (
  field: string,
  required = true,
  schema: StringSchema = string()
) => {
  schema = schema.matches(cardNumberRegex, 'Enter a valid Ghana card number');

  return required ? schema.required(`${field} is required`) : schema;
};

const requireRegistrationNumber = (
  field: string,
  required = true,
  schema: StringSchema = string()
) => {
  schema = schema.matches(
    registrationNumberRegex,
    'Enter a valid registration number'
  );
  return required ? schema.required(`${field} is required`) : schema;
};

const requireTin = (
  field: string,
  required = true,
  schema: StringSchema = string()
) => {
  schema = schema.matches(taxNumberRegix, 'Enter a valid tax number');
  return required ? schema.required(`${field} is required`) : schema;
};

export default Object.assign(
  {},
  {
    requireString,
    requireNumber,
    requireArray,
    requireEmail,
    requirePhoneNumber,
    requireGPS,
    requireFile,
    requireWhen,
    requireTest,
    requirePassword,
    requireFullName,
    requireOTP,
    requireUrl,
    requireGhanaCardNumber,
    requireRegistrationNumber,
    requireTin,
  }
);
