export type Gift = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  status: GiftStatus;
  giftedCount: number;
};

export enum GiftStatus {
  AVAILABLE = "AVAILABLE",
  PARTIALLY_FUNDED = "PARTIALLY_FUNDED",
  FULLY_FUNDED = "FULLY_FUNDED",
}
