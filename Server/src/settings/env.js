require('dotenv/config')

module.exports = {
  db: process.env.DB,
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  appEmail: process.env.APP_EMAIL,
  dbPassword: process.env.DB_PASSWORD,
  cookieName: process.env.COOKIE_NAME,
  dbUsername: process.env.DB_USERNAME,
  devHttpProtocol: process.env.DEV_HTTP_PROTOCOL || 'http',
  cookieSecret: process.env.COOKIE_SECRET,
  appEmailPass: process.env.EMAIL_PASSWORD,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  isProduction: process.env.NODE_ENV === 'production',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenExpires: process.env.REFRESH_TOKEN_EXPIRES,
  accessTokenExpires: Number(process.env.ACCESS_TOKEN_EXPIRES)
}