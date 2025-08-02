/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HII_TESTNET_API_KEY: string
  readonly VITE_HII_MAINNET_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 