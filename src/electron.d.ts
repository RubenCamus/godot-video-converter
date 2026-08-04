export { };


declare global {
  interface Window {
    api: {
      openOutputFolder: () => Promise<void>;
    };
  }
}
