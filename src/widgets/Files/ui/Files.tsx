import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { Button } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { mutate } from 'swr';
import { CreateFolder } from 'features/CreateFolder';
import { useMoveFile } from 'features/MoveFile';
import { UploadFile } from 'features/UploadFile';
import { File, useGetCurrentSpaceFilesTree } from 'entities/File';
import type { IFile } from 'entities/File';

// TODO: to lib
const getCurrentFiles = (filesTree: IFile, currentLocation: string) => {
	if (currentLocation === '') {
		return filesTree;
	}

	const splittedCurrentLocation = currentLocation
		.split('/')
		.filter((segment) => Boolean(segment));

	let currentFile = filesTree;

	for (const segment of splittedCurrentLocation) {
		// TODO: добавить file.type === folder
		const nextFile = currentFile.children.find((file) => file.name === segment);

		// TODO: выкидывать ошибку
		if (!nextFile) {
			console.warn('Путь не найден');
			return;
		}

		currentFile = nextFile;
	}

	return currentFile;
};

const getRelativeDiskPathname = (pathname: string) => {
	const splittedPathname = pathname.split('/');

	return splittedPathname.slice(2, splittedPathname.length).join('/');
};

export const Files = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const { moveFile } = useMoveFile();
	const { filesTree } = useGetCurrentSpaceFilesTree();

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over) {
			return;
		}

		if (active.id !== over.id) {
			moveFile({ fileID: active.id.toString(), parentID: over.id.toString() }).then(() =>
				mutate(() => true),
			);
		}
	};

	const [currentFileTree, setCurrentFileTree] = useState<IFile>();
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (!filesTree) {
			return;
		}

		const relativeDiskPathname = getRelativeDiskPathname(location.pathname);

		const currentFiles = getCurrentFiles(filesTree, relativeDiskPathname);

		setCurrentFileTree(currentFiles);
	}, [filesTree, location.pathname]);

	const handleFileClick = (name: string) => {
		navigate(`${location.pathname}/${name}`);
	};

	return (
		<DndContext onDragEnd={handleDragEnd}>
			<UploadFile />

			<Button onClick={() => setIsOpen(true)}>Создать папку</Button>

			{currentFileTree && (
				// TODO: styles
				<div style={{ display: 'flex', flexWrap: 'wrap' }}>
					{currentFileTree.children.map((file) => (
						<div key={file.id} onClick={() => handleFileClick(file.name)}>
							<File id={file.id}>{file.name}</File>
						</div>
					))}
				</div>
			)}

			<CreateFolder.Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</DndContext>
	);
};
