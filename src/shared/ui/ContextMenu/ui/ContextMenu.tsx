import { ContextMenu as RadixContextMenu } from '@radix-ui/themes';
import React from 'react';

type MenuItem = {
	id: string;
	label: string;
	onSelect: () => void;
	disabled?: boolean;
};

type UniversalContextMenuProps = {
	items: MenuItem[];
	children: React.ReactNode;
};

export const ContextMenu: React.FC<UniversalContextMenuProps> = ({ items, children }) => {
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
