import { useDraggable, useDroppable } from '@dnd-kit/core';
import type { PropsWithChildren } from 'react';
import type { IFile } from '../model/file';

// TODO: extend
type Props = {
	id: IFile['id'];
	onClick?: () => void;
};

export const File = (props: PropsWithChildren<Props>) => {
	const { id, children, onClick } = props;

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

	const style = {
		transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
		padding: '8px',
		margin: '4px',
		border: '1px solid #ccc',
		backgroundColor: isOver ? '#e0f7fa' : '#fff',
		cursor: 'grab',
		width: '200px',
		height: '200px',
	};

	return (
		<div ref={setNodeRef} style={style} {...listeners} {...attributes} onClick={onClick}>
			{children}
		</div>
	);
};
