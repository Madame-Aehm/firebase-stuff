import React from 'react';
import { db } from './firebase-config';
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

function App() {

  //if collections don't exist, they will automatically created - you're only ever creating a document

  const addDocumentToLevelOneCollection = async() => {

    try {
      await addDoc(collection(db, "Level1Collection"), {
        msg: "this has been added as a first level document"
      })
      console.log("document added");
    } catch (e) {
      console.log("error: ", e);
    }
  }

  const addNamedDocumentToLevelOneCollection = async() => {
    try {
      await setDoc(doc(db, "Level1Collection", "Level1Document"), {
        msg: "test to see if message has changed"
      })
      console.log("document added");
    } catch (e) {
      console.log("error: ", e);
    }
  }

  const addDocumentToSubCollectionOfLevelOneDocument = async() => {
    try {
      await addDoc(collection(db, "Level1Collection", "Level1Document", "Level2Collection"), {
        msg: "this document has been added as a level 2 document"
      })
    } catch (e) {
      console.log("error: ", e);
    }
  }

  const addNamedDocumentToSubCollectionOfLevelOneDocument = async() => {
    try {
      await setDoc(doc(db, "Level1Collection", "Level1Document", "Level2Collection", "Level2Document"), {
        msg: "this named document has been added as a level 2 document"
      })
      console.log("document added")
    } catch (e) {
      console.log("error: ", e);
    }
  }


  const userId = "user123";
  const itemId = "item789";

  const addFav = async() => {
//first check if doc exists
    try {
      const docRef = doc(db, "favourites", userId);
      const docSnap = await getDoc(docRef);
//if doc exists, update it
      if (docSnap.exists()) {
        try {
          await updateDoc(doc(db, "favourites", userId), {
            favourited: arrayUnion(itemId)
          })
          console.log("document updated");
        } catch(e) {
          console.log("error: ", e);
        } 
//if doc doesn't exist, create it
      } else {
        try {
          await setDoc(doc(db, "favourites", userId), {
            favourited: [itemId]
          })
          console.log("document added")
        } catch (e) {
          console.log("error: ", e);
        }
      }
    } catch (e) {
      console.log("error: ", e);
    }
  }

  const removeFav = async() => {
    //check if doc exists
    try {
      const docRef = doc(db, "favourites", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        //if it exists, update it
        try {
          await updateDoc(doc(db, "favourites", userId), {
            favourited: arrayRemove(itemId)
          })
          console.log("document updated");
        } catch(e) {
          console.log("error: ", e);
        } 
      }
      //if it doesn't exist, do nothing
    } catch(e) {
      console.log("error: ", e);
    }
  }

  const getFaves = async() => {
    try {
      const docRef = doc(db, "favourites", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Favourites: ", docSnap.data());
      }
    } catch(e) {
      console.log("error: ", e);
    }
  }

  const getLevel1Collection = async() => {
    try {
      const querySnap = await getDocs(collection(db, "Level1Collection"));
      const collection1 = [];
      querySnap.forEach((doc) => {
        collection1.push(doc.data());
      })
      console.log("Level One Collection: ", collection1);
    } catch (e) {
      console.log("error: ", e);
    }
  }

  const getLevel2Collection = async() => {
    try {
      const querySnap = await getDocs(collection(db, "Level1Collection", "Level1Document", "Level2Collection"));
      const collection2 = [];
      querySnap.forEach((doc) => {
        collection2.push(doc.data());
      })
      console.log("Level Two Collection: ", collection2);
    } catch(e) {
      console.log("error: ", e);
    }
  }

  return (
    <div className="App" style={{display: "flex", flexDirection: "column", gap: "1em"}}>
      <h1>Testing...</h1>
      <button onClick={addDocumentToLevelOneCollection}>Add Document To Level One Collection</button>
      <button onClick={addNamedDocumentToLevelOneCollection}>Add Named Document To Level One Collection</button>
      <button onClick={addDocumentToSubCollectionOfLevelOneDocument}>Add Document to SubCollection of Level One Document</button>
      <button onClick={addNamedDocumentToSubCollectionOfLevelOneDocument}>Add Named Document to SubCollection of Level One Document</button>

      <button onClick={addFav}>Add Fav</button>
      <button onClick={removeFav}>Remove Fav</button>

      <button onClick={getFaves}>Get Faves</button>
      <button onClick={getLevel1Collection}>Get Level One Collection</button>
      <button onClick={getLevel2Collection}>Get Level Two Collection</button>
    </div>
  );
}

export default App;
