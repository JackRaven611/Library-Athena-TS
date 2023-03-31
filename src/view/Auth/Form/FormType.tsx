export interface FormType {
  submitText: string;
  isPasswordHidden: boolean;
  onSubmit: () => void;
  open: boolean;
  handleOpen: () => void;
}
