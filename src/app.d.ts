/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	namespace svelteHTML {
		interface HTMLAttributes<T> {
			[key: string]: any;
		}
	}
}

export {};
