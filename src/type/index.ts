export type PropsCreateClient = {
  id?: string;
  name: string;
  cpfCnpj: string;
  email?: string;
  phone?: string;
  mobilePhone?: string;
  externalReference?: string;
  notificationDisabled?: boolean;
  additionalEmails?: string;
  municipalInscription?: string;
  stateInscription?: string;
  observations?: string;
  groupName?: string;
  company?: string;
  foreignCustomer?: boolean;
  address?: string;
  addressNumber?: string;
  complement?: string;
  province?: string;
  postalCode?: string;
};

export type PropsCreateSub = {
  customer: string;

  billingType: "BOLETO" | "CREDIT_CARD" | "PIX" | "UNDEFINED";

  value: number;
  nextDueDate: string;

  cycle:
    | "WEEKLY"
    | "BIWEEKLY"
    | "MONTHLY"
    | "QUARTERLY"
    | "SEMIANNUALLY"
    | "YEARLY";

  description?: string;
  externalReference?: string;

  endDate?: string;
  maxPayments?: number;

  discount?: {
    value?: number;
    dueDateLimitDays?: number;
    type?: "FIXED" | "PERCENTAGE";
  };

  interest?: {
    value?: number;
  };

  fine?: {
    value?: number;
  };

  postalService?: boolean;

  split?: Array<{
    walletId: string;
    fixedValue?: number;
    percentualValue?: number;
  }>;
};

export type PropsCreateCreditCardSub = {
  customer: string;

  billingType: "CREDIT_CARD";

  value: number;
  nextDueDate: string;

  cycle:
    | "WEEKLY"
    | "BIWEEKLY"
    | "MONTHLY"
    | "QUARTERLY"
    | "SEMIANNUALLY"
    | "YEARLY";

  description?: string;
  externalReference?: string;

  endDate?: string;
  maxPayments?: number;

  creditCard: {
    holderName: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
  };

  creditCardHolderInfo: {
    name: string;
    email: string;
    cpfCnpj: string;
    postalCode: string;
    addressNumber: string;
    addressComplement?: string | null;
    phone?: string;
    mobilePhone?: string;
  };
};

export type PropsUpdateSubCreditCard = {
  id: string;
  creditCard: {
    holderName: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
  };

  creditCardHolderInfo: {
    name: string;
    email: string;
    cpfCnpj: string;
    postalCode: string;
    addressNumber: string;
    addressComplement?: string | null;
    phone?: string | null;
    mobilePhone?: string | null;
  };

  creditCardToken?: string;

  remoteIp: string;
};

export type PropsListSubscriptionPaymentsResponse = {
  object: "list";
  hasMore: boolean;
  totalCount?: number;
  limit: number;
  offset: number;
  data: PropsPayment[];
};

export type PropsPayment = {
  object: "payment";

  id: string;

  dateCreated: string;
  customer: string;

  subscription?: string;

  paymentLink?: string;

  value: number;
  netValue: number;

  originalValue?: number;
  interestValue?: number;
  description?: string;

  billingType:
    | "BOLETO"
    | "CREDIT_CARD"
    | "PIX"
    | "UNDEFINED";

  status:
    | "PENDING"
    | "RECEIVED"
    | "CONFIRMED"
    | "OVERDUE"
    | "REFUNDED"
    | "RECEIVED_IN_CASH"
    | "REFUND_REQUESTED"
    | "CHARGEBACK_REQUESTED"
    | "CHARGEBACK_DISPUTE"
    | "AWAITING_CHARGEBACK_REVERSAL"
    | "DUNNING_REQUESTED"
    | "DUNNING_RECEIVED"
    | "AWAITING_RISK_ANALYSIS";

  dueDate: string;
  originalDueDate?: string;

  paymentDate?: string;
  clientPaymentDate?: string;
  installmentNumber?: number;

  invoiceUrl?: string;
  bankSlipUrl?: string;

  transactionReceiptUrl?: string;

  invoiceNumber?: string;

  externalReference?: string;

  deleted: boolean;

  postalService?: boolean;

  anticipated: boolean;
  anticipable: boolean;
};
