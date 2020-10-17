import { OverviewResponse } from '@entities/response/overview';
import { existsSync, readFileSync, writeFileSync } from 'fs-extra';
import got from 'got';

import { BalanceSheetResponse } from '../entities/response/balance-sheet';
import { CashFlowResponse } from '../entities/response/cash-flow';
import { IncomeStatementResponse } from '../entities/response/income-statement';


export async function makeApiOrCashRequest<T>(url: string) {
    const uniqueName = (url.split('function=')[1].split('&')[0] + '_' + url.split('symbol=')[1].split('&')[0]).toLowerCase();
    const path = `./src/mock/${uniqueName}.json`;
    const alreadyInCash = existsSync(path);

    let data: T;

    if (alreadyInCash) {
        // Get saved response
        data = JSON.parse(readFileSync(path, { encoding: 'utf-8' }));
    } else {
        // Fetch api data
        data = JSON.parse((await got(url)).body);
        // Save response
        writeFileSync(path, JSON.stringify(data));
    }

    return data;
}

export async function getCompanyOverview(symbol: string): Promise<OverviewResponse> {
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.AV_API_KEY}`;
    const data = await makeApiOrCashRequest<OverviewResponse>(url);
    return data;
}

export async function getCompanyIncomeStatement(symbol: string): Promise<IncomeStatementResponse> {
    const url = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${symbol}&apikey=${process.env.AV_API_KEY}`;
    const data = await makeApiOrCashRequest<IncomeStatementResponse>(url);
    return data;
}

export async function getCompanyCashFlow(symbol: string): Promise<CashFlowResponse> {
    const url = `https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${symbol}&apikey=${process.env.AV_API_KEY}`;
    const data = await makeApiOrCashRequest<CashFlowResponse>(url);
    return data;
}

export async function getCompanyBalanceSheet(symbol: string): Promise<BalanceSheetResponse> {
    const url = `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol}&apikey=${process.env.AV_API_KEY}`;
    const data = await makeApiOrCashRequest<BalanceSheetResponse>(url);
    return data;
}
