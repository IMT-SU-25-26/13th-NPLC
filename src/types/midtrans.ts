// types/midtrans.d.ts

// Tipe umum yang dimiliki oleh semua respons transaksi
type MidtransTransactionStatus =
  | "authorize"
  | "capture"
  | "settlement"
  | "deny"
  | "pending"
  | "cancel"
  | "refund"
  | "partial_refund"
  | "expire"
  | "failure";

// Tipe untuk metode pembayaran yang berbeda
type MidtransPaymentType =
  | "credit_card"
  | "gopay"
  | "shopeepay"
  | "qris"
  | "bca_va"
  | "bni_va"
  | "bri_va"
  | "echannel" // Mandiri Bill
  | "other_va"
  | "cstore" // Indomaret, Alfamart
  | "akulaku"
  | "kredivo";

// Tipe untuk hasil yang sukses atau pending
interface MidtransTransactionResult {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: MidtransPaymentType;
  transaction_time: string;
  transaction_status: MidtransTransactionStatus;
  fraud_status?: "accept" | "challenge" | "deny";
  
  // Fields spesifik per metode pembayaran (opsional)
  permata_va_number?: string;
  va_numbers?: {
    bank: "bca" | "bni" | "bri";
    va_number: string;
  }[];
  payment_code?: string; // Untuk Indomaret/Alfamart
  bill_key?: string; // Untuk Mandiri Bill
  biller_code?: string; // Untuk Mandiri Bill
  qr_string?: string; // Untuk QRIS
  acquirer?: string;
  masked_card?: string;
  approval_code?: string;
}

// Tipe untuk hasil error
interface MidtransErrorResult {
  status_code: string;
  status_message: string;
  validation_messages?: string[];
}

// Definisi utama untuk window.snap
interface MidtransSnap {
  pay(
    token: string,
    options?: {
      onSuccess?: (result: MidtransTransactionResult) => void;
      onPending?: (result: MidtransTransactionResult) => void;
      onError?: (result: MidtransErrorResult) => void;
      onClose?: () => void;
    }
  ): void;
}

// Deklarasi global untuk window
declare global {
  interface Window {
    snap?: MidtransSnap;
  }
}

// Export tipe agar bisa diimpor jika diperlukan (opsional)
export type { MidtransSnap, MidtransTransactionResult, MidtransErrorResult };