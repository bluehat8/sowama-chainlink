
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Sowama NFT Rewards',
  projectId: 'YOUR_WALLET_CONNECT_PROJECT_ID', // Reemplazar con tu Project ID
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: false,
});
