import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import LoadingPlaceholder from '~/components/shared/indicator/loading-placeholder';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { Textarea } from '~/components/ui/textarea';
import messageTemplate from '~/constants/message-template';
import { toast } from '~/hooks/use-toast';
import { PurchaseExtend } from '~/services/clientService/purchase/interface.api';
import { useConfirmPurchase } from '~/services/clientService/purchase/purchase.api';

interface IProps {
  sendMessageData: PurchaseExtend | undefined;
  setSendMessageData: React.Dispatch<React.SetStateAction<PurchaseExtend | undefined>>;
}

export const partnerValidationSchema = z.object({
  message: z
    .string()
    .min(4, { message: '会社名を入力してください' })
    .max(100, { message: '100文字以内で入力してください' }),
});

export default function ModalSendMessage({ sendMessageData, setSendMessageData }: IProps) {
  const { mutate, isPending } = useConfirmPurchase({
    onSuccess: () => {
      toast({
        title: '購入確認しました',
        description: 'ユーザーにLINEで連絡しました',
      });
      setSendMessageData(undefined);
      //   window.open(`https://chat.line.biz/Udf183546c57931e953339c8648038b13`, '_blank', 'noopener');
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof partnerValidationSchema>>({
    resolver: zodResolver(partnerValidationSchema),
    defaultValues: {
      message: messageTemplate().confirmPurchase.text,
    },
  });
  const onSubmit = (data: z.infer<typeof partnerValidationSchema>) => {
    mutate({
      id: sendMessageData?.id ?? '',
      lineId: sendMessageData?.lineId ?? '',
      message: data.message,
    });
  };

  return (
    <>
      <Dialog open={Boolean(sendMessageData)} onOpenChange={(open) => !open && setSendMessageData(undefined)}>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className="mb-5">LINEで連絡する</DialogTitle>
              <Controller
                control={control}
                name="message"
                render={({ field }) => (
                  <Textarea
                    {...field}
                    rows={5}
                    maxLength={100}
                    helperText={errors.message?.message as string}
                    variant={errors.message ? 'warning' : 'default'}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </DialogHeader>
            <DialogFooter className="mt-5 w-full gap-3">
              <Button
                onClick={() => setSendMessageData(undefined)}
                typeStyle="round"
                size="lg"
                variant="outline"
                className="w-full"
                disabled={isPending}
              >
                キャンセル
              </Button>
              <Button type="submit" typeStyle="round" size="lg" className="w-full" disabled={isPending}>
                送信
                {isPending && <LoadingPlaceholder />}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
