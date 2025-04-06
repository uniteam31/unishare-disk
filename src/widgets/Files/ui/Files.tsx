import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { Button } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { mutate } from 'swr';
import { CreateFolder } from 'features/CreateFolder';
import { useMoveFile } from 'features/MoveFile';
import { UploadFile } from 'features/UploadFile';
import { FileObject, useGetCurrentSpaceFilesTree } from 'entities/FileObject';
import type { IFile } from 'entities/FileObject';
import { getCurrentFiles } from '../lib/getCurrentFilesTree';
import { getRelativeDiskPathname } from '../lib/getRelativeDiskPathname';

/** Минимальное расстояние в пикселях для активации drag */
const MINIMAL_MOVE_DISTANCE = 10;

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

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: MINIMAL_MOVE_DISTANCE,
			},
		}),
	);

	return (
		<DndContext onDragEnd={handleDragEnd} sensors={sensors}>
			<UploadFile parentID={currentFileTree?.id} />

			<Button onClick={() => setIsOpen(true)}>Создать папку</Button>

			{currentFileTree && (
				// TODO: styles
				<div style={{ display: 'flex', flexWrap: 'wrap' }}>
					{currentFileTree.children.map((file) => (
						<div key={file.id} onClick={() => handleFileClick(file.name)}>
							<FileObject {...file} />
						</div>
					))}
				</div>
			)}

			<CreateFolder.Modal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				parentID={currentFileTree?.id}
			/>
		</DndContext>
	);
};
