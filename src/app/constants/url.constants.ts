import { env } from "process";
import { environment } from "../../environments/environment";


export const API_UAUTH_URL=environment.baseUrl +'api/auth/'

export const API_CLIENT_URL=environment.baseUrl +'client/'

export const API_USER_URL= environment.baseUrl +'api/test/'
