/// <reference types="vite/client" />

// Add only this if the above alone doesn't work:
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
