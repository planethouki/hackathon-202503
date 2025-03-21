/// <reference types="vite/client" />

interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    // eslint-disable-next-line
    request: (request: { method: string; params?: any[] }) => Promise<any>;
    // eslint-disable-next-line
    on: (eventName: string, callback: (...args: any[]) => void) => void;
    // eslint-disable-next-line
    removeListener: (eventName: string, callback: (...args: any[]) => void) => void;
  };
}

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly VITE_AUTH_DOMAIN: string;
  readonly VITE_PROJECT_ID: string;
  readonly VITE_STORAGE_BUCKET: string;
  readonly VITE_MESSAGING_SENDER_ID: string;
  readonly VITE_APP_ID: string;
  readonly VITE_API_URL: string;
  readonly VITE_BLOCK_EXPLORER_ADDRESS: string;
  readonly VITE_BLOCK_EXPLORER_TOKEN: string;
  readonly VITE_BLOCK_EXPLORER_TX: string;
  readonly VITE_POLL_TOKEN: string;
  readonly VITE_PUNCHLINE_TOKEN: string;
  readonly VITE_MEASUREMENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
