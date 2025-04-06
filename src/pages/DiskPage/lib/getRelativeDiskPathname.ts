/**
 * @description Возвращает путь, относительный от url диска
 * */
export const getRelativeDiskPathname = (pathname: string) => {
	const splittedPathname = pathname.split('/');

	return splittedPathname.slice(2, splittedPathname.length).join('/');
};
