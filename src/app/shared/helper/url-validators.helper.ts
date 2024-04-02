import { ValidatorFn } from "@angular/forms";

export class UrlValidator{
	public static isUrlValid(url: string): ValidatorFn {
	const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
	return (control) => {
		const isValid = new RegExp(reg).test(control.value);

		return isValid ? null : { isUrlValid: control.value};
	}
}
}