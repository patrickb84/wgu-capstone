export default interface IUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL?: string | null;
    account?: {}
}