import DB from 'db/Database'

export default interface IUser {
	id: string
	email?: string | null | undefined
	displayName?: string | null | undefined
	photoURL?: string | null | undefined
	activeMealPlanId?: string
}

export const updateUser = async (user: IUser, params: Partial<IUser>) => {
	DB.update('users', { ...user, ...params }, user.id)
}

export const getUser = async (id: string) => {
	const user = await DB.get('users', id)
	if (!user) {
		throw new Error('User not found')
	}
	return new User(user)
}

export class User implements IUser {
	activeMealPlanId?: string
	displayName: string | null | undefined
	email: string | null | undefined
	id: string
	photoURL?: string | null | undefined
	constructor(user: IUser) {
		this.id = user.id
		this.email = user.email
		this.displayName = user.displayName
		this.photoURL = user.photoURL
		this.activeMealPlanId = user.activeMealPlanId
	}
}
