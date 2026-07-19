'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendGTMEvent } from '@next/third-parties/google';
import Link from 'next/link';
import { useForm, useWatch } from 'react-hook-form';
import {
  Turnstile,
  type BoundTurnstileObject,
} from 'react-turnstile';
import {
  contactSchema,
  contactTopics,
  type ContactData,
  type ContactFormValues,
} from '../libs/contact-schema';
import { ArrowIcon } from './ArrowIcon';

type ApiResponse = {
  message?: string;
  fieldErrors?: Partial<Record<keyof ContactFormValues, string[]>>;
};

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  topic: '',
  message: '',
  privacy: false,
  turnstileToken: '',
  website: '',
};

const inputClass =
  'w-full rounded-lg border-[1.5px] border-navy bg-white px-4 py-3 text-[15px] outline-none transition-[border-color,box-shadow] placeholder:text-navy/35 focus:border-blue focus:shadow-[0_0_0_3px_rgba(74,125,255,.14)]';
const errorClass = 'mt-1.5 text-[12px] font-bold text-[#A92F2F]';

export function ContactForm() {
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [turnstile, setTurnstile] = useState<BoundTurnstileObject | null>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues, unknown, ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: initialValues,
  });
  const messageLength = useWatch({ control, name: 'message' })?.length ?? 0;

  const onSubmit = async (values: ContactData) => {
    setSubmitMessage('');
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const result = await response.json() as ApiResponse;

      if (!response.ok) {
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, messages]) => {
            const message = messages?.[0];

            if (message) {
              setError(field as keyof ContactFormValues, { message });
            }
          });
        }

        throw new Error(result.message || '送信できませんでした。');
      }

      setSubmitMessage(
        result.message || 'お問い合わせを送信しました。ありがとうございます。',
      );
      sendGTMEvent({ event: 'contact_submit_success' });
      reset(initialValues);
      turnstile?.reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : '送信できませんでした。時間をおいて再度お試しください。',
      );
      setValue('turnstileToken', '', { shouldValidate: true });
      turnstile?.reset();
    }
  };

  return (
    <form className="space-y-7" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-bold" htmlFor="contact-name">
          お名前
          <span className="rounded-full bg-yellow px-2 py-0.5 text-[10px]">必須</span>
        </label>
        <input
          className={inputClass}
          id="contact-name"
          type="text"
          autoComplete="name"
          placeholder="山田 太郎"
          aria-invalid={Boolean(errors.name)}
          {...register('name')}
        />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-bold" htmlFor="contact-email">
          メールアドレス
          <span className="rounded-full bg-yellow px-2 py-0.5 text-[10px]">必須</span>
        </label>
        <input
          className={inputClass}
          id="contact-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="example@email.com"
          aria-invalid={Boolean(errors.email)}
          {...register('email')}
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-bold" htmlFor="contact-topic">
          お問い合わせ種別
          <span className="rounded-full bg-yellow px-2 py-0.5 text-[10px]">必須</span>
        </label>
        <div className="relative">
          <select
            className={`${inputClass} cursor-pointer appearance-none pr-12`}
            id="contact-topic"
            aria-invalid={Boolean(errors.topic)}
            {...register('topic')}
          >
            <option value="">選択してください</option>
            {contactTopics.map((topic) => (
              <option value={topic} key={topic}>{topic}</option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-navy"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {errors.topic && <p className={errorClass}>{errors.topic.message}</p>}
      </div>

      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-bold" htmlFor="contact-message">
          お問い合わせ内容
          <span className="rounded-full bg-yellow px-2 py-0.5 text-[10px]">必須</span>
        </label>
        <textarea
          className={`${inputClass} min-h-48 resize-y`}
          id="contact-message"
          placeholder="お問い合わせ内容をご記入ください。"
          maxLength={5000}
          aria-invalid={Boolean(errors.message)}
          {...register('message')}
        />
        <div className="mt-1.5 flex items-start justify-between gap-4">
          {errors.message
            ? <p className={`${errorClass} !mt-0`}>{errors.message.message}</p>
            : <span />}
          <p className="shrink-0 font-[family-name:var(--font-oswald)] text-[11px] text-navy/55">
            {messageLength} / 5000
          </p>
        </div>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-lg border-[1.5px] border-dashed border-navy/45 bg-pale-blue px-4 py-3.5 text-[13px]">
        <input
          className="mt-1 size-4 accent-[#4A7DFF]"
          type="checkbox"
          aria-invalid={Boolean(errors.privacy)}
          {...register('privacy')}
        />
        <span>
          <Link className="font-bold text-blue underline underline-offset-3" href="/privacy-policy">
            プライバシーポリシー
          </Link>
          を確認し、個人情報の取り扱いに同意します。
          {errors.privacy && <span className={`block ${errorClass}`}>{errors.privacy.message}</span>}
        </span>
      </label>

      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">ウェブサイト</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div>
        {turnstileSiteKey ? (
          <Turnstile
            sitekey={turnstileSiteKey}
            action="contact"
            fixedSize
            refreshExpired="auto"
            onVerify={(token, boundTurnstile) => {
              setTurnstile(boundTurnstile);
              setValue('turnstileToken', token, {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
            onExpire={(_, boundTurnstile) => {
              setTurnstile(boundTurnstile);
              setValue('turnstileToken', '', { shouldValidate: true });
            }}
            onError={(_, boundTurnstile) => {
              setTurnstile(boundTurnstile ?? null);
              setValue('turnstileToken', '', { shouldValidate: true });
            }}
          />
        ) : (
          <p className={errorClass}>
            Turnstileのサイトキーが設定されていません。
          </p>
        )}
        {errors.turnstileToken && (
          <p className={errorClass}>{errors.turnstileToken.message}</p>
        )}
      </div>

      {submitError && (
        <p className="rounded-lg border-[1.5px] border-[#D65353] bg-[#FFF1F1] px-4 py-3 text-sm font-bold text-[#A92F2F]" role="alert">
          {submitError}
        </p>
      )}

      {submitMessage && (
        <p className="rounded-lg border-[1.5px] border-[#3A7D44] bg-[#F0FFF2] px-4 py-3 text-sm font-bold text-[#286332]" role="status">
          {submitMessage}
        </p>
      )}

      <div className="pt-1 text-center">
        <button
          className="group inline-flex cursor-pointer items-center gap-3 rounded-full border-2 border-navy bg-yellow px-7 py-3.5 text-[15px] font-bold transition-[transform,background,opacity] duration-250 hover:-translate-y-0.75 disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0"
          type="submit"
          disabled={isSubmitting || !turnstileSiteKey}
        >
          {isSubmitting ? '送信中...' : '送信する'}
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-navy text-yellow transition-transform duration-250 group-hover:translate-x-1">
            <ArrowIcon />
          </span>
        </button>
        <p className="mt-3 text-[11.5px] text-navy/60">
          送信後、入力いただいたメールアドレスへ必要に応じて返信します。
        </p>
      </div>
    </form>
  );
}
