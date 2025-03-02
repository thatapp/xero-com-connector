/**
 * Auto-generated action file for "Accounting" API.
 *
 * Generated at: 2019-05-07T14:45:03.642Z
 * Mass generator version: 1.1.0
 *
 * flowground :- Telekom iPaaS / xero-com-connector
 * Copyright © 2019, Deutsche Telekom AG
 * contact: flowground@telekom.de
 *
 * All files of this connector are licensed under the Apache 2.0 License. For details
 * see the file LICENSE on the toplevel directory.
 *
 *
 * Operation: undefined
 * Endpoint Path: '/Payments'
 * Method: 'put'
 *
 */

const Swagger = require('swagger-client');
const processWrapper = require('../services/process-wrapper');
const spec = require('../spec.json');

// this wrapers offers a simplified emitData(data) function
module.exports.process = processWrapper(processAction);

// parameter names for this call
const PARAMETERS = [
    "summarizeErrors"
];

// mappings from connector field names to API field names
const FIELD_MAP = {
    "summarizeErrors": "summarizeErrors",
    "AccountID": "AccountID",
    "Code": "Code",
    "Account": "Account",
    "Amount": "Amount",
    "AppliedAmount": "AppliedAmount",
    "CreditNoteID": "CreditNoteID",
    "CreditNoteNumber": "CreditNoteNumber",
    "Date": "Date",
    "Total": "Total",
    "CreditNote": "CreditNote",
    "CurrencyRate": "CurrencyRate",
    "ContactID": "ContactID",
    "Name": "Name",
    "Contact": "Contact",
    "InvoiceID": "InvoiceID",
    "InvoiceNumber": "InvoiceNumber",
    "Type": "Type",
    "Invoice": "Invoice",
    "IsReconciled": "IsReconciled",
    "OverpaymentID": "OverpaymentID",
    "Overpayment": "Overpayment",
    "PaymentID": "PaymentID",
    "PaymentType": "PaymentType",
    "PrepaymentID": "PrepaymentID",
    "Prepayment": "Prepayment",
    "Reference": "Reference",
    "Status": "Status",
    "UpdatedDateUTC": "UpdatedDateUTC",
    "requestBody": "requestBody"
};

function processAction(msg, cfg) {
    var isVerbose = process.env.debug || cfg.verbose;

    if (isVerbose) {
        console.log(`---MSG: ${JSON.stringify(msg)}`);
        console.log(`---CFG: ${JSON.stringify(cfg)}`);
        console.log(`---ENV: ${JSON.stringify(process.env)}`);
    }

    const contentType = cfg.body_content_type;

    const body = msg.body;
    mapFieldNames(body);

    let parameters = {};
    for(let param of PARAMETERS) {
        parameters[param] = body[param];
    }

    // credentials for this operation
    let securities = {};

    let callParams = {
        spec: spec,
        operationId: undefined,
        pathName: '/Payments',
        method: 'put',
        parameters: parameters,
        requestContentType: contentType,
        requestBody: body.requestBody,
        securities: {authorized: securities},
        server: spec.servers[cfg.server] || cfg.otherServer,
    };

    if (isVerbose) {
        let out = Object.assign({}, callParams);
        out.spec = '[omitted]';
        console.log(`--SWAGGER CALL: ${JSON.stringify(out)}`);
    }

    // Call operation via Swagger client
    return Swagger.execute(callParams).then(data => {
        // emit a single message with data
        this.emitData(data);

        // if the response contains an array of entities, you can emit them one by one:

        // data.obj.someItems.forEach((item) => {
        //     this.emitData(item);
        // }
    });
}

function mapFieldNames(obj) {
    if(Array.isArray(obj)) {
        obj.forEach(mapFieldNames);
    }
    else if(typeof obj === 'object' && obj) {
        Object.keys(obj).forEach(key => {
            mapFieldNames(obj[key]);

            let goodKey = FIELD_MAP[key];
            if(goodKey && goodKey !== key) {
                obj[goodKey] = obj[key];
                delete obj[key];
            }
        });
    }
}