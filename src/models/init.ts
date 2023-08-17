import * as admin from 'firebase-admin';
import { getFirestore } from "firebase-admin/firestore";

const environment = process.env.NODE_ENV || 'development';

let params = {};
console.log("try to read env...");
if (environment == 'production') {
  console.log("using prod env");
  params = {
    type: process.env.type,
    projectId: process.env.project_id,
    privateKeyId: process.env.private_key_id,
    privateKey: process.env.private_key.replace(/\\n/g, '\n'),
    clientEmail: process.env.client_email,
    clientId: process.env.client_id,
    authUri: process.env.auth_uri,
    tokenUri: process.env.token_uri,
    authProviderX509CertUrl: process.env.auth_provider_x509_cert_url,
    clientC509CertUrl: process.env.client_x509_cert_url
  }
} else {
  console.log("using non prod env");
  const serviceAccount = require('../../config/service-account.json');
  params = {
      type: serviceAccount.type,
      projectId: serviceAccount.project_id,
      privateKeyId: serviceAccount.private_key_id,
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      clientId: serviceAccount.client_id,
      authUri: serviceAccount.auth_uri,
      tokenUri: serviceAccount.token_uri,
      authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
      clientC509CertUrl: serviceAccount.client_x509_cert_url
    }
}

admin.initializeApp({
  credential: admin.credential.cert(params)
});

const db = getFirestore();

export = db;