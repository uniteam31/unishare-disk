import { useDraggable, useDroppable } from '@dnd-kit/core';
import type { CSSProperties } from 'react';
import FileIcon from 'shared/assets/icons/file.svg';
import FolderIcon from 'shared/assets/icons/folder.svg';
import type { IFile } from '../model/file';

type Props = IFile & {
	onClick?: () => void;
};

export const FileObject = (props: Props) => {
	const { id, name, onClick, type } = props;

	const {
		attributes,
		listeners,
		setNodeRef: setDraggableNodeRef,
		transform,
	} = useDraggable({ id });

	const { isOver, setNodeRef: setDroppableNodeRef } = useDroppable({ id });

	const setNodeRef = (node: HTMLDivElement) => {
		setDraggableNodeRef(node);
		setDroppableNodeRef(node);
	};

	const style: CSSProperties = {
		transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
		padding: '8px',
		margin: '4px',
		width: '100px',
		display: 'flex',
		opacity: isOver ? 0.3 : 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
	};

	return (
		<div ref={setNodeRef} style={style} {...listeners} {...attributes} onClick={onClick}>
			{type === 'folder' ? <FolderIcon /> : <FileIcon />}

			{name}
		</div>
	);
};
