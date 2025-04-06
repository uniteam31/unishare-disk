import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Tooltip } from '@radix-ui/themes';
import type { CSSProperties } from 'react';
import FileIcon from 'shared/assets/icons/file.svg';
import FolderIcon from 'shared/assets/icons/folder.svg';
import type { IFile } from '../model/file';
import s from './FileObject.module.scss';

type Props = IFile & {
	onClick?: () => void;
};

export const FileObject = (props: Props) => {
	const { id, name, onClick, type, url } = props;

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

	const dynamicStyle: CSSProperties = {
		transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
		opacity: isOver ? 0.3 : 1,
	};

	const renderPreview = () => {
		if (type === 'folder') {
			return <FolderIcon className={s.icon} />;
		}

		if (type.includes('image') && url) {
			return <img src={url} alt={name} className={s.imagePreview} />;
		}

		return <FileIcon className={s.icon} />;
	};

	return (
		<div
			ref={setNodeRef}
			className={s.container}
			style={dynamicStyle}
			{...listeners}
			{...attributes}
			onClick={onClick}
		>
			<div className={s.preview}>{renderPreview()}</div>

			<Tooltip content={name} side={'bottom'}>
				<div className={s.filename}>{name}</div>
			</Tooltip>
		</div>
	);
};
