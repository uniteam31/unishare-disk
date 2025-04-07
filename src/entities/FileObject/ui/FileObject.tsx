import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Tooltip } from '@radix-ui/themes';
import classNames from 'classnames';
import type { CSSProperties } from 'react';
import FileIcon from 'shared/assets/icons/file.svg';
import FolderIcon from 'shared/assets/icons/folder.svg';
import type { IFile } from '../model/file';
import s from './FileObject.module.scss';

// TODO: надо бы добавить поле selectable, чтобы на мобилках кликать 1 раз
type Props = IFile & {
	onClick?: () => void;
	isSelected?: boolean;
};

export const FileObject = (props: Props) => {
	const { id, name, onClick, type, url, isSelected } = props;

	const {
		attributes,
		listeners,
		setNodeRef: setDraggableNodeRef,
		transform,
	} = useDraggable({ id });

	const handleClick = () => {
		if (url && isSelected) {
			window.location.href = url;
			return;
		}

		onClick?.();
	};

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

		if (type.split('/').includes('image') && url) {
			return <img src={url} alt={name} className={s.imagePreview} />;
		}

		return <FileIcon className={s.icon} />;
	};

	return (
		<div
			ref={setNodeRef}
			className={classNames(s.container, isSelected && s.selected)}
			style={dynamicStyle}
			{...listeners}
			{...attributes}
			onClick={handleClick}
		>
			<div className={s.preview}>{renderPreview()}</div>

			<Tooltip content={name} side={'bottom'}>
				<div className={s.filename}>{name}</div>
			</Tooltip>
		</div>
	);
};
