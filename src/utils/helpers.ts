import type { FormikProps } from 'formik';

export const getInputProps = <T extends Record<string, any>, K extends keyof T>(
  formik: FormikProps<T>,
  field: K
) => ({
  value: formik.values[field],
  onBlur: () => formik.setFieldTouched(String(field), true),
  onChange: (value: any) => {
    formik.setFieldValue(String(field), value);
  },
  error:
    formik.touched[field] && formik.errors[field]
      ? formik.errors[field]
      : undefined,
});
