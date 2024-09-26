import { memo, ReactNode, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Popover as HPopover } from '@headlessui/react';
import { DropdownDirection } from '../../types/ui';
import cls from './Popover.module.scss';

interface PopoverProps {
  className?: string;
  trigger: ReactNode;
  children: ReactNode;
  direction?: DropdownDirection
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': cls.optionsBottomLeft,
  'bottom right': cls.optionsBottomRight,
  'top right': cls.optionsTopRight,
  'top left': cls.optionsTopLeft,
};

export const Popover = memo(({
  className,
  trigger,
  children,
  direction = 'bottom right',
}: PopoverProps) => {
  const directionClasses = useMemo(() => [mapDirectionClass[direction]], [direction]);

  return (
    <HPopover className={classNames(cls.Popover, {}, [className])}>
      <HPopover.Button className={cls.trigger}>
        {trigger}
      </HPopover.Button>

      <HPopover.Panel className={classNames(cls.panel, {}, directionClasses)}>
        {children}
      </HPopover.Panel>
    </HPopover>
  );
});
