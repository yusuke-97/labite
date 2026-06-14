import { z } from 'zod';

export const contactTopics = [
  'サイト・記事について',
  '仕事のご相談',
  'その他',
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'お名前を入力してください。')
    .max(100, 'お名前は100文字以内で入力してください。'),
  email: z
    .string()
    .trim()
    .min(1, 'メールアドレスを入力してください。')
    .email('正しいメールアドレスを入力してください。')
    .max(254, 'メールアドレスは254文字以内で入力してください。'),
  topic: z.string().refine(
    (value): value is (typeof contactTopics)[number] =>
      contactTopics.includes(value as (typeof contactTopics)[number]),
    { message: 'お問い合わせ種別を選択してください。' },
  ),
  message: z
    .string()
    .trim()
    .min(10, 'お問い合わせ内容は10文字以上で入力してください。')
    .max(5000, 'お問い合わせ内容は5000文字以内で入力してください。'),
  privacy: z.boolean().refine((value) => value, {
    message: 'プライバシーポリシーへの同意が必要です。',
  }),
  turnstileToken: z.string().min(1, '認証を完了してください。'),
  website: z.string().max(0, '送信できませんでした。'),
});

export type ContactFormValues = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
