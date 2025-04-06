import { Flex, Separator } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Files } from 'widgets/Files';
import { FilesActions } from 'widgets/FilesActions';
import { useGetCurrentSpaceFilesTree } from 'entities/FileObject';
import type { IFile } from 'entities/FileObject';
import { getCurrentFiles } from '../lib/getCurrentFilesTree';
import { getRelativeDiskPathname } from '../lib/getRelativeDiskPathname';
import s from './DiskPage.module.scss';

export const DiskPage = () => {
	const [currentFilesTree, setCurrentFilesTree] = useState<IFile>();

	const location = useLocation();

	const { filesTree } = useGetCurrentSpaceFilesTree();

	useEffect(() => {
		if (!filesTree) {
			return;
		}

		const relativeDiskPathname = getRelativeDiskPathname(location.pathname);

		const currentFiles = getCurrentFiles(filesTree, relativeDiskPathname);

		setCurrentFilesTree(currentFiles);
	}, [filesTree, location.pathname]);

	return (
		<div className={s.DiskPage}>
			<Flex height={'100%'}>
				<FilesActions />

				<Separator orientation={'vertical'} size={'4'} />

				<Files currentFilesTree={currentFilesTree} />
			</Flex>
		</div>
	);
};
