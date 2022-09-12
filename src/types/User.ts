import DB from 'db/Database'

export default interface IUser {
	id: string
	email: string | null
	displayName: string | null
	photoURL?: string | null
	activeMealPlanId?: string
}

export const updateUser = async (user: IUser, params: Partial<IUser>) => {
	DB.update('users', { ...user, ...params }, user.id)
}

export const getUser = async (id: string) => {
    const user = await DB.get('users', id) as IUser
	return new User(user)
}

export class User implements IUser {
	id: string
	email: string | null
	displayName: string | null
	photoURL?: string | null
	activeMealPlanId?: string

	constructor(user: IUser) {
		this.id = user.id
		this.email = user.email
		this.displayName = user.displayName
		this.photoURL = user.photoURL
		this.activeMealPlanId = user.activeMealPlanId
	}
}
