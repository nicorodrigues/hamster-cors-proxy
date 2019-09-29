module.exports = (express) => {

    const router = express.Router();
    
    /*
    * Return pong for healthcheck
    */
    router.get('/', (req, res) => {
        res.send('pong');
    });
    
    /*
    * Return the new router
    */
    return router;
  }