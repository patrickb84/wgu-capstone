import {
	collection,
	deleteDoc,
	deleteField,
	doc,
	onSnapshot,
	query,
	setDoc,
	updateDoc,
	where
} from 'firebase/firestore'

// To create or overwrite a single document, use the set() method:
const setDocument = async db => {
	await setDoc(doc(db, 'cities', 'LA'), {
		name: 'Los Angeles',
		state: 'CA',
		country: 'USA'
	})
}

// If the document does not exist, it will be created. If the document does exist, its contents will be overwritten with the newly provided data, unless you specify that the data should be merged into the existing document, as follows:
const setMergeDocument = async db => {
	const cityRef = doc(db, 'cities', 'BJ')
	setDoc(cityRef, { capital: true }, { merge: true })
}
// If you're not sure whether the document exists, pass the option to merge the new data with any existing document to avoid overwriting entire documents. For documents containing maps, note that specifying a set with a field containing an empty map will overwrite the target document's map field.

// Add a document
// When you use set() to create a document, you must specify an ID for the document to create. For example:
const addDocument = async (db, data) => {
	await setDoc(doc(db, 'cities', 'new-city-id'), data)
}

// Update a document
const updateDocument = async (db, data) => {
	const washingtonRef = doc(db, 'cities', 'DC')

	// Set the "capital" field of the city 'DC'
	await updateDoc(washingtonRef, {
		capital: true
	})
}

const deleteDocument = async db => {
	await deleteDoc(doc(db, 'cities', 'DC'))
}

const deleteDocumentField = async db => {
	const cityRef = doc(db, 'cities', 'BJ')

	// Remove the 'capital' field from the document
	await updateDoc(cityRef, {
		capital: deleteField()
	})
}

const subscribeToDocument = async (db, callback) => {
	const unsub = onSnapshot(doc(db, 'cities', 'SF'), doc => {
		console.log('Current data: ', doc.data())
	})
	return unsub
}

const subscribeToMultipleDocuments = async (db, callback) => {
	const q = query(collection(db, 'cities'), where('state', '==', 'CA'))
	const unsubscribe = onSnapshot(q, querySnapshot => {
		const cities = []
		querySnapshot.forEach(doc => {
			cities.push(doc.data().name)
		})
		console.log('Current cities in CA: ', cities.join(', '))
	})
	return unsubscribe
}
