
const rsp = {
	success: (message = "Request successful", data?: object | undefined) => {
		return {
			success: true,
			message,
			...(data !== undefined ? { data } : {}),
		};
	},
	error: (message = "An error occurred", data?: object | undefined) => {
		return {
			success: false,
			message,
			...(data !== undefined ? { data } : {}),
		};
	},
	internal: (message = "Internal Server Error") => {
		return {
			success: false,
			message,
		};
	},
};

export default rsp;