const { MessageReader } = require("./message.helper");
const config = require("config");

class Response {

    response;
    headers;
    headersDefault;
    responseType;
    responseDefaultType;

    status;
    statusCode;
    statusDefaultCode;
    statusMessage;

    messageKey;
    messageDefaultKey;
    message;
    description;

    settings;
    settingsDefault;

    data;
    dataDefault;
    dataCount;
    dataDefaultCount;

    constructor() {

        // SET DEFAULT STATUS
        this.statusDefaultCode = 200;

        // SET DEFAULT MESSAGE
        this.messageDefaultKey = "general.no_message";

        // SET DEFAULT SETTINGS
        this.settingsDefault = {
            // 'baseUrl': config.get('host')
        };

        // SET DEFAULT DATA
        this.dataDefault = [];
        this.dataDefaultCount = 0;

        // SET RESPONSE DEFAULT TYPE
        this.responseDefaultType = 'json';

    }

    // SET DEFAULT HEADERS
    setDefaultResponseHeaders() {

        // TO DO If we are going to add any custom header then we have to pass that name in this hader
        // Access-Control-Expose-Headers: <header-name>, <header-name>, ...
        // Access-Control-Expose-Headers: *

        this.headersDefault = {
            // ACCEPT LANGUAGE
            [config.get('languages.header.key')]: LanguageSession.getLanguage()
        };
    }

    // SENT SUCCESS RESPONSE
    send(res, options = {}) {

        this.status = (options.status != undefined && options.status === false ? false : true);

        // INIT RES
        this.response = res;

        // INIT OPTIONS
        this.setResponseOptions(options);

        // SET RESPONSE STATUS
        this.setResponseStatus();

        // SET RESPONSE HEADERS
        this.setResponseHeaders();

        // SET RESPONSE
        this.sendResponse();

    }

    // SET RESPONSE OPTIONS
    setResponseOptions(options = {}) {

        // SET STATUS
        this.statusCode = options.statusCode || this.statusDefaultCode;
        this.statusMessage = this.getStatusCodeMessage(this.statusCode);

        // SET MESSAGE
        this.messageKey = options.messageKey || this.messageDefaultKey;
        this.message = this.getResponseMessage();
        this.description = options.description || "";

        // SET SETTINGS
        this.settings = Object.assign({}, this.settingsDefault, options.settings || {});

        // SET DATA
        this.data = options.data || this.dataDefault;
        this.dataCount = (
            this.data != {} && this.data != [] && this.data != ""
                ? options.dataCount || 1
                : this.dataDefaultCount
        );

        // SET HEADERS
        this.setDefaultResponseHeaders();
        this.headers = Object.assign({}, this.headersDefault, options.headers || {});

        // SET RESPONSE TYPE
        this.responseType = options.responseType || this.responseDefaultType;

    }

    // SET RESPONSE STATUS
    setResponseStatus() {
        this.response.status(this.statusCode);
    }

    // SET RESPONSE HEADERS
    setResponseHeaders() {
        this.response.header(this.headers);
    }

    // SET JSON RESPONSE
    sendJSONResponse() {

        this.response.json({
            status: this.status,
            statusCode: this.statusCode,
            statusMessage: this.statusMessage,
            messageKey: this.messageKey,
            message: this.message,
            description: this.description,
            settings: this.settings,
            dataCount: this.dataCount,
            data: this.data
        });

    }

    // SET RESPONSE
    sendResponse() {
        this.sendJSONResponse();
    }

    // SET MESSAGE
    getResponseMessage() {
        return MessageReader.getParsedMessage(LanguageSession.getLanguage(), this.messageKey || this.messageDefaultKey);
    }

    // SEND ERROR
    error(res, options = {}) {

        this.status = options.status || false;

        // INIT RES
        this.response = res;

        // INIT OPTIONS
        this.setResponseOptions(options);

        // SET RESPONSE STATUS
        this.setResponseStatus();

        // SET RESPONSE HEADERS
        this.setResponseHeaders();

        // SET RESPONSE
        this.sendResponse();

    }

    // GET STATUS CODE
    getStatusCodeMessage(statusCode) {

        const statuses = {
            // 1×× Informational
            100: "Continue",
            101: "Switching Protocols",
            102: "Processing",
            // 2×× Success
            200: "OK",
            201: "Created",
            202: "Accepted",
            203: "Non-authoritative Information",
            204: "No Content",
            205: "Reset Content",
            206: "Partial Content",
            207: "Multi-Status",
            208: "Already Reported",
            226: "IM Used",
            // 3×× Redirection
            300: "Multiple Choices",
            301: "Moved Permanently",
            302: "Found",
            303: "See Other",
            304: "Not Modified",
            305: "Use Proxy",
            307: "Temporary Redirect",
            308: "Permanent Redirect",
            // 4×× Client Error
            400: "Bad Request",
            401: "Unauthorized",
            402: "Payment Required",
            403: "Forbidden",
            404: "Not Found",
            405: "Method Not Allowed",
            406: "Not Acceptable",
            407: "Proxy Authentication Required",
            408: "Request Timeout",
            409: "Conflict",
            410: "Gone",
            411: "Length Required",
            412: "Precondition Failed",
            413: "Payload Too Large",
            414: "Request-URI Too Long",
            415: "Unsupported Media Type",
            416: "Requested Range Not Satisfiable",
            417: "Expectation Failed",
            418: "I’m a teapot",
            421: "Misdirected Request",
            422: "Unprocessable Entity",
            423: "Locked",
            424: "Failed Dependency",
            426: "Upgrade Required",
            428: "Precondition Required",
            429: "Too Many Requests",
            431: "Request Header Fields Too Large",
            444: "Connection Closed Without Response",
            451: "Unavailable For Legal Reasons",
            499: "Client Closed Request",
            // 5×× Server Error
            500: "Internal Server Error",
            501: "Not Implemented",
            502: "Bad Gateway",
            503: "Service Unavailable",
            504: "Gateway Timeout",
            505: "HTTP Version Not Supported",
            506: "Variant Also Negotiates",
            507: "Insufficient Storage",
            508: "Loop Detected",
            510: "Not Extended",
            511: "Network Authentication Required",
            599: "Network Connect Timeout Error"
        };

        return statuses[statusCode];
    }

}

module.exports = new Response();