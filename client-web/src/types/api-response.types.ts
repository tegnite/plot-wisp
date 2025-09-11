export interface Success_Response_Interface<T> {
	data: T;
	status: "success";
	message: string;
	token: string | null;
}

export interface Error_Response_Interface {
	status: "error";
	status_code: number;
	message: string;
}

export type Api_Response_Type<T> = Success_Response_Interface<T> | Error_Response_Interface;

async function test() {
	const response = await fetch("aposdlfj");
	const data: Api_Response_Type<{ user: string }> = await response.json();
	if (data.status !== "success") {
		throw new Error(data.message);
	}
	return data.data;
}

console.log(test);
