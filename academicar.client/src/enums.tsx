export interface IBalance {
    id: number;
    amount: string;
}

export interface ITransaction {
    id: number;
    fK_User: string;
    transactionType: TransactionType;
    amount: number;
    transactionDate: Date;
    transactionSource: TransactionSource;
}

export enum TransactionType {
    Charge,
    Book
}

export enum TransactionSource {
    Payment,
    Trip
}