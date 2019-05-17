
let admin = require('firebase-admin');

let serviceAccount = require("../config/serviceAccountKey");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://joyces-gallery-10810.firebaseio.com"
});

let db = admin.database();
let ref = db.ref("pictures");

// let usersRef = ref.child("3");
// usersRef.set({
//     picture: "reddragon.jpg"
// });

ref.once("value", function(snapshot) {
    console.log(snapshot.val());
});


const storage = admin.storage();
const bucket = storage.bucket('joyces-gallery-10810.appspot.com'); //gs://project.appspot.com
bucket.getFiles().then(results => {
    const files = results[0];
    console.log('Total files:', files.length);
    files.forEach(file => {
        // file.download({destination: `D:\\${file}`}).catch(error => console.log('Error: ', error))
        // console.log(file.name);

        const img_url = 'https://firebasestorage.googleapis.com/v0/b/joyces-gallery-10810.appspot.com/o/'
            + encodeURIComponent(file.name)
            + '?alt=media&token='
            + file.metadata.firebaseStorageDownloadTokens;

        console.log('URL',img_url);

    })
}).catch(err => {
    console.error('ERROR:', err);
});