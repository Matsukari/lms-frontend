import { FormGroup } from "@angular/forms";

export function formGroupToFormData(formGroup: FormGroup): FormData {
  const formData = new FormData();
  Object.keys(formGroup.controls).forEach(key => {
    const control = formGroup.get(key);
    if (control) {
      formData.append(key, control.value);
    }
  });
  return formData;
}
