import type { ISpace } from 'entities/Space';
import type { IUser } from 'entities/User';
import type { TMeta } from 'shared/types';

// TODO: то же самое, что и IFile
export interface IFolder extends TMeta {
	name: string;
	type: 'folder';
	ownerID: IUser['id'];
	spaceID: ISpace['id'];
	parentID: TMeta['id'];
}
