import React from 'react';

export default function useUtils() {

  const shortenAddress = (address: string) => {
    let result = address;
    if (address != null && address.length > 8) {
      result = address.substring(0, 4) + "..." + address.substring(address.length-4);
    }
    return result;
  }

  return {
    shortenAddress
  }
}