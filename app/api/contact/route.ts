import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '../../../libs/contact-schema';

export const runtime = 'nodejs';

type TurnstileResponse = {
  success: boolean;
  action?: string;
  'error-codes'?: string[];
};

const requiredEnvironmentVariables = [
  'RESEND_API_KEY',
  'CONTACT_FROM_EMAIL',
  'CONTACT_TO_EMAIL',
  'TURNSTILE_SECRET_KEY',
] as const;

function getMissingEnvironmentVariables() {
  return requiredEnvironmentVariables.filter((name) => !process.env[name]);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function verifyTurnstile(token: string, remoteIp?: string) {
  const body = new URLSearchParams({
    secret: process.env.TURNSTILE_SECRET_KEY!,
    response: token,
  });

  if (remoteIp) {
    body.set('remoteip', remoteIp);
  }

  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body,
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    return false;
  }

  const result = await response.json() as TurnstileResponse;
  return result.success && result.action === 'contact';
}

export async function POST(request: Request) {
  const missingEnvironmentVariables = getMissingEnvironmentVariables();

  if (missingEnvironmentVariables.length > 0) {
    console.error(
      `Contact API is missing environment variables: ${missingEnvironmentVariables.join(', ')}`,
    );
    return NextResponse.json(
      { message: '送信設定が完了していません。時間をおいて再度お試しください。' },
      { status: 500 },
    );
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0);

  if (contentLength > 20_000) {
    return NextResponse.json(
      { message: '送信内容が大きすぎます。' },
      { status: 413 },
    );
  }

  let requestBody: unknown;

  try {
    requestBody = await request.json();
  } catch {
    return NextResponse.json(
      { message: '送信内容を確認してください。' },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(requestBody);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: '入力内容を確認してください。',
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const forwardedFor = request.headers.get('x-forwarded-for');
  const remoteIp = forwardedFor?.split(',')[0]?.trim();
  const isHuman = await verifyTurnstile(
    parsed.data.turnstileToken,
    remoteIp,
  ).catch((error) => {
    console.error('Turnstile verification failed:', error);
    return false;
  });

  if (!isHuman) {
    return NextResponse.json(
      { message: '認証を確認できませんでした。もう一度お試しください。' },
      { status: 400 },
    );
  }

  const { name, email, topic, message } = parsed.data;
  const resend = new Resend(process.env.RESEND_API_KEY);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeTopic = escapeHtml(topic);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL!,
    to: process.env.CONTACT_TO_EMAIL!,
    replyTo: email,
    subject: `【Labiteお問い合わせ】${topic} / ${name}様`,
    text: [
      `お名前: ${name}`,
      `メールアドレス: ${email}`,
      `お問い合わせ種別: ${topic}`,
      '',
      message,
    ].join('\n'),
    html: `
      <h1>Labiteへのお問い合わせ</h1>
      <dl>
        <dt><strong>お名前</strong></dt>
        <dd>${safeName}</dd>
        <dt><strong>メールアドレス</strong></dt>
        <dd>${safeEmail}</dd>
        <dt><strong>お問い合わせ種別</strong></dt>
        <dd>${safeTopic}</dd>
        <dt><strong>お問い合わせ内容</strong></dt>
        <dd>${safeMessage}</dd>
      </dl>
    `,
  });

  if (error) {
    console.error('Resend failed to send contact email:', error);
    return NextResponse.json(
      { message: 'メールを送信できませんでした。時間をおいて再度お試しください。' },
      { status: 500 },
    );
  }

  return NextResponse.json({
    message: 'お問い合わせを送信しました。ありがとうございます。',
  });
}
