export default class IFirestoreModel {
  constructor(firestore) {
    this.firestore = firestore;
  }

  get(id) {
    return this.firestore.collection(this.collection).doc(id).get();
  }

  getAll() {
    return this.firestore.collection(this.collection).get();
  }

  create(data) {
    return this.firestore.collection(this.collection).add(data);
  }

  update(id, data) {
    return this.firestore.collection(this.collection).doc(id).update(data);
  }

  delete(id) {
    return this.firestore.collection(this.collection).doc(id).delete();
  }
}