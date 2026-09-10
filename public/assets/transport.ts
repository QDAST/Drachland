export const transport = {
  ship: { tax: 10 },
  plane: { tax: 15 },
  helicopter: { tax: 12 },
};
export type TransportName = keyof typeof transport;
