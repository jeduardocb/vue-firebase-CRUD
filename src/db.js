import firebase from 'firebase/app';
import 'firebase/firestore';

var config = {
  apiKey: "AIzaSyCUPmMrbl6b1MFjOw_1f7TNKL6L8vPTRvg",
  authDomain: "spike-a85b3.firebaseapp.com",
  projectId: "spike-a85b3",
  storageBucket: "spike-a85b3.appspot.com",
  messagingSenderId: "1037442592473",
  appId: "1:1037442592473:web:2a60460e86f18a196858c8",
  measurementId: "G-Y0Q11572YS"
};

const db = firebase.initializeApp(config).firestore();


/*
querySnapshot => {
  documents = querySnapshot.docs.map(doc => doc.data());
  // do something with documents
 
 console.log( documents);
 return "documents";
*/
const dbApi= {
    getDocs(){
      var aux=[]
       db.collection('ejemplo')
      .get()
      .then( function(querySnapshot){
        querySnapshot.forEach(function(doc){

          aux.push(doc.data())
        });
      }
      );
      return aux
     
    },
    addPerson(nombre2,ciudad2){
      return db.collection('ejemplo').add({
        nombre:nombre2,
        ciudad:ciudad2
      })
    },
    async delete(nombre){
      var docID=""
     await  db.collection("ejemplo").where("nombre","==",nombre).get().then(
        query=>{
          query.docs.map(doc => {
            docID=doc.id
            console.log(docID)
          })
        }
      )
      if(docID.length>0){
       await db.collection("ejemplo").doc(docID).delete()
      }
     
     

    }
    
} 

export { dbApi};

// Export types that exists in Firestore - Uncomment if you need them in your app
// const { Timestamp, GeoPoint } = firebase.firestore
// export { Timestamp, GeoPoint }
