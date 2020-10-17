export interface AnnualReportIncomeStatement {
    fiscalDateEnding: string;
    reportedCurrency: string;
    totalRevenue: string;
    totalOperatingExpense: string;
    costOfRevenue: string;
    grossProfit: string;
    ebit: string;
    netIncome: string;
    researchAndDevelopment: string;
    effectOfAccountingCharges: string;
    incomeBeforeTax: string;
    minorityInterest: string;
    sellingGeneralAdministrative: string;
    otherNonOperatingIncome: string;
    operatingIncome: string;
    otherOperatingExpense: string;
    interestExpense: string;
    taxProvision: string;
    interestIncome: string;
    netInterestIncome: string;
    extraordinaryItems: string;
    nonRecurring: string;
    otherItems: string;
    incomeTaxExpense: string;
    totalOtherIncomeExpense: string;
    discontinuedOperations: string;
    netIncomeFromContinuingOperations: string;
    netIncomeApplicableToCommonShares: string;
    preferredStockAndOtherAdjustments: string;
}

export interface QuarterlyReportIncomeStatement {
    fiscalDateEnding: string;
    reportedCurrency: string;
    totalRevenue: string;
    totalOperatingExpense: string;
    costOfRevenue: string;
    grossProfit: string;
    ebit: string;
    netIncome: string;
    researchAndDevelopment: string;
    effectOfAccountingCharges: string;
    incomeBeforeTax: string;
    minorityInterest: string;
    sellingGeneralAdministrative: string;
    otherNonOperatingIncome: string;
    operatingIncome: string;
    otherOperatingExpense: string;
    interestExpense: string;
    taxProvision: string;
    interestIncome: string;
    netInterestIncome: string;
    extraordinaryItems: string;
    nonRecurring: string;
    otherItems: string;
    incomeTaxExpense: string;
    totalOtherIncomeExpense: string;
    discontinuedOperations: string;
    netIncomeFromContinuingOperations: string;
    netIncomeApplicableToCommonShares: string;
    preferredStockAndOtherAdjustments: string;
}

export interface IncomeStatementResponse {
    symbol: string;
    annualReports: AnnualReportIncomeStatement[];
    quarterlyReports: QuarterlyReportIncomeStatement[];
}
