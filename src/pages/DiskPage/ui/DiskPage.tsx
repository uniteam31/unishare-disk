import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Files } from 'widgets/Files';
import { FilesActions } from 'widgets/FilesActions';
import { FilesBreadcrumbs } from 'widgets/FilesBreadcrumbs';
import { useGetCurrentSpaceFilesTree } from 'entities/FileObject';
import type { IFile } from 'entities/FileObject';
import { getRelativeDiskPathname } from 'shared/lib';
import { Flex, Separator } from 'shared/ui';
import { getCurrentLocationFiles } from '../lib/getCurrentLocationFiles';
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

		const currentFiles = getCurrentLocationFiles(filesTree, relativeDiskPathname);

		setCurrentFilesTree(currentFiles);
	}, [filesTree, location.pathname]);

	return (
		<div className={s.DiskPage}>
			<Flex height={'100%'}>
				<FilesActions currentFilesTree={currentFilesTree} />

				<Separator orientation={'vertical'} size={'4'} />

				<Flex direction={'column'} width={'100%'}>
					<FilesBreadcrumbs />

					<Files currentFilesTree={currentFilesTree} />
				</Flex>
			</Flex>
		</div>
	);
};
