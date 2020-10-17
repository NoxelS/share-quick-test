import { getCompanyBalanceSheet, getCompanyCashFlow, getCompanyIncomeStatement, getCompanyOverview } from '@shared/functions';
import { NextFunction, Request, Response, Router } from 'express';
import got from 'got';

import { AnalysisResponse } from '../entities/analysis-response';


// Init router and path
const router = Router();

router.get('/:symbol', async (req: Request, res: Response, next: NextFunction) => {
    const symbol = req.params.symbol;
    const overview = await getCompanyOverview(symbol);
    const balanceSheet = await getCompanyBalanceSheet(symbol);
    const cashFlow = await getCompanyCashFlow(symbol);
    const incomeStatement = await getCompanyIncomeStatement(symbol);

    const analysis = new AnalysisResponse( overview, cashFlow, incomeStatement, balanceSheet )

    res.json(analysis.toResponse());
});


router.get('/autocomplete/:searchTerm', async (req: Request, res: Response, next: NextFunction) => {   
    const {body} = await got(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${req.params.searchTerm}&apikey=${process.env.AV_API_KEY}`);
    res.json(JSON.parse(body));
})

// Export the base-router
export default router;
