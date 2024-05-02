'use client';

import StandardInput from './StandardInput';

interface Props {
  formik?: any;
  name: string;
  className?: string;
  useFormik?: boolean;
  showError?: boolean;
  error?: string;
  blurFunction?: () => void;
}

function LabelInput({ ...props }: Props & React.HTMLProps<HTMLInputElement>) {
  return <StandardInput {...props} />;
}

export default LabelInput;
