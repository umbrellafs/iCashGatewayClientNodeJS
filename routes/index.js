const express = require('express')
const fetch = require('node-fetch')
const router = express.Router()
const baseURL = 'https://icashmerchantv2.azurewebsites.net'
const extractToken = (req) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        return req.headers.authorization.split(' ')[1]
    } else if (req.query && req.query.token) {
        return req.query.token
    }
    return null
}

router.get('/token', async (req, res) => {
    const headers = {
        'Content-Type': 'application/json',
    }
    let urlencoded = new URLSearchParams()
    urlencoded.append('grant_type', 'password')
    urlencoded.append('username', req.body.username)
    urlencoded.append('password', req.body.password)
    const requestOptions = {
        method: 'POST',
        headers,
        body: urlencoded,
    }
    try {
        const response = await fetch(`${baseURL}/token`, requestOptions)
        const body = JSON.parse(await response.text())
        if (response.status === 200) {
            res.json(body)
        } else {
            throw new Error()
        }
    } catch (error) {
        res.status(400).json({ error: 'incorrect username or password' })
    }
})
router.get('/getBalance', async (req, res) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${extractToken(req)}`,
    }
    const requestOptions = {
        method: 'GET',
        headers,
    }
    try {
        const response = await fetch(
            `${baseURL}/api/ICashAccount/GetBalance?iCashCardNumber=${req.query.iCashCardNumber}`,
            requestOptions
        )
        const body = JSON.parse(await response.text())
        if (response.status === 200) {
            res.json(body)
        } else {
            throw new Error(JSON.stringify(body))
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/getStatement', async (req, res) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${extractToken(req)}`,
    }
    const requestOptions = {
        method: 'GET',
        headers,
    }
    try {
        const response = await fetch(
            `${baseURL}/api/ICashAccount/GetStatement?iCashCardNumber=${req.query.iCashCardNumber}&From=${req.query.From}&To=${req.query.To}&NumberOfRecords=${req.query.NumberOfRecords}`,
            requestOptions
        )
        const body = JSON.parse(await response.text())
        if (response.status === 200) {
            res.json(body)
        } else {
            throw new Error(JSON.stringify(body))
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/payInvoice', async (req, res) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${extractToken(req)}`,
    }
    let urlencoded = new URLSearchParams()
    urlencoded.append(
        'CustomeriCashCardNumber',
        req.body.CustomeriCashCardNumber
    )
    urlencoded.append('InvoiceTotalAmount', req.body.InvoiceTotalAmount)
    urlencoded.append('PaymentCode', req.body.PaymentCode)
    urlencoded.append('Description', req.body.Description)
    const requestOptions = {
        method: 'POST',
        headers,
        body: urlencoded,
    }
    try {
        const response = await fetch(
            `${baseURL}/api/ICashAccount/PayInvoice?iCashCardNumber=${req.query.iCashCardNumber}`,
            requestOptions
        )
        const body = JSON.parse(await response.text())
        if (response.status === 200) {
            res.json(body)
        } else {
            throw new Error(JSON.stringify(body))
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/transfareMoney', async (req, res) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${extractToken(req)}`,
    }
    let urlencoded = new URLSearchParams()
    urlencoded.append('ReseveriCashCardNumber', req.body.ReseveriCashCardNumber)
    urlencoded.append('Amount', req.body.Amount)
    urlencoded.append('Message', req.body.Message)
    const requestOptions = {
        method: 'POST',
        headers,
        body: urlencoded,
    }
    try {
        const response = await fetch(
            `${baseURL}/api/ICashAccount/TransferMoney?iCashCardNumber=${req.query.iCashCardNumber}`,
            requestOptions
        )
        const body = JSON.parse(await response.text())
        if (response.status === 200) {
            res.json(body)
        } else {
            throw new Error(JSON.stringify(body))
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/generatePaymentCode', async (req, res) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${extractToken(req)}`,
    }
    let urlencoded = new URLSearchParams()
    urlencoded.append('ShopNumber', req.body.ShopNumber)
    urlencoded.append('Amount', req.body.Amount)
    const requestOptions = {
        method: 'POST',
        headers,
        body: urlencoded,
    }
    try {
        const response = await fetch(
            `${baseURL}/api/ICashAccount/GeneratePaymentCode?iCashCardNumber=${req.query.iCashCardNumber}`,
            requestOptions
        )
        const body = JSON.parse(await response.text())
        if (response.status === 200) {
            res.json(body)
        } else {
            throw new Error(JSON.stringify(body))
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/validateVoucher', async (req, res) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${extractToken(req)}`,
    }
    let urlencoded = new URLSearchParams()
    urlencoded.append('Voucher', req.body.Voucher)
    urlencoded.append('VoucherValue', req.body.VoucherValue)
    const requestOptions = {
        method: 'POST',
        headers,
        body: urlencoded,
    }
    try {
        const response = await fetch(
            `${baseURL}/api/ICashAccount/ValidateVoucher?iCashCardNumber=${req.query.iCashCardNumber}`,
            requestOptions
        )
        const body = JSON.parse(await response.text())
        if (response.status === 200) {
            res.json(body)
        } else {
            throw new Error(JSON.stringify(body))
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/redeemVoucher', async (req, res) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${extractToken(req)}`,
    }
    let urlencoded = new URLSearchParams()
    urlencoded.append('Voucher', req.body.Voucher)
    urlencoded.append('VoucherValue', req.body.VoucherValue)
    const requestOptions = {
        method: 'POST',
        headers,
        body: urlencoded,
    }
    try {
        const response = await fetch(
            `${baseURL}/api/ICashAccount/RedeemVoucher?iCashCardNumber=${req.query.iCashCardNumber}`,
            requestOptions
        )
        const body = JSON.parse(await response.text())
        if (response.status === 200) {
            res.json(body)
        } else {
            throw new Error(JSON.stringify(body))
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/getiCashCardNetworkNumber', async (req, res) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${extractToken(req)}`,
    }
    const requestOptions = {
        method: 'GET',
        headers,
    }
    try {
        const response = await fetch(
            `${baseURL}/api/ICashAccount/GetiCashCardNetworkNumber?iCashCardNumber=${req.query.iCashCardNumber}`,
            requestOptions
        )
        const body = JSON.parse(await response.text())
        if (response.status === 200) {
            res.json(body)
        } else {
            throw new Error(JSON.stringify(body))
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/canCustomerPurchase', async (req, res) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${extractToken(req)}`,
    }
    const requestOptions = {
        method: 'POST',
        headers,
    }
    try {
        const response = await fetch(
            `${baseURL}/api/ICashAccount/CanCustomerPurchase?iCashCardNumber=${req.query.iCashCardNumber}`,
            requestOptions
        )
        const body = JSON.parse(await response.text())
        if (response.status === 200) {
            res.json(body)
        } else {
            throw new Error(JSON.stringify(body))
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/generatePaymentQR', async (req, res) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${extractToken(req)}`,
    }
    const requestOptions = {
        method: 'GET',
        headers,
    }
    try {
        const response = await fetch(
            `${baseURL}/api/ICashAccount/GeneratePaymentQR?Amount=${req.query.Amount}&ShopID=${req.query.ShopID}`,
            requestOptions
        )
        const body = JSON.parse(await response.text())
        if (response.status === 200) {
            res.json(body)
        } else {
            throw new Error(JSON.stringify(body))
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/setNewPIN', async (req, res) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${extractToken(req)}`,
    }
    let urlencoded = new URLSearchParams()
    urlencoded.append('PIN', req.body.PIN)
    urlencoded.append('ConfirmPIN', req.body.ConfirmPIN)
    const requestOptions = {
        method: 'POST',
        headers,
        body: urlencoded,
    }
    try {
        const response = await fetch(
            `${baseURL}/api/ICashAccount/SetNewPIN?iCashCardNumber=${req.query.iCashCardNumber}`,
            requestOptions
        )
        const body = JSON.parse(await response.text())
        if (response.status === 200) {
            res.json(body)
        } else {
            throw new Error(JSON.stringify(body))
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router
