# Hamster CORS Proxy

A simple CORS proxy. 

Just start the server using the start script or PM2 to daemonize the service.

## Endpoints:

### POST /bypass
Responds with the requested URL content

**Parameters**

| Name | Required |  Type   | Description                                                                                                                                                           |
| -------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `url` | required | string  | The URL to make the request against.<br><br>If the requested URL is a file, set `?direct=true` in the proxy's querystring.                                                                    |

**Response examples**

```
Default response:

{
    "status": 200,
    "data": "html or binary code"
}


Response when error

{
    "status": 500,
    "error": "An error message"
}
```

To set the response mode to pipe, set the `direct` parameter to true in the querystring:

**Querystring**

| Name | Required |  Type   | Description                                                                                                                                                           |
| -------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `direct` | optional | boolean  | If set to true, the response mode will be set to pipe mode and any answer will be piped through.<br><br> Used to proxy files or pipe answers.                                                                    |

**Request examples**

`http://localhost:3344/bypass?direct=true`

___
### GET /ping
Responds "pong" (used for health check).