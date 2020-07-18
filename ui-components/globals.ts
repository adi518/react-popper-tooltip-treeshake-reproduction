export {};

declare global {
  interface Window {
    $sf: {
      [key: string]: any;
    };
  }
}
