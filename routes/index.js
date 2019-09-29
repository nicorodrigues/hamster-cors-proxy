module.exports = (app, express) => {
    /* 
    Optional cors
    */
    const cors = require('cors');
    const { log } = require('../helpers')
    const Axios = require('axios');
    app.use(cors());
    
    /*
    Automatically formatting JSONs in the requests where Content-Type is set to json
    */
    app.use(express.json());
    
    const router = express.Router();
    
    
    router.post('/bypass', async (req, res) => {
        log(req.body.url || 'No hay url')
        res.send(await Axios({
            method: req.body.method || 'GET',
            url: req.body.url,
        }).then(({data}) => data))
    })
    
    const status = require('./status')(express);
    
    /*
    Routes with prefix
    */
    app.use('/ping', status);
    app.use(router);
}