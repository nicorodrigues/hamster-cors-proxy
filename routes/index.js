module.exports = (app, express) => {
    /* 
    Optional cors
    */
    const cors = require('cors');
    const { log, respond } = require('../helpers')
    const Axios = require('axios');
    app.use(cors());
    
    /*
    Automatically formatting JSONs in the requests where Content-Type is set to json
    */
    app.use(express.json());
    
    const router = express.Router();
    
    
    router.post('/bypass', async (req, res) => {
        log(req.body.url || 'No url')

        let proxy_request = await Axios({
            method: req.body.method || 'GET',
            url: req.body.url,
            responseType: req.query.direct ? 'stream' : 'json'
        })
        .then((data) => data)
        .catch(err => err)

        let response = {
            code: proxy_request.status || 500,
        }

        if (req.query.direct) {
            response.direct = true;
            response.data = proxy_request;
        } else {
            if (proxy_request.status && proxy_request.status < 400) {
                response.data = proxy_request.data;
            } else { 
                response.message = proxy_request.message;
            }
        }


        respond(res, response)
    })
    
    const status = require('./status')(express);
    
    /*
    Routes with prefix
    */
    app.use('/ping', status);
    app.use(router);
}