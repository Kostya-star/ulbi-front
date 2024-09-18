import { Menu } from '@headlessui/react';
import { Fragment, ReactNode, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropdownDirection } from 'shared/types/ui';
import { AppLink } from '../AppLink/AppLink';
import cls from './Dropdown.module.scss';

export interface DropdownItems {
  disabled?: boolean;
  href?: string;
  content?: ReactNode;
  onClick?: () => void;
}

interface DropdownProps {
  className?: string;
  trigger: ReactNode;
  items?: DropdownItems[]
  direction?: DropdownDirection;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': cls.optionsBottomLeft,
  'bottom right': cls.optionsBottomRight,
  'top right': cls.optionsTopRight,
  'top left': cls.optionsTopLeft,
};

export const Dropdown = ({
  className,
  trigger,
  items,
  direction = 'bottom right',
}: DropdownProps) => {
  const optionsClasses = useMemo(() => [mapDirectionClass[direction]], [direction]);

  return (
    <Menu as='div' className={classNames(cls.Dropdown, {}, [className])}>
      <Menu.Button className={cls.trigger}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(cls.list, {}, optionsClasses)}>
        {
          items?.map((item, index) => {
            const getContent = ({ active: isHovered }: { active: boolean }) => (
              <button
                type='button'
                className={classNames(cls.list_item, { [cls.isHovered]: isHovered })}
                onClick={item.onClick}
              >
                { item.content }
              </button>
            );

            if (item.href) {
              return (
                <Menu.Item key={index} as={AppLink} to={item.href} disabled={item.disabled}>
                  {getContent}
                </Menu.Item>
              );
            }
            return (
              <Menu.Item key={index} as={Fragment} disabled={item.disabled}>
                {getContent}
              </Menu.Item>
            );
          })
        }
      </Menu.Items>
    </Menu>
  );
};
