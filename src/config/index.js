module.exports = {
  server: {
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    port: process.env.NODE_ENV === 'production' ? process.env.PORT_PRO : process.env.PORT_DEV,
    maintenance: !!process.env.MAINTENANCE || false,
  },
  pg: {
    hostRead: process.env.PG_HOST_READ || process.env.PG_HOST_WRITE,
    portRead: process.env.PG_PORT_READ || 5432,
    hostWrite: process.env.PG_HOST_WRITE,
    portWrite: process.env.PG_PORT_WRITE || 5432,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    schema: process.env.SCHEMA,
  },
  aws: {
    awsRegion: process.env.AWS_REGION,
    apiVersion: process.env.API_VERSION,
    awsBucketKml: process.env.AWS_BUCKET_KML,
    awsBucketImages: process.env.AWS_BUCKET_IMAGES,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  google: {
    googleCalendarEndpoint: process.env.GOOGLE_CALENDAR_ENDPOINT,
    googleGmailEndpoint: process.env.GOOGLE_GMAIL_ENDPOINT,
    googleGmailEmail: process.env.GOOGLE_GMAIL_EMAIL,
    googleCalendarId: process.env.GOOGLE_CALENDAR_ID,
    googleFirebaseDatabase: process.env.GOOGLE_FIREBASE_DATABASE,
  },
};
