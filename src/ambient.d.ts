/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />

declare namespace App {
  interface Locals {}
  interface PageData {}
  interface Error {}
  interface Platform {}
}

declare module "$app/stores" {
  import { type Readable } from 'svelte/store';
  export const page: Readable<any>;
}

declare module "$app/environment" {
  export const browser: boolean;
}

declare module "*.png" {
  const content: string;
  export default content;
} 