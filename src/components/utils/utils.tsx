export function invalidText(value: any) {
	return (
		value == null || value == undefined || value.toString().trim().length == 0
	);
}
export function allowOnlyAlphabet(value : string){
	let regex = /^[A-Za-z]+$/i;
	console.log(regex.test(value));	
	return regex.test(value) ? false : true;
}
export function invalidEmail(value: any) {
	var searchfind: boolean;
	let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
	searchfind = regexp.test(value);
	return !searchfind
}
export function invalidPassword(value: string) {
	if (value.length > 8 && value.length < 32) {
		var searchfind: boolean;
		let regexp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/);
		searchfind = regexp.test(value);
		return !searchfind
	}
	else {
		console.log("inside else:", value);
		console.log("value length:", value.length);
		return true;
	}
}
export function checkPassword(value: any, password: string) {
	if (value == password) {
		return false;
	}
	return true;
}

export const formatToPhone = (event: React.KeyboardEvent<HTMLInputElement>) => {
	if(event.currentTarget.value.length === 16){
		return event.currentTarget.value;
	}
	const reg = new RegExp('^[0-9]+$');
	if (reg.test(event.key)) {
		const target = event.currentTarget;
		const input = event.currentTarget.value.replace(/\D/g, '').substring(0, 9);
		const zip = input.substring(0, 3);
		const middle = input.substring(3, 6);
		const last = input.substring(6, 9);

		if (input.length > 6) { target.value = `(${zip}) ${middle} - ${last}`; }
		else if (input.length > 3) { target.value = `(${zip}) ${middle}`; }
		else if (input.length > 0) { target.value = `(${zip}`; }
	}
	else {
		console.log("char");
	}
};

export function checkPhone(value : any){
	let regex =/^[A-Z]+$/i
	if(regex.test(value)){
		return true
	}else{
		return value[1] == 0 ? true : false
	}
}

export const invalidFieldLength = (value: any) => {
	return (value.length < 3 || value.length > 55);
};