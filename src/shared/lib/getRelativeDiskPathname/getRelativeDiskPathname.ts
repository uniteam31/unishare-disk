/**
 * @description Возвращает путь, относительный от url диска, с декодированными символами
 * */
// TODO: самая нестабильная функция, доработать относительность
export const getRelativeDiskPathname = (pathname: string) => {
	const decodedPathname = decodeURI(pathname);

	const splittedPathname = decodedPathname.split('/');
	return splittedPathname.slice(2).join('/');
};
