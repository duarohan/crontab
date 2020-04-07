const convict = require('convict');
const path = require('path');
let config = convict({
    env: {
        doc: 'The applicaton environment.',
        format: ['prod', 'dev', 'local'],
        default: 'local',
        env: 'NODE_ENV',
        arg: 'env'
    },
    emailTokenExpired: {
        doc: 'Email url expiry timing',
        format: Number,
        default: 86400000
    },
    cluster: {
        workerCount: {
            doc: 'No of worker Thread',
            format: Number,
            default: 12
        }
    },
    server: {
        port: {
            doc: 'HTTP port to bind',
            format: 'Number',
            default: 4040
        },
        timeout: {
            doc: 'Server Timeout',
            format: 'Number',
            default: 60000
        },
        enableHttpLogging: {
            doc: 'Enable HTTP Logging',
            format: Boolean,
            default: true
        },
        enableCompression: {
            doc: 'Enable HTTP compression',
            format: Boolean,
            default: true
        },
        enableStatic: {
            doc: 'Enable Express static server',
            format: Boolean,
            default: true
        },
        enablePassportAuthentication: {
            doc: 'Enable Passport authentication',
            format: Boolean,
            default: false
        },
        enableSessionRedis: {
            doc: 'Enable Redis session storage',
            format: Boolean,
            default: false
        },
        staticDirectory: {
            doc: 'Path To Static Directory',
            format: String,
            default: 'public'
        },
        enableCSRFSecurity: {
            doc: 'Enable CSRF security',
            format: Boolean,
            default: false
        },
        security: {
            enableXframe: {
                doc: 'Enable Iframe protection',
                format: Boolean,
                default: false
            },
            enableHidePoweredBy: {
                doc: 'Hide X powered by Header',
                format: Boolean,
                default: false
            },
            enableNoCaching: {
                doc: 'Enable No caching',
                format: Boolean,
                default: false
            },
            enableCSP: {
                doc: 'Enable CSP policy',
                format: Boolean,
                default: false
            },
            enableHSTS: {
                doc: 'Enable HSTS',
                format: Boolean,
                default: false
            },
            enableXssFilter: {
                doc: 'Enable XSS filter protection',
                format: Boolean,
                default: false
            },
            enableForceContentType: {
                doc: 'Enable force content type',
                format: Boolean,
                default: false
            },
            enableCORS: {
                doc: 'Enable CORS',
                format: Boolean,
                default: true
            }
        },
        CORS: {
            allowedHosts: {
                doc: 'Allowed Host for CORS',
                format: Array,
                default: []
            },
            allowedMethods: {
                doc: 'Allowed HTTP Methods for CORS',
                format: String,
                default: 'GET,POST,OPTIONS'
            },
            allowedHeaders: {
                doc: 'Allowed HTTP Headers for CORS',
                format: String,
                default: 'accept, x-xsrf-token,content-type, x-location, certificate'
            },
            exposedHeaders: {
                doc: 'Exposed HTTP Headers for CORS',
                format: String,
                default: 'XSRF-TOKEN'
            }
        },
        session: {
            sidname: {
                doc: 'Name of a session',
                format: String,
                default: 'connect.sid'
            },
            path: {
                doc: 'Path of a session',
                format: String,
                default: '/'
            },
            httpOnly: {
                doc: 'httpOnly cookie',
                format: Boolean,
                default: true
            },
            secure: { // should be set to true when using https
                doc: 'Http security of a session',
                format: Boolean,
                default: false
            },
            maxAge: {
                doc: 'Maximum age of a session',
                format: Number,
                default: 24 * 60 * 60 * 1000 // one day
            }
        },
        bodyParser: {
            limit: {
                doc: 'maximum request body size',
                format: String,
                default: '100kb'
            }
        }
    },
    logger: {
        httpLogFormat: {
            doc: 'HTTP log format',
            format: String,
            default: ':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] | :response-time ms ":referrer" ":user-agent"'
        },
        httpLogFileName: {
            doc: 'HTTP log File name',
            format: String,
            default: 'http.log'
        },
        logFileName: {
            doc: 'Log File name',
            format: String,
            default: 'logs.log'
        },
        exceptionLogFileName: {
            doc: 'Exception log File name',
            format: String,
            default: 'exceptions.log'
        },
        logFileSize: {
            doc: 'logs File Max File size',
            format: Number,
            default: 5242880
        },
        path: {
            doc: 'Log file path name',
            format: String,
            default: './logs/'
        }
    },
    mongourl: {
        doc: "Holds the Mongo db Server Server Host",
        format: String,
        default: "mongodb://localhost:27017/cInfoSystem"
    },
});

config.loadFile(path.join(__dirname, '/config-' + config.get('env') + '.json'))
config.set('logger.httpLogFileName', config.get('logger.path') + config.get('logger.httpLogFileName'));
config.set('logger.logFileName', config.get('logger.path') + config.get('logger.logFileName'));
config.set('logger.exceptionLogFileName', config.get('logger.path') + config.get('logger.exceptionLogFileName'));

// validate
config.validate();

module.exports = config;