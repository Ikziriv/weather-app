/// <reference types="@sveltejs/kit" />
declare module 'cookie';

interface ImportMetaEnv {
	VITE_APP_VERSION: string;
	VITE_API_KEY: string;
	PROD: string;
}