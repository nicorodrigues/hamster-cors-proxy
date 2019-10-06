/* 
Respond creates and send the following formatted response:
{
    status: (status code), 
    data: (data if received and if there is no error),
    message: (if there is an error, it returns this message instead of data)
}
*/

const log = require('./log')
const fs = require('fs');


/*
data: Sets the data to be returned
message: overrides data, applied when code >= 400
code: sets the status code
direct: if true, it won't create the response object and instead send what was received in 'data' directly
logging: if false, it won't log to console
*/
const respond = async (res, {data = null, message = 'Undefined error', code = 200, direct = false, logging = true}) => {
    let response = { "status": code };
    
    if (logging) {
        log(`Responded: ${JSON.stringify(response)}`);
    }
    
    if (!direct) {
        
        if (code < 400) {
            response.data = data;
        } else {
            response.error = message;
        }
        
        try {
            res.status(code).send(response);
        } catch (error) {
            delete response.data;
            response.code = 500;
            response.error = message;
            res.status(500).send(response);            
        }
    } else {
        data.data.pipe(res)
    }
    
} 

module.exports = respond;