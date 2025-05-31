import { useLocation } from 'react-router-dom';
import { getRelativeDiskPathname } from 'shared/lib';
import { Breadcrumbs } from 'shared/ui';

const getBreadcrumbsItems = (currentLocation: string) => {
	// TODO: вот тут может взорваться, если поменяется url у модуля
	let url = '/disk';

	const splittedCurrentLocation = currentLocation
		.split('/')
		.filter((segment) => Boolean(segment));

	return splittedCurrentLocation.map((segment) => {
		url += '/' + segment;

		return {
			name: segment,
			url,
		};
	});
};

export const FilesBreadcrumbs = () => {
	const location = useLocation();

	const currentLocation = getRelativeDiskPathname(location.pathname);
	const breadcrumbsItems = getBreadcrumbsItems(currentLocation) || [];

	const breadcrumbsItemsWithMain = [{ name: 'Главная', url: '/disk' }, ...breadcrumbsItems];

	return <Breadcrumbs items={breadcrumbsItemsWithMain} />;
};
