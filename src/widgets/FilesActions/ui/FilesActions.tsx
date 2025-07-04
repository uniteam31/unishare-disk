import { useState } from 'react';
import { CreateFolder } from 'features/CreateFolder';
import { UploadFile } from 'features/UploadFile';
import type { IFile } from 'entities/FileObject';
import { Button, Flex } from 'shared/ui';
import s from './FilesActions.module.scss';

type Props = {
	currentFilesTree?: IFile;
};

export const FilesActions = (props: Props) => {
	const { currentFilesTree } = props;

	const [isCreateFolderModal, setIsCreateFolderModal] = useState(false);

	const handleCreateFolderModal = () => {
		setIsCreateFolderModal((prev) => !prev);
	};

	return (
		<div className={s.FilesActions}>
			<Flex direction={'column'} gap={'2'}>
				<Button onClick={handleCreateFolderModal}>Создать папку</Button>
				<UploadFile parentID={currentFilesTree?.id} />
			</Flex>

			{isCreateFolderModal && (
				<CreateFolder.Modal
					isOpen={isCreateFolderModal}
					onClose={handleCreateFolderModal}
					parentID={currentFilesTree?.id}
				/>
			)}
		</div>
	);
};
