import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
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
					<div style={{ width: '100%', height: '100%' }}>
						<div>
							<Flex wrap={'wrap'} onContextMenu={(event) => event.stopPropagation()}>
								{currentFilesTree.children.map((file) => (
									<ContextMenu items={fileContext} key={file.id}>
										<div>
											<FileObject
												{...file}
												onClick={() => handleFileClick(file.name)}
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
