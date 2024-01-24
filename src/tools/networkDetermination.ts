export function networkDetermination(asset: string): string {
  const determinated = asset.split('_');
  if (determinated.length > 1) {
    return determinated[1];
  }
  if (asset === 'eth') {
    return 'erc20';
  }

  return asset;
}
