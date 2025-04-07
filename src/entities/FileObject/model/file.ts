import type { IUser } from 'entities/User';
import type { TMeta } from 'shared/types';

export interface IFile extends TMeta {
	url?: string;
	name: string;
	ownerID: IUser['id'];
	children: IFile[];
	// TODO: сделать тип (content-type?)
	/** Приходит в виде content-type из S3 */
	type: string;
}
