import type { IFile } from 'entities/FileObject';

/**
 * @description Функция отдает файлы, которые доступны по текущей ссылке
 * */
export const getCurrentFiles = (filesTree: IFile, currentLocation: string) => {
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
