import * as admin from 'firebase-admin';
import db from './init';

const COLLECTION_NAME = 'connection';

export class Connection {
    id: string
    clientId: string
    connectTime: admin.firestore.Timestamp
    disconnectTime: admin.firestore.Timestamp
    duration: number
    
    constructor(clientId: string) {
        this.clientId = clientId;
    }

    async saveConnection() {
        console.log("try to save connection");
        this.connectTime = admin.firestore.Timestamp.now();
        this.disconnectTime = null;
        this.duration = null;
        
        const ref = await db
            .collection(COLLECTION_NAME)
            .withConverter(Connection.converter)
            .add(this);

        this.id = ref.id;
        console.log("saved connection");
    }
    
    async saveDisconnection() {
        console.log("try to save disconnection");
        const diff = (Date.now() - this.connectTime.toDate().getTime()) / 1000;
        
        this.disconnectTime = admin.firestore.Timestamp.now();
        this.duration = diff;
        
        await db
            .collection(COLLECTION_NAME)
            .withConverter(Connection.converter)
            .doc(this.id)
            .set(this);
        console.log("saved disconnection");
    }
    
    static converter = {
        toFirestore(con: Connection): admin.firestore.DocumentData {
            return {
                clientId: con.clientId,
                connectTime: con.connectTime,
                disconnectTime: con.disconnectTime,
                duration: con.duration
            }
        },
        fromFirestore(snapshot: admin.firestore.QueryDocumentSnapshot): Connection {
            const data = snapshot.data();
            return new Connection("rndm");
        }
    }
}
