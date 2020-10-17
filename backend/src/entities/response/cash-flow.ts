


export interface AnnualReportCashFlow {
    fiscalDateEnding: string;
    reportedCurrency: string;
    investments: string;
    changeInLiabilities: string;
    cashflowFromInvestment: string;
    otherCashflowFromInvestment: string;
    netBorrowings: string;
    cashflowFromFinancing: string;
    otherCashflowFromFinancing: string;
    changeInOperatingActivities: string;
    netIncome: string;
    changeInCash: string;
    operatingCashflow: string;
    otherOperatingCashflow: string;
    depreciation: string;
    dividendPayout: string;
    stockSaleAndPurchase: string;
    changeInInventory: string;
    changeInAccountReceivables: string;
    changeInNetIncome: string;
    capitalExpenditures: string;
    changeInReceivables: string;
    changeInExchangeRate: string;
    changeInCashAndCashEquivalents: string;
}

export interface QuarterlyReportCashFlow {
    fiscalDateEnding: string;
    reportedCurrency: string;
    investments: string;
    changeInLiabilities: string;
    cashflowFromInvestment: string;
    otherCashflowFromInvestment: string;
    netBorrowings: string;
    cashflowFromFinancing: string;
    otherCashflowFromFinancing: string;
    changeInOperatingActivities: string;
    netIncome: string;
    changeInCash: string;
    operatingCashflow: string;
    otherOperatingCashflow: string;
    depreciation: string;
    dividendPayout: string;
    stockSaleAndPurchase: string;
    changeInInventory: string;
    changeInAccountReceivables: string;
    changeInNetIncome: string;
    capitalExpenditures: string;
    changeInReceivables: string;
    changeInExchangeRate: string;
    changeInCashAndCashEquivalents: string;
}

export interface CashFlowResponse {
    symbol: string;
    annualReports: AnnualReportCashFlow[];
    quarterlyReports: QuarterlyReportCashFlow[];
}
