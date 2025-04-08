import { ContextMenu as RadixContextMenu } from '@radix-ui/themes';
import type { ReactNode } from 'react';

type MenuItem = {
	id: string;
	label: string;
	onSelect: () => void;
	disabled?: boolean;
};

type Props = {
	items: MenuItem[];
	children: ReactNode;
};

export const ContextMenu = (props: Props) => {
	const { items, children } = props;

	return (
		<RadixContextMenu.Root>
			<RadixContextMenu.Trigger>{children}</RadixContextMenu.Trigger>

			<RadixContextMenu.Content>
				{items.map((item) => (
					<RadixContextMenu.Item
						key={item.id}
						onSelect={item.onSelect}
						disabled={item.disabled}
					>
						{item.label}
					</RadixContextMenu.Item>
				))}
			</RadixContextMenu.Content>
		</RadixContextMenu.Root>
	);
};
