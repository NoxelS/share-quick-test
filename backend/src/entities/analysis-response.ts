import { OverviewResponse } from '@entities/response/overview';

import { BalanceSheetResponse } from './response/balance-sheet';
import { CashFlowResponse } from './response/cash-flow';
import { IncomeStatementResponse } from './response/income-statement';


enum BewertungsGrad {
    critical = 0,
    low = 1,
    medium = 2,
    high = 3,
    veryHigh = 4
}
interface BewertungsNode {
    name: string;
    value: number;
    einheit: string | null;
    bewertung: BewertungsGrad;
}

export interface ApiRequest {}

interface CompanyMeta {
    symbol: string;
    assetType: string;
    name: string;
    description: string;
    exchange: string;
    currency: string;
    country: string;
    sector: string;
    industry: string;
    address: string;
    fullTimeExployees: number;
    fiscalYearEnd: string;
    latestQUarter: string;
    marketCapitalization: number;
}

function toBewertung(value: number, low: number, medium: number, high: number, veryHigh: number): BewertungsGrad {
    if (value >= veryHigh) {
        return BewertungsGrad.veryHigh;
    }

    if (value >= high) {
        return BewertungsGrad.high;
    }

    if (value >= medium) {
        return BewertungsGrad.medium;
    }

    if (value >= low) {
        return BewertungsGrad.low;
    }

    return BewertungsGrad.critical;
}

export class AnalysisResponse {

    private get eigenkapitalquote(): BewertungsNode {
        const eigenkapital = Number(this.balanceSheet.annualReports[0].totalShareholderEquity); // 1:1 übersetzung
        const bilanzsumme = Number(this.balanceSheet.annualReports[0].totalAssets); // 1:1 Übersetzung
        const value = eigenkapital / bilanzsumme;

        return <BewertungsNode>{
            value,
            einheit: null,
            name: 'eigenkapitalquote',
            bewertung: toBewertung(value, 0, 0.10, 0.2, 0.3)
        };
    }

    private get schuldentilgungsdauer(): BewertungsNode {
        const fremdkapital = Number(this.balanceSheet.annualReports[0].totalLiabilities); // 1:1 übersetzung
        const liquideMittel = Number(this.balanceSheet.annualReports[0].totalCurrentAssets); // 1:1 übersetzung
        const cashFlowVorSteuern = Number(this.incomeStatement.annualReports[0].grossProfit); // freier cashflow

        const value = (fremdkapital - liquideMittel) / cashFlowVorSteuern;

        let bewertung = BewertungsGrad.critical;
        if(value < 30) bewertung = BewertungsGrad.low;
        if(value < 12) bewertung = BewertungsGrad.medium;
        if(value < 5) bewertung = BewertungsGrad.high;
        if(value < 3) bewertung = BewertungsGrad.veryHigh;

        return <BewertungsNode>{
            value,
            einheit: null,
            name: 'schuldentilgungsdauer',
            bewertung: bewertung
        };
    }

    private get gesamtkapitalrendite(): BewertungsNode {
        const fremdkapital = Number(this.balanceSheet.annualReports[0].totalLiabilities); // 1:1 übersetzung
        const eigenkapital = Number(this.balanceSheet.annualReports[0].totalShareholderEquity); // 1:1 übersetzung

        const zinsaufwand = Number(this.incomeStatement.annualReports[0].interestExpense);
        const gesamtkapital = fremdkapital + eigenkapital;
        const nettoEinkommen = Number(this.cashFlow.annualReports[0].netIncome);
    
        const value = (nettoEinkommen + zinsaufwand) / gesamtkapital;

        return <BewertungsNode>{
            value,
            einheit: null,
            name: 'gesamtkapitalrendite',
            bewertung: toBewertung(value, 0, 0.04, 0.8, 0.15)
        };
    }

    private get eigenkapitalrendite(): BewertungsNode {
        const eigenkapital = Number(this.balanceSheet.annualReports[0].totalShareholderEquity); // 1:1 übersetzung
        const nettoEinkommen = Number(this.cashFlow.annualReports[0].netIncome);
        const value =  nettoEinkommen / eigenkapital;

        return <BewertungsNode>{
            value,
            einheit: null,
            name: 'eigenkapitalrendite',
            bewertung: toBewertung(value, 0.8, 0.12, 0.15, 0.2)
        };
    }

    private get cashflowrate(): BewertungsNode {
        const operativerCashflow = Number(this.cashFlow.annualReports[0].operatingCashflow);
        const umsatz = Number(this.incomeStatement.annualReports[0].totalRevenue);

        const value = operativerCashflow / umsatz;

        return <BewertungsNode>{
            value,
            einheit: null,
            name: 'cashflowrate',
            bewertung: toBewertung(value, 0, 0.05, 0.08, 0.1)
        };
    }

    private get meta(): CompanyMeta {
        return {
            symbol: this.overview.Symbol,
            assetType: this.overview.AssetType,
            name: this.overview.Name,
            description: this.overview.Description,
            exchange: this.overview.Exchange,
            currency: this.overview.Currency,
            country: this.overview.Country,
            sector: this.overview.Sector,
            industry: this.overview.Industry,
            address: this.overview.Address,
            fullTimeExployees: Number(this.overview.FullTimeEmployees),
            fiscalYearEnd: this.overview.FiscalYearEnd,
            latestQUarter: this.overview.LatestQuarter,
            marketCapitalization: Number(this.overview.MarketCapitalization)
        };
    }

    private get overallScore() {
        const scores = [
            this.eigenkapitalquote,
            this.schuldentilgungsdauer,
            this.gesamtkapitalrendite,
            this.eigenkapitalrendite,
            this.cashflowrate
        ];

        let tip = 'buy';

        if(scores.filter(node => node.bewertung >= BewertungsGrad.high).length < 3) {
            tip = 'dont buy';
        }

        if(scores.filter(node => node.bewertung <= BewertungsGrad.medium).length > 0) {
            tip = 'dont buy'
        }

        const durchschnitt = scores.map(s => s.bewertung).reduce((p,c) => p+c) / scores.length;
        
        return {
            tip,
            durchschnitt
        }
    }

    constructor(
        private readonly overview: OverviewResponse,
        private readonly cashFlow: CashFlowResponse,
        private readonly incomeStatement: IncomeStatementResponse,
        private readonly balanceSheet: BalanceSheetResponse
    ) {}

    toResponse() {
        return {
            meta: this.meta,
            overallScore: this.overallScore,
            eigenkapitalquote: this.eigenkapitalquote,
            schuldentilgungsdauer: this.schuldentilgungsdauer,
            gesamtkapitalrendite: this.gesamtkapitalrendite,
            eigenkapitalrendite: this.eigenkapitalrendite,
            cashflowrate: this.cashflowrate
        };
    }
}
