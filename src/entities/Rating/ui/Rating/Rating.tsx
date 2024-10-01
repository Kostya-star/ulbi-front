import {
  memo, ReactNode, useCallback, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Rating.module.scss';
import { Card } from '@/shared/ui/Card/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { useDevice } from '@/shared/hooks/useDevice/useDevice';
import { Drawer } from '@/shared/ui/Drawer/Drawer';

interface RatingProps {
  className?: string;
  title: string;
  modalTitle: string;
  withFeedbackText?: boolean;
  submit: (stars: number, feedbackText?: string) => void;
  cancel: (stars: number) => void;
}

export const Rating = memo(({
  className,
  title,
  modalTitle,
  withFeedbackText,
  submit,
  cancel,
}: RatingProps) => {
  const { t } = useTranslation();
  const isMobile = useDevice();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStars, setSelectedStars] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  const onWriteFeedback = useCallback((f: string) => {
    setFeedbackText(f);
  }, []);

  const onClickStar = useCallback((stars: number) => {
    setSelectedStars(stars);
    if (withFeedbackText) {
      setModalOpen(true);
    } else {
      submit(stars);
    }
  }, [submit, withFeedbackText]);

  const onSubmit = useCallback(() => {
    if (!feedbackText.trim()) return;

    submit(selectedStars, feedbackText);
    setModalOpen(false);
    setFeedbackText('');
  }, [feedbackText, selectedStars, submit]);

  const onCanel = useCallback(() => {
    cancel(selectedStars);
    setModalOpen(false);
    setFeedbackText('');
  }, [selectedStars, cancel]);

  const content = useMemo(() => (
    <VStack allWidth gap='16'>
      <Text title={modalTitle} />
      <Input
        placeholder={t('your_feedback')}
        autofocus
        value={feedbackText}
        onChange={onWriteFeedback}
      />
      <HStack allWidth gap='8' justifyContent='end'>
        <Button theme={ButtonTheme.OUTLINE_RED} onClick={onCanel}>
          {t('cancel')}
        </Button>
        <Button disabled={!feedbackText.trim()} onClick={onSubmit}>
          {t('submit')}
        </Button>
      </HStack>
    </VStack>
  ), [feedbackText, modalTitle, onCanel, onSubmit, onWriteFeedback, t]);

  return (
    <Card>
      <VStack>
        <Text title={title} />
        <StarRating
          size={40}
          selectedStars={selectedStars}
          onClickStar={onClickStar}
        />
      </VStack>

      {
        isMobile
          ? (
            <Drawer
              side='left'
              lazy
              isOpen={isModalOpen}
              onClose={onCanel}
            >
              {content}
            </Drawer>
          )

          : (
            <Modal
              isOpen={isModalOpen}
              lazy
              onClose={onCanel}
            >
              {content}
            </Modal>
          )

      }

    </Card>
  );
});
