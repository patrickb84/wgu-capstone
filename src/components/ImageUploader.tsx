import {
	getStorage,
	ref,
	StorageReference,
	uploadBytes,
	UploadMetadata,
	getDownloadURL,
	deleteObject
} from 'firebase/storage'
import { useUser } from 'hooks/UserProvider'
import { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

export interface IImageUploaderProps {
	imageUrl?: string
	imageRef?: StorageReference
	setImageUrl: (url: string | undefined) => void
	setImageRef: (ref: StorageReference | undefined) => void
	setImageFilename: (filename: string | undefined) => void
}

export function ImageUploader(props: IImageUploaderProps) {
	const { setImageUrl, setImageFilename, setImageRef, imageUrl, imageRef } = props
	const user = useUser()
	const [error, setError] = useState<string | null>()
	const fbStorage = getStorage()

	const deleteImageRef = async (imageRef: StorageReference) => {
		try {
			await deleteObject(imageRef)
		} catch (error) {
			console.error(error)
		}
	}

	const upload = async (
		storageRef: StorageReference,
		file: Blob | Uint8Array | ArrayBuffer,
		metadata?: UploadMetadata | undefined
	) => {
		const snapshot = await uploadBytes(storageRef, file, metadata)
		return snapshot
	}

	function buildFileName(filename: string) {
		const uniqueId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
		const ext = filename.split('.').pop()
		const strippedFilename = filename.replace(/[^A-Z0-9]/gi, '_')
		return `test1/${strippedFilename}${uniqueId}.${ext}`
	}

	const handleUpload = async ($file: File) => {
		if (!user || !$file) return
		const data = new FormData()
		data.append('file', $file)
		const file = data.get('file') as File
		const filename = buildFileName(file.name)
		const imageRef = ref(fbStorage, filename)

		try {
			await upload(imageRef, file)
			setImageRef(imageRef)
			setImageFilename(filename)
			const url = await getDownloadURL(imageRef)
			setImageUrl(url)
		} catch (error) {
			console.error(error)
		}
	}

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return
		const acceptableMimeTypes = ['image/jpeg', 'image/png']
		if (!acceptableMimeTypes.includes(file.type)) {
			setError('File type not supported')
		}
		handleUpload(file)
		e.target.value = ''
	}

	const handleResetFileInput = () => {
		if (imageRef) deleteImageRef(imageRef)
		setImageUrl(undefined)
		setImageRef(undefined)
		setImageFilename(undefined)	
	}

	return (
		<>
			{imageUrl && (
				<div style={{ width: 150 }} className="border border-light rounded-3 p-2 mb-3">
					<img src={imageUrl} alt="user created recipe" className="w-100" />
				</div>
			)}
			<Form.Group controlId="formFile" className="mb-3">
				<Form.Label>Upload an image</Form.Label>

				<InputGroup>
					<Form.Control type="file" onChange={handleFileInputChange} />
					{imageRef || imageUrl ? (
						<Button variant="secondary" onClick={() => handleResetFileInput()}>
							Reset
						</Button>
					) : (
						<></>
					)}
				</InputGroup>

				<Form.Text className="text-muted">Acceptable file types: .jpg, .jpeg, .png</Form.Text>
				{error && <Form.Text className="text-danger">{error}</Form.Text>}
			</Form.Group>
		</>
	)
}
