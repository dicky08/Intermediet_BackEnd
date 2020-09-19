const response = {
    success: (res, data, message) => {

        const result = {
            success: true,
            code: 200,
            status: 'OK',
            message: message,
            data: data
        }
        res.json(result);
    },
    dataTable: (res, data, tableRow, message) => {
        const result = {
            message,
            code: 200,
            status: 'OK',
            tableRow,
            data
        }
        res.json(result)
    },

    failed: (res, data, message) => {
        const eror = {
            success: false,
            code: 500,
            status: 'Error',
            message,
            data
        }
        res.json(eror);
    },
    notFound: (res, data, message) => {
        const eror = {
            success: false,
            code: 404,
            message,
            data
        }
        res.json(eror)
    },
    tokenResult: (res, data, message) => {
        const success = {
            message,
            code: 200,
            status: 'OK',
            data,
        }
        res.json(success)
    },
    tokenFailed: (res, status, token, message) => {
        const failed = {
            code: 401,
            status,
            token,
            message
        }
        res.json(failed)
    },
    tokenForbidden: (res, status, token, message) => {
        const failed = {
            code: 403,
            status,
            token,
            message
        }
        res.json(failed)
    }

}
module.exports = response;