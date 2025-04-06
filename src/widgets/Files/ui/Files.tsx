import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { MouseEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { mutate } from 'swr';
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

	const contextMenuItems = [
		{
			id: 'create-folder',
			label: 'Создать папку',
			onSelect: () => console.log('Создать папку'),
		},
		{
			id: 'refresh',
			label: 'Обновить',
			onSelect: () => console.log('Обновить'),
		},
	];

	const fileContext = [
		{
			id: 'delete-folder',
			label: ' Удалить',
			onSelect: () => console.log('Удалить'),
		},
		{
			id: 'refdfdresh',
			label: 'Обнdfdffdовить',
			onSelect: () => console.log('Обновить'),
		},
	];

	return (
		<DndContext onDragEnd={handleDragEnd} sensors={sensors}>
			{currentFilesTree && (
				<ContextMenu items={contextMenuItems}>
					<div style={{ width: '100%', height: '100%' }} onClick={handleClickOutsideFile}>
						<div>
							<Flex wrap={'wrap'}>
								{currentFilesTree.children.map((file) => (
									<ContextMenu items={fileContext} key={file.id}>
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
					</div>
				</ContextMenu>
			)}
		</DndContext>
	);
};
