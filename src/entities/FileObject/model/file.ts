import type { ISpace } from 'entities/Space';
import type { IUser } from 'entities/User';
import type { TMeta } from 'shared/types';

export interface IFile extends TMeta {
	url?: string;
	name: string;

	ownerID: IUser['id'];
	spaceID: ISpace['id'];
	parentID: TMeta['id'];

	/** Приходит в виде content-type из S3 */
	type: string;
	children?: IFile[];
}
