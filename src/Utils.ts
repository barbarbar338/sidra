import { RouteHandler } from "itty-router";

export interface APIRes<T> {
	statusCode: HTTPStatus;
	message: string;
	error?: string;
	data: T;
}

export interface IRedirectRes {
	statusCode: HTTPStatus.MOVED_PERMANENTLY | HTTPStatus.FOUND;
	to: string;
}

export interface IRoute {
	requestMethod: string;
	path: string;
	methodName: string | symbol;
	middlewares: RouteHandler<Request>[];
	redirect?: boolean;
}

export enum HTTPStatus {
	CONTINUE = 100,
	SWITCHING_PROTOCOLS = 101,
	PROCESSING = 102,
	OK = 200,
	CREATED = 201,
	ACCEPTED = 202,
	NON_AUTHORITATIVE_INFORMATION = 203,
	NO_CONTENT = 203,
	RESET_CONTENT = 205,
	PARTIAL_CONTENT = 206,
	MUTLI_STATUS = 207,
	ALREADY_REPORTED = 208,
	IM_USED = 226,
	MULTIPLE_CHOICES = 300,
	MOVED_PERMANENTLY = 301,
	FOUND = 302,
	SEE_OTHER = 303,
	NOT_MODIFIED = 304,
	USE_PROXY = 305,
	TEMPORARY_REDIRECT = 307,
	PERMANENT_REDIRECT = 308,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	PAYMENT_REQUIRED = 402,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	NOT_ACCEPTABLE = 406,
	PROXY_AUTHENTICATION_REQUIRED = 407,
	REQUEST_TIMEOUT = 408,
	CONFLICT = 409,
	GONE = 410,
	LENGTH_REQUIRED = 411,
	PRECONDITION_FAILED = 412,
	PAYLOAD_TOO_LARGE = 413,
	REQUESET_URI_TOO_LONG = 414,
	UNSUPPORTED_MEDIA_TYPE = 415,
	REQUEST_RANGE_NOT_SATISFIABLE = 416,
	EXPECTATION_FAILED = 417,
	IM_A_TEAPOT = 418,
	MISDIRECTED_REQUEST = 421,
	UNPROCESSABLE_ENTITY = 422,
	LOCKED = 423,
	FAILED_DEPENDENCY = 424,
	UPGRADE_REQUIRED = 426,
	PRECONDITION_REQUIRED = 428,
	TOO_MANY_REQUESTS = 429,
	REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
	CONNECTION_CLOSED_WITHOUT_RESPONSE = 444,
	UNAVAILABLE_FOR_LEGAL_REASONS = 451,
	CLIENT_CLOSED_REQUEST = 499,
	INTERNAL_SERVER_ERROR = 500,
	NOT_IMPLEMENTED = 501,
	BAD_GATEWAY = 502,
	SERVICE_UNAVAILABLE = 503,
	GATEWAY_TIMEOUT = 504,
	HTTP_VERSION_NOT_SUPPORTED = 505,
	VARIANT_ALSO_NEGOTIATES = 506,
	INSUFFICIENT_STORAGE = 507,
	LOOP_DETECTED = 508,
	NOT_EXTENDED = 510,
	NETWORK_AUTHENTICATION_REQUIRED = 511,
	NETWORK_CONNECT_TIMEOUT_ERROR = 599,
}

export interface ICorsOptions {
	origin?: string;
	methods?: string;
	allowedHeaders?: string;
	exposedHeaders?: string;
	credentials?: boolean;
	maxAge?: number;
}

export const corsify = (
	response: Response,
	{
		allowedHeaders,
		credentials,
		exposedHeaders,
		maxAge,
		methods,
		origin,
	}: ICorsOptions,
) => {
	if (origin) response.headers.set("Access-Control-Allow-Origin", origin);
	if (methods) response.headers.set("Access-Control-Allow-Methods", methods);
	if (allowedHeaders)
		response.headers.set("Access-Control-Allow-Headers", allowedHeaders);
	if (exposedHeaders)
		response.headers.set("Access-Control-Expose-Headers", exposedHeaders);
	if (credentials)
		response.headers.set(
			"Access-Control-Allow-Credentials",
			credentials.toString(),
		);
	if (maxAge)
		response.headers.set("Access-Control-Max-Age", maxAge.toString());
};

export const checkIfIAPIRes = <T>(value: any): value is APIRes<T> => {
	const newVal = value as APIRes<T>;
	return !!(newVal.statusCode && newVal.message && newVal.data);
};

export const checkIfIRedirectRes = (value: any): value is IRedirectRes => {
	const newVal = value as IRedirectRes;
	return !!(newVal.statusCode && newVal.to);
};
