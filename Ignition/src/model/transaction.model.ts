export interface IGNTransaction {
	id?: string;
	uid?: string;
	type?: number; // 0 for negative, 1 for positive
	createdAt?: number;
	paymentType?: string;
  amount?: number;
  reason?: string;
  pid?: string
}
