import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { MouseEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { mutate } from 'swr';
import { CreateFolder } from 'features/CreateFolder';
import { useMoveFile } from 'features/MoveFile';
import { FileObject } from 'entities/FileObject';
import type { IFile } from 'entities/FileObject';
import { ContextMenu, Flex } from 'shared/ui';

/** Минимальное расстояние в пикселях для активации drag */
const MINIMAL_MOVE_DISTANCE = 10;

type Props = {
	currentFilesTree?: IFile;
};

export const Files = (props: Props) => {
	const { currentFilesTree } = props;

	const [selectedFilesIDs, setSelectedFilesIDs] = useState<IFile['id'][]>([]);
	const [clickedFileID, setClickedFileID] = useState<IFile['id'] | null>();
	const [isCreateFolderModal, setIsCreateFolderModal] = useState(false);

	const handleCreateFolder = () => {
		setIsCreateFolderModal((prev) => !prev);
	};

	const location = useLocation();
	const navigate = useNavigate();

	const { moveFile } = useMoveFile();

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

	/** Выставляется таймер для двойного клика на файл */
	useEffect(() => {
		const clickTimer = setTimeout(() => {
			setClickedFileID(null);
		}, 500);

		return () => clearTimeout(clickTimer);
	}, [clickedFileID]);

	/** Имитирует двойной клик на файл */
	const handleFileClick = (file: IFile) => {
		setClickedFileID(file.id);

		if (!selectedFilesIDs.includes(file.id)) {
			setSelectedFilesIDs([file.id]);
		}

		if (clickedFileID === file.id) {
			navigate(`${location.pathname}/${file.name}`);
		}
	};

	const handleClickOutsideFile = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		setSelectedFilesIDs([]);
	};

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: MINIMAL_MOVE_DISTANCE,
			},
		}),
	);

	const diskContextMenuItems = [
		{
			id: 'create-folder',
			label: 'Создать папку',
			onSelect: handleCreateFolder,
		},
	];

	const fileContextMenuItems = [
		{
			id: 'delete-folder',
			label: ' Удалить',
			onSelect: () => console.log('Удалить'),
		},
	];

	return (
		<DndContext onDragEnd={handleDragEnd} sensors={sensors}>
			{currentFilesTree && (
				<ContextMenu items={diskContextMenuItems}>
					<div style={{ width: '100%', height: '100%' }} onClick={handleClickOutsideFile}>
						<Flex wrap={'wrap'}>
							{currentFilesTree.children?.map((file) => (
								<ContextMenu items={fileContextMenuItems} key={file.id}>
									<div onClick={(event) => event.stopPropagation()}>
										<FileObject
											{...file}
											isSelected={selectedFilesIDs.includes(file.id)}
											onClick={() => handleFileClick(file)}
										/>
									</div>
								</ContextMenu>
							))}
						</Flex>
					</div>
				</ContextMenu>
			)}

			{isCreateFolderModal && (
				<CreateFolder.Modal isOpen={isCreateFolderModal} onClose={handleCreateFolder} />
			)}
		</DndContext>
	);
};
