export const getChainName = (chainId: string): { name: string, coinName: string } => {
    if (['0x61'].includes(chainId)) return { name: 'Binance Testnet', coinName: 'bnb' }
    if (['0x38'].includes(chainId)) return { name: 'Binance Smart Chain', coinName: 'bnb' }
    if (['0x89'].includes(chainId)) return { name: 'Polygon', coinName: 'MATIC' }
    if (['0x13881'].includes(chainId)) return { name: 'Polygon Testnet', coinName: 'MATIC' }
    if (['0xa86a'].includes(chainId)) return { name: 'Fantom', coinName: 'FTM' }
    if (['0x5'].includes(chainId)) return { name: 'Goerli', coinName: 'eth' }
    if (['0x1', '1'].includes(chainId)) return { name: 'Ethereum', coinName: 'eth' }

    return { name: 'Ethereum', coinName: 'eth' }
};