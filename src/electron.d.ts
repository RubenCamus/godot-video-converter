export { };


declare global {
  interface Window {
    api: {
      // Here add new electron api declaration types.
      openOutputFolder: () => Promise<void>;
      openLink: (url: string) => Promise<void>;
    };
  }
}
