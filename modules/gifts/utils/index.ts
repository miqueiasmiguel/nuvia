import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";

const generateTxid = (): string => {
  return `GIFT_${uuidv4().replace(/-/g, "")}`.substring(0, 35);
};

export function validateTxid(txid: string): boolean {
  const regex = /^[a-zA-Z0-9\-\._\:]{1,35}$/;
  return regex.test(txid);
}

interface PixDynamicParams {
  key: string;
  giftName: string;
  beneficiaryName: string;
  beneficiaryCity: string;
  value?: number;
}

export function generatePixDynamicPayload(params: PixDynamicParams): string {
  const txid = generateTxid();

  const beneficiaryName = params.beneficiaryName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .substring(0, 15)
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim();

  const beneficiaryCity = params.beneficiaryCity
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .substring(0, 15)
    .trim();

  const giftName = params.giftName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .substring(0, 25)
    .trim();

  if (params.key.length > 77) throw new Error("Chave PIX muito longa");
  if (txid.length > 35) throw new Error("TXID muito longo");

  const payload = [
    genEMV("00", "01"),
    genEMV("26", [genEMV("00", "br.gov.bcb.pix"), genEMV("01", params.key), genEMV("02", giftName)].join("")),
    genEMV("52", "0000"),
    genEMV("53", "986"),
    ...(params.value ? [genEMV("54", params.value.toFixed(2))] : []),
    genEMV("58", "BR"),
    genEMV("59", beneficiaryName),
    genEMV("60", beneficiaryCity),
    genEMV("62", genEMV("05", txid)),
  ].join("");

  return payload + genEMV("63", calculateCRC16(payload + "6304"));
}

function genEMV(id: string, valor: string): string {
  const len = valor.length.toString().padStart(2, "0");
  return id + len + valor;
}

function calculateCRC16(data: string): string {
  const poly = 0x1021;
  let crc = 0xffff;

  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ poly : crc << 1;
    }
  }

  return (crc & 0xffff).toString(16).toUpperCase().padStart(4, "0");
}

export async function generateQRCode(payload: string) {
  try {
    const qr = await QRCode.toDataURL(payload);
    return qr;
  } catch (err) {
    console.error(err);
  }
}
