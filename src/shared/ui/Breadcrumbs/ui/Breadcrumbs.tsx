import { Separator, Flex, Tabs } from '@radix-ui/themes';
import { useNavigate } from 'react-router';

type BreadcrumbsItem = {
	name: string;
	url: string;
};

type Props = {
	items: BreadcrumbsItem[];
};

export const Breadcrumbs = (props: Props) => {
	const { items } = props;

	const navigate = useNavigate();

	const handleClick = (url: string) => {
		navigate(url);
	};

	const activeTabUrl = items.length && items[items.length - 1].url;

	return (
		<Tabs.Root value={activeTabUrl || ''}>
			<Tabs.List>
				{items.map((item, index) => (
					<Flex align={'center'} key={item.url}>
						{index !== 0 && <Separator orientation={'vertical'} />}

						<Tabs.Trigger onClick={() => handleClick(item.url)} value={item.url}>
							{item.name}
						</Tabs.Trigger>
					</Flex>
				))}
			</Tabs.List>
		</Tabs.Root>
	);
};
