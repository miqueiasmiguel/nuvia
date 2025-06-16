export enum PixType {
  CPF = "CPF",
  CNPJ = "CNPJ",
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  RANDOM_KEY = "RANDOM_KEY",
}

export type WeddingList = {
  id: string;
  brideName: string;
  groomName: string;
  weddingDate?: Date;
  pixKey: string;
  pixType: PixType;
  coverImage?: string;
  message?: string;
  theme?: string;
};
