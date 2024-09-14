function getComponentTsxTemplate(sliceName) {
  return `import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './${sliceName}.module.scss';

interface ${sliceName}Props {
  className?: string;
}

export const ${sliceName} = memo(({ className }: ${sliceName}Props) => {
  const { t } = useTranslation();
    
  return (
    <div className={classNames(cls.${sliceName}, {}, [className])}>
           
    </div>
  );
});`;
}

module.exports = { getComponentTsxTemplate };
