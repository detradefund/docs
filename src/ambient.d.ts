/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />

declare global {
  namespace App {
    interface Locals {}
    interface PageData {
      title: string;
      description: string;
    }
    interface Error {}
    interface Platform {}
  }
}

// Svelte HTML types
declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    'on:click'?: (event: CustomEvent<any> & { target: EventTarget & T }) => void;
    'on:change'?: (event: CustomEvent<any> & { target: EventTarget & T }) => void;
    'on:keydown'?: (event: CustomEvent<any> & { target: EventTarget & T }) => void;
    'on:submit'?: (event: CustomEvent<any> & { target: EventTarget & T }) => void;
    [key: string]: any;
  }
}

// Module declarations
declare module "$app/stores" {
  import type { Readable } from 'svelte/store';
  export const page: Readable<App.PageData>;
}

declare module "$app/environment" {
  export const browser: boolean;
}

declare module "*.png" {
  const content: string;
  export default content;
}

export {}; 