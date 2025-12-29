// src/lib/networkUtils.ts

export const calculateSubnet = (ip: string, cidr: number) => {
  // Validate IP format
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipv4Regex.test(ip) || cidr < 0 || cidr > 32) return null;

  try {
    const octets = ip.split('.').map(Number);
    if (octets.some(o => o > 255)) return null;

    // 1. Convert IP to a 32-bit integer
    const ipInt = (octets[0] << 24) >>> 0 | (octets[1] << 16) >>> 0 | (octets[2] << 8) >>> 0 | octets[3] >>> 0;

    // 2. Create Subnet Mask
    const maskInt = (cidr === 0 ? 0 : 0xFFFFFFFF << (32 - cidr)) >>> 0;

    // 3. Calculate Network ID
    const networkInt = (ipInt & maskInt) >>> 0;
    const networkID = [
      (networkInt >>> 24) & 0xFF,
      (networkInt >>> 16) & 0xFF,
      (networkInt >>> 8) & 0xFF,
      networkInt & 0xFF
    ].join('.');

    // 4. Calculate Subnet Mask String
    const maskStr = [
      (maskInt >>> 24) & 0xFF,
      (maskInt >>> 16) & 0xFF,
      (maskInt >>> 8) & 0xFF,
      maskInt & 0xFF
    ].join('.');

    // 5. Calculate Broadcast Address
    const broadcastInt = (networkInt | ~maskInt) >>> 0;
    const broadcastID = [
      (broadcastInt >>> 24) & 0xFF,
      (broadcastInt >>> 16) & 0xFF,
      (broadcastInt >>> 8) & 0xFF,
      broadcastInt & 0xFF
    ].join('.');

    // 6. Calculate Usable Hosts
    const hosts = cidr >= 31 ? 0 : Math.pow(2, 32 - cidr) - 2;

    return {
      network: networkID,
      broadcast: broadcastID,
      mask: maskStr,
      hosts: hosts.toLocaleString(),
    };
  } catch (e) {
    return null;
  }
};